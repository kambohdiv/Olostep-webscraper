import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { load } from 'cheerio';
import { fileURLToPath } from 'url';

// Define the URL to scrape
const url = 'https://www.linkedin.com/posts/maheen-akhtar-khan-377082267_excited-to-share-my-latest-project-datahub-activity-7210630278006923264-v1W5/'; // Replace with the URL you want to scrape

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function scrapeData(url) {
  try {
    // Fetch the page content
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }

    const body = await response.text();
    const $ = load(body);

    // Save full page content to an HTML file
    const htmlFilePath = path.join(__dirname, 'data.html');
    fs.writeFileSync(htmlFilePath, body, 'utf-8');
    console.log(`Page content saved to ${htmlFilePath}`);

    // Extract specific data (e.g., text from <div> elements) and save to a JSON file
    const data = [];
    $('.comments-post-meta__profile-info-wrapper').each((i, elem) => {
      const text = $(elem).text().trim(); // Trim whitespace
      // Since <div> elements don't have an `href` attribute, only the text is saved
      if (text) {
        data.push({ text });
      }
    });

    if (data.length === 0) {
      console.warn('No data found on the page.');
    } else {
      const jsonFilePath = path.join(__dirname, 'data.json');
      fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2), 'utf-8');
      console.log(`Extracted data saved to ${jsonFilePath}`);
    }

  } catch (error) {
    console.error('Error scraping data:', error.message);
  }
}

// Call the function to scrape the page
scrapeData(url);
