import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Lang, LangSchema } from './entity/lang.entity';
import { LangController } from './controller/lang.controller';
import { LangService } from './service/lang.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Lang.name, schema: LangSchema }]),
  ],
  controllers: [LangController],
  providers: [LangService],
  exports: [LangService],
})
export class LangModule {}
