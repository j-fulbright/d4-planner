/**
 * Parse Wowhead paragon data and extract Barbarian board information
 */

const fs = require('fs');

console.log('Reading paragon data...');
const rawData = JSON.parse(fs.readFileSync('wowhead-paragon-raw.json', 'utf8'));

console.log('Data structure keys:', Object.keys(rawData).join(', '));

// Analyze the structure
const analysis = {
    dataKeys: Object.keys(rawData),
    counts: {}
};

Object.keys(rawData).forEach(key => {
    const value = rawData[key];
    if (Array.isArray(value)) {
        analysis.counts[key] = `Array with ${value.length} items`;
        if (value.length > 0) {
            analysis.counts[`${key}_firstItem`] = value[0];
        }
    } else if (typeof value === 'object' && value !== null) {
        analysis.counts[key] = `Object with ${Object.keys(value).length} keys`;
        analysis.counts[`${key}_keys`] = Object.keys(value).slice(0, 10);
    } else {
        analysis.counts[key] = typeof value;
    }
});

console.log('\n=== Data Structure Analysis ===');
console.log(JSON.stringify(analysis, null, 2));

// Try to find Barbarian-specific data
console.log('\n=== Looking for Barbarian Data ===');

// Common patterns to search for
const searchTerms = ['barbarian', 'board', 'paragon', 'node', 'glyph'];
const barbarianData = {};

searchTerms.forEach(term => {
    Object.keys(rawData).forEach(key => {
        if (key.toLowerCase().includes(term)) {
            console.log(`Found key containing "${term}": ${key}`);
            barbarianData[key] = rawData[key];
        }
    });
});

// If the data has a boards or paragonBoards key, examine it
const possibleBoardKeys = ['boards', 'paragonBoards', 'paragon', 'p', 'b'];
possibleBoardKeys.forEach(key => {
    if (rawData[key]) {
        console.log(`\nFound data under key "${key}"`);
        const data = rawData[key];

        if (typeof data === 'object') {
            // Check if boards have class information
            const boardIds = Object.keys(data);
            console.log(`Number of boards/items: ${boardIds.length}`);
            console.log(`Sample IDs: ${boardIds.slice(0, 5).join(', ')}`);

            // Examine first board structure
            if (boardIds.length > 0) {
                const firstBoard = data[boardIds[0]];
                console.log(`\nFirst board structure (ID: ${boardIds[0]}):`);
                console.log(JSON.stringify(firstBoard, null, 2).substring(0, 500));
            }
        }
    }
});

// Save analysis
fs.writeFileSync('paragon-data-analysis.json', JSON.stringify(analysis, null, 2));
console.log('\n✓ Analysis saved to paragon-data-analysis.json');

// If we found Barbarian data, save it
if (Object.keys(barbarianData).length > 0) {
    fs.writeFileSync('barbarian-paragon-extracted.json', JSON.stringify(barbarianData, null, 2));
    console.log('✓ Barbarian data saved to barbarian-paragon-extracted.json');
}
