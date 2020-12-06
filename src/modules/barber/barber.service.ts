import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { EUserRole } from '../user/enums/user-role.enum';
import { CreateBarberDto } from './dto/create-barber.dto';
import { Barber } from './models/barber.model';

@Injectable()
export class BarberService {
    constructor(
        @InjectModel('Barber') private readonly model: Model<Barber>,
        private readonly authService: AuthService ) { }

        async create(file: Record<string, unknown>, data: CreateBarberDto): Promise<Barber> {
            console.log(data)
            const { name, email, password, passwordConfirmation } = data
            const createUserDto: CreateUserDto = {
                name, email, password, passwordConfirmation, role: [EUserRole.BARBER]
            }
            const { cutPrice, haircutType, workTime, description } = data
            const user = await this.authService.registerUser({file, data: createUserDto})
            const barber = new this.model({ userId: user.id, cutPrice,  haircutType, workTime, description  })
            return await barber.save()
        }

        async findAll(): Promise<Barber[]> {        
            return await this.model.find();
        }
}
