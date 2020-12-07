import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { EUserRole } from '../user/enums/user-role.enum';
import { UserService } from '../user/user.service';
import { CreateBarberDto } from './dto/create-barber.dto';
import { Barber } from './models/barber.model';
import { UploadFilesDto } from './dto/upload-files.dto';
import { AwsService } from '../shared/aws/aws.service';
import { IUser } from '../user/interfaces/user.interface';

@Injectable()
export class BarberService {
    constructor(
        @InjectModel('Barber') private readonly model: Model<Barber>,
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly awsService: AwsService) { }

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
                throw new HttpException("Não foi possível realizar o cadastro.", HttpStatus.BAD_REQUEST)
            } 
            return saveBarber
        }

        async findAll(): Promise<Barber[]> {        
            return await this.model.find();
        }

        async findById(id: string): Promise<Barber> {        
            return await this.model.findOne({ _id: id }); 
    }

    async savePortfolio(files: any, user: IUser) {
        if(files.length === 0)
            throw new HttpException("É necessário selecionar imagens.", HttpStatus.BAD_REQUEST)
        const { id } = user;
        let obj : any = await this.model.findOne({ userId : id}, 'portfolio').exec();
        let [ date, hour] = new Date().toLocaleString('pt-BR').split(",");
        date = date.replace(/\//g, "-")
        for(let file of files) {
            let fileName = file.originalname.split('.')[0]
            await this.awsService.upload(user.email, file, `${fileName}-${date}`).then((path) => obj.portfolio.push({ path: path, active: true}));
        }
        await this.model.findOneAndUpdate({ userId : id}, { portfolio : obj.portfolio }).exec()
        console.log(`Update barber's (${id}) portfolio.`)
    }

    async getImages(user : IUser) {
        const { id } = user;
        let obj : any = await this.model.findOne({ userId : id}, 'portfolio').exec()
        return obj.portfolio
    }

    async softDeleteImages() {
        
    }
}
