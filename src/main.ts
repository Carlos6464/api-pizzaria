import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  // Configurando CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Permitir requisições do frontend
    methods: 'GET,POST,PUT,DELETE',  // Métodos HTTP permitidos
    credentials: true,               // Permitir cookies e credenciais
  });

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API Pizzaria')
    .setDescription('API para criar aplicações front-end e mobile para uma pizzaria.')
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

  // Configura o ValidationPipe global
  app.useGlobalPipes(new ValidationPipe());

  // Inicia a aplicação (Vercel usará a função exportada abaixo)
  await app.init();
}

// Executa a função de inicialização da aplicação
bootstrap();

export default server;
