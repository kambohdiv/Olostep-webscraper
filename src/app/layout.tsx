import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark, neobrutalism } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });


const imageUrl = "https://spidex.vercel.app/logosaas.png";
export const metadata: Metadata = {
  title: {
    default: "Spidex | Web Scraper",
    template: "%s | Spidex",
  },
  description: "Effortlessly extract and organize data from any website, turning raw web content into actionable insights.",
  keywords: "web scraping, data extraction, web content, actionable insights, Spidex",
  openGraph: {
    title: "Spidex | Web Scraper",
    description: "Effortlessly extract and organize data from any website, turning raw web content into actionable insights.",
    url: "https://www.spidex.com", // Update with the actual URL
    type: "website",
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: "Spidex - Web Scraper",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spidex | Web Scraper",
    description: "Effortlessly extract and organize data from any website, turning raw web content into actionable insights.",
    images: [imageUrl],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: neobrutalism,
        variables: { colorPrimary: "#3371FF" },
      }}
    >
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
