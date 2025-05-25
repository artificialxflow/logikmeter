import { NextRequest, NextResponse } from 'next/server';
import { Poll } from '../../../../models/Poll';
import dbConnect from '../../../../utils/dbConnect';

// GET /api/polls/[id] - Get poll results
export async function GET(req: NextRequest) {
  await dbConnect();
  // Extract id from the URL
  const url = new URL(req.url);
  // Assumes route is /api/polls/[id]
  const parts = url.pathname.split('/');
  const idIndex = parts.findIndex(part => part === 'polls') + 1;
  const id = parts[idIndex];
  const poll = await Poll.findById(id).populate('votes').lean();
  if (!poll) {
    return NextResponse.json({ error: 'Poll not found' }, { status: 404 });
  }
  return NextResponse.json(poll);
} 