import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { ItemDto } from './item.dto';

@Injectable()
export class ItemService {

    constructor(private readonly prismaService: PrismaService){}

    async create(item: ItemDto){
        const itemSave = await this.prismaService.item.create({
            data:{
                order_id: item.order_id,
                product_id: item.product_id,
                amount: item.amount
            }
        })

        return itemSave
    }

    async delete(id: string){
        // Verifique se o item existe
        const itemExists = await this.prismaService.item.findUnique({
            where: { id: id },
        });

        if (!itemExists) {
            throw new HttpException('Item não encontrado.', HttpStatus.NOT_FOUND);
        }

        // Se existir, proceed to delete
        return await this.prismaService.item.delete({
            where: { id: id },
        });
    }
            
}
