import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { EUserRole } from '../user/enums/user-role.enum';
import { User } from '../user/models/user.model';
import { CreateClientDto } from './dto/create-client.dto';

@Controller('client')
export class ClientController {

    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('register')
    async registerUser(@Body() createClientDto: CreateClientDto): Promise<User> {
      const createUserDto: CreateUserDto = { ...createClientDto, role: [EUserRole.CLIENT]}
      return await this.authService.registerUser(createUserDto)
    }
}
