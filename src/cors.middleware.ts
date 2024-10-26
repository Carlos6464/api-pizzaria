import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // Configurações de CORS
    res.header('Access-Control-Allow-Origin', '*'); // Permitir requisições de qualquer origem
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS'); // Métodos permitidos
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept'); // Cabeçalhos permitidos
    
    // Responder a preflight requests
    if (req.method === 'OPTIONS') {
      return res.sendStatus(204); // Responder com sucesso sem conteúdo
    }
    
    next(); // Chamar o próximo middleware
  }
}