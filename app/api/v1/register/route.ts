import { db } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { email, username, password } = data;
    // Check whether User already exists
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });
    // If User exists return error and null data
    if (existingUser) {
      return NextResponse.json(
        {
          error: "User already exists",
        },
        { status: 409 }
      );
    }
    // Hash the Password before Storing it in the DB
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User with hashed password
    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // EXTRACT PASSWORD FROM USER DATA TO PROTECT IT FROM ACCESS

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: returnedPassword, ...others } = newUser;
    // return the data
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
    return NextResponse.json(
      {
        error: "Failed to create user",
      },
      { status: 500 }
    );
  }
}
