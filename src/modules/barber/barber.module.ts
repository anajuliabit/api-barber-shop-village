import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { BarberSchema } from './barber.schema';
import { BarberService } from './barber.service';
import { BarberController } from './barber.controller';
import { UserModule } from '../user/user.module';
import { AwsService } from '../shared/aws/aws.service';

@Module({
    imports: [
        AuthModule,
        UserModule,
        MongooseModule.forFeature([{ name: 'Barber', schema: BarberSchema }]),
    ],
    providers: [BarberService, AwsService],
    controllers: [BarberController],
    exports: [BarberService]
})
export class BarberModule {}
