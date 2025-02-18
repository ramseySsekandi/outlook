import { cookies } from "next/headers";
import { cache } from "react";
import { decrypt } from "./session";
import { db } from "@/prisma/db";
import { AuthProps } from "@/types";

export const getSession = cache(async () => {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("session")?.value;
    if (!cookie || typeof cookie !== "string") {
      throw new Error("Invalid session cookie");
    }
    const session = await decrypt(cookie);
    if (!session) return null;
    const id = session.UserId as string;
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    return user as AuthProps;
  } catch (error) {
    console.log(error);
    return null;
  }
});
