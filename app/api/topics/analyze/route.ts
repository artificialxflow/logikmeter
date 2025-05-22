import { NextRequest, NextResponse } from 'next/server';

// POST /api/topics/analyze - Send to n8n AI processing
export async function POST(req: NextRequest) {
  const { topicDescription } = await req.json();
  if (!topicDescription) {
    return NextResponse.json({ error: 'Missing topicDescription' }, { status: 400 });
  }

  // Simulate AI processing (replace with real n8n call later)
  const analysis = {
    subject: 'Sample Subject',
    summary: 'Sample summary of the topic.',
    logicalPropositions: ['A', 'B', 'C'],
    logicalFormula: 'A & B -> C',
    interpretation: 'If A and B, then C.',
    conclusion: 'C is likely true.',
    pollQuestion: 'Do you agree with the conclusion?',
    pollOptions: ['Yes', 'No', 'Not Sure'],
  };

  return NextResponse.json({ analysis, processingTime: 1 });
} 