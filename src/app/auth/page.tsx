import TabSwitcher from "@/components/TabSwitcher";
import React from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import GoogleOAuthButton from "@/components/GoogleOAuthButton";

const AuthPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <GoogleOAuthButton />
      <TabSwitcher SignInTab={<SignInForm />} SignUpTab={<SignUpForm />} />
    </div>
  );
};

export default AuthPage;
