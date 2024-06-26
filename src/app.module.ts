import { Module } from '@nestjs/common';
import { TipsModule } from './tips/tips.module';
import { AuthModule } from './auth/auth.module';
import { LogsModule } from './logs/logs.module';
import { LogsService } from './logs/service/logs.service';
import { LogsController } from './logs/controller/logs.controller';
import { ConfigModule } from '@nestjs/config';
import { PersistenceModule } from './persistence/persistence.module';
import db_config from './persistence/db_config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [db_config],
      isGlobal: true,
    }),
    PersistenceModule,

    TipsModule,
    AuthModule,
    LogsModule,
  ],
  controllers: [LogsController],
  providers: [LogsService],
})
export class AppModule {}
