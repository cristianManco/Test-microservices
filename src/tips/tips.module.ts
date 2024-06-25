import { Module } from '@nestjs/common';
import { TipsService } from './service/tips.service';
import { TipsController } from './controller/tips.controller';

@Module({
  providers: [TipsService],
  controllers: [TipsController]
})
export class TipsModule {}
