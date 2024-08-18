import { NextResponse } from 'next/server';
import connectDB from '../../lib/dbConnect';
import Article from '../../models/articleModel';
import fetch from 'node-fetch';
import { load } from 'cheerio';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '../../data');

// Ensure the data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

export async function GET(req: Request): Promise<NextResponse> {
  const url = new URL(req.url);
  const userId = url.searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required.' }, { status: 400 });
  }

  try {
    await connectDB();
    const articles = await Article.find({ userId }).sort({ createdAt: -1 }).exec();

    if (!articles || articles.length === 0) {
      return NextResponse.json({ data: [], message: 'No data available for this user' }, { status: 200 });
    }

    return NextResponse.json({ data: articles });
  } catch (error: any) {
    console.error('Error fetching data:', error.message);
    return NextResponse.json({ error: 'Failed to fetch data.' }, { status: 500 });
  }
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { url, userId, selector } = await req.json();

    if (!url || !userId || !selector) {
      return NextResponse.json({ error: 'URL, User ID, and Selector are required.' }, { status: 400 });
    }

    await connectDB();

    // Fetch the page content using node-fetch
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }

    const body = await response.text();
    const $ = load(body);

    // Save the full page content to an HTML file
    const htmlFilePath = path.join(dataDir, 'data.html');
    fs.writeFileSync(htmlFilePath, body, 'utf-8');
    console.log(`Page content saved to ${htmlFilePath}`);

    // Extract specific data using the selector and save to JSON
    const dataJson: { tag: string | undefined; content: string; class: string; }[] = [];
    $(selector).each((i, elem) => {
      const content = $(elem).text().trim();
      const tag = $(elem).prop('tagName');
      const className = $(elem).attr('class') || '';

      if (content) {
        dataJson.push({ tag, content, class: className });
      }
    });

    if (dataJson.length === 0) {
      throw new Error(`No elements found with selector ${selector}`);
    }

    // Save the extracted data to MongoDB
    const newArticle = new Article({
      userId: userId || 'defaultUser',
      url,
      dataHtml: body,
      dataJson,
    });

    await newArticle.save();
    console.log('Data successfully saved to MongoDB');

    const responseData = {
      dataHtml: newArticle.dataHtml,
      dataJson: newArticle.dataJson,
    };

    return NextResponse.json({ message: 'Scraping and storing successful', data: responseData });
  } catch (error: any) {
    console.error('Scraping error:', error.message);
    return NextResponse.json({ error: error.message || 'Failed to scrape and store data.' }, { status: 500 });
  }
}
