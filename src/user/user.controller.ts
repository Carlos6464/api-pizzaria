import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { UserDto, UserRequest } from './user.dto';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';



@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ){}

    @Post()
    async create(@Body() user: UserDto){
        return await this.userService.create(user)
    }

    @UseGuards(AuthGuard)
    @Get('/detalhe')
    async findUser(@Req() request: UserRequest){
        
        //-- Adriano 22-08-2024
        //-- acessar o id usuario pelo token no authGuard
        const user = request['user'];
        const userId = user?.sub; // Acesse o id do payload aqui
        return  await this.userService.findByid(userId)
    }
}
