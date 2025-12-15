/**
 * Create visual board layouts with gate nodes marked
 */

const fs = require('fs');

function createBoardSummaryWithGates(className, inputFile, outputMdFile, outputJsonFile) {
    console.log(`\nProcessing ${className}...`);
    const data = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
    const GATE_NODE_ID = 994337;

    // Create markdown summary
    let markdown = `# Diablo 4 - ${className} Paragon Boards\n\n`;
    markdown += `**Total Boards:** ${data.boards.length}\n\n`;
    markdown += '## Board Structure\n\n';
    markdown += '- **Starting Board**: Has 1 gate (entry point at North)\n';
    markdown += '- **All Other Boards**: Have 4 gates (North, South, East, West) for rotation and attachment\n\n';
    markdown += '---\n\n';

    data.boards.forEach((board, idx) => {
        const isStartingBoard = idx === 0;

        markdown += `## Board ${idx + 1}: ${board.name}\n\n`;
        markdown += `**Board ID:** ${board.id}\n`;
        markdown += `**Total Nodes:** ${board.nodes.length}\n`;
        markdown += `**Grid Size:** ~21x21 (nodes positioned from x:0-20, y:0-20)\n`;

        if (isStartingBoard) {
            markdown += `**Gates:** 1 (North - Entry Point)\n\n`;
        } else {
            markdown += `**Gates:** 4 (North, South, East, West - Rotatable)\n\n`;
        }

        // Legendary Nodes
        if (board.legendaryNodes.length > 0) {
            markdown += `### Legendary Nodes\n\n`;
            board.legendaryNodes.forEach(leg => {
                markdown += `#### ${leg.name}\n`;
                const cleanDesc = leg.description
                    .replace(/<span[^>]*>/g, '')
                    .replace(/<\/span>/g, '')
                    .replace(/<br>/g, '\n')
                    .replace(/&quot;/g, '"')
                    .replace(/<u>/g, '')
                    .replace(/<\/u>/g, '');
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

        // Grid layout visualization with gates marked
        markdown += `### Board Layout\n\n`;
        markdown += '```\n';

        // Create grid
        const grid = Array(21).fill(null).map(() => Array(21).fill('.'));

        // Place all nodes
        board.nodes.forEach(node => {
            if (node.x >= 0 && node.x <= 20 && node.y >= 0 && node.y <= 20) {
                grid[node.y][node.x] = 'o';
            }
        });

        // Mark gates (node ID 994337)
        board.nodes.forEach(node => {
            if (node.node === GATE_NODE_ID &&
                node.x >= 0 && node.x <= 20 &&
                node.y >= 0 && node.y <= 20) {

                // Determine gate direction
                if (node.x === 10 && node.y === 0) {
                    grid[node.y][node.x] = isStartingBoard ? 'S' : 'N'; // North
                } else if (node.x === 10 && node.y === 20) {
                    grid[node.y][node.x] = 'S'; // South
                } else if (node.x === 0 && node.y === 10) {
                    grid[node.y][node.x] = 'W'; // West
                } else if (node.x === 20 && node.y === 10) {
                    grid[node.y][node.x] = 'E'; // East
                }
            }
        });

        // Print grid
        for (let y = 0; y < 21; y++) {
            markdown += grid[y].join('') + '\n';
        }

        markdown += '```\n\n';

        if (isStartingBoard) {
            markdown += `**Legend:**\n`;
            markdown += `- S = Start/Gate (Entry Point)\n`;
            markdown += `- o = Node\n`;
            markdown += `- . = Empty\n\n`;
        } else {
            markdown += `**Legend:**\n`;
            markdown += `- N = North Gate\n`;
            markdown += `- S = South Gate\n`;
            markdown += `- E = East Gate\n`;
            markdown += `- W = West Gate\n`;
            markdown += `- o = Node\n`;
            markdown += `- . = Empty\n\n`;
            markdown += `*Note: Board can be rotated when attaching to other boards*\n\n`;
        }

        markdown += '---\n\n';
    });

    // Save markdown
    fs.writeFileSync(outputMdFile, markdown);
    console.log(`✓ Saved markdown to ${outputMdFile}`);

    // Update JSON summary with gate information
    const summary = {
        className: className,
        classId: data.classId,
        totalBoards: data.boards.length,
        boards: data.boards.map((board, idx) => {
            const isStartingBoard = idx === 0;
            const gates = board.nodes
                .filter(n => n.node === GATE_NODE_ID)
                .map(g => {
                    let direction = 'unknown';
                    if (g.x === 10 && g.y === 0) direction = 'North';
                    else if (g.x === 10 && g.y === 20) direction = 'South';
                    else if (g.x === 0 && g.y === 10) direction = 'West';
                    else if (g.x === 20 && g.y === 10) direction = 'East';

                    return {
                        direction: direction,
                        x: g.x,
                        y: g.y
                    };
                });

            return {
                index: idx + 1,
                id: board.id,
                name: board.name,
                nodeCount: board.nodes.length,
                legendaryNodeCount: board.legendaryNodes.length,
                rareNodeCount: board.rareNodes.length,
                isStartingBoard: isStartingBoard,
                gates: gates,
                gateCount: gates.length,
                legendaryNodes: board.legendaryNodes.map(l => ({
                    name: l.name,
                    description: l.description.replace(/<[^>]*>/g, '').replace(/&quot;/g, '"')
                })),
                rareNodes: board.rareNodes.map(r => ({
                    name: r.name,
                    attributes: r.attributes
                }))
            };
        })
    };

    fs.writeFileSync(outputJsonFile, JSON.stringify(summary, null, 2));
    console.log(`✓ Saved JSON summary to ${outputJsonFile}`);

    // Print summary
    console.log(`\n=== ${className} Summary ===`);
    console.log(`Total Boards: ${summary.totalBoards}`);
    console.log('\nBoards:');
    summary.boards.forEach((board) => {
        const gateInfo = board.gates.map(g => g.direction).join(', ');
        console.log(`  ${board.index}. ${board.name} (${board.nodeCount} nodes, ${board.gateCount} gates: ${gateInfo})`);
    });
}

// Process both Barbarian and Paladin
createBoardSummaryWithGates(
    'Barbarian',
    'barbarian-paragon-boards.json',
    'BARBARIAN_PARAGON_BOARDS.md',
    'barbarian-boards-summary.json'
);

createBoardSummaryWithGates(
    'Paladin',
    'paladin-paragon-boards.json',
    'PALADIN_PARAGON_BOARDS.md',
    'paladin-boards-summary.json'
);

console.log('\n✅ Complete! Updated both Barbarian and Paladin board visualizations with gates marked.');
