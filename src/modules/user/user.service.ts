import {  HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { EUserRole } from './enums/user-role.enum';
import { User } from './models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly model: Model<User>,
    ) { }

  async create(data: CreateUserDto): Promise<User> {
    const user = new this.model(data)
    return await user.save()
  }

  async edit(userId: string, data: CreateUserDto):Promise<User> {
    const user = await this.model.findOne({ _id: userId }).exec();
    if(!user) throw new HttpException('Usuário não encontrado não encontrado', HttpStatus.NOT_FOUND)
    try {
        await user.updateOne(data).exec()
        return await this.model.findOne({ _id: userId }).exec();
        } catch (err) {
        throw new HttpException('Não foi possível atualizar o usuário.', HttpStatus.INTERNAL_SERVER_ERROR)
        }
  }

  async findByEmail(email: string): Promise<User> {
    return await this.model.findOne({ email }).exec()
  }

  async findById(id: string): Promise<User> {
    return await this.model.findOne({ _id: Types.ObjectId(id), active: true },
      'id email name roles profilePicture').exec()
  }

  async findByIdAndRole(id: string, role: EUserRole): Promise<User> {
    return await this.model.findOne({ _id: Types.ObjectId(id), active: true, roles: [role]  },
      'id email name roles').exec()
  }

  async delete(id: string): Promise<any> {
    return await this.model.deleteOne({ _id: id}).exec()
  }
}