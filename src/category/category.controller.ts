import { Body, Controller, Post, UseGuards, Get } from '@nestjs/common';
import { CategoryDto } from './category.dto';
import { CategoryService } from './category.service';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('category')
export class CategoryController {

    constructor(
        private readonly categoryService: CategoryService
    ){}

   
    @Post()
    async create(@Body() category: CategoryDto){
        return await this.categoryService.create(category)
    }

    @Get()
    async findAll(): Promise<CategoryDto[]>{
        return await this.categoryService.findAll();
    }
}
