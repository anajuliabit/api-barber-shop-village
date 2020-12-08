import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { EUserRole } from '../user/enums/user-role.enum';
import { UserService } from '../user/user.service';
import { CreateBarberDto } from './dto/create-barber.dto';
import { Barber, BarberModel } from './models/barber.model';
import { AwsService } from '../shared/aws/aws.service';
import { User } from '../user/models/user.model';
import { DeleteImagesDto } from './dto/delete-images.dto';

@Injectable()
export class BarberService {
    constructor(
        @InjectModel('Barber') private readonly model: Model<Barber>,
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly awsService: AwsService) { }

    async create(file: Record<string, unknown>, data: CreateBarberDto): Promise<BarberModel> {
        const { name, email, password, passwordConfirmation } = data
        const createUserDto: CreateUserDto = {
            name, email, password, passwordConfirmation, roles: [EUserRole.BARBER]
        }
        const { cutPrice, haircutType, workTime, description } = data
        const user = await this.authService.registerUser({file, data: createUserDto})
        const barber = new this.model({ userId: user.id, cutPrice,  haircutType, workTime, description  })
        const saveBarber = await barber.save()
        saveBarber.name = user.name
        saveBarber.email = user.email
        if(!saveBarber) {
            await this.userService.delete(user.id);
            throw new HttpException("Não foi possível realizar o cadastro.", HttpStatus.BAD_REQUEST)
        }
        return saveBarber
    }

    async edit(userId: string, data: CreateBarberDto): Promise<Barber> {
        if(data.email || data.name || data.password ) {
            await this.authService.editUser(userId, data)
        }
        const barber = await this.model.findOne({ userId }).exec();
        if(!barber) throw new HttpException('Barbeiro não encontrado', HttpStatus.NOT_FOUND)
        try {
            await barber.updateOne(data).exec()
            return await this.findByUserId(userId);
            } catch (err) {
            throw new HttpException('Não foi possível atualizar o barbeiro.', HttpStatus.INTERNAL_SERVER_ERROR)
            }
    }

    async findAll(): Promise<BarberModel[]> {
        return await this.model.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            {
                $unwind: '$user'
            },
            {
                $addFields: {
                    'profilePicture': '$user.profilePicture',
                    name: '$user.name',
                    email: '$user.email'
                },
            },
            { $unset: [ 'user'] },
        ])
    }

    async findById(id: string): Promise<BarberModel> {        
        const barbers = await this.model.aggregate([
            { 
                $match: { '_id': Types.ObjectId(id)  }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            {
                $unwind: '$user'
            },
            {
                $addFields: {
                    'profilePicture': '$user.profilePicture',
                    name: '$user.name',
                    email: '$user.email'
                },
            },
            { $unset: [ 'user'] },
        ])
        return barbers[0]
    }

    async findByUserId(id: string): Promise<BarberModel> {
        const barber = await this.model.aggregate([
            {
                $match: { 'userId': id }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            {
                $unwind: '$user'
            },
            {
                $addFields: {
                    'profilePicture': '$user.profilePicture',
                    name: '$user.name',
                    email: '$user.email'
                },
            },
            { $unset: [ 'user'] },
        ])
        return barber[0]
    }

    async savePortfolio(files: any, user: User): Promise<void> {
        if(files.length === 0)
            throw new HttpException("É necessário selecionar imagens.", HttpStatus.BAD_REQUEST)
        const { id } = user;
        const obj : any = await this.model.findOne({ userId : id}, 'portfolio').exec();
        let [ date, hour] = new Date().toLocaleString('pt-BR').split(",");
        date = date.replace(/\//g, "-")
        for(const file of files) {
            const fileName = file.originalname.split('.')[0]
            await this.awsService.upload(user.email, file, `${fileName}-${date}`).then((path) => obj.portfolio.push({ path: path, active: true}));
        }
        await this.model.findOneAndUpdate({ userId : id}, { portfolio : obj.portfolio }).exec()
        console.log(`Update barber's (${id}) portfolio.`)
    }

    async getImages(user : User) {
        const { id } = user;
        const obj : any = await this.model.findOne({ userId : id}, 'portfolio').exec()
        return obj.portfolio
    }

    async softDeleteImages(paths: DeleteImagesDto, user: User) {
        const { id } = user;
        const obj : any = await this.model.findOne({ userId : id}, 'portfolio').exec()
        obj.portfolio.forEach((obj) => {
            if(paths.imagePaths.includes(obj.path))
                obj.active = false;
        });
        await this.model.findOneAndUpdate({ userId : id}, { portfolio : obj.portfolio }).exec()
        return obj.portfolio
    }
}
