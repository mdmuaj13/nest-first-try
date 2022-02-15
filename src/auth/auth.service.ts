import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.findByUsername(username);

    if(user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.userId };
    const validate = await this.validateUser(user.email, user.password);
    
    if(!validate) {
      throw new NotFoundException('User not found');
    }

    const data = {
      access_token: this.jwtService.sign(payload),
      user
    }

    return {
      data
    };
}

  async findOne(username: string) {
    const { password, ...user } = await this.usersService.findByUsername(username);

    return { data: user };
  }


}
