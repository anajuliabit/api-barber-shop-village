import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleService } from './schedule.service';
import { ScheduleSchema } from './schedule.schema'
import { ScheduleController } from './schedule.controller';
import { PassportModule } from '@nestjs/passport';

const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Schedule', schema: ScheduleSchema }]),
        passportModule
    ],
    providers: [ScheduleService],
    exports: [ScheduleService],
    controllers: [ScheduleController]
})
export class ScheduleModule {}
