import { Body, Controller, Get, Post, UploadedFile, UseInterceptors, UploadedFiles, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { GetUser } from '../shared/decorators/get-user.decorator';
import { IUser } from '../user/interfaces/user.interface';
import { BarberService } from './barber.service';
import { CreateBarberDto } from './dto/create-barber.dto';
import { UploadFilesDto } from './dto/upload-files.dto';
import { Barber } from './models/barber.model';

@Controller('barber')
export class BarberController {

    constructor(private readonly barberService: BarberService) {
    }

    @Post('register')
    @UseInterceptors(FileInterceptor('image'))
    async registerUser(@UploadedFile() file: Record<string, unknown>, @Body() createBarberDto: CreateBarberDto): Promise<Barber> {
        return await this.barberService.create(file, createBarberDto)
    }

    @Get('find')
    async findAll(): Promise<Barber[]> {
        return await this.barberService.findAll();
    }

    @Post('/images/upload')
    @UseInterceptors(FilesInterceptor('images'))
    @UseGuards(AuthGuard('jwt'))
    async uploadFile(@UploadedFiles() files : UploadFilesDto, @GetUser() user: IUser) {
        return await this.barberService.savePortfolio(files, user);
    }

    @Get('/images/get')
    @UseGuards(AuthGuard('jwt'))
    async getImages(@GetUser() user: IUser) {
        return { portfolio : await this.barberService.getImages(user)}
    }
}