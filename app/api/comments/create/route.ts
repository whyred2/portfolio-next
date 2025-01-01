import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session;
    const body = await req.json();
    const type = body.type;
    
    let modelName = "";
    if (type === "Questions") {
      modelName = "commentsQuestions";
    } else if (type === "Wishes") {
      modelName = "commentsWishes";
    } else if (type === "Reviews") {
      modelName = "commentsReviews";
    }

    const message = await prisma[modelName].create({
        data: {
          userId: user.id,
          content: body.message,
        },
        include: { user: true }
    });

    return new Response(JSON.stringify(message), { status: 201 })
  } catch (error) {
    console.error("Error:", error);
    return new Response(null, { status: 500 })
  }
}