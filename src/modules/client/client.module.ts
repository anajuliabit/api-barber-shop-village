import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../auth/auth.module';
import { ClientController } from './client.controller';

const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });

@Module({
  imports: [AuthModule, passportModule],
  controllers: [ClientController]
})
export class ClientModule {}
