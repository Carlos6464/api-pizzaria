import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { UserDto } from './user.dto';

/**
 * Serviço responsável pela lógica de negócios relacionada aos usuários.
 * 
 * Este serviço fornece métodos para criar novos usuários, encontrar usuários por e-mail e ID, e lidar com
 * erros associados a operações de usuário.
 */
@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    /**
     * Cria um novo usuário.
     * 
     * Verifica se já existe um usuário com o e-mail fornecido. Se existir, lança uma exceção de conflito.
     * Caso contrário, cria um novo usuário com a senha criptografada.
     * 
     * @param {UserDto} user - Dados do usuário a ser criado.
     * @returns {Promise<any>} Retorna uma promessa que resolve com os dados do novo usuário criado.
     * @throws {HttpException} Lança uma exceção se o e-mail já estiver registrado.
     */
    async create(user: UserDto) {
        const existUser = await this.prisma.user.findFirst({
            where: {
                email: user.email
            }
        });

        if (existUser) {
            throw new HttpException(
                `There is already a user named ${user.email} registered in the system. Please choose a different email to continue registration.`,
                HttpStatus.CONFLICT
            );
        }

        user.password = bcryptHashSync(user.password, 10);
        const newUser = await this.prisma.user.create({
            data: user,
            select: {
                id: true,
                name: true,
                email: true
            }
        });

        return newUser;
    }

    /**
     * Encontra um usuário pelo e-mail.
     * 
     * Verifica se existe um usuário com o e-mail fornecido. Se não existir, lança uma exceção de erro.
     * 
     * @param {string} email - E-mail do usuário a ser encontrado.
     * @returns {Promise<UserDto>} Retorna uma promessa que resolve com os dados do usuário encontrado.
     * @throws {HttpException} Lança uma exceção se o e-mail não estiver registrado.
     */
    async findOne(email: string): Promise<UserDto> {
        const user = await this.prisma.user.findFirst({
            where: {
                email: email
            }
        });

        if (!user) {
            throw new HttpException(
                `There is already a user named ${email} no registered in the system.`,
                HttpStatus.BAD_REQUEST
            );
        }
        return user;
    }

    /**
     * Encontra um usuário pelo ID.
     * 
     * Verifica se existe um usuário com o ID fornecido. Se não existir, lança uma exceção de erro.
     * 
     * @param {string} id - ID do usuário a ser encontrado.
     * @returns {Promise<any>} Retorna uma promessa que resolve com os dados do usuário encontrado.
     * @throws {HttpException} Lança uma exceção se o usuário não estiver registrado.
     */
    async findByid(id: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                id
            },
            select: {
                id: true,
                email: true,
                name: true
            }
        });
        
        if (!user) {
            throw new HttpException(
                `There is already a user no registered in the system.`,
                HttpStatus.BAD_REQUEST
            );
        }
        return user;
    }
}