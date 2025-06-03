"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  SignUpTab: React.ReactNode;
  SignInTab: React.ReactNode;
};

const TabSwitcher = ({ SignUpTab, SignInTab }: Props) => {
  const [activeTab, setActiveTab] = useState("sign-in");

  return (
    <Tabs className="w-full" defaultValue="sign-in">
      <TabsList className="w-full">
        <TabsTrigger
          value="sign-up"
          className="flex-1 transition-all duration-200 ease-in-out"
          onClick={() => setActiveTab("sign-up")}
        >
          Sign Up
        </TabsTrigger>
        <TabsTrigger
          value="sign-in"
          className="flex-1 transition-all duration-200 ease-in-out"
          onClick={() => setActiveTab("sign-in")}
        >
          Sign In
        </TabsTrigger>
      </TabsList>

      <div className="relative overflow-hidden w-full mt-2">
        <motion.div
          className="bg-background rounded-xl overflow-hidden border"
          layout
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
        >
          <AnimatePresence mode="wait">
            {activeTab === "sign-up" && (
              <motion.div
                key="sign-up"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{
                  duration: 0.3,
                  ease: [0.4, 0.0, 0.2, 1],
                }}
                className="w-full"
              >
                {SignUpTab}
              </motion.div>
            )}
            {activeTab === "sign-in" && (
              <motion.div
                key="sign-in"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{
                  duration: 0.3,
                  ease: [0.4, 0.0, 0.2, 1],
                }}
                className="w-full"
              >
                {SignInTab}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </Tabs>
  );
};

export default TabSwitcher;
