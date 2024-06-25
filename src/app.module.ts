import { Module } from '@nestjs/common';
import { TipsModule } from './tips/tips.module';
import { AuthModule } from './auth/auth.module';
import { LogsModule } from './logs/logs.module';


@Module({
  imports: [TipsModule, AuthModule, LogsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
