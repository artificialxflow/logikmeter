import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IVote extends Document {
  pollId: Types.ObjectId;
  userId: Types.ObjectId;
  option: string;
  createdAt: Date;
}

const VoteSchema: Schema<IVote> = new Schema({
  pollId: { type: Schema.Types.ObjectId, ref: 'Poll', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  option: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Vote: Model<IVote> = mongoose.models.Vote || mongoose.model<IVote>('Vote', VoteSchema); 