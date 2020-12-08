import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BarberSchema } from './barber.schema';
import { BarberService } from './barber.service';
import { BarberController } from './barber.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AwsService } from '../shared/aws/aws.service';
import { AuthModule } from '../auth/auth.module';

const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });

@Module({
    imports: [
        forwardRef(() => AuthModule),
        UserModule,
        passportModule,
        MongooseModule.forFeature([{ name: 'Barber', schema: BarberSchema }]),
    ],
    providers: [BarberService, AwsService],
    controllers: [BarberController],
    exports: [BarberService]
})
export class BarberModule {}
