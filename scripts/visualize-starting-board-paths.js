/**
 * Create detailed visual documentation of starting board paths
 */

const fs = require('fs');

// Load the path analysis results
const barbarianPaths = JSON.parse(fs.readFileSync('barbarian-board-paths.json', 'utf8'));
const paladinPaths = JSON.parse(fs.readFileSync('paladin-board-paths.json', 'utf8'));

function visualizeBoardPaths(className, pathData, boardData) {
    const startingBoard = pathData.boards[0];
    const actualBoard = boardData.boards[0];

    let doc = `# ${className} Starting Board - Path Analysis\n\n`;
    doc += `**Board Name:** ${startingBoard.boardName}\n`;
    doc += `**Board ID:** ${startingBoard.boardId}\n`;
    doc += `**Total Nodes:** ${startingBoard.nodeCount}\n`;
    doc += `**Starting Position:** North Gate (10, 0)\n\n`;

    doc += `## Path Summary\n\n`;
    doc += `The starting board is the entry point to the paragon system. From the starting node at (10, 0), you can take different paths to reach various parts of the board.\n\n`;

    doc += `### Optimal Paths from Start\n\n`;

    startingBoard.paths.forEach((pathInfo, idx) => {
        doc += `#### Path ${idx + 1}: ${pathInfo.from} → ${pathInfo.to}\n`;
        doc += `- **Distance:** ${pathInfo.distance} nodes\n`;
        doc += `- **Coordinates:** `;

        // Show path with arrows
        const pathStr = pathInfo.path.map(p => `(${p.x},${p.y})`).join(' → ');
        doc += pathStr + '\n\n';
    });

    doc += `## Visual Path Maps\n\n`;
    doc += `Below are visual representations of each path through the board. The paths are marked with numbers (1, 2, 3...) showing the sequence of nodes to follow.\n\n`;

    startingBoard.paths.forEach((pathInfo, pathIdx) => {
        doc += `### Path ${pathIdx + 1}: ${pathInfo.to}\n\n`;
        doc += `**${pathInfo.distance} nodes from start**\n\n`;
        doc += '```\n';

        // Create grid
        const grid = Array(21).fill(null).map(() => Array(21).fill('.'));

        // Place all nodes
        actualBoard.nodes.forEach(node => {
            if (node.x >= 0 && node.x <= 20 && node.y >= 0 && node.y <= 20) {
                grid[node.y][node.x] = 'o';
            }
        });

        // Mark the path
        pathInfo.path.forEach((node, stepIdx) => {
            if (node.x >= 0 && node.x <= 20 && node.y >= 0 && node.y <= 20) {
                if (stepIdx === 0) {
                    grid[node.y][node.x] = 'S'; // Start
                } else if (stepIdx === pathInfo.path.length - 1) {
                    grid[node.y][node.x] = 'X'; // Destination
                } else if (stepIdx < 10) {
                    grid[node.y][node.x] = String(stepIdx);
                } else {
                    grid[node.y][node.x] = '*'; // For longer paths
                }
            }
        });

        // Print grid
        for (let y = 0; y < 21; y++) {
            doc += grid[y].join('') + '\n';
        }

        doc += '```\n\n';
        doc += `**Legend:**\n`;
        doc += `- S = Start (10,0)\n`;
        doc += `- X = Destination ${pathInfo.to}\n`;
        doc += `- 1-9 = Path sequence (steps 1-9)\n`;
        doc += `- * = Path continues (step 10+)\n`;
        doc += `- o = Available node\n`;
        doc += `- . = Empty\n\n`;

        // List the step-by-step path
        doc += `**Step-by-step path:**\n`;
        pathInfo.path.forEach((node, stepIdx) => {
            doc += `${stepIdx + 1}. (${node.x}, ${node.y})`;
            if (stepIdx === 0) doc += ' - START';
            if (stepIdx === pathInfo.path.length - 1) doc += ' - DESTINATION';
            doc += '\n';
        });
        doc += '\n---\n\n';
    });

    // Add overview map with all paths
    doc += `## Complete Board Overview\n\n`;
    doc += `All three optimal paths from the starting position:\n\n`;
    doc += '```\n';

    const overviewGrid = Array(21).fill(null).map(() => Array(21).fill('.'));

    // Place all nodes
    actualBoard.nodes.forEach(node => {
        if (node.x >= 0 && node.x <= 20 && node.y >= 0 && node.y <= 20) {
            overviewGrid[node.y][node.x] = 'o';
        }
    });

    // Mark start
    overviewGrid[10][0] = 'S';

    // Mark all path endpoints
    startingBoard.paths.forEach((pathInfo, pathIdx) => {
        const lastNode = pathInfo.path[pathInfo.path.length - 1];
        if (lastNode.x >= 0 && lastNode.x <= 20 && lastNode.y >= 0 && lastNode.y <= 20) {
            overviewGrid[lastNode.y][lastNode.x] = String(pathIdx + 1);
        }
    });

    // Print grid
    for (let y = 0; y < 21; y++) {
        doc += overviewGrid[y].join('') + '\n';
    }

    doc += '```\n\n';
    doc += `**Legend:**\n`;
    doc += `- S = Starting Gate\n`;
    startingBoard.paths.forEach((pathInfo, idx) => {
        doc += `- ${idx + 1} = ${pathInfo.to.split('(')[0].trim()} (${pathInfo.distance} nodes away)\n`;
    });
    doc += `- o = Available node\n`;
    doc += `- . = Empty\n\n`;

    // Add recommendations
    doc += `## Path Recommendations\n\n`;
    doc += `### Efficient Routing\n\n`;
    doc += `The starting board has a symmetric design with three main branches:\n\n`;
    doc += `1. **Center Path** - Continues straight down from the start\n`;
    doc += `2. **Left Branch** - Curves to the west side\n`;
    doc += `3. **Right Branch** - Curves to the east side\n\n`;
    doc += `**Strategy Tips:**\n`;
    doc += `- The starting board is where you allocate your first paragon points\n`;
    doc += `- After reaching the bottom (14 nodes), you can attach additional boards\n`;
    doc += `- The left and right branches (7 nodes each) provide alternative routes if you want specific stats\n`;
    doc += `- Most players rush through the center to unlock the first gate and attach specialized boards\n\n`;

    return doc;
}

// Load actual board data
const barbarianData = JSON.parse(fs.readFileSync('barbarian-paragon-boards.json', 'utf8'));
const paladinData = JSON.parse(fs.readFileSync('paladin-paragon-boards.json', 'utf8'));

// Generate documentation
const barbarianDoc = visualizeBoardPaths('Barbarian', barbarianPaths, barbarianData);
const paladinDoc = visualizeBoardPaths('Paladin', paladinPaths, paladinData);

fs.writeFileSync('BARBARIAN_STARTING_BOARD_PATHS.md', barbarianDoc);
fs.writeFileSync('PALADIN_STARTING_BOARD_PATHS.md', paladinDoc);

console.log('✅ Starting board path documentation created!');
console.log('Files:');
console.log('  - BARBARIAN_STARTING_BOARD_PATHS.md');
console.log('  - PALADIN_STARTING_BOARD_PATHS.md');
