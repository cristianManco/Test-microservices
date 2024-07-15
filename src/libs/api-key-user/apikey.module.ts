import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ApiKeySubscription,
  ApiKeySubscriptionSchema,
} from './entities/apikey.entity';
import { ApiKeySubscriptionController } from './controller/apikey.controller';
import { ApiKeySubscriptionService } from './service/apikey.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ApiKeySubscription.name, schema: ApiKeySubscriptionSchema },
    ]),
  ],
  controllers: [ApiKeySubscriptionController],
  providers: [ApiKeySubscriptionService],
})
export class ApiKeySubscriptionModule {}
