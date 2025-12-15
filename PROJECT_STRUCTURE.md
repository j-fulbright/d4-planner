# D4 Paragon Board Data - Project Structure

## 📁 Directory Organization

```
d4-data/
├── README.md                    # Master documentation & quick start guide
├── PROJECT_STRUCTURE.md         # This file
│
├── scripts/                     # Data extraction & analysis tools
│   ├── extract-*.js            # Data extraction scripts
│   ├── analyze-*.js            # Analysis scripts
│   ├── create-*.js             # Guide generation scripts
│   └── visualize-*.js          # Visualization generators
│
├── classes/                     # Per-class organized data
│   ├── barbarian/              # Complete legendary boards + starting guide
│   ├── paladin/                # Complete legendary boards + starting guide
│   ├── sorcerer/               # Starting board guide
│   ├── necromancer/            # Starting board guide
│   ├── rogue/                  # Starting board guide
│   ├── druid/                  # Starting board guide
│   └── spiritborn/             # Starting board guide
│
└── raw-data/                    # Unprocessed extracted data
    ├── wowhead-paragon-raw.json    # Original API response
    ├── paragon-all-data.json       # Parsed game data
    └── paragon-boards-clean.json   # Clean node positions
```

## 📊 What's in Each Class Folder

### Complete Classes (Barbarian, Paladin)
```
classes/[class]/
├── [CLASS]_STARTING_BOARD_STATS_GUIDE.md       # Starting board analysis
├── [CLASS]_STARTING_BOARD_PATHS.md             # Visual path guides
├── [CLASS]_PARAGON_BOARDS.md                   # All 10 boards documented
├── [class]-paragon-boards.json                 # Full board data
├── [class]-boards-summary.json                 # Simplified data
└── [class]-board-paths.json                    # Path analysis
```

### Other Classes (Sorcerer, Necromancer, Rogue, Druid, Spiritborn)
```
classes/[class]/
└── [CLASS]_STARTING_BOARD_STATS_GUIDE.md       # Starting board only
```

## 🔧 Scripts Purpose

| Script | Purpose |
|--------|---------|
| `extract-json.js` | Parse Wowhead API wrapper |
| `extract-all-data.js` | Extract all data sections |
| `extract-barbarian-boards.js` | Filter class-specific data |
| `analyze-node-paths.js` | Calculate optimal paths |
| `analyze-starting-board-stats.js` | Stat accumulation analysis |
| `create-visual-with-gates.js` | Generate ASCII layouts |
| `visualize-starting-board-paths.js` | Create path visualizations |
| `generate-all-class-guides.js` | Batch guide generation |

## 📖 Quick Access

### Starting Board Guides (All Classes)
- [Barbarian](classes/barbarian/BARBARIAN_STARTING_BOARD_STATS_GUIDE.md)
- [Paladin](classes/paladin/PALADIN_STARTING_BOARD_STATS_GUIDE.md)
- [Sorcerer](classes/sorcerer/SORCERER_STARTING_BOARD_STATS_GUIDE.md)
- [Necromancer](classes/necromancer/NECROMANCER_STARTING_BOARD_STATS_GUIDE.md)
- [Rogue](classes/rogue/ROGUE_STARTING_BOARD_STATS_GUIDE.md)
- [Druid](classes/druid/DRUID_STARTING_BOARD_STATS_GUIDE.md)
- [Spiritborn](classes/spiritborn/SPIRITBORN_STARTING_BOARD_STATS_GUIDE.md)

### Complete Legendary Board Sets
- [Barbarian All Boards](classes/barbarian/BARBARIAN_PARAGON_BOARDS.md)
- [Paladin All Boards](classes/paladin/PALADIN_PARAGON_BOARDS.md)

### Raw Data
- [All Game Data](raw-data/paragon-all-data.json)
- [Wowhead Raw](raw-data/wowhead-paragon-raw.json)

## 🎯 Usage Examples

### For Players
1. Check `classes/[your-class]/` for your starting board guide
2. Follow optimal path recommendations
3. Plan your rare node allocations

### For Developers
1. Use `raw-data/*.json` for your applications
2. Reference `scripts/` for data processing examples
3. Adapt analysis scripts for your needs

### For Theorycrafters
1. Access full board data in `classes/[class]/*.json`
2. Use path analysis for optimization calculations
3. Compare cross-class stat scaling

---

**Total Files:** ~30+ documentation and data files
**Total Classes:** 7 (all D4 classes covered)
**Complete Legendary Sets:** 2 (Barbarian, Paladin - 10 boards each)
**Raw Data Size:** ~560KB
