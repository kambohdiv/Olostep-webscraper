import ArrowRight from "@/assets/arrow-right.svg";
import Logo from "@/assets/logosaas.png";
import Image from "next/image";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  useUser,
} from "@clerk/nextjs";

export const Header = () => {
  return (
    <header className="absolute top-0 backdrop-blur-sm z-20  w-full">
      <div className="flex justify-center items-center py-3 bg-black text-white gap-3">
        <p className="text-white/60 hidden md:block">Explore the Web, One Byte at a Time</p>
        <div className="inline-flex gap-1 items-center">
          <div className="cursor-pointer">
            <SignInButton
              fallbackRedirectUrl="/scrape"
              signUpFallbackRedirectUrl="/onboarding"
            >
              Get Started For Free
            </SignInButton>
          </div>
          <ArrowRight />
        </div>
      </div>
      <div className="py-5">
        <div>
          <div className="container">
            <div className="flex items-center justify-between ">
              <Image src={Logo} alt="Saas Logo" height={40} width={40} />
              <nav className=" flex gap-6 text-black/60 items-center">
                <h1 className="inline-flex align-items justify-center text-2xl md:4xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text">Spidex</h1>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};