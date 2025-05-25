import { NextRequest, NextResponse } from 'next/server';
import { Discussion } from '../../../../../models/Discussion';
import dbConnect from '../../../../../utils/dbConnect';

// POST /api/discussions/[id]/complete - Mark as completed
export async function POST(req: NextRequest, context: { params: { id: string } }) {
  await dbConnect();
  const { id } = context.params;
  const discussion = await Discussion.findByIdAndUpdate(
    id,
    { status: 'completed', rewardsDistributed: true },
    { new: true }
  );
  if (!discussion) {
    return NextResponse.json({ error: 'Discussion not found' }, { status: 404 });
  }
  return NextResponse.json(discussion);
} 