/**
 * Scrapes Barbarian paragon board data from Maxroll D4 Planner
 *
 * This script uses Puppeteer to:
 * 1. Navigate to the D4 planner
 * 2. Select Barbarian class
 * 3. Extract all paragon board structures
 * 4. Save to JSON file
 */

const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapeBarbarianParagonBoards() {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({
        headless: false, // Set to true for production
        defaultViewport: { width: 1920, height: 1080 }
    });

    try {
        const page = await browser.newPage();

        // Enable request interception to capture API calls
        await page.setRequestInterception(true);
        const apiResponses = [];

        page.on('request', (request) => {
            request.continue();
        });

        page.on('response', async (response) => {
            const url = response.url();
            // Capture any API responses that might contain board data
            if (url.includes('backend.maxroll.gg') ||
                url.includes('planners.maxroll.gg') ||
                url.includes('paragon') ||
                url.includes('board')) {
                try {
                    const data = await response.json();
                    apiResponses.push({ url, data });
                    console.log('Captured API response:', url);
                } catch (e) {
                    // Not JSON, ignore
                }
            }
        });

        console.log('Navigating to D4 planner...');
        await page.goto('https://maxroll.gg/d4/planner/', {
            waitUntil: 'networkidle2',
            timeout: 60000
        });

        // Wait for page to load
        await page.waitForTimeout(3000);

        console.log('Looking for class selector...');

        // Try to find and click Barbarian class selector
        // Common selectors that might work:
        const selectors = [
            'button[data-class="barbarian"]',
            '[class*="barbarian"]',
            'button:has-text("Barbarian")',
            '.class-selector .barbarian',
            '[data-testid="class-barbarian"]'
        ];

        let classSelected = false;
        for (const selector of selectors) {
            try {
                await page.waitForSelector(selector, { timeout: 2000 });
                await page.click(selector);
                console.log(`Clicked Barbarian using selector: ${selector}`);
                classSelected = true;
                break;
            } catch (e) {
                continue;
            }
        }

        if (!classSelected) {
            console.log('Could not find class selector automatically.');
            console.log('Please manually select Barbarian in the browser window...');
            console.log('Waiting 15 seconds...');
            await page.waitForTimeout(15000);
        } else {
            await page.waitForTimeout(3000);
        }

        console.log('Extracting paragon board data from page...');

        // Extract data from the page's JavaScript state
        const paragonData = await page.evaluate(() => {
            // Try to find paragon board data in common locations
            const results = {
                boards: [],
                windowKeys: Object.keys(window).filter(k => k.toLowerCase().includes('paragon') || k.toLowerCase().includes('board')),
                reactState: null
            };

            // Check window object for data
            if (window.__GAME_DATA__) results.gameData = window.__GAME_DATA__;
            if (window.__PARAGON__) results.paragon = window.__PARAGON__;
            if (window.paragonBoards) results.boards = window.paragonBoards;

            // Try to extract from React state
            try {
                const rootElement = document.querySelector('[data-reactroot], #__next, #root');
                if (rootElement) {
                    const reactKey = Object.keys(rootElement).find(key =>
                        key.startsWith('__react') || key.startsWith('_react')
                    );
                    if (reactKey) {
                        const reactState = rootElement[reactKey];
                        results.reactState = JSON.stringify(reactState, null, 2);
                    }
                }
            } catch (e) {
                results.reactError = e.message;
            }

            // Look for paragon board elements in DOM
            const boardElements = document.querySelectorAll('[data-board], [class*="paragon"], [id*="board"]');
            results.boardElements = Array.from(boardElements).map(el => ({
                tag: el.tagName,
                id: el.id,
                className: el.className,
                dataset: el.dataset
            }));

            return results;
        });

        console.log('Extracted data:', JSON.stringify(paragonData, null, 2));

        // Save all collected data
        const output = {
            timestamp: new Date().toISOString(),
            source: 'maxroll.gg/d4/planner',
            class: 'Barbarian',
            apiResponses,
            pageData: paragonData
        };

        const filename = 'barbarian-paragon-data.json';
        fs.writeFileSync(filename, JSON.stringify(output, null, 2));
        console.log(`\nData saved to ${filename}`);

        // Keep browser open for manual inspection
        console.log('\nBrowser will remain open for 30 seconds for manual inspection...');
        await page.waitForTimeout(30000);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await browser.close();
        console.log('Browser closed.');
    }
}

// Run the scraper
scrapeBarbarianParagonBoards().catch(console.error);
