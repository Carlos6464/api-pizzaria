import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto, UserRequest } from './user.dto';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';

/**
 * @Controller('user')
 * Controlador para gerenciar usuários.
 *
 * Este controlador fornece endpoints para criar um usuário e para buscar detalhes de um usuário autenticado.
 */
@ApiTags('user')
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
    @ApiOperation({ summary: 'Criar um novo usuário' })
    @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
    @ApiResponse({ status: 400, description: 'Dados inválidos ou erro na criação do usuário.' })
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
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Recuperar detalhes do usuário autenticado' })
    @ApiResponse({ status: 200, description: 'Detalhes do usuário recuperados com sucesso.' })
    @ApiResponse({ status: 401, description: 'Não autorizado. Token inválido ou não fornecido.' })
    async findUser(@Req() request: UserRequest) {
        const user = request['user'];
        const userId = user?.sub; // Acesse o id do payload aqui
        return await this.userService.findByid(userId);
    }
}