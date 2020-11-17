import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleService } from './schedule.service';
import { ScheduleSchema } from './schedule.schema'
@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Schedule', schema: ScheduleSchema }]),
    ],
  providers: [ScheduleService],
  exports: [ScheduleService]
})
export class ScheduleModule {}
