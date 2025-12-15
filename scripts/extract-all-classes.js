/**
 * Extract legendary board data for all remaining classes
 */

const fs = require('fs');

// Load data
const allData = JSON.parse(fs.readFileSync('raw-data/paragon-all-data.json', 'utf8'));
const classBoards = allData['d4.paragonCalc.d4.classBoards'];
const boardNodes = allData['d4.paragonCalc.d4.boardNodes'];
const nodes = allData['d4.paragonCalc.d4.nodes'];

const classInfo = {
  '0': { name: 'Sorcerer', primaryStat: 'Intelligence', resource: 'Mana' },
  '1': { name: 'Druid', primaryStat: 'Willpower', resource: 'Spirit' },
  '3': { name: 'Rogue', primaryStat: 'Dexterity', resource: 'Energy' },
  '4': { name: 'Necromancer', primaryStat: 'Intelligence', resource: 'Essence' },
  '5': { name: 'Spiritborn', primaryStat: 'Dexterity', resource: 'Vigor' }
};

console.log('Extracting legendary boards for all remaining classes...\n');

Object.entries(classInfo).forEach(([classId, info]) => {
  console.log(`\n${'='.repeat(70)}`);
  console.log(`Processing: ${info.name} (Class ${classId})`);
  console.log('='.repeat(70));

  const classBoards_data = classBoards[classId];

  const classData = {
    classId: classId,
    className: info.name,
    primaryStat: info.primaryStat,
    resource: info.resource,
    boards: classBoards_data.map(board => {
      const boardId = board.sno;
      return {
        id: boardId,
        name: board.legendaries.length > 0 ? board.legendaries[0].name : 'Starting Board',
        legendaryNodes: board.legendaries,
        rareNodes: board.rares,
        nodes: boardNodes[boardId] || [],
        nodeDetails: (boardNodes[boardId] || []).map(pos => {
          const nodeId = pos.node;
          return {
            ...pos,
            details: nodes[nodeId]
          };
        })
      };
    }),
    allBoardIds: classBoards_data.map(b => b.sno)
  };

  // Create class directory if it doesn't exist
  const classDir = `classes/${info.name.toLowerCase()}`;
  if (!fs.existsSync(classDir)) {
    fs.mkdirSync(classDir, { recursive: true });
  }

  // Save full data
  const fullDataPath = `${classDir}/${info.name.toLowerCase()}-paragon-boards.json`;
  fs.writeFileSync(fullDataPath, JSON.stringify(classData, null, 2));
  console.log(`✅ Saved: ${fullDataPath}`);

  // Create summary
  const summary = {
    className: info.name,
    classId: classId,
    primaryStat: info.primaryStat,
    resource: info.resource,
    totalBoards: classData.boards.length,
    boards: classData.boards.map((board, idx) => {
      const isStartingBoard = idx === 0;
      const GATE_NODE_ID = 994337;
      const gates = board.nodes
        .filter(n => n.node === GATE_NODE_ID)
        .map(g => {
          let direction = 'unknown';
          if (g.x === 10 && g.y === 0) direction = 'North';
          else if (g.x === 10 && g.y === 20) direction = 'South';
          else if (g.x === 0 && g.y === 10) direction = 'West';
          else if (g.x === 20 && g.y === 10) direction = 'East';
          return { direction, x: g.x, y: g.y };
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

  const summaryPath = `${classDir}/${info.name.toLowerCase()}-boards-summary.json`;
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  console.log(`✅ Saved: ${summaryPath}`);

  // Print board names
  console.log(`\nBoards for ${info.name}:`);
  classData.boards.forEach((board, idx) => {
    console.log(`  ${idx + 1}. ${board.name} (${board.nodes.length} nodes)`);
  });
});

console.log(`\n${'='.repeat(70)}`);
console.log('✅ ALL CLASSES EXTRACTED!');
console.log('='.repeat(70));
