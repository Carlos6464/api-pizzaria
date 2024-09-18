import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * Serviço para gerenciar a conexão com o banco de dados usando o Prisma ORM.
 * 
 * Este serviço estende o `PrismaClient` do Prisma e implementa as interfaces de ciclo de vida do módulo
 * do NestJS para gerenciar a conexão com o banco de dados. Ele é responsável por conectar-se ao banco
 * de dados quando o módulo é inicializado e desconectar-se quando o módulo é destruído.
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  
  /**
   * Conecta ao banco de dados quando o módulo é inicializado.
   * 
   * Este método é chamado automaticamente pelo NestJS quando o módulo que contém o serviço é inicializado.
   * Ele garante que a conexão com o banco de dados esteja estabelecida antes de qualquer operação de banco de dados
   * ser realizada.
   * 
   * @returns {Promise<void>} Retorna uma promessa que resolve quando a conexão é estabelecida.
   */
  async onModuleInit() {
    await this.$connect();
  }

  /**
   * Desconecta do banco de dados quando o módulo é destruído.
   * 
   * Este método é chamado automaticamente pelo NestJS quando o módulo que contém o serviço é destruído.
   * Ele garante que a conexão com o banco de dados seja fechada de forma limpa.
   * 
   * @returns {Promise<void>} Retorna uma promessa que resolve quando a desconexão é concluída.
   */
  async onModuleDestroy() {
    await this.$disconnect();
  }
}