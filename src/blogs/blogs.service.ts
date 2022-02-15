import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { BlogEntity } from './entities/blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';



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
    return  this.blogRepository.find({
      where: [
        { deletedAt: null }
      ],
      order: {
        id: "ASC"
      }
    });
  }



  async findOne(id: number) {
    try {
      const blog = await this.blogRepository.findOne(id, {
        where: [
          { deletedAt: null }
        ]
      });
      if(!blog) {
        throw new NotFoundException("Blog not found");
      }
      return blog;
    } catch (error) {
      throw new NotFoundException("Blog not found with specific identifier!");      
    }
  }





  async update(id: number, updateBlogDto: UpdateBlogDto) {
    try {
      // await this.blogRepository.update({ id }, updateBlogDto);
      // const blog =  await this.blogRepository.findOne(id);
      // return blog;
      const blog = await this.findOne(id);
      return await this.blogRepository.save({
        ...blog,
        ...updateBlogDto
      });

    } catch (error) {
      throw new NotFoundException("Blog not found");      
    }
  }



  async remove(id: number) {
    try {
      const blog = await this.findOne(id);
      if(!blog) {
        throw new NotFoundException("Blog not found with specific identifier.");
      }

      return await this.blogRepository.save({
        ...blog,
        deletedAt: new Date().toISOString()
      });

    } catch (error) {
      throw new NotFoundException("Blog not found");
    }
  }



}
