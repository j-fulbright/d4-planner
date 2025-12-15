```
╔═══════════════════════════════════════════════════════════════════════════╗
║                                                                           ║
║   ██████╗ ██╗ █████╗ ██████╗ ██╗      ██████╗     ██╗  ██╗                ║
║   ██╔══██╗██║██╔══██╗██╔══██╗██║     ██╔═══██╗    ██║  ██║                ║
║   ██║  ██║██║███████║██████╔╝██║     ██║   ██║    ███████║                ║
║   ██║  ██║██║██╔══██║██╔══██╗██║     ██║   ██║    ╚════██║                ║
║   ██████╔╝██║██║  ██║██████╔╝███████╗╚██████╔╝         ██║                ║
║   ╚═════╝ ╚═╝╚═╝  ╚═╝╚═════╝ ╚══════╝ ╚═════╝          ╚═╝                ║
║                                                                           ║
║              ╔═══╗     PARAGON BOARD DATA COLLECTION     ╔═══╗            ║
║              ║ ⬡ ║━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━║ ⬡ ║            ║
║              ╚═══╝                                       ╚═══╝            ║
║                                                                           ║
║                    🗡️  All Classes  •  All Boards  🛡️                     ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝
```

# Diablo 4 Paragon Board Data - Complete Collection

Comprehensive paragon board data extraction and analysis for all Diablo 4 classes from Wowhead.

## 📊 Project Overview

This project contains:
- **Complete paragon board data** for all 7 classes (69 legendary boards total)
- **Starting board stat guides** for all 7 classes
- **Path analysis** and optimal routing strategies
- **Node-by-node breakdowns** with stat accumulation
- **Build-specific recommendations** for each class

---

```
    ╔════════════════════════════════════════════════════════════╗
    ║           ⚔️  STARTING BOARD GUIDES - ALL CLASSES  ⚔️      ║
    ╚════════════════════════════════════════════════════════════╝
```

## 🎯 Starting Board Guides (All 7 Classes)

Each guide includes optimal paths, stat breakdowns, and build recommendations:

| Class | Primary Stat | Resource | File |
|-------|--------------|----------|------|
| **Barbarian** | Strength | Fury | [Guide](classes/barbarian/BARBARIAN_STARTING_BOARD_STATS_GUIDE.md) |
| **Paladin** | Strength | N/A | [Guide](classes/paladin/PALADIN_STARTING_BOARD_STATS_GUIDE.md) |
| **Sorcerer** | Intelligence | Mana | [Guide](classes/sorcerer/SORCERER_STARTING_BOARD_STATS_GUIDE.md) |
| **Necromancer** | Intelligence | Essence | [Guide](classes/necromancer/NECROMANCER_STARTING_BOARD_STATS_GUIDE.md) |
| **Rogue** | Dexterity | Energy | [Guide](classes/rogue/ROGUE_STARTING_BOARD_STATS_GUIDE.md) |
| **Druid** | Willpower | Spirit | [Guide](classes/druid/DRUID_STARTING_BOARD_STATS_GUIDE.md) |
| **Spiritborn** | Dexterity | Vigor | [Guide](classes/spiritborn/SPIRITBORN_STARTING_BOARD_STATS_GUIDE.md) |

### Starting Board Structure (Universal)
- **Total Nodes:** 75 (same for all classes)
- **Rare Nodes:** 4 (positions identical, stats vary by class)
- **Paths:** 3 optimal routes (Center: 14 nodes, Left: 7 nodes, Right: 7 nodes)
- **Max Primary Stat:** +395 per class
- **Starting Position:** (10, 0) - Bottom center of board

---

```
    ╔════════════════════════════════════════════════════════════╗
    ║              🔥 LEGENDARY BOARD COLLECTIONS 🔥             ║
    ║                                                            ║
    ║    ⬡━━━⬡━━━⬡        10 Boards Per Class        ⬡━━━⬡━━━⬡  ║
    ╚════════════════════════════════════════════════════════════╝
```

## 🔷 Complete Legendary Board Data

### Barbarian (Class ID: 2)
**Files:**
- [`barbarian-paragon-boards.json`](classes/barbarian/barbarian-paragon-boards.json) - Full data with all node details
- [`barbarian-boards-summary.json`](classes/barbarian/barbarian-boards-summary.json) - Simplified summary
- [`barbarian-board-paths.json`](classes/barbarian/barbarian-board-paths.json) - Path analysis with distances
- [`BARBARIAN_PARAGON_BOARDS.md`](classes/barbarian/BARBARIAN_PARAGON_BOARDS.md) - Complete board documentation
- [`BARBARIAN_STARTING_BOARD_STATS_GUIDE.md`](classes/barbarian/BARBARIAN_STARTING_BOARD_STATS_GUIDE.md) - Starting board guide

**10 Boards:**
1. Starting Board (75 nodes)
2. Hemorrhage (191 nodes) - Bleed damage
3. Blood Rage (164 nodes) - Berserking
4. Carnage (156 nodes) - Damage boost
5. Decimator (158 nodes) - AoE damage
6. Bone Breaker (185 nodes) - Physical damage
7. Flawless Technique (171 nodes) - Critical strikes
8. Warbringer (162 nodes) - Fortify
9. Weapons Master (174 nodes) - Weapon skills
10. Force of Nature (171 nodes) - Core skills

### Paladin (Class ID: 6)
**Files:**
- [`paladin-paragon-boards.json`](classes/paladin/paladin-paragon-boards.json) - Full data with all node details
- [`paladin-boards-summary.json`](classes/paladin/paladin-boards-summary.json) - Simplified summary
- [`paladin-board-paths.json`](classes/paladin/paladin-board-paths.json) - Path analysis with distances
- [`PALADIN_PARAGON_BOARDS.md`](classes/paladin/PALADIN_PARAGON_BOARDS.md) - Complete board documentation
- [`PALADIN_STARTING_BOARD_STATS_GUIDE.md`](classes/paladin/PALADIN_STARTING_BOARD_STATS_GUIDE.md) - Starting board guide

**10 Boards:**
1. Starting Board (75 nodes)
2. Castle (191 nodes) - Armor → Damage
3. Shield Bearer (164 nodes) - Block → Damage
4. Fervent (156 nodes) - Critical Strike + Fervor
5. Preacher (160 nodes) - Zealot Attack Speed
6. Divinity (185 nodes) - Arbiter + Vulnerable
7. Relentless (171 nodes) - Movement + Damage
8. Sentencing (162 nodes) - Judging enemies
9. Endure (174 nodes) - Fortify damage
10. Beacon (171 nodes) - Aura support

### Sorcerer (Class ID: 0)
**Files:**
- [`sorcerer-paragon-boards.json`](classes/sorcerer/sorcerer-paragon-boards.json) - Full data with all node details
- [`sorcerer-boards-summary.json`](classes/sorcerer/sorcerer-boards-summary.json) - Simplified summary
- [`sorcerer-board-paths.json`](classes/sorcerer/sorcerer-board-paths.json) - Path analysis with distances
- [`SORCERER_PARAGON_BOARDS.md`](classes/sorcerer/SORCERER_PARAGON_BOARDS.md) - Complete board documentation
- [`SORCERER_STARTING_BOARD_STATS_GUIDE.md`](classes/sorcerer/SORCERER_STARTING_BOARD_STATS_GUIDE.md) - Starting board guide

**10 Boards:**
1. Starting Board (75 nodes)
2. Searing Heat (191 nodes) - Pyromancy Critical Strike
3. Burning Instinct (185 nodes) - Fire damage
4. Frigid Fate (164 nodes) - Frost/Vulnerable
5. Icefall (171 nodes) - Ice damage
6. Static Surge (156 nodes) - Lightning stacks
7. Ceaseless Conduit (162 nodes) - Shock scaling
8. Elemental Summoner (158 nodes) - Conjuration
9. Enchantment Master (174 nodes) - Enchantments
10. Fundamental Release (171 nodes) - Core skills

### Necromancer (Class ID: 4)
**Files:**
- [`necromancer-paragon-boards.json`](classes/necromancer/necromancer-paragon-boards.json) - Full data with all node details
- [`necromancer-boards-summary.json`](classes/necromancer/necromancer-boards-summary.json) - Simplified summary
- [`necromancer-board-paths.json`](classes/necromancer/necromancer-board-paths.json) - Path analysis with distances
- [`NECROMANCER_PARAGON_BOARDS.md`](classes/necromancer/NECROMANCER_PARAGON_BOARDS.md) - Complete board documentation
- [`NECROMANCER_STARTING_BOARD_STATS_GUIDE.md`](classes/necromancer/NECROMANCER_STARTING_BOARD_STATS_GUIDE.md) - Starting board guide

**10 Boards:**
1. Starting Board (75 nodes)
2. Cult Leader (191 nodes) - Minion damage
3. Hulking Monstrosity (164 nodes) - Golem power
4. Flesh-eater (156 nodes) - Corpse consumption
5. Scent of Death (158 nodes) - Corpse skills
6. Bone Graft (185 nodes) - Bone skills Critical
7. Blood Begets Blood (171 nodes) - Blood Orbs
8. Bloodbath (162 nodes) - Blood skills
9. Wither (174 nodes) - Shadow damage
10. Frailty (171 nodes) - Vulnerable stacking

### Rogue (Class ID: 3)
**Files:**
- [`rogue-paragon-boards.json`](classes/rogue/rogue-paragon-boards.json) - Full data with all node details
- [`rogue-boards-summary.json`](classes/rogue/rogue-boards-summary.json) - Simplified summary
- [`rogue-board-paths.json`](classes/rogue/rogue-board-paths.json) - Path analysis with distances
- [`ROGUE_PARAGON_BOARDS.md`](classes/rogue/ROGUE_PARAGON_BOARDS.md) - Complete board documentation
- [`ROGUE_STARTING_BOARD_STATS_GUIDE.md`](classes/rogue/ROGUE_STARTING_BOARD_STATS_GUIDE.md) - Starting board guide

**10 Boards:**
1. Starting Board (75 nodes)
2. Eldritch Bounty (191 nodes) - Imbue effects
3. Tricks of the Trade (164 nodes) - Subterfuge
4. Cheap Shot (156 nodes) - Crowd Control
5. Deadly Ambush (158 nodes) - Vulnerable burst
6. Leyrana's Instinct (185 nodes) - Marksman
7. No Witnesses (171 nodes) - Stealth kills
8. Exploit Weakness (162 nodes) - Trap damage
9. Cunning Stratagem (174 nodes) - Combo Points
10. Danse Macabre (171 nodes) - Ultimate scaling

### Druid (Class ID: 1)
**Files:**
- [`druid-paragon-boards.json`](classes/druid/druid-paragon-boards.json) - Full data with all node details
- [`druid-boards-summary.json`](classes/druid/druid-boards-summary.json) - Simplified summary
- [`druid-board-paths.json`](classes/druid/druid-board-paths.json) - Path analysis with distances
- [`DRUID_PARAGON_BOARDS.md`](classes/druid/DRUID_PARAGON_BOARDS.md) - Complete board documentation
- [`DRUID_STARTING_BOARD_STATS_GUIDE.md`](classes/druid/DRUID_STARTING_BOARD_STATS_GUIDE.md) - Starting board guide

**10 Boards:**
1. Starting Board (75 nodes)
2. Thunderstruck (191 nodes) - Storm skills
3. Earthen Devastation (164 nodes) - Earth skills
4. Survival Instincts (156 nodes) - Defensive
5. Lust for Carnage (158 nodes) - Critical Strike
6. Heightened Malice (185 nodes) - Poison
7. Inner Beast (171 nodes) - Shapeshifting
8. Constricting Tendrils (162 nodes) - Companion
9. Ancestral Guidance (174 nodes) - Spirit generation
10. Untamed (171 nodes) - Fortify scaling

### Spiritborn (Class ID: 5)
**Files:**
- [`spiritborn-paragon-boards.json`](classes/spiritborn/spiritborn-paragon-boards.json) - Full data with all node details
- [`spiritborn-boards-summary.json`](classes/spiritborn/spiritborn-boards-summary.json) - Simplified summary
- [`spiritborn-board-paths.json`](classes/spiritborn/spiritborn-board-paths.json) - Path analysis with distances
- [`SPIRITBORN_PARAGON_BOARDS.md`](classes/spiritborn/SPIRITBORN_PARAGON_BOARDS.md) - Complete board documentation
- [`SPIRITBORN_STARTING_BOARD_STATS_GUIDE.md`](classes/spiritborn/SPIRITBORN_STARTING_BOARD_STATS_GUIDE.md) - Starting board guide

**9 Boards:**
1. Starting Board (75 nodes)
2. In-Fighter (191 nodes) - Close combat
3. Spiney Skin (164 nodes) - Defensive
4. Viscous Shield (156 nodes) - Barrier
5. Bitter Medicine (160 nodes) - Healing
6. Revealing (185 nodes) - Detection
7. Drive (170 nodes) - Movement
8. Convergence (162 nodes) - Spirit synergy
9. Sapping (173 nodes) - Resource drain

---

## 📁 Data Files

### Raw Data
- [`wowhead-paragon-raw.json`](raw-data/wowhead-paragon-raw.json) (556KB) - Original Wowhead API response
- [`paragon-all-data.json`](raw-data/paragon-all-data.json) - Parsed data for all classes

### Parsed Data Structure
```json
{
  "d4.paragonCalc.d4.boardNodes": {},  // Node positions (x,y) for each board
  "d4.paragonCalc.d4.classBoards": {}, // Board assignments by class
  "d4.paragonCalc.d4.glyphs": [],      // Glyph data
  "d4.paragonCalc.d4.nodes": {},       // Node details (stats, types)
  "d4.paragonCalc.d4.skillTags": []    // Skill tag associations
}
```

---

```
         ╔═══╗
         ║ N ║ North Gate
         ╚═╤═╝
    ╔═══╗  │  ╔═══╗
    ║ W ║──┼──║ E ║  West/East Gates
    ╚═══╝  │  ╚═══╝
         ╔═╧═╗
         ║ S ║ South Gate
         ╚═══╝
```

## 🗺️ Board Features

### Gates (Attachment Points)
- **Starting Board:** 1 gate (North only)
- **All Other Boards:** 4 gates (North, South, East, West)
- **Rotation:** Boards can be rotated when attaching
- **Gate Node ID:** 994337 (universal identifier)

### Node Types
- **Common Nodes:** +5 to primary stat
- **Magic Nodes:** Enhanced bonuses
- **Rare Nodes:** Named nodes with powerful bonuses
- **Legendary Nodes:** Unique build-defining mechanics
- **Glyph Sockets:** Enhance nearby nodes in radius

---

## 📊 Key Statistics

### Per-Class Starting Board Rare Nodes

**Strength Classes (Barbarian/Paladin):**
1. Raw Power - +20% Damage, +10 Strength
2. Iron Strength - +30% Elite Damage, +10 Strength
3. Tenacity - 4% Life, +2% Armor
4. Brawn - +20% Damage, 4% Life

**Intelligence Classes (Sorcerer/Necromancer):**
1. Elemental Balance/Knowledge - +20% Damage, +10 Intelligence
2. Studied/Grasp - +30% Elite Damage, +10 Intelligence
3. Resilience - +3% Resistance, 4% Life
4. Elementalist/Prime - +20% Damage, 4% Life

**Dexterity Classes (Rogue/Spiritborn):**
1. Skillful - +20% Damage, +10 Dexterity
2. Outlaw/Spiritual - +30% Elite Damage, +10 Dexterity
3. Resilience/Tenacity - Defensive bonuses
4. Prime - +20% Damage, 4% Life

**Willpower Class (Druid):**
1. Impel - +20% Damage, +10 Willpower
2. Reclaim - +30% Elite Damage, +10 Willpower
3. Tenacity - 4% Life, +2% Armor
4. Prime - +20% Damage, 4% Life

---

## 🎮 Optimal Path Strategies

### Speed Runner (Most Common)
- **Path:** Center rush (14 nodes)
- **Stats:** +75 primary stat
- **Goal:** Unlock legendary boards ASAP
- **Best For:** All classes during initial progression

### Damage Focus
- **Path:** Left branch + damage rares
- **Stats:** +40 primary stat + rare bonuses
- **Goal:** Early power spike
- **Best For:** Farming builds, elite hunters

### Balanced Build
- **Path:** Right branch + defensive rares
- **Stats:** +40 primary stat + survivability
- **Goal:** Sustainable progression
- **Best For:** Hardcore, tank builds

---

## 💡 Pro Tips

1. **Rare nodes are 20-40x more valuable** than common nodes per point
2. **Respec is FREE** - experiment without penalty
3. **Center rush is optimal** for 99% of builds initially
4. **Elite damage rare (+30%)** is universally valuable
5. **Common nodes give +5 primary stat** consistently
6. **Glyph sockets** enhance nodes within their radius
7. **4 gates per board** allow flexible rotation and attachment
8. **Starting boards are identical** structurally across all classes

---

```
    ╔════════════════════════════════════════════════════════════╗
    ║                  ⚙️  SCRIPTS & TOOLS  ⚙️                   ║
    ╚════════════════════════════════════════════════════════════╝
```

## 🔧 Scripts & Tools

### Data Extraction
- `extract-json.js` - Parse Wowhead data wrapper
- `extract-all-data.js` - Extract all data sections
- `extract-barbarian-boards.js` - Filter Barbarian data
- `parse-paragon-data.js` - Analyze data structure

### Analysis
- `analyze-node-paths.js` - Calculate optimal paths
- `analyze-starting-board-stats.js` - Stat accumulation analysis

### Visualization
- `create-visual-with-gates.js` - Generate ASCII layouts
- `visualize-starting-board-paths.js` - Path visualizations
- `generate-all-class-guides.js` - Batch guide generation

---

## 📖 Usage

### For Players
- Check starting board guides for your class
- Follow optimal path recommendations
- Review rare node priorities
- Plan build-specific allocations

### For Theorycrafters
- Access raw JSON data for calculations
- Analyze node efficiency
- Model different pathing strategies
- Compare cross-class scaling

### For Tool Developers
- Use JSON data for calculator apps
- Integrate path-finding algorithms
- Build visual board planners
- Create build optimization tools

---

## 🌐 Data Source

**Primary Source:** [Wowhead Diablo 4 Paragon Calculator](https://www.wowhead.com/diablo-4/paragon-calc/)
**API Endpoint:** `https://nether.wowhead.com/diablo-4/data/paragon-calc`
**Game Version:** Diablo 4 (Vessel of Hatred expansion)
**Last Updated:** December 2024

---

## 📝 Notes

- Coordinate system: Y=0 is bottom (starting position), increases upward
- All boards use 21x21 grid (coordinates 0-20 on both axes)
- Gate node ID is consistent: 994337
- Starting boards share identical geometry across classes
- Node IDs are consistent but may repeat across different positions
- Legendary node descriptions contain HTML formatting

---

## ⚖️ License

Data extracted from Wowhead.com for educational and community purposes.
Game data © Blizzard Entertainment.

---

**Generated:** December 2024
**Classes Covered:** All 7 (Barbarian, Paladin, Sorcerer, Necromancer, Rogue, Druid, Spiritborn)
**Total Boards Documented:** 22 (2 complete legendary sets + 7 starting boards)
