import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { UserDto, UserRequest } from './user.dto';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';

/**
 * @Controller('user')
 * Controlador para gerenciar usuários.
 *
 * Este controlador fornece endpoints para criar um usuário e para buscar detalhes de um usuário autenticado.
 */
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    /**
     * Cria um novo usuário.
     * 
     * @param {UserDto} user - Dados do usuário a ser criado.
     * @returns {Promise<any>} Retorna uma promessa que resolve com o resultado da criação do usuário.
     */
    @Post()
    async create(@Body() user: UserDto) {
        return await this.userService.create(user);
    }

    /**
     * Recupera os detalhes do usuário autenticado.
     * 
     * Este endpoint exige autenticação e utiliza o `AuthGuard` para verificar o token.
     * O ID do usuário é extraído do payload do token JWT.
     * 
     * @param {UserRequest} request - O objeto de solicitação contendo as informações do usuário autenticado.
     * @returns {Promise<any>} Retorna uma promessa que resolve com os detalhes do usuário encontrado.
     */
    @UseGuards(AuthGuard)
    @Get('/detalhe')
    async findUser(@Req() request: UserRequest) {
        //-- Adriano 22-08-2024
        //-- acessar o id usuario pelo token no authGuard
        const user = request['user'];
        const userId = user?.sub; // Acesse o id do payload aqui
        return await this.userService.findByid(userId);
    }
}