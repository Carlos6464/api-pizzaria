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

/**
 * Tipo que representa os detalhes de um arquivo de banner.
 * 
 * Este tipo é usado para descrever as propriedades de um arquivo de banner enviado, incluindo o nome
 * do arquivo, o nome original, a codificação, o tipo MIME, o tamanho e o conteúdo do arquivo em buffer.
 */
export class bannerDto {
    /**
     * Nome do campo do arquivo.
     * 
     * @type {string}
     */
    @ApiProperty({
        description: 'Nome do campo do arquivo.',
        example: 'banner'
    })
    fieldname: string;

    /**
     * Nome do arquivo gerado.
     * 
     * @type {string}
     */
    @ApiProperty({
        description: 'Nome do arquivo gerado.',
        example: 'banner-1632432456.png'
    })
    filename: string;

    /**
     * Nome original do arquivo.
     * 
     * @type {string}
     */
    @ApiProperty({
        description: 'Nome original do arquivo.',
        example: 'banner-image.png'
    })
    originalname: string;

    /**
     * Codificação do arquivo.
     * 
     * @type {string}
     */
    @ApiProperty({
        description: 'Codificação do arquivo.',
        example: '7bit'
    })
    encoding: string;

    /**
     * Tipo MIME do arquivo.
     * 
     * @type {string}
     */
    @ApiProperty({
        description: 'Tipo MIME do arquivo.',
        example: 'image/png'
    })
    mimetype: string;

    /**
     * Tamanho do arquivo em bytes.
     * 
     * @type {number}
     */
    @ApiProperty({
        description: 'Tamanho do arquivo em bytes.',
        example: 1024
    })
    size: number;

    /**
     * Conteúdo do arquivo em buffer.
     * 
     * @type {Buffer}
     */
    @ApiProperty({
        description: 'Conteúdo do arquivo em buffer.',
        type: 'string',
        format: 'binary'
    })
    buffer: Buffer;
}
