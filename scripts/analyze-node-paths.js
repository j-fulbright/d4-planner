/**
 * Analyze node connectivity and find optimal paths through paragon boards
 */

const fs = require('fs');

// Determine if two nodes are adjacent (connected)
function areNodesAdjacent(node1, node2) {
    const dx = Math.abs(node1.x - node2.x);
    const dy = Math.abs(node1.y - node2.y);

    // Nodes are adjacent ONLY if horizontally or vertically connected (NO diagonals)
    // Must be exactly 1 step away in either X or Y direction, but not both
    return (dx + dy === 1);
}

// Build adjacency graph
function buildGraph(nodes) {
    const graph = new Map();

    nodes.forEach((node, idx) => {
        const key = `${node.x},${node.y}`;
        const neighbors = [];

        nodes.forEach((otherNode, otherIdx) => {
            if (idx !== otherIdx && areNodesAdjacent(node, otherNode)) {
                neighbors.push({
                    x: otherNode.x,
                    y: otherNode.y,
                    node: otherNode.node
                });
            }
        });

        graph.set(key, {
            ...node,
            neighbors: neighbors
        });
    });

    return graph;
}

// Find shortest path using BFS
function findShortestPath(graph, startPos, endPos) {
    const startKey = `${startPos.x},${startPos.y}`;
    const endKey = `${endPos.x},${endPos.y}`;

    if (startKey === endKey) {
        return { path: [startPos], distance: 0 };
    }

    const queue = [[startKey]];
    const visited = new Set([startKey]);

    while (queue.length > 0) {
        const path = queue.shift();
        const currentKey = path[path.length - 1];

        if (currentKey === endKey) {
            // Reconstruct full path with coordinates
            const fullPath = path.map(key => {
                const [x, y] = key.split(',').map(Number);
                return { x, y };
            });
            return {
                path: fullPath,
                distance: path.length - 1
            };
        }

        const currentNode = graph.get(currentKey);
        if (!currentNode) continue;

        for (const neighbor of currentNode.neighbors) {
            const neighborKey = `${neighbor.x},${neighbor.y}`;

            if (!visited.has(neighborKey)) {
                visited.add(neighborKey);
                queue.push([...path, neighborKey]);
            }
        }
    }

    return null; // No path found
}

// Analyze board paths
function analyzeBoardPaths(className, boardData) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`${className.toUpperCase()} - PARAGON BOARD PATH ANALYSIS`);
    console.log('='.repeat(60));

    const results = {
        className: className,
        boards: []
    };

    boardData.boards.forEach((board, idx) => {
        const isStartingBoard = idx === 0;
        console.log(`\n--- Board ${idx + 1}: ${board.name} ---`);

        // Build graph
        const graph = buildGraph(board.nodes);
        console.log(`Total nodes: ${board.nodes.length}`);
        console.log(`Total connections: ${Array.from(graph.values()).reduce((sum, n) => sum + n.neighbors.length, 0) / 2}`);

        // Find gates
        const GATE_NODE_ID = 994337;
        const gates = board.nodes.filter(n => n.node === GATE_NODE_ID);

        const gateLabels = gates.map(g => {
            if (g.x === 10 && g.y === 0) return { ...g, label: 'North' };
            if (g.x === 10 && g.y === 20) return { ...g, label: 'South' };
            if (g.x === 0 && g.y === 10) return { ...g, label: 'West' };
            if (g.x === 20 && g.y === 10) return { ...g, label: 'East' };
            return { ...g, label: 'Unknown' };
        });

        console.log(`\nGates: ${gateLabels.map(g => `${g.label} (${g.x},${g.y})`).join(', ')}`);

        const boardResult = {
            boardIndex: idx + 1,
            boardName: board.name,
            boardId: board.id,
            isStartingBoard: isStartingBoard,
            nodeCount: board.nodes.length,
            gates: gateLabels,
            paths: []
        };

        if (isStartingBoard) {
            console.log(`\n**Starting Board** - Entry at North (10,0)`);
            console.log(`This is the entry point to the paragon system.`);

            // Find paths to edge nodes or key positions
            const keyPositions = [
                { x: 10, y: 14, label: 'Bottom Center' },
                { x: 6, y: 7, label: 'Left Branch' },
                { x: 14, y: 7, label: 'Right Branch' }
            ];

            keyPositions.forEach(target => {
                // Find closest actual node to target
                let closestNode = null;
                let minDist = Infinity;

                board.nodes.forEach(node => {
                    const dist = Math.abs(node.x - target.x) + Math.abs(node.y - target.y);
                    if (dist < minDist) {
                        minDist = dist;
                        closestNode = node;
                    }
                });

                if (closestNode) {
                    const path = findShortestPath(graph, { x: 10, y: 0 }, closestNode);
                    if (path) {
                        console.log(`\nPath to ${target.label} (${closestNode.x},${closestNode.y}): ${path.distance} nodes`);
                        boardResult.paths.push({
                            from: 'Start (10,0)',
                            to: `${target.label} (${closestNode.x},${closestNode.y})`,
                            distance: path.distance,
                            path: path.path
                        });
                    }
                }
            });
        } else {
            // For non-starting boards, find paths between gates
            console.log(`\n**Rotatable Board** - ${gates.length} gates`);

            for (let i = 0; i < gateLabels.length; i++) {
                for (let j = i + 1; j < gateLabels.length; j++) {
                    const gate1 = gateLabels[i];
                    const gate2 = gateLabels[j];

                    const path = findShortestPath(graph, gate1, gate2);
                    if (path) {
                        console.log(`\n${gate1.label} → ${gate2.label}: ${path.distance} nodes`);
                        boardResult.paths.push({
                            from: `${gate1.label} (${gate1.x},${gate1.y})`,
                            to: `${gate2.label} (${gate2.x},${gate2.y})`,
                            distance: path.distance,
                            path: path.path
                        });
                    }
                }
            }

            // Find path from North gate to legendary node (if exists)
            if (board.legendaryNodes.length > 0) {
                console.log(`\n**Path to Legendary Node: ${board.legendaryNodes[0].name}**`);

                // Legendary nodes are typically in the center-ish area
                // Find nodes near center (around 10,10)
                let legendaryPos = null;
                let minDistToCenter = Infinity;

                board.nodes.forEach(node => {
                    const distToCenter = Math.abs(node.x - 10) + Math.abs(node.y - 10);
                    if (distToCenter < minDistToCenter && distToCenter > 3) {
                        minDistToCenter = distToCenter;
                        legendaryPos = node;
                    }
                });

                if (legendaryPos) {
                    const northGate = gateLabels.find(g => g.label === 'North');
                    if (northGate) {
                        const path = findShortestPath(graph, northGate, legendaryPos);
                        if (path) {
                            console.log(`North Gate → Legendary area (${legendaryPos.x},${legendaryPos.y}): ${path.distance} nodes`);
                            boardResult.paths.push({
                                from: `North Gate (${northGate.x},${northGate.y})`,
                                to: `Legendary area (${legendaryPos.x},${legendaryPos.y})`,
                                distance: path.distance,
                                path: path.path,
                                special: 'Path to Legendary Node'
                            });
                        }
                    }
                }
            }
        }

        results.boards.push(boardResult);
    });

    return results;
}

// Process both classes
const barbarianData = JSON.parse(fs.readFileSync('barbarian-paragon-boards.json', 'utf8'));
const paladinData = JSON.parse(fs.readFileSync('paladin-paragon-boards.json', 'utf8'));

const barbarianPaths = analyzeBoardPaths('Barbarian', barbarianData);
const paladinPaths = analyzeBoardPaths('Paladin', paladinData);

// Save results
fs.writeFileSync('barbarian-board-paths.json', JSON.stringify(barbarianPaths, null, 2));
fs.writeFileSync('paladin-board-paths.json', JSON.stringify(paladinPaths, null, 2));

console.log('\n' + '='.repeat(60));
console.log('✅ Path analysis complete!');
console.log('Files saved:');
console.log('  - barbarian-board-paths.json');
console.log('  - paladin-board-paths.json');
console.log('='.repeat(60));
