import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

/**
 * Função de inicialização da aplicação NestJS.
 * 
 * Esta função cria uma instância da aplicação usando o módulo principal (`AppModule`),
 * configura o `ValidationPipe` global para validar as solicitações e inicia o servidor na porta 3001.
 */
async function bootstrap() {
  // Cria a aplicação NestJS com o módulo principal
  const app = await NestFactory.create(AppModule);
  
  // Configura o ValidationPipe global para validação automática de DTOs e parâmetros
  app.useGlobalPipes(new ValidationPipe());

  // Inicia o servidor na porta 3001
  await app.listen(3001);
}

// Executa a função de bootstrap para iniciar a aplicação
bootstrap();