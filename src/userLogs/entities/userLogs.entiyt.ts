import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = UserLogs & Document;

@Schema({ timestamps: true })
export class UserLogs {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  apiKey: string;

  @Prop({ default: 0 })
  requestCount: number;

  @Prop({ default: false })
  isBlocked: boolean;

  @Prop({ default: null })
  blockedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserLogs);
