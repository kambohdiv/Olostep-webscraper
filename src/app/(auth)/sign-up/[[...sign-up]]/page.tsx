import { SignUp } from "@clerk/nextjs";
import React from "react";

const SignUpPage = () => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#00172d] to-[#0052a2]">
      <SignUp />
    </main>
  );
};

export default SignUpPage;
