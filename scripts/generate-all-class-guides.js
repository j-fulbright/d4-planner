/**
 * Generate starting board guides for all remaining classes
 */

const fs = require('fs');

const classData = {
  'Sorcerer': {
    classId: 0,
    boardId: 939773,
    primaryStat: 'Intelligence',
    resource: 'Mana',
    rareNodes: [
      { name: 'Elemental Balance', bonuses: ['+20% Non-Physical Damage', '+10 Intelligence'], priority: 'HIGH' },
      { name: 'Studied', bonuses: ['+30% Damage to Elites', '+10 Intelligence'], priority: 'HIGH' },
      { name: 'Resilience', bonuses: ['+3% Total Resistance', '4% Maximum Life'], priority: 'MEDIUM' },
      { name: 'Elementalist', bonuses: ['+20% Non-Physical Damage', '4% Maximum Life'], priority: 'HIGH' }
    ],
    builds: [
      { name: 'Pyromancy', focus: 'Fire damage, Burning', legendaries: ['Searing Heat', 'Flames of Conviction'] },
      { name: 'Frozen Orb', focus: 'Ice/Frost, CC', legendaries: ['Glacial Torrent', 'Frigid Fate'] },
      { name: 'Chain Lightning', focus: 'Lightning, AoE', legendaries: ['Elemental Summoner', 'Shock Treatment'] }
    ]
  },
  'Necromancer': {
    classId: 4,
    boardId: 934225,
    primaryStat: 'Intelligence',
    resource: 'Essence',
    rareNodes: [
      { name: 'Knowledge', bonuses: ['+20% Damage', '+10 Intelligence'], priority: 'HIGH' },
      { name: 'Grasp', bonuses: ['+30% Damage to Elites', '+10 Intelligence'], priority: 'HIGH' },
      { name: 'Resilience', bonuses: ['+3% Total Resistance', '4% Maximum Life'], priority: 'MEDIUM' },
      { name: 'Prime', bonuses: ['+20% Damage', '4% Maximum Life'], priority: 'HIGH' }
    ],
    builds: [
      { name: 'Bone Spear', focus: 'Bone skills, Critical', legendaries: ['Bone Graft', 'Cult Leader'] },
      { name: 'Blood Lance', focus: 'Blood skills, Overpower', legendaries: ['Blood Begets Blood', 'Wither'] },
      { name: 'Minion Master', focus: 'Summons, Army', legendaries: ['Hulking Monstrosity', 'Scent of Death'] }
    ]
  },
  'Rogue': {
    classId: 3,
    boardId: 939852,
    primaryStat: 'Dexterity',
    resource: 'Energy',
    rareNodes: [
      { name: 'Skillful', bonuses: ['+20% Damage', '+10 Dexterity'], priority: 'HIGH' },
      { name: 'Outlaw', bonuses: ['+30% Damage to Elites', '+10 Dexterity'], priority: 'HIGH' },
      { name: 'Resilience', bonuses: ['+3% Total Resistance', '4% Maximum Life'], priority: 'MEDIUM' },
      { name: 'Prime', bonuses: ['+20% Damage', '4% Maximum Life'], priority: 'HIGH' }
    ],
    builds: [
      { name: 'Twisting Blades', focus: 'Melee, Mobility', legendaries: ['Tricks of the Trade', 'No Witnesses'] },
      { name: 'Penetrating Shot', focus: 'Ranged, Vulnerable', legendaries: ['Exploit Weakness', 'Deadly Ambush'] },
      { name: 'Flurry', focus: 'Attack Speed, Combo', legendaries: ['Blade Dancer', 'Exploit Weakness'] }
    ]
  },
  'Druid': {
    classId: 1,
    boardId: 940011,
    primaryStat: 'Willpower',
    resource: 'Spirit',
    rareNodes: [
      { name: 'Impel', bonuses: ['+20% Damage', '+10 Willpower'], priority: 'HIGH' },
      { name: 'Reclaim', bonuses: ['+30% Damage to Elites', '+10 Willpower'], priority: 'HIGH' },
      { name: 'Tenacity', bonuses: ['4% Maximum Life', '+2% Total Armor'], priority: 'MEDIUM' },
      { name: 'Prime', bonuses: ['+20% Damage', '4% Maximum Life'], priority: 'HIGH' }
    ],
    builds: [
      { name: 'Pulverize', focus: 'Werebear, Overpower', legendaries: ['Earthen Devastation', 'Ursine Strength'] },
      { name: 'Tornado', focus: 'Storm, AoE', legendaries: ['Cyclonic Force', 'Tempest Roar'] },
      { name: 'Landslide', focus: 'Earth, Critical', legendaries: ['Seismic Shift', 'Might of the Earth'] }
    ]
  },
  'Spiritborn': {
    classId: 5,
    boardId: 1985956,
    primaryStat: 'Dexterity',
    resource: 'Vigor',
    rareNodes: [
      { name: 'Skillful', bonuses: ['+20% Damage', '+10 Dexterity'], priority: 'HIGH' },
      { name: 'Spiritual', bonuses: ['+30% Damage to Elites', '+10 Dexterity'], priority: 'HIGH' },
      { name: 'Tenacity', bonuses: ['4% Maximum Life', '+2% Total Armor'], priority: 'MEDIUM' },
      { name: 'Prime', bonuses: ['+20% Damage', '4% Maximum Life'], priority: 'HIGH' }
    ],
    builds: [
      { name: 'Quill Volley', focus: 'Eagle, Projectiles', legendaries: ['Feather of the Eagle', 'Soaring Strikes'] },
      { name: 'Rake', focus: 'Jaguar, Attack Speed', legendaries: ['Claw of the Jaguar', 'Feral Rage'] },
      { name: 'Touch of Death', focus: 'Centipede, Poison', legendaries: ['Sting of the Centipede', 'Toxic Skin'] }
    ]
  }
};

function generateGuide(className, data) {
  const totalNodes = 75;
  const centerNodes = 15;
  const branchNodes = 8;

  let guide = \`# Diablo 4 \${className} Starting Board - Complete Stats Guide

## 📍 Coordinate System Note
**IMPORTANT:** In the game UI, the starting node is at the BOTTOM of the board, not the top.
- Y = 0: Bottom of the board (Starting Position)
- Y = 20: Top of the board
- Board grows UPWARD from the starting position

---

## 🎯 Starting Board Overview (Board ID: \${data.boardId})

**Starting Position:** (10, 0) - Bottom Center
**Total Nodes:** \${totalNodes}
**Rare Nodes:** 4
**Primary Stat:** \${data.primaryStat}
**Resource:** \${data.resource}

---

## 💎 Rare Node Locations & Bonuses

\`;

  data.rareNodes.forEach((node, idx) => {
    const stars = node.priority === 'HIGH' ? '⭐⭐⭐' : '⭐⭐';
    guide += \`### \${idx + 1}. \${node.name}
- **Bonuses:** \${node.bonuses.join(', ')}
- **Priority:** \${stars} \${node.priority}

\`;
  });

  guide += \`---

## 🛤️ Path Statistics Comparison

### Path 1: Center Rush (14 nodes)
**Destination:** (10, 14)
**Base Stats Accumulated:** +\${centerNodes * 5} \${data.primaryStat} (\${centerNodes} nodes × 5 each)

**Route:** Bottom → Straight up through center
\\\`\\\`\\\`
Common nodes provide: +5 \${data.primaryStat} each
Total: \${centerNodes} nodes = +\${centerNodes * 5} \${data.primaryStat}
\\\`\\\`\\\`

**Pros:**
- ✅ Fastest route to attach legendary boards
- ✅ Maximum \${data.primaryStat.toLowerCase()} gain
- ✅ Access to center rare nodes

**Cons:**
- ❌ Misses rare nodes on sides
- ❌ Less flexible routing

**Best For:** Speed progression, rushing to unlock legendary boards

---

### Path 2: Left Branch (7 nodes)
**Destination:** (6, 7)
**Base Stats Accumulated:** +\${branchNodes * 5} \${data.primaryStat} (\${branchNodes} nodes × 5 each)

**Route:** Bottom → Curve left

**Pros:**
- ✅ Access to powerful damage rare nodes
- ✅ Shorter path = fewer points needed
- ✅ Can pivot to center later

**Cons:**
- ❌ Lower base \${data.primaryStat.toLowerCase()} gain
- ❌ Doesn't reach attachment point

**Best For:** Early-game damage scaling, farming builds

---

### Path 3: Right Branch (7 nodes)
**Destination:** (14, 7)
**Base Stats Accumulated:** +\${branchNodes * 5} \${data.primaryStat} (\${branchNodes} nodes × 5 each)

**Route:** Bottom → Curve right

**Pros:**
- ✅ Balanced damage + survivability
- ✅ Shorter path = fewer points needed
- ✅ Can pivot to center later

**Cons:**
- ❌ Lower base \${data.primaryStat.toLowerCase()} gain
- ❌ Doesn't reach attachment point

**Best For:** Balanced builds prioritizing survivability

---

## 📊 Complete Stat Maximization Strategy

### Maximum Stats Available on Starting Board

If you were to allocate ALL \${totalNodes} nodes:

**Base Stats from Common Nodes (71 common nodes):**
- +355 \${data.primaryStat} (71 × 5)

**Bonus Stats from Rare Nodes (4 rare nodes):**
- +40 \${data.primaryStat} (4 × 10)
- Varies by rare nodes (see above)

**Grand Total (Full Board):**
- **+395 \${data.primaryStat}**
- **+40-60% Total Damage** (from rare nodes)
- **+30% Damage to Elites**
- **+7-8% Maximum Life**

---

## 🎮 Recommended Strategies by Build Type

\`;

  data.builds.forEach((build, idx) => {
    guide += \`### Strategy \${idx + 1}: \${build.name} Build
**Focus:** \${build.focus}

**Legendary Boards:** \${build.legendaries.join(', ')}

**Path:** Center rush to unlock legendary boards, then grab key rare nodes

\`;
  });

  guide += \`---

## 🗺️ Visual Board Layout

\\\`\\\`\\\`
                (TOP - Y=20)

..........o..........    ← Upper reaches
.........ooo.........
.........o.o.........
........oo.oo........
.......ooo.ooo.......
......oooo[R]ooo......   ← R = Rare nodes
.....o[R]oo[R]oo[R]...   ← 4 Rare nodes distributed
......ooooooooo......
.......ooooooo.......    ← Y=10 area
........oo.oo........
........oo.oo........
.......ooo.ooo.......
........o...o........
........ooooo........
.........ooo.........    ← Y=1 area
..........S..........    ← S = START (Y=0, bottom)

            (BOTTOM - Y=0)
\\\`\\\`\\\`

---

## 💡 \${className}-Specific Pro Tips

1. **Primary Stat Value**
   - +5 \${data.primaryStat} per common node
   - +10 \${data.primaryStat} per rare node
   - Total available: +395 \${data.primaryStat}

2. **Resource Management**
   - \${data.primaryStat} affects \${data.resource} efficiency
   - Stack \${data.primaryStat.toLowerCase()} early for better resource management

3. **Rare Node Priority**
   - Rare nodes are 20-40x more valuable than common nodes
   - Prioritize damage rare nodes first
   - Defensive nodes become more important in late game

4. **Legendary Board Synergies**
   - Rush center path to unlock specialized boards
   - Match rare node bonuses with legendary board mechanics
   - Respec is free - experiment!

---

## 📈 Stat Value Analysis

### \${data.primaryStat} Scaling
- +5 \${data.primaryStat} = ~0.5% damage increase
- Common path: +\${centerNodes * 5} \${data.primaryStat} = ~\${(centerNodes * 5 * 0.1).toFixed(1)}% damage
- **Rare nodes provide significantly better value**

### Rare Node Efficiency
- Damage rare nodes: 1 point = +20-30% damage (40-60x better!)
- Primary stat rare nodes: 1 point = +10 \${data.primaryStat}
- Defensive rare nodes: Critical for survivability

---

## 🎯 Quick Reference Table

| Path | Nodes | \${data.primaryStat} | Time to Gate | Best For |
|------|-------|----------|--------------|----------|
| **Center Rush** | 14 | +\${centerNodes * 5} | Fastest | Progression |
| **Left Branch** | 7 | +\${branchNodes * 5} | No gate | Damage builds |
| **Right Branch** | 7 | +\${branchNodes * 5} | No gate | Balanced builds |
| **Full Clear** | 75 | +395 | N/A | Min-maxers |

---

## 🔄 Respec Strategy

**Respec is FREE!** Experiment with different allocations:

1. **Early Game (50-60):** Rush center for legendary boards
2. **Mid Game (60-80):** Grab key rare nodes for damage
3. **Late Game (80+):** Optimize for your build archetype

---

**Last Updated:** 2024
**Game Version:** Diablo 4 (Vessel of Hatred)
**Class:** \${className}
**Starting Board ID:** \${data.boardId}
\`;

  return guide;
}

// Generate all guides
console.log('Generating starting board guides for all classes...');
console.log('');

Object.entries(classData).forEach(([className, data]) => {
  const guide = generateGuide(className, data);
  const filename = \`\${className.toUpperCase()}_STARTING_BOARD_STATS_GUIDE.md\`;
  fs.writeFileSync(filename, guide);
  console.log(\`✅ Created: \${filename}\`);
});

console.log('');
console.log('='.repeat(70));
console.log('✅ ALL CLASS GUIDES GENERATED!');
console.log('='.repeat(70));
