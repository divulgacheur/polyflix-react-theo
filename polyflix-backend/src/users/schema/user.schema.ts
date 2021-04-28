import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HookNextFunction } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema()
export class User {

  _id: string;

  @Prop()
  fullName: string;


  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next: HookNextFunction) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    // tslint:disable-next-line:no-string-literal
    const hashed = await bcrypt.hash(this['password'], 10);
    // tslint:disable-next-line:no-string-literal
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});