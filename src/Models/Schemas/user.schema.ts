import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, max: 100 })
  firstName: string;
  @Prop({ required: true, max: 100 })
  lastName: string;
  @Prop({ required: true, max: 100 })
  username: string;
  @Prop({ required: true, max: 20 })
  phoneNumber: string;
  @Prop({ required: true, max: 100 })
  email: string;
  @Prop({ required: true, max: 200 })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
