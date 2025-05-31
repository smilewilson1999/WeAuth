import TabSwitcher from "@/components/TabSwitcher";
import React from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const AuthPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <TabSwitcher SignInTab={<SignInForm />} SignUpTab={<SignUpForm />} />
    </div>
  );
};

export default AuthPage;
