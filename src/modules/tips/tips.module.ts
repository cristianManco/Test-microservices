import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TipsController } from './controller/tips.controller';
import { TipsService } from './service/tips.service';
import { Level, LevelSchema } from '../../setup/range/entity/levels.entity';
import { Lang, LangSchema } from '../../setup/lang/entity/lang.entity';
import {
  Subtechnology,
  SubtechnologySchema,
} from '../../setup/subtechnology/entity/subTecnology.entity';
import {
  Tecnology,
  TecnologySchema,
} from '../../setup/technology/entity/tecnology.entity';
import { Tip, TipSchema } from './entities/tips.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tip.name, schema: TipSchema },
      { name: Tecnology.name, schema: TecnologySchema },
      { name: Subtechnology.name, schema: SubtechnologySchema },
      { name: Lang.name, schema: LangSchema },
      { name: Level.name, schema: LevelSchema },
    ]),
  ],
  controllers: [TipsController],
  providers: [TipsService],
  exports: [TipsService],
})
export class TipsModule {}
