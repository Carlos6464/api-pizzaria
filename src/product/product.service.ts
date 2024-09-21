import { Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';
import { ProductDto } from './product.dto';


@Injectable()
export class ProductService {

    constructor(
        private readonly prismaService: PrismaService
    ){}

    async create(product: ProductDto){
        const newproduct = await this.prismaService.product.create({
            data: product,
            select: {
                id: true,
                name: true,
                price: true,
                banner: true,
                description: true,
                category_id: true
            }
        })

        return newproduct;
    }

    async getBycatergoryProduct(categoryId: string){
        const listProducts = await this.prismaService.product.findMany({
            where: {
                category_id: categoryId
            }
        })

        return listProducts;
    }
}
