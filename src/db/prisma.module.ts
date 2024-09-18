import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * Módulo global para o serviço Prisma.
 * 
 * Este módulo encapsula o serviço Prisma, que fornece uma interface para interagir com o banco de dados.
 * É marcado como global para que o `PrismaService` possa ser injetado em qualquer outro módulo do aplicativo
 * sem a necessidade de importar o `PrismaModule` explicitamente em cada módulo.
 * 
 * @module PrismaModule
 */
@Global()
@Module({
    /**
     * Lista de provedores (services) que fornecem a lógica de negócios e podem ser injetados em outros componentes.
     * 
     * Neste módulo, o `PrismaService` é responsável por interagir com o banco de dados usando o Prisma ORM.
     * 
     * @type {Array}
     */
    providers: [PrismaService],

    /**
     * Lista de provedores exportados que podem ser utilizados em outros módulos.
     * 
     * O `PrismaService` é exportado para permitir que outros módulos que importam o `PrismaModule` possam
     * usar o serviço Prisma sem precisar reconfigurá-lo.
     * 
     * @type {Array}
     */
    exports: [PrismaService]
})
export class PrismaModule {}
