import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BarberService } from './barber.service';
import { CreateBarberDto } from './dto/create-barber.dto';
import { Barber } from './models/barber.model';

@Controller('barber')
export class BarberController {

    constructor(private readonly barberService: BarberService) {}

    @Post('register')
    @UseInterceptors(FileInterceptor('image'))
    async registerUser(@UploadedFile() file: Record<string, unknown>, @Body() createBarberDto: CreateBarberDto): Promise<Barber> {
        return await this.barberService.create(file, createBarberDto)
    }

    @Get('find')
    async findAll(): Promise<Barber[]> {
        return await this.barberService.findAll();
    }
}
