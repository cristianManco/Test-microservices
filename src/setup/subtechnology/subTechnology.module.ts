import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Subtechnology,
  SubtechnologySchema,
} from './entity/subTecnology.entity';
import { SubtechnologyController } from './controller/subtechnology.controller';
import { SubtechnologyService } from './service/subtechnology.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subtechnology.name, schema: SubtechnologySchema },
    ]),
  ],
  controllers: [SubtechnologyController],
  providers: [SubtechnologyService],
  exports: [SubtechnologyService],
})
export class SubtechnologyModule {}
