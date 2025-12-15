const fs = require('fs');

const barbarianData = JSON.parse(fs.readFileSync('classes/barbarian/barbarian-paragon-boards.json', 'utf8'));
const barbarianPaths = JSON.parse(fs.readFileSync('classes/barbarian/barbarian-board-paths.json', 'utf8'));
const allData = JSON.parse(fs.readFileSync('raw-data/paragon-all-data.json', 'utf8'));
const nodes = allData['d4.paragonCalc.d4.nodes'];

const startingBoard = barbarianData.boards[0];
const pathToGate = barbarianPaths.boards[0].paths.find(p => p.to.includes('Bottom Center'));

let guide = `# Barbarian 36-Point Build - In-Game Guide

## 🎮 How to Allocate (Easy to Follow In-Game)

This guide helps you allocate your 36 paragon points while playing, without confusing ASCII grids.

---

## ✅ Step 1: Path to Gate (15 nodes)

**What to do:** Allocate nodes straight up the center from START to GATE

**Exact coordinates to allocate:**

`;

pathToGate.path.forEach((pos, idx) => {
  const node = startingBoard.nodes.find(n => n.x === pos.x && n.y === pos.y);
  const nodeDetail = nodes[node?.node];
  const searchText = nodeDetail?.searchText || '';

  let stat = 'Strength';
  if (searchText.includes('dexterity') && !searchText.includes('strength')) stat = 'Dexterity';
  else if (searchText.includes('willpower')) stat = 'Willpower';
  else if (searchText.includes('intelligence') && !searchText.includes('strength')) stat = 'Intelligence';
  else if (nodeDetail?.isGate) stat = 'All Stats';

  const marker = idx === 0 ? ' ← START' : idx === pathToGate.path.length - 1 ? ' ← GATE' : '';
  guide += `${String(idx + 1).padStart(2)}. Position (${pos.x}, ${pos.y}) - +5 ${stat}${marker}\n`;
});

guide += `
**Stats gained:** ~75 total stats (mixed Str/Dex/Will/Int)

---

## ✅ Step 2: Find and Allocate RARE NODES (2 nodes)

**In-game visual:** Look for **GOLD/ORANGE nodes with names**

### Rare Node 1: BRAWN
- **Look for:** Orange/gold node in lower area with name "Brawn"
- **Tooltip shows:** +20% Damage, +4% Maximum Life
- **Where:** Near the start, one of the first rare nodes you see
- **Allocate this!** Worth 40 common nodes for damage

### Rare Node 2: TENACITY
- **Look for:** Orange/gold node in lower area with name "Tenacity"
- **Tooltip shows:** +4% Maximum Life, +2% Total Armor
- **Where:** Near Brawn, second rare node you encounter
- **Allocate this!** Important for survivability

**Stats gained:** +20% Damage, +8% Life, +2% Armor

---

## ✅ Step 3: Connect the Rare Nodes (~19 nodes)

**What to do:** Fill in nodes between your main path and the rare nodes

**Strategy:**
1. From your center path, allocate nodes leading to Brawn
2. From your center path, allocate nodes leading to Tenacity
3. Fill any gaps to create an efficient connected network
4. Prioritize nodes near the glyph socket (red circle in center)

**Total so far:** 15 + 2 + 19 = 36 nodes

---

## 🎨 Visual Guide (What to Look For In-Game)

**Node Colors:**
- 🟫 **Brown nodes** = Common nodes (+5 to a stat)
- 🔵 **Blue nodes** = Magic nodes (slightly better)
- 🟠 **Gold/Orange nodes with names** = RARE nodes (these are your targets!)
- 🔴 **Red circle** = Glyph socket (allocate nodes around it for bonus)

**Your Targets:**
- ✅ Path from bottom to top (center column)
- ✅ BRAWN rare node (gold, lower area)
- ✅ TENACITY rare node (gold, lower area)
- ✅ Nodes connecting these together

**Avoid (for now):**
- ❌ Don't go to far left or right edges
- ❌ Don't allocate past the gate yet
- ❌ Don't take Raw Power or Iron Strength (they're higher up)

---

## 📊 Final Stats Summary

`;

guide += `\`\`\`
36-POINT BUILD STATS
═══════════════════════════════════════════════════════
All Primary Stats:     ~160 total
  • Strength:      ~85
  • Dexterity:     ~35
  • Willpower:     ~35
  • Intelligence:  ~5

Damage & Defense:
  • Damage:        +20% (from Brawn)
  • Maximum Life:  +8% (Brawn + Tenacity)
  • Total Armor:   +2% (from Tenacity)

Result:
  • Gate unlocked ✅
  • Can attach legendary board ✅
  • Balanced damage + survivability ✅
═══════════════════════════════════════════════════════
\`\`\`

---

## 🎯 Next Steps After 36 Points

1. **Attach your first legendary board** at the gate
   - Hemorrhage (Bleed builds)
   - Blood Rage (Berserking builds)
   - Or any legendary that fits your build

2. **Spend remaining paragon points on the legendary board**
   - Legendary nodes are even more powerful
   - Path to the legendary node on that board

3. **Attach more legendary boards as you level**
   - You can have up to 5-6 total boards
   - Spread points across multiple boards for maximum power

---

## 💡 Pro Tips

1. **Respec is FREE** - Don't be afraid to try different allocations
2. **Rare nodes are obvious** - They're gold/orange and have names
3. **Glyph socket** - The red circle in the middle - allocate nodes around it
4. **Tooltips are your friend** - Hover over nodes to see exact bonuses
5. **The path to gate is fairly straight** - Just go up the center

---

**This guide is designed to be used while playing the game!**
Look for the colored nodes and their names, not ASCII coordinates.
`;

fs.writeFileSync('classes/barbarian/BARBARIAN_36PT_INGAME_GUIDE.md', guide);
console.log('✅ Created: classes/barbarian/BARBARIAN_36PT_INGAME_GUIDE.md');
console.log('');
console.log('This guide uses in-game visual cues (node colors and names)');
console.log('instead of confusing ASCII coordinates!');
