import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

/**
 * Módulo responsável pela gestão de produtos.
 * 
 * Este módulo encapsula todas as funcionalidades relacionadas a produtos, incluindo a lógica de negócios
 * e os manipuladores de requisições HTTP. O módulo fornece o `ProductService` para operações de serviço
 * e o `ProductController` para expor endpoints HTTP para gerenciamento de produtos.
 * 
 * @module ProductModule
 */
@Module({
  /**
   * Lista de provedores (services) que fornecem a lógica de negócios e podem ser injetados em outros componentes.
   * 
   * Neste módulo, o `ProductService` é responsável pela manipulação de dados de produtos e interações com o banco de dados.
   */
  providers: [ProductService],

  /**
   * Lista de controladores que definem rotas e manipuladores de requisições HTTP.
   * 
   * O `ProductController` expõe endpoints para criar, atualizar, e consultar produtos.
   */
  controllers: [ProductController]
})
export class ProductModule {}