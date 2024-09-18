import { IsEmail, IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO para representar os dados do usuário.
 * 
 * Esta classe é usada para validar os dados do usuário durante a criação e atualização.
 */
export class UserDto {
    /**
     * Identificador único do usuário.
     * 
     * Este campo é opcional e deve ser um UUID se fornecido.
     */
    @ApiPropertyOptional({
        description: 'Identificador único do usuário.',
        example: 'e1b8c8f2-0a5c-4b70-b6c7-67a124e37d4f'
    })
    @IsUUID()
    @IsOptional()
    id: string;

    /**
     * Nome do usuário.
     * 
     * Este campo é obrigatório e deve ter entre 3 e 255 caracteres.
     */
    @ApiProperty({
        description: 'Nome do usuário.',
        minLength: 3,
        maxLength: 255,
        example: 'João da Silva'
    })
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    name: string;

    /**
     * Endereço de e-mail do usuário.
     * 
     * Este campo é obrigatório e deve ser um e-mail válido.
     */
    @ApiProperty({
        description: 'Endereço de e-mail do usuário.',
        example: 'joao.silva@example.com'
    })
    @IsEmail()
    email: string;

    /**
     * Senha do usuário.
     * 
     * Este campo é obrigatório e deve ter entre 3 e 10 caracteres.
     */
    @ApiProperty({
        description: 'Senha do usuário.',
        minLength: 3,
        maxLength: 10,
        example: 'senha123'
    })
    @MinLength(3)
    @MaxLength(10)
    password: string;
}

/**
 * Interface que estende a interface `Request` para incluir informações do usuário autenticado.
 * 
 * Esta interface é usada para tipar o objeto de solicitação (`request`) e acessar informações do usuário
 * a partir do payload do token JWT.
 */
export interface UserRequest extends Request {
    user?: {
        sub: string;  // Identificador do usuário
        username: string;  // Nome de usuário
        iat: number;  // Data de emissão do token
        exp: number;  // Data de expiração do token
    };
}
