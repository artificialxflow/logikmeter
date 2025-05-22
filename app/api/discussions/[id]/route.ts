import { NextRequest, NextResponse } from 'next/server';
import { Discussion } from '../../../../models/Discussion';
import dbConnect from '../../../../utils/dbConnect';

// GET /api/discussions/[id] - Get discussion status
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = params;
  const discussion = await Discussion.findById(id).lean();
  if (!discussion) {
    return NextResponse.json({ error: 'Discussion not found' }, { status: 404 });
  }
  return NextResponse.json(discussion);
} 