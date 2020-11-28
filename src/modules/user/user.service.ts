import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';

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

  async findById(id: string): Promise<User> {
    return await this.model.findOne({ _id: Types.ObjectId(id), active: true },
      'id email name roles').exec()
  }

  async delete(id: string): Promise<any> {
    return await this.model.deleteOne({ _id: id}).exec()
  }
}