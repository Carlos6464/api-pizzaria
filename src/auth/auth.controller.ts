import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponseDto, UserLoginDto } from './auth.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}
    
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(
        @Body() user: UserLoginDto,
    ): Promise<AuthResponseDto>{
        return await this.authService.signIn(user.email, user.password)
    }
}
