import mongoose, { Schema, model, models } from 'mongoose';
import { NextResponse } from 'next/server';

const MONGODB_URI = process.env.MONGODB_URI as string;

const TodoSchema = new Schema({
  text: { type: String, required: true },
  done: { type: Boolean, default: false },
});

const Todo = models.Todo || model('Todo', TodoSchema);

async function dbConnect() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(MONGODB_URI);
  }
}

export async function GET() {
  await dbConnect();
  const todos = await Todo.find().lean();
  return NextResponse.json(todos);
}

export async function POST(req: Request) {
  await dbConnect();
  const { text } = await req.json();
  if (!text) {
    return NextResponse.json({ error: 'Text is required' }, { status: 400 });
  }
  const todo = await Todo.create({ text });
  return NextResponse.json(todo);
} 