/**
 * Create a readable summary of Barbarian paragon boards
 */

const fs = require('fs');

console.log('Loading Barbarian board data...');
const barbarianData = JSON.parse(fs.readFileSync('barbarian-paragon-boards.json', 'utf8'));

// Create a markdown summary
let markdown = '# Diablo 4 - Barbarian Paragon Boards\n\n';
markdown += `**Total Boards:** ${barbarianData.boards.length}\n\n`;
markdown += '---\n\n';

barbarianData.boards.forEach((board, idx) => {
    markdown += `## Board ${idx + 1}: ${board.legendaryNodes.length > 0 ? board.legendaryNodes[0].name : `Board ${board.id}`}\n\n`;
    markdown += `**Board ID:** ${board.id}\n`;
    markdown += `**Total Nodes:** ${board.nodes.length}\n`;
    markdown += `**Grid Size:** ~21x21 (nodes positioned from x:0-20, y:0-20)\n\n`;

    // Legendary Nodes
    if (board.legendaryNodes.length > 0) {
        markdown += `### Legendary Nodes\n\n`;
        board.legendaryNodes.forEach(leg => {
            markdown += `#### ${leg.name}\n`;
            // Clean up HTML from description
            const cleanDesc = leg.description
                .replace(/<span[^>]*>/g, '')
                .replace(/<\/span>/g, '')
                .replace(/<br>/g, '\n')
                .replace(/&quot;/g, '"');
            markdown += `${cleanDesc}\n\n`;
        });
    }

    // Rare Nodes
    if (board.rareNodes.length > 0) {
        markdown += `### Rare Nodes\n\n`;
        board.rareNodes.forEach(rare => {
            markdown += `- **${rare.name}**\n`;
            rare.attributes.forEach(attr => {
                markdown += `  - ${attr}\n`;
            });
            markdown += '\n';
        });
    }

    // Node statistics
    const nodeTypes = {};
    const nodeStats = {};

    board.nodeDetails.forEach(node => {
        if (node.details) {
            const detail = node.details;

            // Count node types
            const type = detail.type || 'unknown';
            nodeTypes[type] = (nodeTypes[type] || 0) + 1;

            // Collect stats
            if (detail.stats) {
                detail.stats.forEach(stat => {
                    const statName = stat.name || 'unknown';
                    if (!nodeStats[statName]) nodeStats[statName] = 0;
                    nodeStats[statName]++;
                });
            }
        }
    });

    markdown += `### Node Distribution\n\n`;
    Object.entries(nodeTypes).forEach(([type, count]) => {
        markdown += `- ${type}: ${count} nodes\n`;
    });
    markdown += '\n';

    // Grid layout visualization (simplified)
    markdown += `### Board Layout (Simplified)\n\n`;
    markdown += '```\n';

    // Create a simple grid visualization
    const grid = Array(21).fill(null).map(() => Array(21).fill('.'));

    board.nodes.forEach(node => {
        if (node.x >= 0 && node.x <= 20 && node.y >= 0 && node.y <= 20) {
            grid[node.y][node.x] = 'o';
        }
    });

    // Mark start node
    grid[0][10] = 'S';

    // Print grid
    for (let y = 0; y < 21; y++) {
        markdown += grid[y].join('') + '\n';
    }

    markdown += '```\n';
    markdown += `\nLegend: S = Start, o = Node, . = Empty\n\n`;
    markdown += '---\n\n';
});

// Save markdown
fs.writeFileSync('BARBARIAN_PARAGON_BOARDS.md', markdown);
console.log('✓ Saved markdown summary to BARBARIAN_PARAGON_BOARDS.md');

// Create a JSON summary with just the essential info
const summary = {
    className: 'Barbarian',
    classId: barbarianData.classId,
    totalBoards: barbarianData.boards.length,
    boards: barbarianData.boards.map((board, idx) => ({
        index: idx + 1,
        id: board.id,
        name: board.legendaryNodes.length > 0 ? board.legendaryNodes[0].name : `Starting Board`,
        nodeCount: board.nodes.length,
        legendaryNodeCount: board.legendaryNodes.length,
        rareNodeCount: board.rareNodes.length,
        legendaryNodes: board.legendaryNodes.map(l => ({
            name: l.name,
            description: l.description.replace(/<[^>]*>/g, '').replace(/&quot;/g, '"')
        })),
        rareNodes: board.rareNodes.map(r => ({
            name: r.name,
            attributes: r.attributes
        }))
    }))
};

fs.writeFileSync('barbarian-boards-summary.json', JSON.stringify(summary, null, 2));
console.log('✓ Saved simplified summary to barbarian-boards-summary.json');

console.log('\n=== Summary ===');
console.log(`Total Barbarian Paragon Boards: ${summary.totalBoards}`);
console.log('\nBoard Names:');
summary.boards.forEach((board, idx) => {
    console.log(`  ${idx + 1}. ${board.name} (${board.nodeCount} nodes)`);
});

console.log('\n✓ Complete! Check the following files:');
console.log('  - barbarian-paragon-boards.json (full data with all node details)');
console.log('  - barbarian-boards-summary.json (simplified summary)');
console.log('  - BARBARIAN_PARAGON_BOARDS.md (readable markdown documentation)');
