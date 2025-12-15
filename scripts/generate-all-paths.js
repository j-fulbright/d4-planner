/**
 * Generate board-paths.json for all classes
 */

const fs = require('fs');

// Determine if two nodes are adjacent (connected)
function areNodesAdjacent(node1, node2) {
    const dx = Math.abs(node1.x - node2.x);
    const dy = Math.abs(node1.y - node2.y);
    return (dx <= 1 && dy <= 1) && (dx + dy > 0);
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

    return null;
}

// Analyze board paths for a class
function analyzeBoardPaths(className, boardData) {
    console.log(`\nAnalyzing paths for ${className}...`);

    const results = {
        className: className,
        classId: boardData.classId,
        boards: []
    };

    boardData.boards.forEach((board, idx) => {
        const isStartingBoard = idx === 0;
        const graph = buildGraph(board.nodes);

        const GATE_NODE_ID = 994337;
        const gates = board.nodes.filter(n => n.node === GATE_NODE_ID);

        const gateLabels = gates.map(g => {
            if (g.x === 10 && g.y === 0) return { ...g, label: 'North' };
            if (g.x === 10 && g.y === 20) return { ...g, label: 'South' };
            if (g.x === 0 && g.y === 10) return { ...g, label: 'West' };
            if (g.x === 20 && g.y === 10) return { ...g, label: 'East' };
            return { ...g, label: 'Unknown' };
        });

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
            // For starting board, find paths to key positions
            const keyPositions = [
                { x: 10, y: 14, label: 'Bottom Center' },
                { x: 6, y: 7, label: 'Left Branch' },
                { x: 14, y: 7, label: 'Right Branch' }
            ];

            keyPositions.forEach(target => {
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
            for (let i = 0; i < gateLabels.length; i++) {
                for (let j = i + 1; j < gateLabels.length; j++) {
                    const gate1 = gateLabels[i];
                    const gate2 = gateLabels[j];

                    const path = findShortestPath(graph, gate1, gate2);
                    if (path) {
                        boardResult.paths.push({
                            from: `${gate1.label} (${gate1.x},${gate1.y})`,
                            to: `${gate2.label} (${gate2.x},${gate2.y})`,
                            distance: path.distance,
                            path: path.path
                        });
                    }
                }
            }

            // Find path from North gate to center (potential legendary area)
            if (board.legendaryNodes.length > 0) {
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

// Process all classes
const classNames = ['sorcerer', 'necromancer', 'rogue', 'druid', 'spiritborn'];

console.log('Generating board path analysis for all classes...\n');

classNames.forEach(className => {
    const classDir = `classes/${className}`;
    const dataFile = `${classDir}/${className}-paragon-boards.json`;
    const outputFile = `${classDir}/${className}-board-paths.json`;

    if (!fs.existsSync(dataFile)) {
        console.log(`❌ Skipping ${className}: Data file not found`);
        return;
    }

    const classData = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
    const pathAnalysis = analyzeBoardPaths(className.charAt(0).toUpperCase() + className.slice(1), classData);

    fs.writeFileSync(outputFile, JSON.stringify(pathAnalysis, null, 2));
    console.log(`✅ Created: ${outputFile}`);

    // Print summary
    console.log(`   Boards analyzed: ${pathAnalysis.boards.length}`);
    console.log(`   Total paths calculated: ${pathAnalysis.boards.reduce((sum, b) => sum + b.paths.length, 0)}`);
});

console.log('\n✅ All board-paths.json files generated!');
