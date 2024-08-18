import React from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <header className="bg-gradient-to-b from-black to-[#001E80] shadow-md p-4 flex justify-between items-center">
      {/* Logo and Company Name */}
      <div className="flex items-center space-x-2">
        <span className="text-3xl font-bold tracking-tighter text-white bg-clip-text">
          Spidex
        </span>
      </div>

      {/* Notification and Profile */}
      <div className="flex items-center space-x-4">
        <SignedIn>
          <div className="flex items-center space-x-2">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-8 h-8", // Smaller avatar size
                  userButtonPopoverCard: "bg-white shadow-lg", // Card styling
                },
              }}
            />
          </div>
        </SignedIn>

        <SignedOut>
          <SignInButton>
            <button className="bg-white text-black px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking-tight shadow hover:bg-gray-100">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </header>
  );
};

export default Header;
