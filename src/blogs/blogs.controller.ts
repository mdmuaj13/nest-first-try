import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.interface';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  async create(@Body()  createBlogDto: CreateBlogDto) {
    const data = await this.blogsService.create(createBlogDto);

    return { data, message: "Blog created successfully" }
  }

  @Get()
  async findAll() {
    const blogs = await this.blogsService.findAll();
    return  { data : blogs } 
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return { data: await this.blogsService.findOne(id) };
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateBlogDto: UpdateBlogDto) {
    const blog = await this.blogsService.update(id, updateBlogDto);
    return { data: blog }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const blog = await this.blogsService.remove(id);
    return { data: blog, message: "Deleted successfully" }
  }
}
