import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy'
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/user.schema'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AwsService } from '../shared/aws/aws.service'
import { BarberModule } from '../barber/barber.module';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRETKEY')
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    UserModule,
    forwardRef(() => BarberModule),
  ],
  providers: [AuthService, JwtStrategy, AwsService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
