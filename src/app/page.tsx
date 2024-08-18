"use client";
import { useState, useEffect } from "react";
import Header from "./components/header/page";

const Page = () => {
  const [url, setUrl] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [selector, setSelector] = useState<string>("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
      } catch (error) {
        console.error("Fetch error:", error);
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
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
    } catch (error) {
      console.error("Scraping error:", error);
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
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
    <Header/>
      <div className="min-h-screen text-black flex flex-col items-center justify-center bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-6">Web Scraper</h1>
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded w-full max-w-md"
        />
        <input
          type="text"
          placeholder="Enter a URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded w-full max-w-md"
        />
        <input
          type="text"
          placeholder="Enter a Selector (e.g., .my-class)"
          value={selector}
          onChange={(e) => setSelector(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full max-w-md"
        />
        <button
          onClick={handleScrape}
          disabled={loading || !url || !userId || !selector}
          className={`mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ${
            (loading || !url || !userId || !selector) &&
            "opacity-50 cursor-not-allowed"
          }`}
        >
          {loading ? "Scraping..." : "Scrape"}
        </button>

        {loading && (
          <p className="mt-4 text-gray-500">Scraping in progress...</p>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            Error: {error}
          </div>
        )}

        {data && (
          <div className="mt-8 w-full max-w-2xl bg-white shadow p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Scraped Data:</h2>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96">
              {JSON.stringify(data.dataJson, null, 2)}
            </pre>
            <button
              onClick={downloadJson}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Download JSON
            </button>
            <button
              onClick={downloadHtml}
              className="mt-4 ml-4 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
            >
              Download HTML
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
