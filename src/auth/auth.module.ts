import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';

/**
 * Módulo responsável pela autenticação na aplicação.
 * 
 * O `AuthModule` configura o serviço e o controlador relacionados à autenticação, incluindo a geração e
 * verificação de tokens JWT. Utiliza o `JwtModule` para configurar as opções do JWT com base na configuração
 * da aplicação e o `UserModule` para acessar os serviços de usuário necessários para autenticação.
 */
@Module({
  imports: [
    /**
     * Módulo de JWT do NestJS configurado de forma assíncrona.
     * 
     * Configura o módulo `JwtModule` com o segredo e o tempo de expiração do token JWT obtidos do `ConfigService`.
     * O módulo é configurado globalmente para ser utilizado em toda a aplicação.
     */
    JwtModule.registerAsync({
      global: true,
      imports: [],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: +configService.get<number>('JWT_EXPIRATION_TIME') }
      }),
      inject: [ConfigService]
    }),
    UserModule
  ],
  providers: [
    /**
     * Serviço de autenticação responsável pela lógica de autenticação e geração de tokens JWT.
     */
    AuthService
  ],
  controllers: [
    /**
     * Controlador responsável por manipular as solicitações relacionadas à autenticação, como login e registro.
     */
    AuthController
  ]
})
export class AuthModule {}