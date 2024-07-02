import { Module } from '@nestjs/common';
import { TipsModule } from './modules/tips/tips.module';
import { LogsModule } from './modules/logs/logs.module';
import { ConfigModule } from '@nestjs/config';
import { PersistenceModule } from './libs/persistence/persistence.module';
import db_config from './libs/persistence/db_config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './libs/auth/guard/auth.guard';
import { ApiKeyModule } from './libs/auth/auth.module';
import { LangModule } from './setup/lang/lang.module';
import { TechnologyModule } from './setup/technology/technology.module';
import { SubtechnologyModule } from './setup/subtechnology/subTechnology.module';
import { LevelModule } from './setup/range/level.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [db_config],
      isGlobal: true,
    }),
    TipsModule,
    ApiKeyModule,
    LogsModule,
    LangModule,
    TechnologyModule,
    SubtechnologyModule,
    LevelModule,
    PersistenceModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
