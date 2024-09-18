import { Body, Controller, HttpException, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { bannerDto, ProductDto } from './product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';

/**
 * Controlador responsável pela gestão de produtos.
 * 
 * Este controlador fornece endpoints para criar produtos, incluindo o upload de arquivos de banner.
 */
@Controller('product')
export class ProductController {

    constructor(
        private readonly productService: ProductService
    ) {}

    /**
     * Cria um novo produto com um arquivo de banner.
     * 
     * Este endpoint exige que um arquivo de banner seja enviado com a solicitação. O arquivo é armazenado
     * no diretório temporário definido e o nome do arquivo gerado é associado ao produto. Se o arquivo
     * não for enviado, é lançada uma exceção.
     * 
     * @param {bannerDto} file - O arquivo de banner enviado com a solicitação.
     * @param {ProductDto} product - Dados do produto a ser criado.
     * @returns {Promise<any>} Retorna uma promessa que resolve com o resultado da criação do produto.
     * @throws {HttpException} Lança uma exceção se o arquivo de banner não for enviado.
     */
    @Post()
    @UseInterceptors(FileInterceptor('banner', {
        storage: diskStorage({
            destination: join(__dirname, '..', '..', 'tmp'), // Define a pasta tmp na raiz
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const fileExt = file.originalname.split('.').pop(); // Extensão do arquivo
                const filename = `${file.fieldname}-${uniqueSuffix}.${fileExt}`;
                callback(null, filename);
            }
        })
    }))
    async create(@UploadedFile() file: bannerDto, @Body() product: ProductDto) {
        // Verifica se o arquivo foi enviado
        if (!file) {
            // Lança um erro se o arquivo não for enviado
            throw new HttpException('O arquivo de banner é obrigatório.', HttpStatus.BAD_REQUEST);
        }

        // Atualiza o DTO com o nome do arquivo gerado
        product.banner = file.filename;
       
        console.log('Arquivo recebido:', file);
        console.log('Produto recebido:', product);
        
        return await this.productService.create(product);
    }
}