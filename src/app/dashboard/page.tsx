import { SignOutButton } from "@/components/SignOutButton";
import { UserAvatar } from "@/components/UserAvatar";
import { getUser } from "@/lib/lucia";
import { redirect } from "next/navigation";
import React from "react";

const Dashboardpage = async () => {
  const user = await getUser();
  if (!user) {
    redirect("/auth");
  }

  return (
    <>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg p-10 bg-gray-100 transition-all duration-300 cursor-pointer hover:shadow-md">
          <UserAvatar user={user} size={40} />
          <p className="text-2xl font-bold">Welcome, {user.name}</p>
          <p className="text-sm text-gray-500">email: {user.email}</p>
        </div>
      </div>
      <div className="absolute right-4 top-4">
        <SignOutButton>Logout</SignOutButton>
      </div>
    </>
  );
};

export default Dashboardpage;
