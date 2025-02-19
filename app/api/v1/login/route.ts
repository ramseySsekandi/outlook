import { db } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { createSession } from "@/lib/session";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { email, password } = data;
    // Identify user by email
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });
    // If User doesn't exist return an error
    if (!existingUser) {
      return NextResponse.json(
        {
          error: "Wrong Credentials",
        },
        { status: 403 }
      );
    }

    // Verify correct password
    const isCorrectPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    // Wrong Password
    if (!isCorrectPassword) {
      return NextResponse.json(
        {
          error: "Wrong Credentials",
        },
        { status: 403 }
      );
    }

    // creating a session
    await createSession(existingUser);

    // RETURN DATA FOR USER MINUS THE PASSWORD
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: removedPassword, ...others } = existingUser;

    return NextResponse.json(
      {
        data: others,
        message: "Logged In",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Failed to Login",
      },
      { status: 500 }
    );
  }
}
