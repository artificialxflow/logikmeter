import { NextRequest, NextResponse } from 'next/server';
import { Topic } from '../../../../../models/Topic';
import { TopicVersion } from '../../../../../models/TopicVersion';
import dbConnect from '../../../../../utils/dbConnect';

// POST /api/topics/[id]/versions - Create new topic version
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id: topicId } = params;
  const { versionNumber, content } = await req.json();
  if (!versionNumber || !content) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  // Check topic exists
  const topic = await Topic.findById(topicId);
  if (!topic) {
    return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
  }
  // Create new version
  const newVersion = await TopicVersion.create({ topicId, versionNumber, content });
  // Add to topic's versions array
  topic.versions.push(newVersion._id);
  await topic.save();
  return NextResponse.json(newVersion, { status: 201 });
} 