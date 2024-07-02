import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserLogs, UserSchema } from './entities/userLogs.entiyt';
import { UserLogService } from './service/userLogs.service';
import { UserController } from './controller/userLogs.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserLogs.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserLogService],
})
export class UserModule {}
