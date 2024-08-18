import ArrowRight from "@/assets/arrow-right.svg";
import Logo from "@/assets/logosaas.png";
import Image from "next/image";
import MenuIcon from  "@/assets/menu.svg";

export const Header = () => {
  return (
    <header className="sticky top-0 backdrop-blur-sm z-20">
    <div className="flex justify-center items-center py-3 bg-black text-white gap-3">
      <p className="text-white/60 hidden md:block">Explore the Web, One Byte at a Time</p>
      <div className="inline-flex gap-1 items-center">
          <p>Get started for free</p>
          <ArrowRight className="h-4 w-4 inline-flex justify-center items-center" />
      </div>
    </div>
    <div className="py-5">
    <div>
      <div className="container">
      <div className="flex items-center justify-between ">
        <Image src={Logo} alt="Saas Logo" height={40} width={40}/> 
        <MenuIcon className="h-5 w-5 md:hidden"/>
        <nav className="hidden md:flex gap-6 text-black/60 items-center">
          <a href="#">Developers</a>
          <button className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex align-items justify-center tracking-tight">Get for free</button>
        <h1 className="inline-flex align-items justify-center text-2xl md:4xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text">Spidex</h1>  
        </nav>
      </div>
      </div>
    </div>
    </div>
    </header>
  );
};