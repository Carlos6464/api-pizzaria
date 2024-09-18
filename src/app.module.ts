import { PrismaModule } from './db/prisma.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

/**
 * Módulo principal da aplicação.
 * 
 * Este módulo importa e configura todos os outros módulos da aplicação, além de configurar o gerenciamento de arquivos estáticos e as variáveis de ambiente.
 */
@Module({
  imports: [
    /**
     * Módulo para servir arquivos estáticos.
     * 
     * Configura o caminho raiz dos arquivos estáticos (imagens e outros arquivos) e define o prefixo da URL para acessar esses arquivos.
     */
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'tmp'), // Caminho onde as imagens são armazenadas
      serveRoot: '/files', // Prefixo da URL para acessar os arquivos
    }),
    
    /**
     * Módulo para conexão com o banco de dados usando Prisma.
     */
    PrismaModule,
    
    /**
     * Módulo de configuração global da aplicação.
     */
    ConfigModule.forRoot({ isGlobal: true }),
    
    /**
     * Módulos da aplicação.
     * 
     * Inclui módulos para gerenciamento de usuários, autenticação, categorias e produtos.
     */
    UserModule,
    AuthModule,
    CategoryModule,
    ProductModule
  ],
  
  /**
   * Controladores da aplicação.
   * 
   * Define o controlador principal da aplicação.
   */
  controllers: [AppController],
  
  /**
   * Serviços da aplicação.
   * 
   * Define o serviço principal da aplicação.
   */
  providers: [AppService],
})
export class AppModule {}