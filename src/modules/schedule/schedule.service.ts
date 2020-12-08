import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BarberService } from '../barber/barber.service';
import { EUserRole } from '../user/enums/user-role.enum';
import { UserService } from '../user/user.service';
import { CreateScheduleDto } from './dtos/create-schedule.dto';
import { EScheduleStatus } from './enums/schedule-status.enum';
import { Schedule } from './models/schedule.model';
import { FeedbackDto } from './dtos/feedback.dto';
import { User } from '../user/models/user.model';

@Injectable()
export class ScheduleService {

    constructor(
        @InjectModel('Schedule') private readonly model: Model<Schedule>,
        private readonly barberService: BarberService,
        private readonly userService: UserService
        ) { }

    async create(data: CreateScheduleDto): Promise<Schedule> {
        const barber = await this.barberService.findById(data.barberId);
        if(!barber) throw new HttpException('Barbeiro não encontrado', HttpStatus.NOT_FOUND)
        const client = await this.userService.findByIdAndRole(data.clientId, EUserRole.CLIENT);
        if(!client) throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND) 
        const day = barber.workTime?.find(wt => (wt.day.toISOString().split('T')[0] === new Date(data.date).toISOString().split('T')[0]))
        if(!day.hours?.map(hour => hour.toISOString()).includes(new Date(data.date).toISOString())) throw new HttpException('Horário não disponível para este barbeiro.', HttpStatus.BAD_REQUEST)
        const scheduleExists = await this.scheduleExists(data.barberId, data.date)
        if(scheduleExists.length > 0) throw new HttpException('Barbeiro já possui um agendamento neste horario.', HttpStatus.BAD_REQUEST)
        const schedule = new this.model({...data, status: EScheduleStatus.PENDING})
        return await schedule.save()  
    }

    async changeStatus(id: string, status: EScheduleStatus): Promise<Schedule> {
        const schedule = await this.model.findOne({ _id: Types.ObjectId(id) })
        if(!schedule) throw new HttpException('Agendamento inexistente', HttpStatus.NOT_FOUND)
        schedule.status = status
        return await schedule.save()
    }
    
    async findSchedulesByBarber(barberId: string): Promise<Schedule[]> {
        return await this.model.find({ barberId })
    }

    async findSchedulesByClient(clientId: string): Promise<Schedule[]> {
        return await this.model.find({ clientId })
    }

    private async scheduleExists(barberId: string, date: Date): Promise<Schedule[]> {
        return await this.model.find({ barberId, date, status: { $in: [EScheduleStatus.PENDING, EScheduleStatus.SCHEDULED] }})
    }

    async saveFeedback(data: FeedbackDto, user: User) {
        const schedule = await this.model.findOne({ _id: data.id, clientId: user.id})
        if(!schedule) throw new HttpException('Agendamento inexistente', HttpStatus.NOT_FOUND)
        if(schedule.status != "FINISHED") throw new HttpException('O agendamento ainda não foi finalizado', HttpStatus.BAD_REQUEST)
        return await this.model.findOneAndUpdate({ _id: data.id, clientId: user.id}, { feedback : { value: data.value, description: data.description }})
    }
}
