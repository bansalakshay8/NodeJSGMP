import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    id: string;
}

const UserSchema: Schema = new Schema({
    id: { type: String, required: true }
});

export default mongoose.model<IUser>('User', UserSchema);