import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TipDocument = Tip & Document;

@Schema({ timestamps: true })
export class Tip {
  @Prop({ required: true, unique: true })
  id: number;

  @Prop()
  img_url: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  body: string;

  @Prop()
  link: string;

  @Prop({ required: true })
  available: boolean;

  @Prop({ type: [Number] })
  level: number[];

  @Prop({ type: [Number] })
  technology: number[];

  @Prop({ type: [Number] })
  subtechnology: number[];

  @Prop({ type: [Number] })
  lang: number[];

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

TipSchema.virtual('levels', {
  ref: 'Level',
  localField: 'level',
  foreignField: 'id',
  justOne: false,
});

TipSchema.virtual('technologies', {
  ref: 'Technology',
  localField: 'technology',
  foreignField: 'id',
  justOne: false,
});

TipSchema.virtual('subtechnologies', {
  ref: 'Subtechnology',
  localField: 'subtechnology',
  foreignField: 'id',
  justOne: false,
});

TipSchema.virtual('langs', {
  ref: 'Lang',
  localField: 'lang',
  foreignField: 'id',
  justOne: false,
});
