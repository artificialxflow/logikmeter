import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export type DiscussionStatus = 'pending' | 'active' | 'voting' | 'completed';

export interface IDiscussion extends Document {
  topicId: Types.ObjectId;
  creatorId: Types.ObjectId;
  participants: Types.ObjectId[];
  startTime: Date;
  endTime: Date;
  voteEndTime: Date;
  status: DiscussionStatus;
  rewardsDistributed: boolean;
  createdAt: Date;
}

const DiscussionSchema: Schema<IDiscussion> = new Schema({
  topicId: { type: Schema.Types.ObjectId, ref: 'Topic', required: true },
  creatorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  participants: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  voteEndTime: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'active', 'voting', 'completed'], required: true },
  rewardsDistributed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const Discussion: Model<IDiscussion> = mongoose.models.Discussion || mongoose.model<IDiscussion>('Discussion', DiscussionSchema); 