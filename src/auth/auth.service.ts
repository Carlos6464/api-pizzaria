import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthResponseDto } from './auth.dto';

/**
 * Serviço de autenticação responsável por gerenciar a autenticação de usuários e a emissão de tokens JWT.
 * 
 * O `AuthService` fornece funcionalidades para autenticar usuários com base em suas credenciais e gerar
 * tokens JWT para autenticação e autorização. Ele utiliza o `UserService` para verificar as credenciais
 * do usuário e o `JwtService` para criar tokens JWT. A configuração do tempo de expiração do JWT é obtida
 * do `ConfigService`.
 */
@Injectable()
export class AuthService {
    /**
     * Tempo de expiração do token JWT em segundos.
     * 
     * @private
     * @type {number}
     */
    private jwtExpirationTimeInSeconds: number;

    /**
     * Cria uma instância do `AuthService`.
     * 
     * @param {UserService} userService - Serviço usado para interagir com a lógica de negócios e operações
     *                                     de banco de dados relacionadas a usuários.
     * @param {JwtService} jwtService - Serviço usado para criar e verificar tokens JWT.
     * @param {ConfigService} configService - Serviço usado para acessar a configuração da aplicação.
     */
    constructor(
        private userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {
        this.jwtExpirationTimeInSeconds = +configService.get<number>('JWT_EXPIRATION_TIME');
    }

    /**
     * Realiza o login de um usuário, verificando as credenciais e gerando um token JWT se as credenciais
     * forem válidas.
     * 
     * @param {string} email - Endereço de e-mail do usuário para autenticação.
     * @param {string} pass - Senha do usuário para autenticação.
     * @returns {Promise<AuthResponseDto>} Retorna um DTO contendo as informações do usuário e o token JWT
     *                                     se as credenciais forem válidas.
     * @throws {UnauthorizedException} Lança uma exceção se as credenciais fornecidas não forem válidas.
     */
    async signIn(email: string, pass: string): Promise<AuthResponseDto> {
        // Verifica se o usuário existe e se a senha fornecida corresponde à senha armazenada
        const user = await this.userService.findOne(email);
        if (!user || !bcryptCompareSync(pass, user.password)) {
            throw new UnauthorizedException();
        }

        // Cria o payload do token JWT
        const payload = {
            sub: user.id, 
            username: user.name
        };

        // Gera o token JWT
        const token = this.jwtService.sign(payload);

        // Retorna as informações do usuário e o token JWT
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token,
            expiresIn: this.jwtExpirationTimeInSeconds
        };
    }
}