import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(
    @Body('title') title: string, 
    @Body('description') description: string, 
    @Body('price') price: number
    ) {
    const product = this.productsService.create(title, description, price);
    return { product };
  }

  @Get()
  findAll() {
    return { products: this.productsService.findAll() };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string, 
    @Body('title') title: string, 
    @Body('description') description: string,
    @Body('price') price: number, 
    ) {
    return this.productsService.update(id, title, description, price);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
