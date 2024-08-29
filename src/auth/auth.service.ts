import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthResponseDto } from './auth.dto';

@Injectable()
export class AuthService {
    private jwtExpirationTimeInSeconds: number;
    constructor(
        private userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {
        this.jwtExpirationTimeInSeconds = +configService.get<number>('JWT_EXPIRATION_TIME');
    }

    
    async signIn(email: string, pass: string): Promise<AuthResponseDto> {
        const user = await this.userService.findOne(email);
        if(!user || !bcryptCompareSync(pass, user.password)){
            throw new UnauthorizedException()
        }

        const payload = {
            sub: user.id, 
            username : user.name
        }
        const token = this.jwtService.sign(payload)

       return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token,
            expiresIn: this.jwtExpirationTimeInSeconds
        }
      }
}
