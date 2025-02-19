"use server";
import { cookies } from "next/headers";
import { cache } from "react";

import { db } from "@/prisma/db";
import { AuthProps } from "@/types";
import { decrypt } from "@/lib/session";

export const getUserSession = cache(async () => {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("session")?.value;
    // if (!cookie || typeof cookie !== "string") {
    //   throw new Error("Invalid session cookie");
    // }
    const session = await decrypt(cookie as string);
    if (!session) return null;
    const id = session.userId as string;
    // getting user from the db basing on the id in the session
    const user = await db.user.findUnique({
      where: {
        id,
      },
      select: { username: true, email: true, image: true, id: true },
    });
    return user as AuthProps;
  } catch (error) {
    console.log(error);
    return null;
  }
});
