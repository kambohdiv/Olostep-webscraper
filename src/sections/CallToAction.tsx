import ArrowRight from '@/assets/arrow-right.svg';
import starImage from '@/assets/star.png';
import springImage from '@/assets/spring.png';
import Image from 'next/image';

export const CallToAction = () => {
  return (
     <section className="bg-gradient-to-b from-white to-[#D2DCFF] py-24 pb-36 overflow-x-clip">
      <div className="container">
        <div className="max-w-2xl mx-auto px-4 py-8 relative">
        <h2 className="text-4xl md:6xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-6 text-center"> Sign up for free today </h2>
        <p className="text-xl text-[#010D3E] tracking-tight mt-5 text-center">Harness the power of automated web scraping to gather and analyze the data that drives your success, Right Now.  
        </p>
        <Image
        src={starImage}
        alt="Star Image"
        width={360}
        className="absolute -left-[350px] -top-[137px]"
        />
        <Image
        src={springImage}
        alt="Spring Image"
        width={360}
        className="absolute -right-[331px] -top-[19px]"
        />
        </div>
      </div>
     </section>
  
  );
};