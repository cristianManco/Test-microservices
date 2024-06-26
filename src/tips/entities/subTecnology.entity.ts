import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TecnologyDocument } from './tecnology.entity';

export type subtechnologyDocument = subtechnology & Document;

@Schema({ timestamps: true })
export class subtechnology {
  @Prop({ required: true, unique: true })
  id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  tecnology: TecnologyDocument[];
}

export const TecnologySchema = SchemaFactory.createForClass(subtechnology);
