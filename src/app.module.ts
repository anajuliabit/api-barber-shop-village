import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
// import { ClientModule } from './modules/client/client.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { BarberModule } from './modules/barber/barber.module';


@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGODB),
        AuthModule,
        UserModule,
        ScheduleModule,
        BarberModule
        ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
