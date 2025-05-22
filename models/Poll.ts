import mongoose, { Schema, Document, Model, Types } from 'mongoose';
import { IVote } from './Vote';

export interface IPoll extends Document {
  topicId: Types.ObjectId;
  currentVersionId: Types.ObjectId;
  votes: Types.DocumentArray<IVote>;
  createdAt: Date;
  updatedAt: Date;
}

const PollSchema: Schema<IPoll> = new Schema({
  topicId: { type: Schema.Types.ObjectId, ref: 'Topic', required: true },
  currentVersionId: { type: Schema.Types.ObjectId, ref: 'TopicVersion', required: true },
  votes: [{ type: Schema.Types.ObjectId, ref: 'Vote' }],
}, { timestamps: true });

export const Poll: Model<IPoll> = mongoose.models.Poll || mongoose.model<IPoll>('Poll', PollSchema); 