import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;

  if (!['Questions', 'Wishes', 'Reviews'].includes(type)) {
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  }

  const modelName = `comments${type}` as keyof typeof prisma;

  try {
    const comments = await prisma[modelName].findMany({
      include: { user: { select: { name: true, image: true, } } },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { type: string } }) {
  const { type } = await params;
  const { id, message } = await req.json();

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const modelName = `comments${type}` as keyof typeof prisma;

  try {
    const comment = await prisma[modelName].findUnique({ where: { id } });

    if (!comment || comment.userId !== session.user.id) {
      return NextResponse.json({ error: "Comment not found or not authorized to edit" }, { status: 404 });
    }

    await prisma[modelName].update({ where: { id }, data: { content: message } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating comment:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { type: string } }) {
  const { type } = await params;
  const { userId, commentUserId, commentId } = await req.json();

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  if (session.user.role !== "admin") {
    if (userId !== commentUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
  }

  const validTypes = ["Questions", "Wishes", "Reviews"];
  if (!validTypes.includes(type)) {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  const modelName = `comments${type}` as keyof typeof prisma;

  try {
    const comment = await prisma[modelName].findUnique({ where: { id: commentId } });

    if (!comment || comment.userId !== commentUserId) {
      return NextResponse.json({ error: "Comment not found or not authorized to delete" }, { status: 404 });
    }

    await prisma[modelName].delete({ where: { id: commentId } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}