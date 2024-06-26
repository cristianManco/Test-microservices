import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { subtechnologyDocument } from './subTecnology.entity';

export type TecnologyDocument = Tecnology & Document;

@Schema({ timestamps: true })
export class Tecnology {
  @Prop({ required: true, unique: true })
  id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  subtecnology: subtechnologyDocument[];
}

export const TecnologySchema = SchemaFactory.createForClass(Tecnology);
