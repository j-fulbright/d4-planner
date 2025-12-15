/**
 * Extract all data sections from Wowhead paragon calc data
 */

const fs = require('fs');

console.log('Reading raw data...');
const rawContent = fs.readFileSync('wowhead-paragon-raw.json', 'utf8');

// Find all WH.setPageData() calls
const regex = /WH\.setPageData\("([^"]+)",\s*(\{[^}]*\}|\[[^\]]*\])/g;
const allData = {};

let match;
let callIndex = 0;
const sections = [];

// Split by WH.setPageData to handle each section separately
const parts = rawContent.split('WH.setPageData(');

console.log(`Found ${parts.length - 1} data sections`);

for (let i = 1; i < parts.length; i++) {
    const part = parts[i];

    // Extract the key
    const keyMatch = part.match(/"([^"]+)"/);
    if (!keyMatch) continue;

    const key = keyMatch[1];
    console.log(`\nProcessing section: ${key}`);

    // Find where the JSON starts (after first comma)
    const jsonStart = part.indexOf(',') + 1;
    // Find the closing ); but need to handle nested braces
    let jsonContent = part.substring(jsonStart);

    // Find the matching closing brace/bracket
    let braceCount = 0;
    let bracketCount = 0;
    let inString = false;
    let escapeNext = false;
    let jsonEnd = -1;

    for (let j = 0; j < jsonContent.length; j++) {
        const char = jsonContent[j];

        if (escapeNext) {
            escapeNext = false;
            continue;
        }

        if (char === '\\') {
            escapeNext = true;
            continue;
        }

        if (char === '"' && !escapeNext) {
            inString = !inString;
            continue;
        }

        if (inString) continue;

        if (char === '{') braceCount++;
        if (char === '}') braceCount--;
        if (char === '[') bracketCount++;
        if (char === ']') bracketCount--;

        if (braceCount === 0 && bracketCount === 0 && (char === '}' || char === ']')) {
            jsonEnd = j + 1;
            break;
        }
    }

    if (jsonEnd === -1) {
        console.error(`  ✗ Could not find end of JSON for ${key}`);
        continue;
    }

    const jsonStr = jsonContent.substring(0, jsonEnd);

    try {
        const data = JSON.parse(jsonStr);
        allData[key] = data;

        // Get info about the data
        let info = '';
        if (Array.isArray(data)) {
            info = `Array with ${data.length} items`;
        } else if (typeof data === 'object') {
            info = `Object with ${Object.keys(data).length} keys`;
        }

        console.log(`  ✓ Parsed successfully: ${info}`);
        sections.push({ key, info });
    } catch (error) {
        console.error(`  ✗ Error parsing: ${error.message}`);
        // Save the problematic JSON for debugging
        fs.writeFileSync(`debug-${key.replace(/\./g, '-')}.txt`, jsonStr.substring(0, 1000));
    }
}

console.log('\n=== Summary ===');
sections.forEach(s => console.log(`${s.key}: ${s.info}`));

// Save all data
fs.writeFileSync('paragon-all-data.json', JSON.stringify(allData, null, 2));
console.log('\n✓ Saved all data to paragon-all-data.json');

// Now extract Barbarian-specific data
if (allData['d4.paragonCalc.d4.classBoards']) {
    const classBoards = allData['d4.paragonCalc.d4.classBoards'];
    console.log('\n=== Class Boards ===');
    console.log(JSON.stringify(classBoards, null, 2));

    // Find Barbarian class ID (usually 0 or similar)
    // The structure is likely: { "classId": [boardId1, boardId2, ...] }
}
