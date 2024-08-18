import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

const Header: React.FC = () => {
  const { user } = useUser();

  return (
    <header className="bg-black shadow-md p-4 flex justify-between items-center">
      {/* Logo and Company Name */}
      <div className="flex items-center space-x-2">
        <span className="text-xl font-bold">Spidex</span>
      </div>

      {/* Notification and Profile */}
      <div className="flex items-center space-x-4">
        <SignedIn>
          <div className="flex items-center space-x-2">
            <UserButton />
          </div>
        </SignedIn>

        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </header>
  );
};

export default Header;
