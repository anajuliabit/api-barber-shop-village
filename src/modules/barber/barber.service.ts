import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from '../user/dto';
import { EUserRole } from '../user/enums';
import { CreateBarberDto } from './dto/create-barber.dto';
import { Barber } from './models/barber.model';

@Injectable()
export class BarberService {
    constructor(
        @InjectModel('Barber') private readonly model: Model<Barber>,
        private readonly authService: AuthService ) { }

        async create(data: CreateBarberDto): Promise<Barber> {
            const { name, email, password, passwordConfirmation } = data
            const createUserDto: CreateUserDto = {
                name, email, password, passwordConfirmation, role: [EUserRole.barber]
            }
            const { cutPrice, haircutType, workTime } = data
            const user = await this.authService.registerUser(createUserDto)
            const barber = new this.model({ userId: user.id, cutPrice, haircutType, workTime  })
            return await barber.save()
        }
}
