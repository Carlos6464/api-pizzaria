import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional } from "class-validator";


export class orderDto {
    

     /**
     * Nome do cliente.
     * 
     * Este campo não é obrigatório e deve ser uma string. É usado para informar o nome do cliente.
     * 
     * @type {string}
     */
     @ApiProperty({
        description: 'Nome do cliente do pedido, caso o cliente deseje fornecer o nome',
        example: 'John'
    })
    @IsString()
    @IsOptional()
    name: string;

    /**
     * Numero da mesa
     * Este campo é obrigatorio e deve ser um numero.
     * 
     * @type {number}
    */
    @ApiProperty({
        description: 'Nunero da mesa do pedido.',
        example: '12'
    })
    table: number;
}