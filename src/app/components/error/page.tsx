import Link from "next/link";
import React from "react";

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black to-[#001E80] text-center px-4">
      <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-black to-[#001E80]">
        404
      </h1>
      <p className="text-2xl text-white mt-6">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        href="/scrape"
        className="mt-10 px-8 py-3 bg-white text-black rounded-lg font-medium shadow-lg hover:bg-gray-100 transition duration-300"
      >
        Go Back to Home
      </Link>
    </div>
  );
}
