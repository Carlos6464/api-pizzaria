import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponseDto, UserLoginDto } from './auth.dto';

/**
 * Controlador para autenticação de usuários.
 * 
 * Este controlador gerencia as rotas relacionadas ao processo de autenticação.
 * Inclui a rota para o login, onde as credenciais do usuário são verificadas e um token JWT é gerado.
 */
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    /**
     * Rota para login de usuários.
     * 
     * Recebe as credenciais do usuário (e-mail e senha) e utiliza o serviço de autenticação para validar as informações.
     * Retorna um DTO com as informações do usuário e o token JWT gerado.
     * 
     * @param user - DTO contendo o e-mail e a senha do usuário.
     * @returns Um DTO com o id, nome, e-mail, token e tempo de expiração do token.
     * 
     * @example 
     * POST /auth/login
     * Request Body:
     * {
     *   "email": "user@example.com",
     *   "password": "password123"
     * }
     * 
     * Response:
     * {
     *   "id": "b2a5f5c7-3b9b-4f99-bb1e-9f5e2f8a1c9e",
     *   "name": "John Doe",
     *   "email": "user@example.com",
     *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     *   "expiresIn": 3600
     * }
     */
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(
        @Body() user: UserLoginDto,
    ): Promise<AuthResponseDto> {
        return await this.authService.signIn(user.email, user.password);
    }
}
