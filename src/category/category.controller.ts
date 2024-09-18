import { Body, Controller, Post, UseGuards, Get } from '@nestjs/common';
import { CategoryDto } from './category.dto';
import { CategoryService } from './category.service';
import { AuthGuard } from '../auth/auth.guard';

/**
 * Controlador para a entidade Categoria.
 * 
 * O controlador fornece endpoints para criar uma nova categoria e recuperar todas as categorias existentes.
 * O acesso a todos os endpoints deste controlador é protegido pelo AuthGuard, o que exige que o usuário esteja autenticado.
 * 
 * @controller category
 * 
 * @uses AuthGuard - Garante que apenas usuários autenticados possam acessar os endpoints deste controlador.
 */
@UseGuards(AuthGuard)
@Controller('category')
export class CategoryController {

    constructor(
        private readonly categoryService: CategoryService
    ){}

   
   /**
     * Cria uma nova categoria.
     * 
     * Este método recebe um objeto CategoryDto no corpo da requisição e o utiliza para criar uma nova categoria.
     * 
     * @param category - O objeto CategoryDto que contém os dados da categoria a ser criada.
     * @returns A categoria criada, representada como um objeto CategoryDto.
     */
   @Post()
   async create(@Body() category: CategoryDto){
       return await this.categoryService.create(category);
   }

   /**
    * Recupera todas as categorias existentes.
    * 
    * Este método retorna uma lista de todas as categorias armazenadas.
    * 
    * @returns Uma promessa que resolve para um array de objetos CategoryDto, cada um representando uma categoria.
    */
   @Get()
   async findAll(): Promise<CategoryDto[]>{
       return await this.categoryService.findAll();
   }
}
