import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express'
import { CreateUserDto } from '../user/dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

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
  
}
