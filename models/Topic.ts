import mongoose, { Schema, Document, Model, Types } from 'mongoose';
import { ITopicVersion } from './TopicVersion';

export interface ITopic extends Document {
  title: string;
  description: string;
  authorId: Types.ObjectId;
  versions: Types.DocumentArray<ITopicVersion>;
  createdAt: Date;
  updatedAt: Date;
}

const TopicSchema: Schema<ITopic> = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  versions: [{ type: Schema.Types.ObjectId, ref: 'TopicVersion' }],
}, { timestamps: true });

export const Topic: Model<ITopic> = mongoose.models.Topic || mongoose.model<ITopic>('Topic', TopicSchema); 