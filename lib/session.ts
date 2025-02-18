import { IPayload } from "@/types";
import { User } from "@prisma/client";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SECRET_KEY;
const encodedKey = new TextEncoder().encode(secretKey);

export function encrypt(payload: IPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(encodedKey);
}

export async function decrypt(session: string) {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log(error);
  }
}

export async function createSession(user: User) {
  const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000);
  const payload = {
    userId: user.id,
    email: user.email,
    password: user.password,
    expiresAt: expiresAt,
    username: user.username,
  };

  const session = await encrypt(payload);
  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
  });
}

export async function updateSession() {
  const cookieStore = await cookies();
  const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000);
  const session = cookieStore.get("session")?.value;
  const payload = await decrypt("session");
  if (!session || !payload) {
    return null;
  }
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
