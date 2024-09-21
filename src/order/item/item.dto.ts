import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ItemDto {

  /**
   * ID da order do item.
   * 
   * Este campo é obrigatório e deve ser um UUID.
   * 
   * @type {string}
   */
  @ApiProperty({
    description: 'ID da order.',
    example: '9f2d77d0-4b34-41d8-85eb-018bb98ee61f'
  })
  @IsString()
  order_id: string;

  /**
   * ID do produto do item.
   * 
   * Este campo é obrigatório e deve ser um UUID.
   * 
   * @type {string}
   */
  @ApiProperty({
    description: 'ID do produto do item.',
    example: '9f2d77d0-4b34-41d8-85eb-018bb98ee61f'
  })
  @IsString()
  product_id: string;

  /**
   * Quantidade do produto no item.
   * 
   * Este campo é obrigatório e deve ser um número.
   * 
   * @type {number}
   */
  @ApiProperty({
    description: 'Quantidade do produto no item.',
    example: 3
  })
  @IsNumber()
  amount: number;
}