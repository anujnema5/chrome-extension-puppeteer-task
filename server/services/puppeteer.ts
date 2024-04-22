import puppeteer from 'puppeteer';
import { setTimeout } from "node:timers/promises";

const url = 'https://youtube.com/';

export const puppeteerService = async (value: string) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    await page.waitForSelector('input#search');
    await page.waitForSelector('button#search-icon-legacy');

    await page.type('input#search', value);
    await page.click('button#search-icon-legacy');

    await setTimeout(2000)

    const videoTitles = await page.evaluate(() => {
        const results = [] as Object[];
        const items = document.querySelectorAll('h3 a.yt-simple-endpoint.style-scope');

        items.forEach((element: any) => {
            results.push({ title: element.textContent.trim() });
        });

        return results;
    });

    return videoTitles
}