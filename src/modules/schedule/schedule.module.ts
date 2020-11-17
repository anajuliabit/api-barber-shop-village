import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';

@Module({
  providers: [ScheduleService]
})
export class ScheduleModule {}
