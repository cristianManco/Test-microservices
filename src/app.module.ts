import { Module } from '@nestjs/common';
import { TipsModule } from './tips/tips.module';
import { AuthModule } from './auth/auth.module';
import { LogsModule } from './logs/logs.module';
import { LogsService } from './logs/service/logs.service';
import { LogsController } from './logs/entities/controller/logs.controller';
import { LogsModule } from './logs/logs.module';


@Module({
  imports: [TipsModule, AuthModule, LogsModule],
  controllers: [LogsController],
  providers: [LogsService],
})
export class AppModule {}
