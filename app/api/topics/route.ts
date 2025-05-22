import { NextRequest, NextResponse } from 'next/server';
import { Topic } from '../../../models/Topic';
import dbConnect from '../../../utils/dbConnect';

// GET /api/topics - List all topics
export async function GET() {
  await dbConnect();
  const topics = await Topic.find().populate('authorId', 'username').lean();
  return NextResponse.json(topics);
}

// POST /api/topics - Create new topic
export async function POST(req: NextRequest) {
  await dbConnect();
  const { title, description, authorId } = await req.json();
  if (!title || !description || !authorId) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  const topic = await Topic.create({ title, description, authorId, versions: [] });
  return NextResponse.json(topic, { status: 201 });
} 