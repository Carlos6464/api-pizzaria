import { Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';
import { CategoryDto } from './category.dto';

/**
 * Serviço para gerenciar categorias no banco de dados.
 * 
 * Este serviço fornece métodos para criar e recuperar categorias usando o `PrismaService` para
 * interagir com o banco de dados. Ele encapsula a lógica de negócios para operações relacionadas a categorias.
 */
@Injectable()
export class CategoryService {

    /**
     * Cria uma nova instância do serviço de categorias.
     * 
     * @param {PrismaService} prismaService - O serviço Prisma usado para interagir com o banco de dados.
     */
    constructor(
        private readonly prismaService: PrismaService
    ) {}

    /**
     * Cria uma nova categoria no banco de dados.
     * 
     * Este método recebe um DTO de categoria e usa o `PrismaService` para criar a categoria no banco de dados.
     * 
     * @param {CategoryDto} category - O DTO contendo os dados da nova categoria.
     * @returns {Promise<{ id: string; name: string }>} Retorna a nova categoria criada, incluindo o ID e o nome.
     */
    async create(category: CategoryDto) {
        const newCategory = await this.prismaService.category.create({   
            data: category,
            select: {
                id: true,
                name: true
            }
        });
        return newCategory;
    }

    /**
     * Recupera todas as categorias do banco de dados.
     * 
     * Este método usa o `PrismaService` para consultar todas as categorias e retorna uma lista com os IDs e nomes
     * das categorias.
     * 
     * @returns {Promise<{ id: string; name: string }[]>} Retorna uma lista de categorias, cada uma com o ID e o nome.
     */
    async findAll() {
        const categories = await this.prismaService.category.findMany({
            select: {
                id: true,
                name: true
            } 
        });
        return categories;
    }
}