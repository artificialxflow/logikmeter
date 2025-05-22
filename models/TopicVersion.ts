import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface ITopicVersionContent {
  subject: string;
  summary: string;
  logicalPropositions: string[];
  logicalFormula: string;
  interpretation: string;
  conclusion: string;
  pollQuestion: string;
  pollOptions: string[];
}

export interface ITopicVersion extends Document {
  topicId: Types.ObjectId;
  versionNumber: number;
  content: ITopicVersionContent;
  createdAt: Date;
}

const TopicVersionSchema: Schema<ITopicVersion> = new Schema({
  topicId: { type: Schema.Types.ObjectId, ref: 'Topic', required: true },
  versionNumber: { type: Number, required: true },
  content: {
    subject: { type: String, required: true },
    summary: { type: String, required: true },
    logicalPropositions: [{ type: String, required: true }],
    logicalFormula: { type: String, required: true },
    interpretation: { type: String, required: true },
    conclusion: { type: String, required: true },
    pollQuestion: { type: String, required: true },
    pollOptions: [{ type: String, required: true }],
  },
  createdAt: { type: Date, default: Date.now },
});

export const TopicVersion: Model<ITopicVersion> = mongoose.models.TopicVersion || mongoose.model<ITopicVersion>('TopicVersion', TopicVersionSchema); 