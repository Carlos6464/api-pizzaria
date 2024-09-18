import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

/**
 * Módulo responsável pela gestão dos usuários.
 * 
 * Este módulo fornece as funcionalidades para criar, gerenciar e consultar usuários através do 
 * `UserService` e `UserController`.
 * 
 * @module UserModule
 */
@Module({
  /**
   * Lista de provedores (services) que são responsáveis pela lógica de negócios e podem ser injetados em outros componentes.
   */
  providers: [UserService],

  /**
   * Lista de controladores que definem rotas e manipuladores de requisições HTTP.
   */
  controllers: [UserController],

  /**
   * Lista de provedores que devem ser exportados para que possam ser utilizados em outros módulos.
   */
  exports: [UserService]
})
export class UserModule {}
