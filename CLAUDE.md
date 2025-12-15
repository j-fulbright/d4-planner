# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Diablo 4 Paragon Board Data Collection** project that extracts, analyzes, and documents all paragon board data for all 7 D4 classes from Wowhead. The project contains:
- Complete paragon board data for all 7 classes (69 boards total)
- Starting board stat guides with optimal pathing strategies
- Path analysis with shortest routes between gates
- Build-specific recommendations

**Key Insight:** This is a data extraction and documentation project, not a web application. The output is JSON data files and markdown documentation for players and theorycrafters.

## Critical Paragon Board Mechanic

**NODES MUST BE CONNECTED:** You cannot allocate random nodes on a paragon board. Nodes must be **adjacent** (touching) to already-allocated nodes, forming a continuous path.

**How it works:**
1. You start at the starting node (or gate if entering from another board)
2. You can ONLY allocate nodes that touch an already-allocated node
3. "Adjacent" = horizontally, vertically, or diagonally touching (within 1 step)
4. You build a connected tree/path outward from your entry point

**Example from starting board:**
- Start at (10, 0)
- Can allocate (9, 1) because it touches (10, 0)
- Can allocate (9, 2) because it touches (9, 1)
- CANNOT allocate (15, 15) randomly - no connection to your allocated nodes

**Implication for path analysis:**
- The BFS paths calculated are not just "shortest route" but "required sequence"
- You must allocate nodes in order along the path
- You cannot skip nodes to reach a rare node - must build a connected path to it

## Data Architecture

### Core Data Flow
```
Wowhead API → Raw JSON → Parse → Class-Specific Data → Documentation
```

1. **Raw Data** (`raw-data/wowhead-paragon-raw.json`):
   - Downloaded from `https://nether.wowhead.com/diablo-4/data/paragon-calc`
   - Contains 5 `WH.setPageData()` calls with embedded JSON
   - Sections: `boardNodes`, `classBoards`, `glyphs`, `nodes`, `skillTags`

2. **Parsed Data** (`raw-data/paragon-all-data.json`):
   - Extracted from WH.setPageData() wrappers
   - Structure:
     ```json
     {
       "d4.paragonCalc.d4.boardNodes": {},  // Node positions (x,y) per board
       "d4.paragonCalc.d4.classBoards": {}, // Board assignments (7 classes)
       "d4.paragonCalc.d4.nodes": {},       // Node stats/details
       "d4.paragonCalc.d4.glyphs": [],      // Glyph data
       "d4.paragonCalc.d4.skillTags": []    // Skill tags
     }
     ```

3. **Class Data** (`classes/[classname]/[class]-paragon-boards.json`):
   - Per-class extraction with all 10 boards (9 for Spiritborn)
   - Includes node positions, legendary nodes, rare nodes, node details

### Key Data Structures

**Board Structure:**
- **Coordinate System:** 21x21 grid (0-20 on both axes)
- **Y-axis:** 0 = bottom (starting position), 20 = top
- **Starting Board:** 1 gate at North (10, 0)
- **Legendary Boards:** 4 gates (North/South/East/West) - rotatable

**Gate Node ID:** 994337 (universal identifier for all gate nodes)

**Gate Positions:**
- North: (10, 0)
- South: (10, 20)
- West: (0, 10)
- East: (20, 10)

**Class IDs:**
- 0: Sorcerer (Intelligence, Mana)
- 1: Druid (Willpower, Spirit)
- 2: Barbarian (Strength, Fury)
- 3: Rogue (Dexterity, Energy)
- 4: Necromancer (Intelligence, Essence)
- 5: Spiritborn (Dexterity, Vigor)
- 6: Paladin (Strength)

## Scripts Overview

**Extraction Pipeline:**
1. `extract-json.js` - Parse WH.setPageData() wrapper from raw data
2. `extract-all-data.js` - Extract all 5 data sections into clean JSON
3. `extract-all-classes.js` - Generate per-class board data files

**Analysis Scripts:**
4. `analyze-node-paths.js` - Calculate optimal paths using BFS
5. `generate-all-paths.js` - Generate board-paths.json for all classes
6. `analyze-starting-board-stats.js` - Node-by-node stat analysis

**Documentation Generation:**
7. `create-visual-with-gates.js` - Generate ASCII layouts with N/S/E/W gates
8. `generate-all-class-guides.js` - Batch create starting board guides

**Unused/Legacy:**
- `scrape-paragon-boards.js` - Puppeteer scraper (not needed - API endpoint found)
- `scrape-wowhead-paragon.js` - Alternative scraper (not needed)

## Common Tasks

### Re-extract Data from Wowhead
If game data updates, re-download the raw data:
```bash
curl -s "https://nether.wowhead.com/diablo-4/data/paragon-calc?dv=17&db=1765569180" -o raw-data/wowhead-paragon-raw.json
node scripts/extract-all-data.js
```

### Extract Data for a Specific Class
```bash
node scripts/extract-all-classes.js  # Generates all classes
```

### Generate Path Analysis
```bash
node scripts/generate-all-paths.js  # Creates board-paths.json for all classes
```

### Create Visual Documentation
```bash
node scripts/create-visual-with-gates.js  # Updates markdown with ASCII layouts
```

## File Naming Conventions

**Per-Class Files:**
- `[class]-paragon-boards.json` - Full board data (lowercase class name)
- `[class]-boards-summary.json` - Simplified summary
- `[class]-board-paths.json` - Path analysis
- `[CLASS]_PARAGON_BOARDS.md` - Complete board documentation (UPPERCASE)
- `[CLASS]_STARTING_BOARD_STATS_GUIDE.md` - Starting board guide (UPPERCASE)

## Important Constants

**Node Values:**
- Common nodes: +5 primary stat
- Rare nodes: Named nodes with 2+ bonuses (20-40x more valuable)
- Gate node ID: 994337
- Starting board: Always 75 nodes across all classes

**Path Analysis:**
- Starting board goal: ALWAYS reach the gate (top) to attach legendary boards
- Primary path: 14 nodes straight to gate at (10, 14)
- Alternative: ~20 nodes to gate with rare node detours
- Legendary board paths: 6 gate-to-gate + 1 to legendary area = 7 paths per board
- Path algorithm: BFS (breadth-first search) for shortest routes
- Adjacency: Nodes within 1 step (horizontal, vertical, diagonal)

## Documentation Philosophy

**Focus:** Gate-oriented strategies - always aiming to attach legendary boards

**Starting Board Strategies:**
- **Primary Goal:** Reach the gate (14 nodes minimum) to attach legendary boards
- **Direct Rush:** 14 nodes straight to gate - fastest legendary board access
- **Rare Detour:** 18-22 nodes to gate with 1-2 rare node pickups - balanced approach
- **No Partial Paths:** Left/Right branches that don't reach gate are not viable endgame strategies
- **Leveling Exception:** Partial progress (1-13 nodes) is fine while leveling to 50+

**Removed Unrealistic Content:**
- "Full clear" 75-node strategies
- Left/Right branch strategies that don't reach gate
- Completionist stat calculations (+395 primary stat)

**Why:** Players need to reach the gate to attach legendary boards where the real power is. Staying on starting board is inefficient.

**ASCII Visualization:**
- Gates marked as N/S/E/W (or S for start)
- Nodes marked as 'o'
- Empty spaces as '.'
- 21x21 grid (coordinates match raw data exactly)

## Modifying or Adding Classes

When adding a new class or updating data:

1. Ensure `raw-data/paragon-all-data.json` has the class data
2. Run `node scripts/extract-all-classes.js` to generate JSON files
3. Run `node scripts/generate-all-paths.js` to create path analysis
4. Update README.md to add the class section with proper links
5. Commit with descriptive message about what class/boards were added

## Data Source

**Primary:** Wowhead Diablo 4 Paragon Calculator
**API Endpoint:** `https://nether.wowhead.com/diablo-4/data/paragon-calc?dv=17&db=1765569180`
**Alternative UI:** `https://www.wowhead.com/diablo-4/paragon-calc/[classname]`

The `dv` and `db` query parameters may change with game updates - check network tab in browser if data seems outdated.

## Path Analysis Algorithm

The path-finding uses **BFS (Breadth-First Search)** with graph adjacency:

```javascript
// Two nodes are adjacent if within 1 step (including diagonals)
dx = abs(x1 - x2), dy = abs(y1 - y2)
adjacent = (dx <= 1 && dy <= 1) && (dx + dy > 0)
```

**Graph structure:**
- Nodes: Map of `"x,y"` → node object with neighbors array
- Shortest path: BFS guarantees minimum node count between points
- Result: Array of {x, y} coordinates showing step-by-step route

## Important Notes for Future Work

1. **Spiritborn has 9 boards** (not 10) - handle this edge case in scripts
2. **Starting boards are identical** geometrically across all classes - only stats differ
3. **Gate rotations** - all legendary boards can rotate 90° when attaching
4. **Y-coordinate confusion** - In-game UI shows Y=0 at bottom, but data is consistent
5. **Node IDs can repeat** at different positions - use (x,y) coordinates as unique keys
6. **Legendary nodes** are typically near board center, not at gates
7. **Rare nodes vary by class but are in similar positions on starting board

## Starting Board Rare Node Order

**Critical:** Rare nodes are encountered in a specific order when pathing from start to gate.

**For Barbarian (and likely similar for other classes):**
- **First 2 rares (closest to start, Y=4-5 area):**
  - Brawn (+20% Damage, 4% Life)
  - Tenacity (4% Life, +2% Armor)

- **Last 2 rares (further up, Y=8+ area, past/near gate):**
  - Raw Power (+20% Damage, +10 Strength)
  - Iron Strength (+30% Elite Damage, +10 Strength)

**Implication for builds:**
- With limited points (36 or less), take **Brawn + Tenacity** - they're on the way to gate
- Raw Power/Iron Strength require backtracking or going past gate - inefficient for <50 points
- Documentation should recommend the **accessible** rare nodes for realistic point allocations

## Node Stat Distribution

**Critical:** ALL paragon board nodes (starting AND legendary) give MIXED primary stats, not just the class's main stat!

Example from any Barbarian board:
- Some nodes: +5 Strength
- Some nodes: +5 Dexterity
- Some nodes: +5 Willpower
- Some nodes: +5 Intelligence
- Gate nodes: +1 to ALL stats

**Source:** Check `nodes[nodeId].searchText` field for stat type (e.g., "willpower normal node +5")

**Impact on builds:**
- A 36-point allocation typically gives: ~85 main stat, ~35 secondary, ~35 tertiary, ~5 quaternary
- NOT +180 of single stat as previously assumed
- This applies to ALL boards, not just starting board
- Stat diversity matters for rare node bonus thresholds (e.g., 190 Dexterity for bonuses)
- When building across multiple boards, you naturally accumulate all 4 primary stats
