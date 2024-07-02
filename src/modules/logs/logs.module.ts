import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Log, LogSchema } from './entities/logs.entity';
import { LogService } from './service/logs.service';
import { LogController } from './controller/logs.controller';
import { ApiKeyModule } from 'src/libs/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }]),
    ApiKeyModule,
  ],
  controllers: [LogController],
  providers: [LogService],
  exports: [LogService],
})
export class LogsModule {}
