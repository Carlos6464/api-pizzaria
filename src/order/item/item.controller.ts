import { Body, Controller, Delete, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemDto } from './item.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';


/**
 * Controlador para a entidade Item.
 * 
 * O controlador fornece endpoints para criar uma novo item.
 * O acesso a todos os endpoints deste controlador é protegido pelo AuthGuard, o que exige que o usuário esteja autenticado.
 * 
 * @controller Item
 * 
 * @uses AuthGuard - Garante que apenas usuários autenticados possam acessar os endpoints deste controlador.
 */
@ApiTags('Item do pedido')
@ApiBearerAuth() // Indica que os endpoints exigem autenticação
@Controller('order/item')
@UseGuards(AuthGuard) // Aplicar o AuthGuard a todas as rotas deste controlador
export class ItemController {
    constructor(private readonly itemService: ItemService){}

     /**
     * Cria uma novo item na ordem.
     * 
     * Este método recebe um objeto ItemDto no corpo da requisição e o utiliza para criar uma novo item.
     * 
     * @param order - O objeto ItemDto que contém os dados da item a ser criado.
     * @returns O item criado, representado como um objeto ItemDto.
    */
     @Post()
     @ApiOperation({ summary: 'Cria uma novo item' })
     @ApiResponse({ status: 201, description: 'Item criada com sucesso.', type: ItemDto })
     @ApiResponse({ status: 400, description: 'Solicitação inválida.' })
    async create(@Body() item: ItemDto): Promise<ItemDto>{
        return await this.itemService.create(item)
    }


     /**
     * Deletar um item.
     * 
     * Este método recebe o ID de um item para exclusão.
     * 
     * @param id - O ID do item a ser deletada.
     * @returns Um objeto contendo o status da operação e uma mensagem de sucesso, ou uma exceção em caso de falha.
    */
     @Delete('/:id')
     @ApiOperation({ summary: 'Exclui um item pelo ID' })
     @ApiResponse({ status: 200, description: 'Item excluído com sucesso.' })
     @ApiResponse({ status: 404, description: 'Item não encontrada.' })
     async delete(@Param('id') id: string){
        return await this.itemService.delete(id);
    }
}
