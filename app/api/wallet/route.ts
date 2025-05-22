import { NextRequest, NextResponse } from 'next/server';
import { User } from '../../../models/User';
import dbConnect from '../../../utils/dbConnect';

// GET /api/wallet?userId=... - Get user balance
export async function GET(req: NextRequest) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  }
  const user = await User.findById(userId).lean();
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  return NextResponse.json({ walletAddress: user.walletAddress, balance: user.balance });
} 