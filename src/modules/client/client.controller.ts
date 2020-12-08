import { Body, Controller, Post, UseInterceptors, UploadedFile, Put, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from '../auth/auth.service';
import { UserRoleInterceptor } from '../auth/interceptors/user-role.interceptor';
import { GetUser } from '../shared/decorators/get-user.decorator';
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
        const createUserDto : CreateUserDto = { ...createClientDto, roles: [EUserRole.CLIENT]}
        return await this.authService.registerUser({ "file": file, "data": createUserDto})
    }

    @Put('edit')
    @UseGuards(AuthGuard())
    @UseInterceptors(new UserRoleInterceptor([EUserRole.CLIENT, EUserRole.ADMIN]))
    async edit(@GetUser() user: User, @Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.authService.editUser(user._id, createUserDto);
    }
}
