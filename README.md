# Diablo 4 Paragon Board Data - Complete Collection

Comprehensive paragon board data extraction and analysis for all Diablo 4 classes from Wowhead.

## 📊 Project Overview

This project contains:
- **Complete paragon board data** for Barbarian and Paladin (all 10 boards each)
- **Starting board stat guides** for all 7 classes
- **Path analysis** and optimal routing strategies
- **Node-by-node breakdowns** with stat accumulation
- **Build-specific recommendations** for each class

---

## 🎯 Starting Board Guides (All 7 Classes)

Each guide includes optimal paths, stat breakdowns, and build recommendations:

| Class | Primary Stat | Resource | File |
|-------|--------------|----------|------|
| **Barbarian** | Strength | Fury | [Guide](STARTING_BOARD_STATS_GUIDE.md) |
| **Paladin** | Strength | N/A | [Guide](PALADIN_STARTING_BOARD_STATS_GUIDE.md) |
| **Sorcerer** | Intelligence | Mana | [Guide](SORCERER_STARTING_BOARD_STATS_GUIDE.md) |
| **Necromancer** | Intelligence | Essence | [Guide](NECROMANCER_STARTING_BOARD_STATS_GUIDE.md) |
| **Rogue** | Dexterity | Energy | [Guide](ROGUE_STARTING_BOARD_STATS_GUIDE.md) |
| **Druid** | Willpower | Spirit | [Guide](DRUID_STARTING_BOARD_STATS_GUIDE.md) |
| **Spiritborn** | Dexterity | Vigor | [Guide](SPIRITBORN_STARTING_BOARD_STATS_GUIDE.md) |

### Starting Board Structure (Universal)
- **Total Nodes:** 75 (same for all classes)
- **Rare Nodes:** 4 (positions identical, stats vary by class)
- **Paths:** 3 optimal routes (Center: 14 nodes, Left: 7 nodes, Right: 7 nodes)
- **Max Primary Stat:** +395 per class
- **Starting Position:** (10, 0) - Bottom center of board

---

## 🔷 Complete Legendary Board Data

### Barbarian (Class ID: 2)
**Files:**
- `barbarian-paragon-boards.json` - Full data with all node details
- `barbarian-boards-summary.json` - Simplified summary
- `barbarian-board-paths.json` - Path analysis with distances
- `BARBARIAN_PARAGON_BOARDS.md` - Complete documentation
- `BARBARIAN_STARTING_BOARD_PATHS.md` - Visual path guides

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
- `paladin-paragon-boards.json` - Full data with all node details
- `paladin-boards-summary.json` - Simplified summary
- `paladin-board-paths.json` - Path analysis with distances
- `PALADIN_PARAGON_BOARDS.md` - Complete documentation
- `PALADIN_STARTING_BOARD_PATHS.md` - Visual path guides

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

---

## 📁 Data Files

### Raw Data
- `wowhead-paragon-raw.json` (556KB) - Original Wowhead API response
- `paragon-all-data.json` - Parsed data for all classes
- `paragon-boards-clean.json` - Clean board node positions

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
