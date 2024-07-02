import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { TecnologyDocument } from '../../../setup/technology/entity/tecnology.entity';
import { SubtechnologyDocument } from '../../../setup/subtechnology/entity/subTecnology.entity';
import { LangDocument } from '../../../setup/lang/entity/lang.entity';
import { LevelDocument } from '../../../setup/range/entity/levels.entity';

export type TipDocument = Tip & Document;

@Schema({ timestamps: true })
export class Tip {
  @Prop({ required: true, unique: true })
  id: number;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  body: string;

  @Prop()
  link: string;

  @Prop({ required: true })
  available: boolean;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Level' }] })
  level: LevelDocument[];

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Tecnology' }] })
  technology: TecnologyDocument[];

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Subtecnology' }],
  })
  subtechnology: SubtechnologyDocument[];

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Lang' }] })
  lang: LangDocument[];

  @Prop({ default: null })
  createdAt: Date | null;

  @Prop()
  createBy: string;

  @Prop({ default: null })
  updatedAt: Date | null;

  @Prop()
  updateBy: string;

  @Prop({ default: null })
  deletedAt: Date | null;

  @Prop()
  deleteBy: string;
}

export const TipSchema = SchemaFactory.createForClass(Tip);
