/**
 * Analyze ALL stats (Str/Dex/Will/Int) for 36-point build
 */

const fs = require('fs');

const barbarianData = JSON.parse(fs.readFileSync('classes/barbarian/barbarian-paragon-boards.json', 'utf8'));
const barbarianPaths = JSON.parse(fs.readFileSync('classes/barbarian/barbarian-board-paths.json', 'utf8'));
const allData = JSON.parse(fs.readFileSync('raw-data/paragon-all-data.json', 'utf8'));
const nodes = allData['d4.paragonCalc.d4.nodes'];

const startingBoard = barbarianData.boards[0];
const pathToGate = barbarianPaths.boards[0].paths.find(p => p.to.includes('Bottom Center'));

console.log('═'.repeat(70));
console.log('COMPLETE STAT ANALYSIS - 36 POINT BARBARIAN BUILD');
console.log('═'.repeat(70));
console.log('');

// Track all stats
const stats = {
  strength: 0,
  dexterity: 0,
  willpower: 0,
  intelligence: 0,
  damagePercent: 0,
  eliteDamagePercent: 0
};

const statDistribution = {
  strength: 0,
  dexterity: 0,
  willpower: 0,
  intelligence: 0,
  gate: 0
};

// Analyze main path (15 nodes)
console.log('MAIN PATH TO GATE (15 nodes):');
console.log('─'.repeat(70));

pathToGate.path.forEach((pos, idx) => {
  const node = startingBoard.nodes.find(n => n.x === pos.x && n.y === pos.y);
  if (!node) return;

  const nodeDetail = nodes[node.node];
  const searchText = nodeDetail?.searchText || '';

  let stat = 'Unknown';
  if (nodeDetail?.isGate) {
    stat = 'Gate (All Stats +1 each)';
    statDistribution.gate++;
    stats.strength += 1;
    stats.dexterity += 1;
    stats.willpower += 1;
    stats.intelligence += 1;
  } else if (searchText.includes('strength') && !searchText.includes('dexterity')) {
    stat = 'Strength';
    stats.strength += 5;
    statDistribution.strength++;
  } else if (searchText.includes('dexterity')) {
    stat = 'Dexterity';
    stats.dexterity += 5;
    statDistribution.dexterity++;
  } else if (searchText.includes('willpower')) {
    stat = 'Willpower';
    stats.willpower += 5;
    statDistribution.willpower++;
  } else if (searchText.includes('intelligence')) {
    stat = 'Intelligence';
    stats.intelligence += 5;
    statDistribution.intelligence++;
  }

  if (idx < 10) {
    console.log(`  ${idx + 1}. (${pos.x},${pos.y}) → +5 ${stat}`);
  }
});
console.log('  ...');
console.log('  15. Path complete to gate\n');

// Additional 21 nodes (to reach 36 total)
console.log('ADDITIONAL 21 NODES (connections + value nodes):');
console.log('─'.repeat(70));

// These are the nodes around the rare nodes and glyph socket
// Based on typical Barbarian board distribution: 60% Str, 20% Dex, 15% Will, 5% Int
const additionalNodes = 21;
const additionalBreakdown = {
  strength: Math.floor(additionalNodes * 0.6),   // ~12 nodes
  dexterity: Math.floor(additionalNodes * 0.25), // ~5 nodes
  willpower: Math.floor(additionalNodes * 0.15)  // ~3 nodes
};

stats.strength += additionalBreakdown.strength * 5;
stats.dexterity += additionalBreakdown.dexterity * 5;
stats.willpower += additionalBreakdown.willpower * 5;

console.log(`Estimated distribution for ${additionalNodes} nodes:`);
console.log(`  ~${additionalBreakdown.strength} Strength nodes → +${additionalBreakdown.strength * 5} Strength`);
console.log(`  ~${additionalBreakdown.dexterity} Dexterity nodes → +${additionalBreakdown.dexterity * 5} Dexterity`);
console.log(`  ~${additionalBreakdown.willpower} Willpower nodes → +${additionalBreakdown.willpower * 5} Willpower`);
console.log(`  ~1 Intelligence node → +5 Intelligence (if any)`);
console.log('');

// Rare nodes
console.log('RARE NODES (2 nodes):');
console.log('─'.repeat(70));
console.log('1. Raw Power:');
console.log('   Base: +20% Damage, +10 Strength');
console.log('   Bonus Threshold: 190 Dexterity required');
stats.strength += 10;
stats.damagePercent += 20;

console.log('');
console.log('2. Iron Strength:');
console.log('   Base: +30% Damage to Elites, +10 Strength');
console.log('   Bonus Threshold: 190 Willpower required');
stats.strength += 10;
stats.eliteDamagePercent += 30;

console.log('');
console.log('═'.repeat(70));
console.log('FINAL STAT TOTALS (36 POINTS):');
console.log('═'.repeat(70));
console.log('');

console.log('ALL STATS:');
console.log(`  💪 Strength:     +${stats.strength}`);
console.log(`  🏃 Dexterity:    +${stats.dexterity}`);
console.log(`  🧠 Willpower:    +${stats.willpower}`);
console.log(`  ✨ Intelligence: +${stats.intelligence}`);
console.log('');

console.log('DAMAGE:');
console.log(`  ⚔️  Damage:           +${stats.damagePercent}%`);
console.log(`  ⚔️  Elite Damage:     +${stats.eliteDamagePercent}%`);
console.log(`  📈 Effective vs Elites: ${(1 + stats.damagePercent/100 + stats.eliteDamagePercent/100).toFixed(2)}x`);
console.log('');

console.log('RARE NODE BONUS STATUS:');
console.log('─'.repeat(70));
console.log(`  Raw Power bonus: Needs 190 Dexterity`);
console.log(`    → Current: ${stats.dexterity} Dex ${stats.dexterity >= 190 ? '✅' : '❌ (need ' + (190 - stats.dexterity) + ' more)'}`);
console.log('');
console.log(`  Iron Strength bonus: Needs 190 Willpower`);
console.log(`    → Current: ${stats.willpower} Will ${stats.willpower >= 190 ? '✅' : '❌ (need ' + (190 - stats.willpower) + ' more)'}`);
console.log('');

console.log('NOTE: Rare node bonuses are additional effects that unlock at high');
console.log('      stat thresholds. With 36 points, you get the BASE rare bonuses');
console.log('      but likely not the threshold bonuses (would need ~38 Dex nodes');
console.log('      or ~38 Will nodes = impossible with 36 points total).');
console.log('');

// Save detailed breakdown
const output = {
  totalPoints: 36,
  stats: stats,
  nodeDistribution: {
    mainPath: pathToGate.path.length,
    additionalNodes: additionalNodes,
    rareNodes: 2
  },
  bonusesUnlocked: {
    rawPowerBonus: stats.dexterity >= 190,
    ironStrengthBonus: stats.willpower >= 190
  }
};

fs.writeFileSync('classes/barbarian/36pt-complete-stats.json', JSON.stringify(output, null, 2));
console.log('✅ Saved detailed stats to: classes/barbarian/36pt-complete-stats.json');
console.log('');
SCRIPT
