import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export type LogDocument = Log & Document;
@Schema({ timestamps: true })
export class Log {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  endpoint: string;

  @Prop({ required: true })
  method: string;

  @Prop({ type: MongooseSchema.Types.Mixed, required: true })
  requestBody: any;

  @Prop({ type: MongooseSchema.Types.Mixed, required: true })
  responseBody: any;

  @Prop({ required: true })
  statusCode: number;

  @Prop({ required: true })
  timestamp: Date;
}

export const LogSchema = SchemaFactory.createForClass(Log);
