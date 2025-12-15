/**
 * Generate complete node value analysis for ALL boards for each class
 */

const fs = require('fs');

const classNames = ['barbarian', 'paladin', 'sorcerer', 'necromancer', 'rogue', 'druid', 'spiritborn'];

classNames.forEach(className => {
  const summaryFile = `classes/${className}/${className}-boards-summary.json`;
  const summary = JSON.parse(fs.readFileSync(summaryFile, 'utf8'));

  let content = `# ${summary.className} - Complete Node Value Analysis

Theorycraft value calculations for all ${summary.className} paragon boards.

---

## 📊 Universal Node Values

| Node Type | Typical Bonus | Equivalent Normal Nodes | Value Score |
|-----------|---------------|------------------------|-------------|
| **Rare (Elite Dmg)** | +30% Elite Dmg + stat | ~60 | 60 |
| **Rare (Dmg + Stat)** | +20% Dmg + stat | ~40 | 40 |
| **Rare (Dmg + Life)** | +20% Dmg + Life | ~35-40 | 38 |
| **Magic (+10% Dmg)** | +10% Damage | ~20 | 20 |
| **Rare (Defensive)** | Life/Armor bonuses | ~10-15 | 12 |
| **Magic (+2% Life)** | +2% Life | ~4 | 4 |
| **Normal** | +5 to one stat | 1 | 1 |

---

`;

  // Generate analysis for each board
  summary.boards.forEach((board, idx) => {
    content += `## Board ${board.index}: ${board.name}\n\n`;
    content += `**Board ID:** ${board.id}\n`;
    content += `**Total Nodes:** ${board.nodeCount}\n`;
    content += `**Rare Nodes:** ${board.rareNodeCount}\n`;
    content += `**Legendary Nodes:** ${board.legendaryNodeCount}\n\n`;

    if (board.legendaryNodes.length > 0) {
      content += `### Legendary Node\n\n`;
      board.legendaryNodes.forEach(leg => {
        content += `**${leg.name}**\n`;
        const cleanDesc = leg.description.substring(0, 200).replace(/\s+/g, ' ');
        content += `- ${cleanDesc}...\n\n`;
      });
    }

    if (board.rareNodes.length > 0) {
      content += `### Rare Node Values\n\n`;
      content += `| Rare Node | Bonuses | Est. Value |\n`;
      content += `|-----------|---------|------------|\n`;

      board.rareNodes.forEach(rare => {
        // Estimate value based on bonuses
        let value = 10; // baseline
        const bonusText = rare.attributes.join(', ').toLowerCase();

        if (bonusText.includes('30%') && bonusText.includes('elite')) value = 62;
        else if (bonusText.includes('20%') && bonusText.includes('damage') && bonusText.includes('+10')) value = 42;
        else if (bonusText.includes('20%') && bonusText.includes('damage')) value = 40;
        else if (bonusText.includes('life') && bonusText.includes('armor')) value = 12;
        else if (bonusText.includes('resistance')) value = 14;
        else if (bonusText.includes('critical')) value = 45;
        else if (bonusText.includes('vulnerable')) value = 50;

        content += `| **${rare.name}** | ${rare.attributes.join(', ')} | ${value} |\n`;
      });

      content += `\n**Total Rare Value:** ${board.rareNodes.length} nodes worth significant value\n\n`;
    }

    content += `**Gate Count:** ${board.gateCount} (${board.gates.map(g => g.direction).join(', ')})\n`;
    content += `**Is Starting Board:** ${board.isStartingBoard ? 'Yes' : 'No'}\n\n`;
    content += `---\n\n`;
  });

  // Add summary table at end
  content += `## 📈 All Boards Value Summary\n\n`;
  content += `| Board # | Board Name | Rare Count | Legendary | Est. Total Value |\n`;
  content += `|---------|------------|------------|-----------|------------------|\n`;

  summary.boards.forEach(board => {
    let totalValue = 0;
    board.rareNodes.forEach(rare => {
      const bonusText = rare.attributes.join(', ').toLowerCase();
      if (bonusText.includes('30%') && bonusText.includes('elite')) totalValue += 62;
      else if (bonusText.includes('20%') && bonusText.includes('damage') && bonusText.includes('+10')) totalValue += 42;
      else if (bonusText.includes('20%') && bonusText.includes('damage')) totalValue += 40;
      else totalValue += 15;
    });

    const hasLegendary = board.legendaryNodes.length > 0 ? '✅' : '❌';
    content += `| ${board.index} | ${board.name} | ${board.rareNodeCount} | ${hasLegendary} | ~${totalValue} value |\n`;
  });

  content += `\n---\n\n`;
  content += `**Data source:** \`classes/${className}/${className}-boards-summary.json\`\n`;

  fs.writeFileSync(`classes/${className}/${summary.className.toUpperCase()}_NODE_VALUES.md`, content);
  console.log(`✅ Updated: ${className}/${summary.className.toUpperCase()}_NODE_VALUES.md`);
});

console.log('\n✅ All node value files updated with all boards!');
