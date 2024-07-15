import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TecnologyDocument = Tecnology & Document;

@Schema({ timestamps: true })
export class Tecnology {
  @Prop({ required: true, unique: true })
  id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ type: [Number], ref: 'Subtechnology' })
  subtechnology: number[];

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

TecnologySchema.virtual('subtechnologies', {
  ref: 'Subtechnology',
  localField: 'subtechnology',
  foreignField: 'id',
  justOne: false,
});
