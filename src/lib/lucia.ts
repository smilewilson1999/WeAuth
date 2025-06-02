import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { prisma } from "./prisma";
import { cookies } from "next/headers";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    name: "wilson-auth-cookie",
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});

export const getUser = async () => {
  const sessionId =
    (await cookies()).get(lucia.sessionCookieName)?.value || null;
  if (!sessionId) return null;

  const { session, user } = await lucia.validateSession(sessionId);

  try {
    if (session && session.fresh) {
      // Refreshing thier session cookie
      const sessionCookie = await lucia.createSessionCookie(session.id);
      const cookieStore = await cookies();
      cookieStore.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!session) {
      // Clearing the browser's session cookie
      const sessionCookie = await lucia.createBlankSessionCookie();
      const cookieStore = await cookies();
      cookieStore.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch (error) {
    console.error(error);
    return null;
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
    select: {
      name: true,
      email: true,
    },
  });

  return dbUser;
};
