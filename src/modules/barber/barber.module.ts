import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { BarberSchema } from './barber.schema';
import { BarberService } from './barber.service';
import { BarberController } from './barber.controller';

@Module({
    imports: [
        AuthModule,
        MongooseModule.forFeature([{ name: 'Barber', schema: BarberSchema }]),
    ],
    providers: [BarberService],
    controllers: [BarberController],
})
export class BarberModule {}
