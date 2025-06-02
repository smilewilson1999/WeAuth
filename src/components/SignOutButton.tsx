"use client";

import { signOut } from "@/app/auth/auth.action";
import { Button } from "./ui/button";

type Props = {
  children: React.ReactNode;
};

export const SignOutButton = ({ children }: Props) => {
  return <Button onClick={() => signOut()}>{children}</Button>;
};
