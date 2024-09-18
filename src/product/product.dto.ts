import { IsOptional, IsString, MinLength } from "class-validator";

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
    @IsString()
    price: string;

    /**
     * Descrição do produto.
     * 
     * Deve ser uma string.
     * 
     * @type {string}
     */
    @IsString()
    description: string;

    /**
     * Nome do arquivo do banner do produto.
     * 
     * Este campo é opcional. Se fornecido, deve ser uma string.
     * 
     * @type {string}
     */
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
    @IsString()
    category_id: string;
}

/**
 * Tipo que representa os detalhes de um arquivo de banner.
 * 
 * Este tipo é usado para descrever as propriedades de um arquivo de banner enviado, incluindo o nome
 * do arquivo, o nome original, a codificação, o tipo MIME, o tamanho e o conteúdo do arquivo em buffer.
 */
export type bannerDto = {
    /**
     * Nome do campo do arquivo.
     * 
     * @type {string}
     */
    fieldname: string;

    /**
     * Nome do arquivo gerado.
     * 
     * @type {string}
     */
    filename: string;

    /**
     * Nome original do arquivo.
     * 
     * @type {string}
     */
    originalname: string;

    /**
     * Codificação do arquivo.
     * 
     * @type {string}
     */
    encoding: string;

    /**
     * Tipo MIME do arquivo.
     * 
     * @type {string}
     */
    mimetype: string;

    /**
     * Tamanho do arquivo em bytes.
     * 
     * @type {number}
     */
    size: number;

    /**
     * Conteúdo do arquivo em buffer.
     * 
     * @type {Buffer}
     */
    buffer: Buffer;
}