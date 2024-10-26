import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { ProductDto } from './product.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { AuthGuard } from 'src/auth/auth.guard';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UploadApiResponse } from 'cloudinary';


/**
 * Controlador responsável pela gestão de produtos.
 * 
 * Este controlador fornece endpoints para criar produtos, incluindo o upload de arquivos de banner.
 * @uses AuthGuard - Garante que apenas usuários autenticados possam acessar os endpoints deste controlador.
 */
@ApiTags('produto')
@ApiBearerAuth() // Indica que os endpoints exigem autenticação
@Controller('product')
@UseGuards(AuthGuard) // Aplicar o AuthGuard a todas as rotas deste controlador
export class ProductController {

    constructor(
        private readonly productService: ProductService,
        private readonly cloudinaryService: CloudinaryService,
    ) {}

    /**
     * Cria um novo produto com um arquivo de banner.
     * 
     * Este endpoint exige que um arquivo de banner seja enviado com a solicitação. O arquivo é armazenado
     * no diretório temporário definido e o nome do arquivo gerado é associado ao produto. Se o arquivo
     * não for enviado, é lançada uma exceção.
     * 
     * @param {ProductDto} product - Dados do produto a ser criado.
     * @returns {Promise<any>} Retorna uma promessa que resolve com o resultado da criação do produto.
     * @throws {HttpException} Lança uma exceção se o arquivo de banner não for enviado.
     */
    @Post()
    @UseInterceptors(FileInterceptor('banner'))
    @ApiOperation({ summary: 'Cria um novo produto com um arquivo de banner.' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Dados do produto e arquivo de banner.',
        type: ProductDto,
        // Note: Swagger não suporta diretamente a documentação de uploads de arquivos, então adicionamos aqui um exemplo de corpo
        examples: {
            'application/json': {
                value: {
                    name: 'Produto Exemplo',
                    price: '10.00',
                    description: 'Descrição do produto',
                    category_id: 'categoria-id'
                }
            }
        }
    })
    @ApiResponse({ status: 201, description: 'Produto criado com sucesso.' })
    @ApiResponse({ status: 400, description: 'Arquivo de banner obrigatório não enviado.' })
    async create(@UploadedFile() file: Express.Multer.File, @Body() product: ProductDto) {
        // Verifica se o arquivo foi enviado
        if (!file) {
            // Lança um erro se o arquivo não for enviado
            throw new HttpException('O arquivo de banner é obrigatório.', HttpStatus.BAD_REQUEST);
        }

        const uploadResult: UploadApiResponse = await this.cloudinaryService.uploadImage(file.buffer);
        
        // Atualiza o DTO com o nome do arquivo gerado
        product.banner = uploadResult.url ;
        return await this.productService.create(product);
    }

    /**
    * Recupera todas os produtos existentes por categoria.
    * 
    * Este método retorna uma lista de todas os produtos armazenadas por categoria.
    * 
    * @returns Uma promessa que resolve para um array de produtos, cada um representando uma produto.
    */
    @Get()
    @ApiOperation({ summary: 'Recupera todos os produtos por categoria' })
    @ApiResponse({ status: 200, description: 'Lista de produtos por categoria.' })
    @ApiResponse({ status: 404, description: 'Nenhum produto encontrado para essa categoria.' })
    async getBycatergoryProduct(@Query('category_id') category_id: string){
        const products = await this.productService.getBycatergoryProduct(category_id);
    
        if (!products) {
            throw new HttpException('Nenhum produto encontrado para essa categoria.', HttpStatus.NOT_FOUND);
        }
    
        return products;
    }



}
