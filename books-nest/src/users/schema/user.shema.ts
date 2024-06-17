import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    username: string

    @Prop({ required: true })
    password: string

    @Prop({ required: true })
    email: string

    @Prop()
    age: number
}

export const UserSchema = SchemaFactory.createForClass(User)