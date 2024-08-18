import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import connectDB from '../../lib/dbConnect';
import Article from '../../models/articleModel';

export async function POST(req: Request) {
  try {
    const { url, userId, selector } = await req.json();

    await connectDB();

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 120000 }); // Increased timeout
      console.log(`Successfully navigated to ${url}`);
    } catch (navError) {
      console.error('Navigation error:', navError.message);
      return NextResponse.json({ error: 'Failed to navigate to the URL' }, { status: 500 });
    }

    let dataHtml, dataJson;
    try {
      dataHtml = await page.content();
      dataJson = await page.evaluate((selector) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
          throw new Error(`No elements found with selector ${selector}`);
        }
        return Array.from(elements).map(element => ({
          tag: element.tagName,
          content: element.textContent.trim(),
          class: element.className,
        }));
      }, selector); // Process all elements without limit
      console.log(`Successfully scraped data with selector ${selector}`);
    } catch (evalError) {
      console.error('Evaluation error:', evalError.message);
      return NextResponse.json({ error: `Failed to evaluate the page content with selector ${selector}` }, { status: 500 });
    }

    await browser.close();

    const newArticle = new Article({
      userId: userId || 'defaultUser',
      url,
      dataHtml,
      dataJson,
    });

    await newArticle.save();
    console.log('Data successfully saved to MongoDB');

    // Ensure the data being sent is in string format for JSON or HTML downloads
    const responseData = {
      dataHtml: newArticle.dataHtml,
      dataJson: newArticle.dataJson,
    };

    return NextResponse.json({ message: 'Scraping and storing successful', data: responseData });
  } catch (error) {
    console.error('General error during scraping:', error.message);
    return NextResponse.json({ error: 'Failed to scrape and store data.' }, { status: 500 });
  }
}