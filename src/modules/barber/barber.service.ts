import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { EUserRole } from '../user/enums/user-role.enum';
import { UserService } from '../user/user.service';
import { CreateBarberDto } from './dto/create-barber.dto';
import { Barber } from './models/barber.model';

@Injectable()
export class BarberService {
    constructor(
        @InjectModel('Barber') private readonly model: Model<Barber>,
        private readonly authService: AuthService, private readonly userService: UserService ) { }

        async create(file: Record<string, unknown>, data: CreateBarberDto): Promise<Barber> {
            const { name, email, password, passwordConfirmation } = data
            const createUserDto: CreateUserDto = {
                name, email, password, passwordConfirmation, roles: [EUserRole.BARBER]
            }
            const { cutPrice, haircutType, workTime, description } = data
            const user = await this.authService.registerUser({file, data: createUserDto})
            const barber = new this.model({ userId: user.id, cutPrice,  haircutType, workTime, description  })
            const saveBarber = await barber.save()
            if(!saveBarber) {
                await this.userService.delete(user.id);
                throw new HttpException("Não foi possível relaizar o cadastro.", HttpStatus.BAD_REQUEST)
            } 
            return saveBarber
        }

        async findAll(): Promise<Barber[]> {        
            return await this.model.find();
        }

        async findById(id: string): Promise<Barber> {        
            return await this.model.findOne({ _id: id }); 
    }
}
