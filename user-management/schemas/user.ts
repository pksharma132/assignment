import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  surname: string;

  @Prop()
  username: string;

  @Prop(Date)
  birthdate: Date;

  @Prop([String])
  blocked: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
