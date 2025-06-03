"use client";

import React from "react";
import { Button } from "./ui/button";
import { RiGoogleFill } from "@remixicon/react";
import { getGoogleOauthConsentUrl } from "@/app/auth/auth.action";
import { toast } from "sonner";

const GoogleOAuthButton = () => {
  const handleGoogleOAuth = async () => {
    const { success, url, error } = await getGoogleOauthConsentUrl();
    if (success) {
      window.location.href = url!;
    } else {
      toast.error(error);
    }
  };
  return (
    <Button
      className="w-full bg-black hover:bg-black/90 text-white"
      onClick={() => handleGoogleOAuth()}
    >
      <RiGoogleFill />
      Sign in with Google
    </Button>
  );
};

export default GoogleOAuthButton;
