import { NextRequest, NextResponse } from 'next/server';
import { User } from '../../../../models/User';
import dbConnect from '../../../../utils/dbConnect';

// POST /api/wallet/transfer - Transfer LMC
export async function POST(req: NextRequest) {
  await dbConnect();
  const { senderId, receiverId, amount } = await req.json();
  if (!senderId || !receiverId || typeof amount !== 'number' || amount <= 0) {
    return NextResponse.json({ error: 'Invalid input: senderId, receiverId, and positive amount required' }, { status: 400 });
  }
  if (senderId === receiverId) {
    return NextResponse.json({ error: 'Sender and receiver cannot be the same' }, { status: 400 });
  }
  const sender = await User.findById(senderId);
  const receiver = await User.findById(receiverId);
  if (!sender || !receiver) {
    return NextResponse.json({ error: 'Sender or receiver not found' }, { status: 404 });
  }
  const fee = 0.1;
  const total = amount + fee;
  if (sender.balance < total) {
    return NextResponse.json({ error: 'Insufficient balance' }, { status: 400 });
  }
  sender.balance -= total;
  receiver.balance += amount;
  await sender.save();
  await receiver.save();
  return NextResponse.json({ from: senderId, to: receiverId, amount, fee, senderBalance: sender.balance, receiverBalance: receiver.balance });
} 