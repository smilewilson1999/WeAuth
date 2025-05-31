"use server";

import { z } from "zod";

import { signInSchema } from "./SignInForm";
import { signUpSchema } from "./SignUpForm";
import { prisma } from "@/lib/prisma";
import { Argon2id } from "oslo/password";

export const signIn = async (values: z.infer<typeof signInSchema>) => {
  const { email, password } = signInSchema.parse(values);
  console.log("You are on the server and you are signing in");
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
  } catch (error) {
    console.error(error);
    return { error: "Failed to create user" };
  }
};
