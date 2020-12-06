import { Body, Controller, HttpCode, HttpStatus, Post, Res, Get, UseGuards, Request } from '@nestjs/common';
import { Response } from 'express'
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { GetUser } from './decorators/get-user.decorator'
import { IUser } from '../user/interfaces/user.interface'
import { AuthGuard} from '@nestjs/passport';
import { AwsService } from '../shared/aws/aws.service'
import { IAuth } from './interfaces/auth.interface';

@Controller('auth')
export class AuthController {

  constructor(
      private readonly authService: AuthService,
      private readonly awsService: AwsService
  ) { }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto): Promise<IAuth> {
    return await this.authService.signinUser(loginUserDto)
  }

  @Get('me')
  @UseGuards(AuthGuard())
  async getMe(@GetUser() user: IUser): Promise<any> {
    return { data: user };
  }
}