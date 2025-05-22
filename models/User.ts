import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  googleId?: string;
  walletAddress: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  googleId: { type: String },
  walletAddress: { type: String, required: true, unique: true },
  balance: { type: Number, default: 5 },
}, { timestamps: true });

export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema); 