import { db } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { createSession } from "@/lib/session";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { email, password } = data;
  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!existingUser) {
    return NextResponse.json(
      {
        data: null,
        error: "Wrong Credentials",
      },
      { status: 403 }
    );
  } else {
    await createSession(existingUser);
  }

  const isCorrectPassword = await bcrypt.compare(
    password,
    existingUser.password
  );

  if (!isCorrectPassword) {
    return NextResponse.json(
      {
        data: null,
        error: "Wrong Credentials",
      },
      { status: 403 }
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: removedPassword, ...others } = existingUser;

  return NextResponse.json(
    {
      data: others,
      message: "Logged In",
    },
    { status: 201 }
  );
}
