import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ClientController } from './client.controller';

@Module({
  imports: [AuthModule],
  controllers: [ClientController]
})
export class ClientModule {}
