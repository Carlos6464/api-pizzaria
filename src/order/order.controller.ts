import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { OrderService } from './order.service';
import { orderDto } from './order.dto';


/**
 * Controlador para a entidade Order.
 * 
 * O controlador fornece endpoints para criar uma nova order e recuperar todas as order existentes.
 * O acesso a todos os endpoints deste controlador é protegido pelo AuthGuard, o que exige que o usuário esteja autenticado.
 * 
 * @controller order
 * 
 * @uses AuthGuard - Garante que apenas usuários autenticados possam acessar os endpoints deste controlador.
 */
@ApiTags('Pedido')
@ApiBearerAuth() // Indica que os endpoints exigem autenticação
@Controller('order')
@UseGuards(AuthGuard) // Aplicar o AuthGuard a todas as rotas deste controlador
export class OrderController {

    constructor(private readonly orderService: OrderService){}

    /**
     * Cria uma novo pedido.
     * 
     * Este método recebe um objeto orderDto no corpo da requisição e o utiliza para criar uma nova order.
     * 
     * @param order - O objeto OrderDto que contém os dados da order a ser criada.
     * @returns A order criada, representada como um objeto OrderDto.
    */
    @Post()
    @ApiOperation({ summary: 'Cria uma novo Pedido' })
    @ApiResponse({ status: 201, description: 'Pedido criado com sucesso.', type: orderDto })
    @ApiResponse({ status: 400, description: 'Solicitação inválida.' })
    async create(@Body() order: orderDto): Promise<orderDto>{
        return await this.orderService.create(order);
    }



    /**
     * Deletar Pedido.
     * 
     * Este método recebe o ID de uma ordem para exclusão.
     * 
     * @param order_id - O ID da ordem a ser deletada.
     * @returns Um objeto contendo o status da operação e uma mensagem de sucesso, ou uma exceção em caso de falha.
    */
    @Delete('/:id')
    @ApiOperation({ summary: 'Excluir um  pedido pelo ID' })
    @ApiResponse({ status: 200, description: 'Peido excluído com sucesso.' })
    @ApiResponse({ status: 404, description: 'Pedido não encontrada.' })
    async delete(@Param('id') order_id: string) {
        return await this.orderService.delete(order_id);     
    }


    /**
     * Enviar pedido.
     * 
     * Este método recebe o ID de uma ordem para enviar.
     * 
     * @param order_id - O ID da ordem a ser enviada.
     * @returns Um objeto contendo o status da operação e uma mensagem de sucesso, ou uma exceção em caso de falha.
    */
    @Put('/:id')
    @ApiOperation({ summary: 'Envia uma podido pelo ID' })
    @ApiResponse({ status: 200, description: 'Pedido enviada com sucesso.' })
    @ApiResponse({ status: 404, description: 'Pedido não encontrada.' })
    async sendOrder(@Param('id') order_id: string) {
        return await this.orderService.sendOrder(order_id);
    }

    /**
     * Listar pedido.
     * 
     * Este método recupera todas as ordens registradas no sistema.
     * 
     * @returns Uma lista de ordens.
    */
    @Get()
    @ApiOperation({ summary: 'Recupera todas os Pedidos' })
    @ApiResponse({ status: 200, description: 'Lista de pedidos recuperada com sucesso.' })
    @ApiResponse({ status: 404, description: 'Nenhuma pedido encontrada.' })
    async listOrders() {
        return await this.orderService.listOrders();
    }


    /**
     * Detalhar pedido.
     * 
     * Este método recupera os detalhes de um pewdido específic  pelo ID.
     * 
     * @param order_id - O ID da ordem cujos detalhes devem ser recuperados.
     * @returns Os detalhes da ordem correspondente ao ID fornecido.
    */
    @Get('detail/:id')
    @ApiOperation({ summary: 'Recupera os detalhes de um pedido pelo ID' })
    @ApiResponse({ status: 200, description: 'Detalhes do pedido recuperados com sucesso.' })
    @ApiResponse({ status: 404, description: 'Pedido não encontrado.' })
    async orderDetail(@Param('id') order_id: string) {
        return await this.orderService.orderDetail(order_id);
    }

    /**
     * Finalizar pedido.
     * 
     * Este método finaliza um pedido específico com base no ID fornecido.
     * 
     * @param order_id - O ID da ordem que deve ser finalizada.
     * @returns Uma mensagem confirmando a finalização da ordem ou uma exceção em caso de erro.
     */
    @Put('finish/:id')
    @ApiOperation({ summary: 'Finaliza um pedido pelo ID' })
    @ApiResponse({ status: 200, description: 'Pedido finalizado com sucesso.' })
    @ApiResponse({ status: 404, description: 'Pdido não encontrado.' })
    async orderFinish(@Param('id') order_id: string) {
        return await this.orderService.orderFinish(order_id);
    }

}
