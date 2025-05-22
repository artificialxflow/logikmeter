import { NextRequest, NextResponse } from 'next/server';
import { Poll } from '../../../../models/Poll';
import dbConnect from '../../../../utils/dbConnect';

// GET /api/polls/[id] - Get poll results
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = params;
  const poll = await Poll.findById(id).populate('votes').lean();
  if (!poll) {
    return NextResponse.json({ error: 'Poll not found' }, { status: 404 });
  }
  return NextResponse.json(poll);
} 