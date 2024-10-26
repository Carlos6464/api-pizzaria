import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

/**
 * Função de inicialização da aplicação NestJS.
 * 
 * Esta função cria uma instância da aplicação usando o módulo principal (`AppModule`),
 * configura o `ValidationPipe` global para validar as solicitações e inicia o servidor na porta 3001.
 */
async function bootstrap() {
  // Cria a aplicação NestJS com o módulo principal
  const app = await NestFactory.create(AppModule);
  
   // // Configurando CORS
   app.enableCors({
    origin: '*', // Permitir requisições apenas desse domínio
    methods: 'GET,POST,PUT,DELETE,OPTIONS', // Métodos HTTP permitidos
    allowedHeaders: 'Content-Type, Authorization', // Cabeçalhos permitidos
    exposedHeaders: 'Authorization', // Cabeçalhos que podem ser expostos ao frontend (opcional)
    credentials: true, // Permitir cookies e credenciais
    preflightContinue: false, // Para não permitir que o pré-vôo prossiga para o próximo middleware
    optionsSuccessStatus: 204 // Código de status para resposta de sucesso ao pré-vôo (OPTIONS)
  });

  // configurando o swagger para gerar documentação
  const config = new DocumentBuilder()
    .setTitle('API Pizzaria')
    .setDescription('API destinada à criação de aplicações front-end e mobile para uma pizzaria. A API permite que os usuários façam pedidos e que os garçons utilizem a aplicação para gerenciar e realizar os pedidos.')
    .setVersion('1.0')
    .addTag('Pizzaria')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  // Configura o ValidationPipe global para validação automática de DTOs e parâmetros
  app.useGlobalPipes(new ValidationPipe());

  // Inicia o servidor na porta 3001
  await app.listen(3001);
}

// Executa a função de bootstrap para iniciar a aplicação
bootstrap();