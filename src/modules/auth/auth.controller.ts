import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../user/dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async registerUser(@Body() createUserDto: CreateUserDto): Promise<any> {
      return await this.authService.registerUser(createUserDto)
    }
}
