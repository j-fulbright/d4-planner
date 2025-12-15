/**
 * Analyze node statistics on starting board paths
 */

const fs = require('fs');

// Load data
const allData = JSON.parse(fs.readFileSync('paragon-all-data.json', 'utf8'));
const nodes = allData['d4.paragonCalc.d4.nodes'];
const barbarianData = JSON.parse(fs.readFileSync('barbarian-paragon-boards.json', 'utf8'));
const barbarianPaths = JSON.parse(fs.readFileSync('barbarian-board-paths.json', 'utf8'));

const startingBoard = barbarianData.boards[0];
const startingBoardPaths = barbarianPaths.boards[0];

console.log('='.repeat(70));
console.log('STARTING BOARD - NODE STATISTICS ANALYSIS');
console.log('='.repeat(70));
console.log('');
console.log('NOTE: In the game UI, the starting node is at the BOTTOM');
console.log('      Y-coordinate 0 = bottom, Y-coordinate increases upward');
console.log('');

// Create a lookup for node positions to node IDs
const positionToNode = new Map();
startingBoard.nodes.forEach(node => {
    const key = `${node.x},${node.y}`;
    positionToNode.set(key, node.node);
});

// Analyze each path
startingBoardPaths.paths.forEach((pathInfo, pathIdx) => {
    console.log('='.repeat(70));
    console.log(`PATH ${pathIdx + 1}: ${pathInfo.to}`);
    console.log(`Distance: ${pathInfo.distance} nodes`);
    console.log('='.repeat(70));
    console.log('');

    // Collect stats along the path
    const statsCollected = {
        strength: 0,
        maxLife: 0,
        maxLifePercent: 0,
        damage: 0,
        damagePercent: 0,
        damageToElites: 0,
        totalArmor: 0,
        totalArmorPercent: 0,
        dexterity: 0,
        intelligence: 0,
        willpower: 0,
        other: []
    };

    const nodeDetails = [];

    pathInfo.path.forEach((pos, stepIdx) => {
        const key = `${pos.x},${pos.y}`;
        const nodeId = positionToNode.get(key);

        if (!nodeId) {
            console.log(`Step ${stepIdx + 1} (${pos.x}, ${pos.y}): No node found`);
            return;
        }

        const nodeDetail = nodes[nodeId];

        if (!nodeDetail) {
            console.log(`Step ${stepIdx + 1} (${pos.x}, ${pos.y}): Node ${nodeId} - No details available`);
            return;
        }

        // Parse node stats
        let nodeType = 'Common';
        let statBonus = 'Unknown';

        // Try to determine node type and stats from the available data
        // Nodes typically have: type, stats, name, desc
        if (nodeDetail.type === 'rare' || nodeDetail.type === 2) {
            nodeType = 'Rare';
        } else if (nodeDetail.type === 'magic' || nodeDetail.type === 1) {
            nodeType = 'Magic';
        } else if (nodeDetail.type === 'legendary' || nodeDetail.type === 3) {
            nodeType = 'Legendary';
        }

        // Look for stat information
        let stats = [];
        if (nodeDetail.stats && Array.isArray(nodeDetail.stats)) {
            stats = nodeDetail.stats;
        } else if (nodeDetail.attributes) {
            stats = nodeDetail.attributes;
        }

        // Common nodes in starting board typically give +5 to primary stat (Strength for Barbarian)
        // Magic nodes give better bonuses
        // Rare nodes are the named ones we saw earlier

        const nodeInfo = {
            step: stepIdx + 1,
            position: `(${pos.x}, ${pos.y})`,
            nodeId: nodeId,
            type: nodeType,
            stats: stats,
            name: nodeDetail.name || 'N/A'
        };

        nodeDetails.push(nodeInfo);

        // Aggregate stats (we'll estimate common nodes)
        if (stats.length === 0 && nodeType === 'Common') {
            // Common nodes typically give +5 Strength for Barbarian starting board
            statsCollected.strength += 5;
            nodeInfo.estimatedStat = '+5 Strength (estimated common node)';
        }

        // Process actual stats if available
        stats.forEach(stat => {
            const statStr = JSON.stringify(stat).toLowerCase();

            if (statStr.includes('strength')) {
                const match = statStr.match(/(\d+)/);
                if (match) statsCollected.strength += parseInt(match[1]);
            } else if (statStr.includes('maximum life') && statStr.includes('%')) {
                const match = statStr.match(/(\d+\.?\d*)/);
                if (match) statsCollected.maxLifePercent += parseFloat(match[1]);
            } else if (statStr.includes('damage') && statStr.includes('%') && statStr.includes('elite')) {
                const match = statStr.match(/(\d+\.?\d*)/);
                if (match) statsCollected.damageToElites += parseFloat(match[1]);
            } else if (statStr.includes('damage') && statStr.includes('%')) {
                const match = statStr.match(/(\d+\.?\d*)/);
                if (match) statsCollected.damagePercent += parseFloat(match[1]);
            } else if (statStr.includes('armor') && statStr.includes('%')) {
                const match = statStr.match(/(\d+\.?\d*)/);
                if (match) statsCollected.totalArmorPercent += parseFloat(match[1]);
            }
        });
    });

    // Print path details
    console.log('Node-by-Node Breakdown:');
    console.log('-'.repeat(70));
    nodeDetails.forEach(node => {
        console.log(`Step ${node.step}: ${node.position}`);
        console.log(`  Node ID: ${node.nodeId}`);
        console.log(`  Type: ${node.type}`);
        console.log(`  Name: ${node.name}`);
        if (node.estimatedStat) {
            console.log(`  Stats: ${node.estimatedStat}`);
        } else if (node.stats.length > 0) {
            console.log(`  Stats:`, JSON.stringify(node.stats, null, 2));
        } else {
            console.log(`  Stats: [Common node - typically +5 Strength]`);
        }
        console.log('');
    });

    console.log('='.repeat(70));
    console.log('CUMULATIVE STATS FOR THIS PATH:');
    console.log('-'.repeat(70));
    if (statsCollected.strength > 0) console.log(`Strength: +${statsCollected.strength}`);
    if (statsCollected.damagePercent > 0) console.log(`Damage: +${statsCollected.damagePercent}%`);
    if (statsCollected.damageToElites > 0) console.log(`Damage to Elites: +${statsCollected.damageToElites}%`);
    if (statsCollected.maxLifePercent > 0) console.log(`Maximum Life: +${statsCollected.maxLifePercent}%`);
    if (statsCollected.totalArmorPercent > 0) console.log(`Total Armor: +${statsCollected.totalArmorPercent}%`);

    console.log('');
    console.log('NOTE: Common nodes (no special name) typically provide +5 to primary stat');
    console.log('      Actual values may vary - check in-game tooltips');
    console.log('');
});

// Also analyze the rare nodes on the starting board
console.log('='.repeat(70));
console.log('RARE NODES ON STARTING BOARD:');
console.log('='.repeat(70));
console.log('');

startingBoard.rareNodes.forEach((rare, idx) => {
    console.log(`${idx + 1}. ${rare.name}`);
    rare.attributes.forEach(attr => {
        console.log(`   - ${attr}`);
    });
    console.log('');
});

console.log('='.repeat(70));
console.log('STRATEGY SUMMARY:');
console.log('='.repeat(70));
console.log('');
console.log('The Starting Board rare nodes are:');
startingBoard.rareNodes.forEach((rare, idx) => {
    console.log(`  ${idx + 1}. ${rare.name}: ${rare.attributes.join(', ')}`);
});
console.log('');
console.log('Path Selection Tips:');
console.log('- Center Path (14 nodes): Fastest route to next board, accumulates ~70 Strength');
console.log('- Left Branch (7 nodes): ~35 Strength, access to western rare nodes');
console.log('- Right Branch (7 nodes): ~35 Strength, access to eastern rare nodes');
console.log('');
console.log('Most efficient strategy: Rush center to unlock additional boards,');
console.log('then allocate points to rare nodes for their powerful bonuses.');
console.log('');
