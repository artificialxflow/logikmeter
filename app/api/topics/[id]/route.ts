import { NextRequest, NextResponse } from 'next/server';
import { Topic } from '../../../../models/Topic';
import dbConnect from '../../../../utils/dbConnect';

// GET /api/topics/[id] - Get topic details
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = params;
  const topic = await Topic.findById(id).populate('authorId', 'username').populate('versions').lean();
  if (!topic) {
    return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
  }
  return NextResponse.json(topic);
}

// PUT /api/topics/[id] - Update topic
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = params;
  const { title, description } = await req.json();
  const topic = await Topic.findByIdAndUpdate(id, { title, description }, { new: true });
  if (!topic) {
    return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
  }
  return NextResponse.json(topic);
}

// DELETE /api/topics/[id] - Delete topic
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = params;
  const topic = await Topic.findByIdAndDelete(id);
  if (!topic) {
    return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
  }
  return NextResponse.json({ message: 'Topic deleted' });
} 