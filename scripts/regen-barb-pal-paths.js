const fs = require('fs');

function areNodesAdjacent(node1, node2) {
    const dx = Math.abs(node1.x - node2.x);
    const dy = Math.abs(node1.y - node2.y);
    return (dx + dy === 1);
}

function buildGraph(nodes) {
    const graph = new Map();
    nodes.forEach((node, idx) => {
        const key = `${node.x},${node.y}`;
        const neighbors = [];
        nodes.forEach((otherNode, otherIdx) => {
            if (idx !== otherIdx && areNodesAdjacent(node, otherNode)) {
                neighbors.push({ x: otherNode.x, y: otherNode.y, node: otherNode.node });
            }
        });
        graph.set(key, { ...node, neighbors: neighbors });
    });
    return graph;
}

function findShortestPath(graph, startPos, endPos) {
    const startKey = `${startPos.x},${startPos.y}`;
    const endKey = `${endPos.x},${endPos.y}`;
    if (startKey === endKey) return { path: [startPos], distance: 0 };

    const queue = [[startKey]];
    const visited = new Set([startKey]);

    while (queue.length > 0) {
        const path = queue.shift();
        const currentKey = path[path.length - 1];
        if (currentKey === endKey) {
            return {
                path: path.map(key => {
                    const [x, y] = key.split(',').map(Number);
                    return { x, y };
                }),
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

['barbarian', 'paladin'].forEach(className => {
    console.log(`\nRegenerating ${className} paths (4-directional)...`);

    const dataFile = `classes/${className}/${className}-paragon-boards.json`;
    const classData = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

    const results = {
        className: className.charAt(0).toUpperCase() + className.slice(1),
        classId: classData.classId,
        boards: []
    };

    classData.boards.forEach((board, idx) => {
        const graph = buildGraph(board.nodes);
        const GATE_NODE_ID = 994337;
        const gates = board.nodes.filter(n => n.node === GATE_NODE_ID).map(g => {
            let label = 'Unknown';
            if (g.x === 10 && g.y === 0) label = 'North';
            else if (g.x === 10 && g.y === 20) label = 'South';
            else if (g.x === 0 && g.y === 10) label = 'West';
            else if (g.x === 20 && g.y === 10) label = 'East';
            return { ...g, label };
        });

        const boardResult = {
            boardIndex: idx + 1,
            boardName: board.name,
            boardId: board.id,
            isStartingBoard: idx === 0,
            nodeCount: board.nodes.length,
            gates: gates,
            paths: []
        };

        if (idx === 0) {
            const keyPositions = [{ x: 10, y: 14, label: 'Bottom Center' }];
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
            for (let i = 0; i < gates.length; i++) {
                for (let j = i + 1; j < gates.length; j++) {
                    const path = findShortestPath(graph, gates[i], gates[j]);
                    if (path) {
                        boardResult.paths.push({
                            from: `${gates[i].label} (${gates[i].x},${gates[i].y})`,
                            to: `${gates[j].label} (${gates[j].x},${gates[j].y})`,
                            distance: path.distance,
                            path: path.path
                        });
                    }
                }
            }
        }
        results.boards.push(boardResult);
    });

    fs.writeFileSync(`classes/${className}/${className}-board-paths.json`, JSON.stringify(results, null, 2));
    console.log(`✅ Saved: ${className}-board-paths.json`);
});

console.log('\n✅ Done!');
