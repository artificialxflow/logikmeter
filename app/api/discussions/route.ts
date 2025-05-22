import { NextRequest, NextResponse } from 'next/server';
import { Discussion } from '../../../models/Discussion';
import dbConnect from '../../../utils/dbConnect';

// POST /api/discussions - Start new discussion
export async function POST(req: NextRequest) {
  await dbConnect();
  const { topicId, creatorId, participants } = await req.json();
  if (!topicId || !creatorId || !participants || !Array.isArray(participants) || participants.length === 0 || participants.length > 2) {
    return NextResponse.json({ error: 'Invalid input: topicId, creatorId, and 1-2 participants required' }, { status: 400 });
  }
  const now = new Date();
  const startTime = now;
  const endTime = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour
  const voteEndTime = new Date(endTime.getTime() + 15 * 60 * 1000); // 15 minutes after end
  const discussion = await Discussion.create({
    topicId,
    creatorId,
    participants,
    startTime,
    endTime,
    voteEndTime,
    status: 'active',
    rewardsDistributed: false,
    createdAt: now,
  });
  return NextResponse.json(discussion, { status: 201 });
} 