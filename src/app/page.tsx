"use client";
import { useState, useEffect } from "react";
import Header from "./components/header/page";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { DM_Sans } from "next/font/google";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js

config.autoAddCss = false;

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"] });

const Page = () => {
  const { user } = useUser();
  const router = useRouter(); // Initialize useRouter
  const [url, setUrl] = useState<string>("");
  const [selector, setSelector] = useState<string>("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const userId = user?.id || "";

  // Fetch latest scraped data on page load
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/scrape");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result.data);
      } catch (error: any) {
        console.error("Fetch error:", error);

        if (error.message.includes("405")) {
          setError("Method Not Allowed: Please check your request method.");
        } else {
          setError(
            error instanceof Error ? error.message : "An unknown error occurred"
          );
          router.push("/components/error"); // Redirect to the custom error page
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleScrape = async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      if (!url || !userId || !selector) {
        throw new Error("URL, User ID, and Selector are required.");
      }

      const response = await fetch("/api/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, userId, selector }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Received non-JSON response:", text);
        throw new TypeError("Oops, we haven't got JSON!");
      }

      const result = await response.json();
      setData(result.data);

      // Clear input fields after successful scrape
      setUrl("");
      setSelector("");
    } catch (error: any) {
      console.error("Scraping error:", error);

      if (error.message.includes("405")) {
        setError("Method Not Allowed: Please check your request method.");
      } else {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
        router.push("/components/error"); // Redirect to the custom error page
      }
    } finally {
      setLoading(false);
    }
  };

  const downloadJson = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(data.dataJson, null, 2)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "scraped-data.json";
    link.click();
  };

  const downloadHtml = () => {
    const htmlString = `data:text/html;charset=utf-8,${encodeURIComponent(
      data.dataHtml
    )}`;
    const link = document.createElement("a");
    link.href = htmlString;
    link.download = "scraped-data.html";
    link.click();
  };

  return (
    <>
      <Header />
      <div
        className={`${dmSans.className} min-h-screen bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_66%)] flex flex-col`}
      >
        <div className="container mx-auto mt-10 p-5 bg-white rounded-lg shadow max-w-4xl border border-[#222]/10 flex-grow pb-32 mb-32">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-6 text-center">
            Spidex: Web Scraper
          </h1>
          <p className="text-lg text-[#010D3E] tracking-tight mt-4 text-center">
            Effortlessly extract and organize data from any website, turning raw
            web content into actionable insights.
          </p>
          <div className="flex flex-col items-center mb-6 w-full max-w-lg mx-auto mt-6">
            <div className="flex items-center space-x-2 w-full mt-2">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL"
                className="border border-gray-200 p-2 rounded flex-grow text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2 w-full mt-2">
              <input
                type="text"
                value={selector}
                onChange={(e) => setSelector(e.target.value)}
                placeholder="Enter a Selector (e.g., .my-class)"
                className="border border-gray-200 p-2 rounded flex-grow text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleScrape}
              disabled={loading || !url || !selector}
              className="mt-4 bg-gradient-to-b from-black to-[#001E80] text-white px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking-tight"
            >
              {loading ? "Scraping..." : "Scrape"}
            </button>
          </div>
          {loading && (
            <p className="mt-4 text-gray-500 text-center">
              Scraping in progress...
            </p>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              Error: {error}
            </div>
          )}

          {data && (
            <div className="mt-6 p-5 bg-white border border-[#222]/10 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold text-center mb-6 text-[#010D3E]">
                Scraped Data
              </h2>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96 border border-gray-200 text-[#010D3E] font-mono text-sm">
                {JSON.stringify(data.dataJson, null, 2)}
              </pre>
              <div className="mt-6 flex justify-center space-x-4">
                <button
                  onClick={downloadJson}
                  className="mt-4 bg-gradient-to-b from-black to-[#001E80] text-white px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking-tight"
                >
                  Download JSON
                </button>
                <button
                  onClick={downloadHtml}
                  className="mt-4 bg-gradient-to-b from-black to-[#001E80] text-white px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking-tight"
                >
                  Download HTML
                </button>
              </div>
            </div>
          )}
        </div>
        <footer className="bg-gradient-to-b from-black to-[#001E80] text-white text-center py-2 flex-shrink-0 mt-20">
          <div className="container mx-auto px-4">
            <p className="text-white text-sm">
              Copyright © 2024 by Spidex. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Page;
