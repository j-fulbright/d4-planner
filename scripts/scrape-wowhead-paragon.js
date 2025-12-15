/**
 * Scrapes Barbarian paragon board data from Wowhead D4 Paragon Calculator
 *
 * Wowhead might have better structured data than Maxroll
 */

const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapeWowheadParagonBoards() {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: { width: 1920, height: 1080 }
    });

    try {
        const page = await browser.newPage();

        // Capture network requests
        const apiResponses = [];
        await page.setRequestInterception(true);

        page.on('request', (request) => {
            request.continue();
        });

        page.on('response', async (response) => {
            const url = response.url();
            if (url.includes('paragon') ||
                url.includes('board') ||
                url.includes('wowhead.com') ||
                url.includes('zamimg.com')) {
                try {
                    const contentType = response.headers()['content-type'] || '';
                    if (contentType.includes('json')) {
                        const data = await response.json();
                        apiResponses.push({ url, data });
                        console.log('Captured JSON response:', url);
                    }
                } catch (e) {
                    // Not JSON or error reading
                }
            }
        });

        console.log('Navigating to Wowhead Barbarian paragon calculator...');
        await page.goto('https://www.wowhead.com/diablo-4/paragon-calc/barbarian', {
            waitUntil: 'networkidle2',
            timeout: 60000
        });

        console.log('Waiting for paragon calculator to load...');
        await page.waitForTimeout(5000);

        console.log('Extracting paragon board data...');

        const paragonData = await page.evaluate(() => {
            const results = {
                boards: [],
                glyphs: [],
                nodes: [],
                rawData: null
            };

            // Check for Wowhead global objects
            if (typeof WH !== 'undefined') {
                results.whNamespace = Object.keys(WH);

                // Check D4 namespace
                if (WH.D4) {
                    results.d4Namespace = Object.keys(WH.D4);

                    // Try to access paragon data
                    if (WH.D4.paragonBoards) results.boards = WH.D4.paragonBoards;
                    if (WH.D4.paragonNodes) results.nodes = WH.D4.paragonNodes;
                    if (WH.D4.glyphs) results.glyphs = WH.D4.glyphs;
                    if (WH.D4.ParagonCalc && WH.D4.ParagonCalc.data) {
                        results.calcData = WH.D4.ParagonCalc.data;
                    }
                }

                // Check for data property
                if (WH.data) results.whData = WH.data;
            }

            // Check for g_paragon or similar global variables
            if (typeof g_paragon !== 'undefined') results.gParagon = g_paragon;
            if (typeof g_boards !== 'undefined') results.gBoards = g_boards;
            if (typeof g_glyphs !== 'undefined') results.gGlyphs = g_glyphs;

            // Look for data in window object
            const windowKeys = Object.keys(window).filter(k =>
                k.toLowerCase().includes('paragon') ||
                k.toLowerCase().includes('board') ||
                k.toLowerCase().includes('glyph') ||
                k.toLowerCase().includes('barbarian')
            );
            results.windowKeys = windowKeys;

            // Try to extract from DOM
            const boardElements = document.querySelectorAll('[data-paragon-board], [class*="paragon-board"], [id*="paragon"]');
            results.boardElements = Array.from(boardElements).slice(0, 5).map(el => ({
                tag: el.tagName,
                id: el.id,
                className: el.className,
                textContent: el.textContent ? el.textContent.substring(0, 100) : ''
            }));

            return results;
        });

        console.log('\n=== Extracted Data Summary ===');
        console.log('Boards found:', paragonData.boards.length || 'N/A');
        console.log('Nodes found:', paragonData.nodes.length || 'N/A');
        console.log('Glyphs found:', paragonData.glyphs.length || 'N/A');
        console.log('WH namespace keys:', paragonData.whNamespace?.join(', ') || 'N/A');
        console.log('D4 namespace keys:', paragonData.d4Namespace?.join(', ') || 'N/A');
        console.log('Window keys with paragon/board:', paragonData.windowKeys?.join(', ') || 'None');
        console.log('API responses captured:', apiResponses.length);

        // Save all data
        const output = {
            timestamp: new Date().toISOString(),
            source: 'wowhead.com/diablo-4/paragon-calc/barbarian',
            class: 'Barbarian',
            apiResponses,
            pageData: paragonData
        };

        const filename = 'wowhead-barbarian-paragon-data.json';
        fs.writeFileSync(filename, JSON.stringify(output, null, 2));
        console.log(`\nData saved to ${filename}`);

        // Keep browser open for inspection
        console.log('\nBrowser will remain open for 30 seconds for manual inspection...');
        console.log('You can interact with the page and check the console for data structures.');
        await page.waitForTimeout(30000);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await browser.close();
        console.log('Browser closed.');
    }
}

scrapeWowheadParagonBoards().catch(console.error);
