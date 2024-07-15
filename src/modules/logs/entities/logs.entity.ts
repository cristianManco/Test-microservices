import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type LogDocument = Log & Document;

@Schema({ timestamps: true })
export class Log {
  @Prop({ required: true })
  ip: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  endpoint: string;

  @Prop({ required: true })
  system_name: string;

  @Prop({ required: true })
  method: string;

  @Prop({ type: MongooseSchema.Types.Mixed, required: true })
  requestBody: any;

  @Prop({ type: MongooseSchema.Types.Mixed, required: true })
  responseBody: any;

  @Prop({ required: true })
  statusCode: number;

  @Prop()
  userAgent?: string;

  @Prop()
  duration?: number;

  // @Prop({ default: null })
  // timestamp: Date;

  @Prop({ default: null })
  createdAt: Date;

  @Prop({ default: null })
  updatedAt: Date;

  @Prop({ default: null })
  deletedAt: Date;
}

export const LogSchema = SchemaFactory.createForClass(Log);
