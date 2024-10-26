import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
      const allowedOrigins = [process.env.URL_DEV, process.env.URL_PRODUCTION];
  
      // Verifica se a origem da requisição está na lista de permitidos
      if (allowedOrigins.includes(req.headers.origin)) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
      }else{
        res.header('Access-Control-Allow-Origin', "*");
      }
  
      // Configurações de CORS
      res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, X-Requested-With');
  
      // Responder a preflight requests
      if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
      }
  
      next(); // Chama o próximo middleware
    }
  }