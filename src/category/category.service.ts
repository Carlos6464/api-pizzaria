import { Injectable } from '@nestjs/common';
import { PrismaService } from '..//db/prisma.service';
import { CategoryDto } from './category.dto';

@Injectable()
export class CategoryService {

    constructor(
        private readonly prismaService: PrismaService
    ){}

    async create(category: CategoryDto){
        const newCategory = await this.prismaService.category.create( {   
                data:category,
                select: {
                    id: true,
                    name: true
                }

            })
        return newCategory
    }

    async findAll(){
        const categories = await this.prismaService.category.findMany({
            select:{
                id: true,
                name: true
            } 
        })
        return categories
    }
}
