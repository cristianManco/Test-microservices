import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { TecnologyDocument } from 'src/setup/technology/entity/tecnology.entity';

export type SubtechnologyDocument = Subtechnology & Document;

@Schema({ timestamps: true })
export class Subtechnology {
  @Prop({ required: true, unique: true })
  id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Tecnology' }] })
  technology: TecnologyDocument[];

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

export const SubtechnologySchema = SchemaFactory.createForClass(Subtechnology);
