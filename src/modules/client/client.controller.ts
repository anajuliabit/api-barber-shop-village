import { Body, Controller, Post, UseInterceptors, UploadedFile} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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
    @UseInterceptors(FileInterceptor('image'))
    async registerUser(@UploadedFile() file: Record<string, unknown>, @Body() createClientDto: CreateClientDto): Promise<any> {
        const createUserDto : CreateUserDto = { ...createClientDto, role: [EUserRole.CLIENT]}
        return await this.authService.registerUser({ "file": file, "data": createUserDto})
    }
}
