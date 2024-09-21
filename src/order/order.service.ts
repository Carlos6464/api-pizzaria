import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';
import { orderDto } from './order.dto';


@Injectable()
export class OrderService {

    constructor(private readonly prismaService: PrismaService){}

    async create({name, table}:orderDto){
        const order = await this.prismaService.order.create({
            data:{
                table: table,
                name: name
            }
        })

        return order;
    }

    async listOrders(){
        const orders = await this.prismaService.order.findMany({
            where:{
                draft: false,
                status: false
            },
            orderBy:{
                id: "desc"
            }
        })

        return orders
    }


    async sendOrder(id: string){
        const orderExist = await this.prismaService.order.findUnique({where: {id: id}})

        if(!orderExist){
            throw new HttpException('Order não encontrada.', HttpStatus.NOT_FOUND);
        }

        const order = await this.prismaService.order.update({
            where:{
                id:id
            },
            data:{
                draft: false
            }
        })

        return order;
    }

    async delete(id: string){
        const orderExist = await this.prismaService.order.findUnique({where: {id: id}})

        if(!orderExist){
            throw new HttpException('Order não encontrada.', HttpStatus.NOT_FOUND);
        }

        const order = await this.prismaService.order.delete({
            where:{
                id: id
            }
        })
        return order
    }

    async orderDetail(id:string){
        const orderExist = await this.prismaService.order.findUnique({where: {id: id}})

        if(!orderExist){
            throw new HttpException('Order não encontrada.', HttpStatus.NOT_FOUND);
        }

        const orderDetail = await this.prismaService.item.findMany({
            where:{
                order_id: id
            },
            include:{
                product: true,
                order: true
            }
        })

        return orderDetail
    }

    async orderFinish(id: string){
        const orderExist = await this.prismaService.order.findUnique({where: {id: id}})

        if(!orderExist){
            throw new HttpException('Order não encontrada.', HttpStatus.NOT_FOUND);
        }

        const order = await this.prismaService.order.update({
            where: {
               id: id 
            },
            data:{
                status: true
            }
        })
        return order
    }
}
