import { IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

/**
 * Data Transfer Object (DTO) para categorias.
 * 
 * O `CategoryDto` define a estrutura e as validações para os dados de categoria usados nas operações
 * de criação e atualização de categorias. Ele garante que os dados enviados para o sistema estejam
 * no formato correto e atendam aos requisitos de validação.
 */
export class CategoryDto {
    
    /**
     * Identificador único da categoria.
     * 
     * Este campo é opcional e deve ser um UUID válido se fornecido. É usado para identificar de forma
     * única a categoria no banco de dados.
     * 
     * @type {string}
     */
    @IsUUID()
    @IsOptional()
    id: string;

    /**
     * Nome da categoria.
     * 
     * Este campo é obrigatório e deve ser uma string com um comprimento mínimo de 3 caracteres e
     * um comprimento máximo de 255 caracteres. É usado para descrever a categoria.
     * 
     * @type {string}
     */
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    name: string;
}