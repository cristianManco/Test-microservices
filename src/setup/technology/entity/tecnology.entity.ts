import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SubtechnologyDocument } from 'src/setup/subtechnology/entity/subTecnology.entity';

export type TecnologyDocument = Tecnology & Document;

@Schema({ timestamps: true })
export class Tecnology {
  @Prop({ required: true, unique: true })
  id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  subtecnology: SubtechnologyDocument[];

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

export const TecnologySchema = SchemaFactory.createForClass(Tecnology);
