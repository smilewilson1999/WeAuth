import { googleOauthClient } from "@/lib/googleOauth";
import { lucia } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// This is the callback route for the Google OAuth flow
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code || !state) {
    console.error("Missing code or state");
    return new Response("Invalid request", { status: 400 });
  }

  const cookieStore = await cookies();
  const codeVerifier = cookieStore.get("codeVerifier")?.value;
  const cookieState = cookieStore.get("state")?.value;

  if (!codeVerifier || !cookieState) {
    console.error("Missing codeVerifier or state");
    return new Response("Invalid request", { status: 400 });
  }

  if (cookieState !== state) {
    console.error("State mismatch");
    return new Response("Invalid request", { status: 400 });
  }

  const tokens = await googleOauthClient.validateAuthorizationCode(
    code,
    codeVerifier
  );

  const accessToken = tokens.accessToken();

  const googleResponse = await fetch(
    "https://www.googleapis.com/oauth2/v1/userinfo",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const googleUser = (await googleResponse.json()) as {
    id: string;
    email: string;
    name: string;
    picture: string;
  };

  let userId: string = "";
  // if user exists, creat a cookie with the user id and sign the user in
  const existingUser = await prisma.user.findUnique({
    where: {
      email: googleUser.email,
    },
  });

  if (existingUser) {
    userId = existingUser.id;
  } else {
    const newUser = await prisma.user.create({
      data: {
        email: googleUser.email,
        name: googleUser.name,
        picture: googleUser.picture,
      },
    });
    userId = newUser.id;
  }

  const session = await lucia.createSession(userId, {});
  const sessionCookie = await lucia.createSessionCookie(session.id);
  cookieStore.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return NextResponse.redirect(new URL("/dashboard", url));
}
