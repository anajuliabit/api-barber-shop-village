import { Body, Controller, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard} from '@nestjs/passport';
import { UserRoleInterceptor } from '../auth/interceptors/user-role.interceptor';
import { EUserRole } from '../user/enums/user-role.enum';
import { CreateScheduleDto } from './dtos/create-schedule.dto';
import { EScheduleStatus } from './enums/schedule-status.enum';
import { Schedule } from './models/schedule.model';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
@UseGuards(AuthGuard())
export class ScheduleController {

  constructor(private readonly scheduleService: ScheduleService) { }

  @Post('create')
  @UseInterceptors(new UserRoleInterceptor([EUserRole.CLIENT, EUserRole.ADMIN]))
  async createSchedule(@Body() createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    return await this.scheduleService.create(createScheduleDto);
  }

  @Put('change-status')
  async changeStatus(@Query('id') id: string, @Query('status') status: EScheduleStatus): Promise<Schedule> {
    return await this.scheduleService.changeStatus(id, status);
  }

  @Get('/barber/:id')
  @UseInterceptors(new UserRoleInterceptor([EUserRole.BARBER, EUserRole.ADMIN]))
  async findSchedulesByBarber(@Param('id') id: string): Promise<Schedule[]> {
    return await this.scheduleService.findSchedulesByBarber(id);
  }

  @Get('/client/:id')
  @UseInterceptors(new UserRoleInterceptor([EUserRole.CLIENT, EUserRole.ADMIN]))
  async findSchedulesByClient(@Param('id') id: string): Promise<Schedule[]> {
    return await this.scheduleService.findSchedulesByClient(id);
  }
}
