import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Login {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: string;
  @Prop({ required: true, max: 1000 })
  accessToken: string;
  @Prop({ required: true, max: 1000 })
  refreshToken: string;
  @Prop({ default: false })
  refreshTokenUsed: boolean;
}

export const LoginSchema = SchemaFactory.createForClass(Login);
