import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { BarberSchema } from './barber.schema';
import { BarberService } from './barber.service';
import { UserModule } from '../user/user.module';

@Module({
    imports: [
        AuthModule,
        MongooseModule.forFeature([{ name: 'User', schema: BarberSchema }]),
    ],
    providers: [BarberService],
})
export class BarberModule {}
