"use server";

import { z } from "zod";

import { signInSchema, signUpSchema } from "./schemas";
import { prisma } from "@/lib/prisma";
import { Argon2id } from "oslo/password";
import { lucia } from "@/lib/lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { googleOauthClient } from "@/lib/googleOauth";
import { generateCodeVerifier } from "arctic";
import { generateState } from "arctic";

export const signIn = async (values: z.infer<typeof signInSchema>) => {
  try {
    const { email, password } = signInSchema.parse(values);

    // Find user by email
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!existingUser || !existingUser.hashedPassword) {
      return { success: false, error: "Invalid email or password" };
    }

    // Verify password
    const validPassword = await new Argon2id().verify(
      existingUser.hashedPassword,
      password
    );

    if (!validPassword) {
      return { success: false, error: "Invalid email or password" };
    }

    // Successfully logged in -> Create session
    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    const cookieStore = await cookies();
    cookieStore.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to sign in" };
  }
};

export const signUp = async (values: z.infer<typeof signUpSchema>) => {
  try {
    // if user already exists, throw an error
    const existingUser = await prisma.user.findUnique({
      where: {
        email: values.email,
      },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await new Argon2id().hash(values.password);

    const user = await prisma.user.create({
      data: {
        name: values.name,
        email: values.email,
        hashedPassword,
      },
    });

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    const cookieStore = await cookies();
    cookieStore.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to create user" };
  }
};

export const signOut = async () => {
  const sessionCookie = await lucia.createBlankSessionCookie();
  const cookieStore = await cookies();
  cookieStore.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/auth");
};

export const getGoogleOauthConsentUrl = async () => {
  try {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    const cookieStore = await cookies();
    cookieStore.set("codeVerifier", codeVerifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    cookieStore.set("state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    const authUrl = await googleOauthClient.createAuthorizationURL(
      state,
      codeVerifier,
      ["email", "profile"]
    );
    return { success: true, url: authUrl.toString() };
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
};
