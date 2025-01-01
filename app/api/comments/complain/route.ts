import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const { commentId, type, reason } = await req.json();
  const session = await getServerSession(authOptions);

  if (!commentId || !reason?.trim()) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const comment = await prisma[`comments${type}`]?.findUnique({
    where: { id: commentId }
  });
  if (!comment) {
    return NextResponse.json({ error: "Comment not found" }, { status: 404 });
  }

  try {
    await prisma.complains.create({
      data: {
        userId: session?.user.id ? Number(session.user.id) : null,
        commentId,
        type,
        reason
      }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending complaint:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}