import { db } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { email, username, password } = data;
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return NextResponse.json(
        {
          data: null,
          error: "User already exists",
        },
        { status: 409 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: returnedPassword, ...others } = newUser;
    return NextResponse.json(
      {
        data: others,
        message: "User Created Successfully",
        error: null,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
  }
}
