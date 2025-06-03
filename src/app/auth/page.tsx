import TabSwitcher from "@/components/TabSwitcher";
import React from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import GoogleOAuthButton from "@/components/GoogleOAuthButton";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";
import Image from "next/image";

const AuthPage = () => {
  // Generate random avatar for demonstration
  const randomSeed = Math.random().toString(36).substring(7);
  const avatarUrl = `https://api.dicebear.com/7.x/notionists/svg?seed=${randomSeed}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Dot pattern background */}
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
        )}
      />

      {/* Fixed Header Section */}
      <div className="relative z-10 flex flex-col items-center pt-20">
        <div className="flex items-center gap-2 mb-8">
          <h1 className="text-5xl font-bold">We</h1>
          {/* Random Avatar */}
          <Image
            src={avatarUrl}
            alt="Random avatar"
            width={80}
            height={80}
            className="rounded-full"
          />
          <h1 className="text-5xl font-bold">Auth</h1>
        </div>

        {/* Google OAuth Button */}
        <div className="w-full max-w-[500px] mb-6">
          <GoogleOAuthButton />
        </div>

        {/* OR Divider */}
        <div className="flex items-center gap-4 w-full max-w-[500px] mb-6">
          <div className="flex-1 relative overflow-hidden">
            <hr className="border-muted" />
            <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent w-3/4 animate-[shine-line_2s_ease-in-out_infinite]"></div>
          </div>
          <span className="text-muted-foreground text-sm font-medium">or</span>
          <div className="flex-1 relative overflow-hidden">
            <hr className="border-muted" />
            <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent w-3/4 animate-[shine-line_2s_ease-in-out_infinite] [animation-delay:1s]"></div>
          </div>
        </div>
      </div>

      {/* Tab Switcher Section */}
      <div className="relative z-10 flex justify-center px-4">
        <div className="w-full max-w-[500px]">
          <TabSwitcher SignInTab={<SignInForm />} SignUpTab={<SignUpForm />} />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
