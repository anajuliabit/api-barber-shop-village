import { Body, Controller, Get, Post } from '@nestjs/common';
import { BarberService } from './barber.service';
import { CreateBarberDto } from './dto/create-barber.dto';
import { Barber } from './models/barber.model';

@Controller('barber')
export class BarberController {

    constructor(private readonly barberService: BarberService) {}

    @Post('register')
    async registerUser(@Body() createBarberDto: CreateBarberDto): Promise<Barber> {
        return await this.barberService.create(createBarberDto)
    }

    @Get('find')
    async findAll(): Promise<Barber[]> {
        return await this.barberService.findAll();
    }
}
