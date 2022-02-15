import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}


  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    return { data: user, message: 'User created successfully' };
  }

  async findAll() {
    const users = await this.userRepository.find();
    return { data: users, message: 'Users found successfully' };
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id);

    if( !user ) {
      throw new NotFoundException(`User not found with specific identifier.`);
    }

    return { data: user, message: 'User found successfully' };
  }

  async findByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: { email: username },
    });
    console.log(user);

    if( !user ) {
      throw new NotFoundException(`User not found with specific username.`);
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
