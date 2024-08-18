import { SignIn } from "@clerk/nextjs";
import React from "react";

const SignInPage: React.FC = () => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_66%)]">
      <SignIn />
    </main>
  );
};

export default SignInPage;
