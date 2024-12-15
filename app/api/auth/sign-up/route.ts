import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import prisma from '@/lib/prisma';
import { getSignUpSchema } from "@/lib/validations/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const schema = getSignUpSchema(() => "");
    const userData = schema.parse(body);

    const existingUser = await prisma.user.findUnique({ where: { email: userData.email } });
    
    if (existingUser) {
      return NextResponse.json(
        { message: "A user with this email already exists." },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(userData.password, 10);
    console.log("Hashed password:", hashedPassword);

    await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "User created" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Something went wrong." },
      { status: 500 }
    );
  }
}
