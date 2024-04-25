import puppeteer from 'puppeteer';
import { setTimeout } from "node:timers/promises";

const url = 'https://youtube.com/';

export const puppeteerService = async (value: string) => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);

    /** The thing I was trying to implement for automation on the same instance */

    // const browserWSEndpoint = 'https://www.youtube.com/'; 
    // const browser = await puppeteer.connect({ browserWSEndpoint });
    // const pages = await browser.pages();
    // const page = pages[0]; 

    await page.waitForSelector('input#search');
    await page.waitForSelector('button#search-icon-legacy');

    await page.type('input#search', value);
    await page.click('button#search-icon-legacy');

    await setTimeout(3000)

    const videoTitles = await page.evaluate(() => {
        const results = [] as Object[];
        const items = document.querySelectorAll('h3 a.yt-simple-endpoint.style-scope');

        items.forEach((element: any) => {
            console.log('triggering here')
            results.push({ title: element.textContent.trim() });
        });

        return results;
    });

    return videoTitles
}