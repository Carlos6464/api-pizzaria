import { IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO (Data Transfer Object) para a criação e atualização de produtos.
 * 
 * Esta classe define a estrutura e as validações para os dados de um produto. É usada para garantir
 * que os dados recebidos nas solicitações estejam no formato correto e atendam aos requisitos de validação.
 */
export class ProductDto {
    
    /**
     * Nome do produto.
     * 
     * Deve ser uma string com no mínimo 3 caracteres.
     * 
     * @type {string}
     */
    @ApiProperty({
        description: 'Nome do produto.',
        minLength: 3,
        example: 'Pizza Margherita'
    })
    @IsString()
    @MinLength(3)
    name: string;
    
    /**
     * Preço do produto.
     * 
     * Deve ser uma string representando o preço.
     * 
     * @type {string}
     */
    @ApiProperty({
        description: 'Preço do produto.',
        example: '10.00'
    })
    @IsString()
    price: string;

    /**
     * Descrição do produto.
     * 
     * Deve ser uma string.
     * 
     * @type {string}
     */
    @ApiProperty({
        description: 'Descrição do produto.',
        example: 'Deliciosa pizza com molho de tomate e queijo.'
    })
    @IsString()
    description: string;

    /**
     * Nome do arquivo do banner do produto.
     * 
     * Este campo é opcional. Se fornecido, deve ser uma string.
     * 
     * @type {string}
     */
    @ApiPropertyOptional({
        description: 'Nome do arquivo do banner do produto.',
        example: 'banner-image.png'
    })
    @IsString()
    @IsOptional()
    banner: string;

    /**
     * ID da categoria à qual o produto pertence.
     * 
     * Deve ser uma string.
     * 
     * @type {string}
     */
    @ApiProperty({
        description: 'ID da categoria à qual o produto pertence.',
        example: 'categoria-id'
    })
    @IsString()
    category_id: string;
}


