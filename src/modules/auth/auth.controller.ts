import { Body, Controller, HttpCode, HttpStatus, Post, Res, Get, UseGuards } from '@nestjs/common';
import { Response } from 'express'
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { GetUser } from './decorators/get-user.decorator'
import { IUser } from '../user/interfaces/user.interface'
import { AuthGuard} from '@nestjs/passport';
import { AwsService } from '../shared/aws/aws.service'

@Controller('auth')
export class AuthController {

  constructor(
      private readonly authService: AuthService,
      private readonly awsService: AwsService
  ) { }

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    return await this.authService.registerUser(createUserDto)
  }

  @Post('login')
  @HttpCode(HttpStatus.NO_CONTENT)
  async loginUser(@Body() loginUserDto: LoginUserDto, @Res() res: Response): Promise<any> {
    const accessToken = await this.authService.signinUser(loginUserDto)
    res.header('Authorization', `${accessToken}`)
    res.end()
    return { data: null }
  }

  @Get('me')
  @UseGuards(AuthGuard())
  async getMe(@GetUser() user: IUser): Promise<any> {
    return { data: user };
  }
}