import Image from "next/image";
import logo from "@/assets/logosaas.png";
import SocialLinkedIn from "@/assets/social-linkedin.svg"; 

export const Footer = () => {
  return (
    <footer className="bg-black text-[#BCBCBC] text-sm text-center">
      <div className="container">
        <div className="inline-flex relative before:content-[''] before:top-2 before:bottom-0 before:w-full before:blur before:bg-[linear-gradient(to_right,#F87BFF,#FB92CF,#FFDD9B,#C2F0B1,#2FD8FE)] before:absolute">
          <Image src={logo} height={40} alt="logo" className="relative" /> 
        </div>
        <nav className="flex flex-col md:flex-row lg:flex-row lg:justify-center md:justify-center gap-6 mt-6">
          <a href="#">Developers</a>
        </nav>
        <div className="hidden justify-center gap-6 mt-6">
          <SocialLinkedIn />
        </div>
        <p className="mt-6">5-07</p>
      </div>
    </footer>
  );
};