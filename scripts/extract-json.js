/**
 * Extract JSON from Wowhead's WH.setPageData() wrapper
 */

const fs = require('fs');

console.log('Reading raw data...');
const rawContent = fs.readFileSync('wowhead-paragon-raw.json', 'utf8');

console.log('File size:', rawContent.length, 'characters');

// Extract JSON from WH.setPageData("key", {...})
const match = rawContent.match(/WH\.setPageData\("([^"]+)",\s*({.*})\)/s);

if (match) {
    const dataKey = match[1];
    const jsonStr = match[2];

    console.log('Found data key:', dataKey);
    console.log('JSON string length:', jsonStr.length);

    try {
        const data = JSON.parse(jsonStr);
        console.log('\n✓ Successfully parsed JSON');
        console.log('Top-level structure:', Object.keys(data).length, 'board IDs');
        console.log('Board IDs:', Object.keys(data).slice(0, 10).join(', '), '...');

        // Save clean JSON
        fs.writeFileSync('paragon-boards-clean.json', JSON.stringify(data, null, 2));
        console.log('✓ Saved clean JSON to paragon-boards-clean.json');

        // Analyze board structure
        const firstBoardId = Object.keys(data)[0];
        const firstBoard = data[firstBoardId];
        console.log(`\nFirst board (ID: ${firstBoardId}):`);
        console.log('- Number of nodes:', firstBoard.length);
        console.log('- Sample nodes:', JSON.stringify(firstBoard.slice(0, 3), null, 2));

        // Count nodes per board
        const boardSizes = {};
        Object.entries(data).forEach(([id, nodes]) => {
            boardSizes[id] = nodes.length;
        });

        console.log('\nBoard sizes (nodes per board):');
        Object.entries(boardSizes)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .forEach(([id, count]) => {
                console.log(`  Board ${id}: ${count} nodes`);
            });

        // Save summary
        const summary = {
            dataKey: dataKey,
            totalBoards: Object.keys(data).length,
            boardIds: Object.keys(data),
            boardSizes: boardSizes,
            sampleBoard: {
                id: firstBoardId,
                nodeCount: firstBoard.length,
                sampleNodes: firstBoard.slice(0, 5)
            }
        };

        fs.writeFileSync('paragon-boards-summary.json', JSON.stringify(summary, null, 2));
        console.log('✓ Saved summary to paragon-boards-summary.json');

    } catch (error) {
        console.error('Error parsing JSON:', error.message);
    }
} else {
    console.error('Could not find WH.setPageData() pattern in file');
}
