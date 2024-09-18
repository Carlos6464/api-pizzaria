import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

/**
 * Guardião de autenticação que protege rotas exigindo um token JWT válido.
 * 
 * O `AuthGuard` é um guardião de rota que verifica a presença e a validade de um token JWT nas requisições.
 * Ele utiliza o `JwtService` para verificar o token e o `ConfigService` para obter o segredo usado na verificação.
 * Se o token for válido, o payload do token é anexado ao objeto de solicitação.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  /**
   * Segredo do JWT obtido da configuração.
   * 
   * @private
   * @type {string}
   */
  private jwtSecret: string;

  /**
   * Cria uma instância do `AuthGuard`.
   * 
   * @param {JwtService} jwtService - Serviço usado para verificar a validade do token JWT.
   * @param {ConfigService} configService - Serviço usado para acessar a configuração da aplicação.
   */
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET');
  }

  /**
   * Verifica se a requisição possui um token JWT válido.
   * 
   * @param {ExecutionContext} context - Contexto de execução da requisição.
   * @returns {Promise<boolean>} Retorna `true` se o token for válido e `false` caso contrário.
   * @throws {UnauthorizedException} Lança uma exceção se o token não estiver presente ou for inválido.
   */
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.jwtSecret
        }
      );
      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }

  /**
   * Extrai o token JWT do cabeçalho de autorização da requisição.
   * 
   * @param {Request} request - A requisição HTTP que contém o cabeçalho de autorização.
   * @returns {string | undefined} Retorna o token JWT se estiver presente e formatado corretamente, caso contrário, `undefined`.
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}