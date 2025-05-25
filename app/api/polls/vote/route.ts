import { NextRequest, NextResponse } from 'next/server';
import { Poll } from '../../../../models/Poll';
import { Vote } from '../../../../models/Vote';
import dbConnect from '../../../../utils/dbConnect';
import mongoose from 'mongoose';

// POST /api/polls/vote - Submit a vote
export async function POST(req: NextRequest) {
  await dbConnect();
  const { pollId, userId, option } = await req.json();
  if (!pollId || !userId || !option) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  // Check poll exists
  const poll = await Poll.findById(pollId);
  if (!poll) {
    return NextResponse.json({ error: 'Poll not found' }, { status: 404 });
  }
  // Create vote
  const vote = await Vote.create({ pollId: new mongoose.Types.ObjectId(pollId), userId: new mongoose.Types.ObjectId(userId), option });
  poll.votes.push(vote._id as any); // _id is ObjectId, which matches the schema
  await poll.save();
  return NextResponse.json(vote, { status: 201 });
} 