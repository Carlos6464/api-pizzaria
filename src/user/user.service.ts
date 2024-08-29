import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async create(user: UserDto){
        const existUser = await this.prisma.user.findFirst({
            where: {
                email: user.email
            }
        })

        if(existUser){
            throw new HttpException(`There is already a user named ${user.email} registered in the system. Please choose a different email to continue registration.`, HttpStatus.CONFLICT)
        }

        user.password = bcryptHashSync(user.password, 10)
        const newUser = await this.prisma.user.create({
            data: user,
            select:{
                id: true,
                name: true,
                email: true
            }
        })

        return newUser
    }

    async findOne(email: string): Promise<UserDto>{
        const user = await this.prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if(!user){
            throw new HttpException(`There is already a user named ${email} no registered in the system.`, HttpStatus.BAD_REQUEST)
        }
        return user
    }

    async findByid(id: string){
        const user = await this.prisma.user.findFirst({
            where:{
                id
            }, 
            select:{
                id: true,
                email: true,
                name: true,  
            }
        })
        if(!user){
            throw new HttpException(`There is already a user no registered in the system.`, HttpStatus.BAD_REQUEST)
        }
        return user;
    }

}
