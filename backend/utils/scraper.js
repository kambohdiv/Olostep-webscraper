import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import { load } from "cheerio";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import connectDB from "../config/db.js"; // Import the database connection
import Article from "../models/Article.js";

// Define the URL to scrape
const url = "https://tailwindcss.com/"; // Replace with the URL you want to scrape

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const userId = "randomuser";

// Define the directory to store data files
const dataDir = path.join(__dirname, "../data");

// Ensure the data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

async function scrapeData(url, userId) {
  try {
    // Fetch the page content
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }

    const body = await response.text();
    const $ = load(body);

    // Save full page content to an HTML file in the data directory
    const htmlFilePath = path.join(dataDir, "data.html");
    fs.writeFileSync(htmlFilePath, body, "utf-8");
    console.log(`Page content saved to ${htmlFilePath}`);

    // Extract specific data (e.g., text from <div> elements) and save to a JSON file in the data directory
    const data = [];
    $(".mx-auto").each((i, elem) => {
      const text = $(elem).text().trim(); // Trim whitespace
      if (text) {
        data.push({ text });
      }
    });

    if (data.length === 0) {
      console.warn("No data found on the page.");
    } else {
      const jsonFilePath = path.join(dataDir, "data.json");
      fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2), "utf-8");
      console.log(`Extracted data saved to ${jsonFilePath}`);
    }

    // Save data to MongoDB
    const article = new Article({
      userId,
      url,
      dataHtml: body,
      dataJson: data,
    });

    await article.save();
    console.log("Scraped data saved to MongoDB");
  } catch (error) {
    console.error("Error scraping data:", error.message);
  } finally {
    mongoose.connection.close(); 
  }
}

// Establish MongoDB connection and then scrape data
connectDB().then(() => {
  scrapeData(url, userId);
});
