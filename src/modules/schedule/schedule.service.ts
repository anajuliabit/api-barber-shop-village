import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateScheduleDto } from './dtos';
import { Schedule } from './models/schedule.model';

@Injectable()
export class ScheduleService {

    constructor(
        @InjectModel('Schedule') private readonly model: Model<Schedule>) { }

    async create(data: CreateScheduleDto): Promise<Schedule> {
        const schedule = new this.model(data)
        return await schedule.save()  
    }

    async finish(_id: string): Promise<Schedule> {
        const schedule = await this.model.findOne({ _id })
        if(!schedule) throw new HttpException('Agendamento inexistente', HttpStatus.NOT_FOUND)
        schedule.finished = true
        return await schedule.save()
    }
}
