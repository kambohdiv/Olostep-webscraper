import { SignIn } from "@clerk/nextjs";
import React from "react";

const SignInPage: React.FC = () => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#00172d] to-[#0052a2]">
      <SignIn />
    </main>
  );
};

export default SignInPage;
