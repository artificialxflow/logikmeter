import { NextRequest, NextResponse } from 'next/server';
import { Discussion } from '../../../../../models/Discussion';
import dbConnect from '../../../../../utils/dbConnect';

// POST /api/discussions/[id]/complete - Mark as completed
export async function POST(req: NextRequest) {
  await dbConnect();
  // Extract id from the URL
  const url = new URL(req.url);
  // Assumes route is /api/discussions/[id]/complete
  const parts = url.pathname.split('/');
  const idIndex = parts.findIndex(part => part === 'discussions') + 1;
  const id = parts[idIndex];
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