import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

/**
 * Módulo para gerenciamento de categorias.
 * 
 * Este módulo encapsula a lógica de negócios e os controladores relacionados às categorias. Ele fornece
 * o `CategoryService` para operações de gerenciamento de categorias e o `CategoryController` para
 * manipulação de solicitações HTTP relacionadas às categorias.
 */
@Module({
  /**
   * Lista de provedores (services) que fornecem a lógica de negócios e podem ser injetados em outros componentes.
   * 
   * O `CategoryService` é responsável pelas operações de gerenciamento de categorias, como criação e recuperação
   * de categorias no banco de dados.
   * 
   * @type {Array}
   */
  providers: [CategoryService],

  /**
   * Lista de controladores que manipulam as solicitações HTTP.
   * 
   * O `CategoryController` lida com as solicitações relacionadas às categorias e usa o `CategoryService` para
   * realizar as operações necessárias.
   * 
   * @type {Array}
   */
  controllers: [CategoryController]
})
export class CategoryModule {}