import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto';
import { User } from './models';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly model: Model<User>) { }

    async create(data: CreateUserDto): Promise<User> {
        const user = new this.model(data)
        return await user.save()
    }

    async findByEmail(email: string): Promise<User> {
        return await this.model.findOne({ email }).exec()
    }
}
