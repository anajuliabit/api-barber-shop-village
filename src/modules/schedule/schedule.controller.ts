import { Body, Controller, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard} from '@nestjs/passport';
import { CreateScheduleDto } from './dtos/create-schedule.dto';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
export class ScheduleController {

  constructor(private readonly scheduleService: ScheduleService) { }

  @Post('create')
  @UseGuards(AuthGuard())
  async registerSchedule(@Body() createScheduleDto: CreateScheduleDto): Promise<any> {

  }
}
