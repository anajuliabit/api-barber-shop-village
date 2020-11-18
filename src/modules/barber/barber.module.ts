import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from '../auth/auth.service';
import { BarberSchema } from './barber.schema';
import { BarberService } from './barber.service';

@Module({
    imports: [
        AuthService,
        MongooseModule.forFeature([{ name: 'User', schema: BarberSchema }]),
    ],
    providers: [BarberService]
})
export class BarberModule {}
