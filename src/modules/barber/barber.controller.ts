import { Body, Controller, Get, Param, Post, Put, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UserRoleInterceptor } from '../auth/interceptors/user-role.interceptor';
import { EUserRole } from '../user/enums/user-role.enum';
import { User } from '../user/models/user.model';
import { BarberService } from './barber.service';
import { CreateBarberDto } from './dto/create-barber.dto';
import { Barber, BarberModel } from './models/barber.model';
import { UploadFilesDto } from './dto/upload-files.dto';
import { DeleteImagesDto } from './dto/delete-images.dto';
import { GetUser } from '../shared/decorators/get-user.decorator';

@Controller('barber')
export class BarberController {

    constructor(private readonly barberService: BarberService) {
    }

    @Post('register')
    @UseInterceptors(FileInterceptor('image'))
    async registerUser(@UploadedFile() file: Record<string, unknown>, @Body() createBarberDto: CreateBarberDto): Promise<BarberModel> {
        return await this.barberService.create(file, createBarberDto)
    }

    @Get('find')
    async findAll(): Promise<BarberModel[]> {
        return await this.barberService.findAll();
    }

    @Get('findById/:id')
    @UseGuards(AuthGuard())
    async findById(@Param() id: string): Promise<BarberModel> {
        return await this.barberService.findById(id);
    }

    @Put('edit')
    @UseGuards(AuthGuard())
    @UseInterceptors(new UserRoleInterceptor([EUserRole.BARBER, EUserRole.ADMIN]))
    async edit(@GetUser() user: User, @Body() createBarberDto: CreateBarberDto): Promise<Barber> {
        return await this.barberService.edit(user._id, createBarberDto);
    }

    @Post('/images/upload')
    @UseInterceptors(FilesInterceptor('images'))
    @UseGuards(AuthGuard('jwt'))
    async uploadFile(@UploadedFiles() files : UploadFilesDto, @GetUser() user: User): Promise<void> {
        await this.barberService.savePortfolio(files, user);
    }

    @Get('/images/get')
    @UseGuards(AuthGuard('jwt'))
    async getImages(@GetUser() user: User) {
        return { portfolio : await this.barberService.getImages(user)}
    }

    @Post('/images/delete')
    @UseGuards(AuthGuard('jwt'))
    async softDeleteImages(@Body() paths: DeleteImagesDto, @GetUser() user: User) {
        return await this.barberService.softDeleteImages(paths, user)
    }

}