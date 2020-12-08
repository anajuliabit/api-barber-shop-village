import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { GetUser } from '../shared/decorators/get-user.decorator'
import { AuthGuard} from '@nestjs/passport';
import { IAuth } from './interfaces/auth.interface';
import { BarberModel } from '../barber/models/barber.model';
import { User } from '../user/models/user.model';

@Controller('auth')
export class AuthController {

  constructor(
      private readonly authService: AuthService,
  ) { }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto): Promise<IAuth> {
    return await this.authService.signinUser(loginUserDto)
  }

  @Get('me')
  @UseGuards(AuthGuard())
  async getMe(@GetUser() user: User): Promise<BarberModel | User> {
    return await this.authService.getMe(user)
  }
}