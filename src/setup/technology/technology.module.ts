import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tecnology, TecnologySchema } from './entity/tecnology.entity';
import { TechnologyController } from './controller/technology.controller';
import { TechnologyService } from './service/technology.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tecnology.name, schema: TecnologySchema },
    ]),
  ],
  controllers: [TechnologyController],
  providers: [TechnologyService],
  exports: [TechnologyService],
})
export class TechnologyModule {}
