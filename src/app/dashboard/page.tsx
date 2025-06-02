import { SignOutButton } from "@/components/SignOutButton";
import { getUser } from "@/lib/lucia";
import { redirect } from "next/navigation";
import React from "react";

const Dashboardpage = async () => {
  const user = await getUser();
  if (!user) {
    redirect("/auth");
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.name}</p>
      <p>Email: {user.email}</p>
      <SignOutButton>Logout</SignOutButton>
    </div>
  );
};

export default Dashboardpage;
