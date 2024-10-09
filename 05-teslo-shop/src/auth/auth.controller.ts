import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';

import { CreateUserDto, LoginUserDto } from './dto';
import {Auth, GetUser,RawHeaders } from './decorators';
import { User } from './entities/user.entity';
import { IncomingHttpHeaders } from 'http';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidRoles } from './interfaces';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(
      @GetUser() user: User
  ){
    return this.authService.checkAuthStatus( user);
}


  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
      @Req() request: Express.Request,
      @GetUser() user: User,
      @GetUser('email')userEmail:string,
      @RawHeaders() rawHeaders: string[]
  ){

    // console.log({user: request.user});
    // console.log(request)

    return {
      ok:true,
      message: 'Hola Mundo Private',
      user,
      userEmail,
      rawHeaders
    }
  }
  // @SetMetadata('roles',['admin','super-user'])

  @Get('private2')
  @RoleProtected(ValidRoles.supeUser,ValidRoles.admin)
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute2( @GetUser() user: User){

    return {
      ok:true,
      user
    }
  }


  @Get('private3')
  @Auth(ValidRoles.admin)
  privateRoute3( @GetUser() user: User){

    return {
      ok:true,
      user
    }
  }



}
