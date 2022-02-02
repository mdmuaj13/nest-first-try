import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { BlogEntity } from './entities/blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Blog } from './entities/blog.interface';



@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(BlogEntity) private readonly blogRepository : Repository<BlogEntity>
  ) {}



  create(blog: CreateBlogDto) {
    try {
      const b = this.blogRepository.save(blog);
      return b;
    } catch (error) {
      throw new ConflictException(`${error}`);
    }
  }

  findAll()  {
    return  this.blogRepository.find();
    // return blogs;
  }

  async findOne(id: number) {
    try {
      const blog = await this.blogRepository.findOne(id);
      if(!blog) {
        throw new NotFoundException("Blog not found");      
      }
      return blog;
    } catch (error) {
      throw new NotFoundException();      
    }
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    try {
      await this.blogRepository.update({ id }, updateBlogDto);
      const blog =  await this.blogRepository.findOne(id);
      return blog;
    } catch (error) {
      throw new NotFoundException("Blog not found");      
    }
  }

  async remove(id: number) {
    try {
      let blog = await this.blogRepository.update({ id }, { deletedAt: new Date().toISOString() } );

      if(!blog) {
        throw new NotFoundException("Blog not found with specific identifier.");
      }
      let b = await this.blogRepository.findOne(id);

      return b;
    } catch (error) {
      throw new NotFoundException("Blog not found");
    }
  }
}
