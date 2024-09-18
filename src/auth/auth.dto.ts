import { IsEmail, MaxLength, MinLength } from "class-validator";

/**
 * DTO para os dados de login do usuário.
 * 
 * Este DTO é usado para validar e transferir os dados de login durante o processo de autenticação.
 * Ele assegura que o e-mail fornecido é válido e que a senha atende aos critérios de comprimento.
 */
export class UserLoginDto {
    /**
     * E-mail do usuário.
     * Deve ser um e-mail válido.
     * 
     * @example "user@example.com"
     */
    @IsEmail()
    email: string;

    /**
     * Senha do usuário.
     * Deve ter entre 3 e 10 caracteres.
     * 
     * @example "password"
     */
    @MinLength(3)
    @MaxLength(10)
    password: string;
}

/**
 * DTO para a resposta de autenticação.
 * 
 * Este DTO é usado para representar a resposta do processo de autenticação.
 * Inclui as informações do usuário autenticado e o token JWT gerado.
 */
export interface AuthResponseDto {
    /**
     * Identificador único do usuário.
     * 
     * @example "b2a5f5c7-3b9b-4f99-bb1e-9f5e2f8a1c9e"
     */
    id: string;

    /**
     * Nome do usuário.
     * 
     * @example "John Doe"
     */
    name: string;

    /**
     * E-mail do usuário.
     * 
     * @example "user@example.com"
     */
    email: string;

    /**
     * Token JWT gerado para o usuário autenticado.
     * 
     * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
     */
    token: string;

    /**
     * Tempo de expiração do token em segundos.
     * 
     * @example 3600
     */
    expiresIn: number;
}