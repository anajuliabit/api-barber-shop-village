import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleService } from './schedule.service';
import { ScheduleSchema } from './schedule.schema'
import { ScheduleController } from './schedule.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Schedule', schema: ScheduleSchema }]),
    ],
  providers: [ScheduleService],
  exports: [ScheduleService],
  controllers: [ScheduleController]
})
export class ScheduleModule {}
