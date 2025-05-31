"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {
  SignUpTab: React.ReactNode;
  SignInTab: React.ReactNode;
};

const TabSwitcher = ({ SignUpTab, SignInTab }: Props) => {
  return (
    <Tabs className="w-full max-w-[500px]" defaultValue="sign-in">
      <TabsList>
        <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
        <TabsTrigger value="sign-in">Sign In</TabsTrigger>
      </TabsList>
      <TabsContent value="sign-up">{SignUpTab}</TabsContent>
      <TabsContent value="sign-in">{SignInTab}</TabsContent>
    </Tabs>
  );
};

export default TabSwitcher;
