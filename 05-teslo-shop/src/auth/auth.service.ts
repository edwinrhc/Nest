import {BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

import * as bcrypt from 'bcrypt';
import { CreateUserDto, LoginUserDto } from './dto';


@Injectable()
export class AuthService {

  constructor(
      @InjectRepository(User)
      private readonly userRepository: Repository<User>
  ) {
  }

  async create(createUserDto: CreateUserDto) {

    try{

      const {password, ...userDetail} = createUserDto;

     const user = this.userRepository.create({
       ...userDetail,
       password: bcrypt.hashSync(password, 10)
     });
      await this.userRepository.save(user);
      delete user.password;
      return user;
      //TODO: Retornar el JWT de acceso

    }catch(err){
      console.log(err)
      this.handleDBErrors(err);
    }


  }

  async login(loginUserDto: LoginUserDto){
      const { password,email} = loginUserDto;
      const user = await this.userRepository.findOne({
          where: {email},
          select: {email:true,password:true},
      });
      if(!user){
          throw new UnauthorizedException('Credentials are not valid (email)');
      }
      if(!bcrypt.compareSync(password,user.password)){
          throw new UnauthorizedException('Credentials are not valid (password)');
      }

      return user;
      //TODO: retornar el JWT
  }


  private handleDBErrors(error:any): never{
    if(error.code ==='23505')
      throw  new BadRequestException(error.detail);
    console.log(error);
    throw new InternalServerErrorException('Please check server logs');
  }


}
