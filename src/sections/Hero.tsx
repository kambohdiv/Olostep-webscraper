import ArrowIcon from '@/assets/arrow-right.svg';
import cogImage from '@/assets/cog.png';
import Image from 'next/image';
import cylinderImage from '@/assets/cylinder.png';
import noodleBhai from '@/assets/noodle.png';
import {
  SignInButton,

} from "@clerk/nextjs";
export const Hero = () => {
  return (
    <section className="pt-8 pb-20 md:pt-5 md:pb-10 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_100%)] overflow-x-clip">
      <div className="container">
        <div className='md:flex items-center lg:mt-0 mt-32'>
          <div className='md:w-[478px]'>
            <div className="text-sm inline-flex border border-[#222]/10 px-3 py-1 rounded-lg tracking-tight">Under Dev</div>
            <h1 className="text-5xl md:7xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-6">Spidex: Web Scraper</h1>
            <p className="text-xl text-[#010D3E] tracking-tight mt-6">
              Effortlessly extract and organize data from any website, turning raw web content into actionable insights.
            </p>

            <div className="flex gap-1 items-center mt-[30px]">
            <SignInButton
            fallbackRedirectUrl="/scrape"
            signUpFallbackRedirectUrl="/onboarding"
          >
             <button className="bg-black  text-white px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking-tight">Get for free   <ArrowIcon className="h-5 w-5" /></button>
          </SignInButton>
            </div>
          </div>
          <div className="mt-20 md:mt-0 md:h-[648px] md:flex-1 relative">
            <Image
              src={cogImage}
              alt='Cog Image'
              className="md:absolute md:h-full md:w-auto md:max-w-none md:-left-6 lg:left-0 "
            />
            <Image
              src={cylinderImage}
              width={220}
              height={220}
              alt="Cylinder image"
              className="hidden md:block -top-8 -left-32 md:absolute"
            />
            <Image
              src={noodleBhai}
              width={220}
              alt="noodle khalo"
              className="hidden lg:block absolute top-[524px] left-[448px] rotate-[30deg]"
            />
          </div>
        </div>
      </div>
    </section>



  );
};