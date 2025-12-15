#!/bin/bash

# Create Sorcerer guide
cat > SORCERER_STARTING_BOARD_STATS_GUIDE.md << 'EOF'
# Diablo 4 Sorcerer Starting Board - Complete Stats Guide

## 📍 Coordinate System Note
**IMPORTANT:** In the game UI, the starting node is at the BOTTOM of the board, not the top.
- Y = 0: Bottom of the board (Starting Position)
- Y = 20: Top of the board
- Board grows UPWARD from the starting position

---

## 🎯 Starting Board Overview (Board ID: 939773)

**Starting Position:** (10, 0) - Bottom Center
**Total Nodes:** 75
**Rare Nodes:** 4
**Primary Stat:** Intelligence
**Resource:** Mana

---

## 💎 Rare Node Locations & Bonuses

### 1. Elemental Balance
- **Bonuses:** +20% Non-Physical Damage, +10 Intelligence
- **Priority:** ⭐⭐⭐ HIGH - Perfect for Pyromancy, Frost, or Shock builds

### 2. Studied
- **Bonuses:** +30% Damage to Elites, +10 Intelligence
- **Priority:** ⭐⭐⭐ HIGH - Essential for boss killing and elite farming

### 3. Resilience
- **Bonuses:** +3% Total Resistance, 4% Maximum Life
- **Priority:** ⭐⭐ MEDIUM - Important for survivability

### 4. Elementalist
- **Bonuses:** +20% Non-Physical Damage, 4% Maximum Life
- **Priority:** ⭐⭐⭐ HIGH - Damage + survivability combo

---

## 🛤️ Path Statistics Comparison

### Path 1: Center Rush (14 nodes)
**Base Stats:** +75 Intelligence (15 nodes × 5 each)
**Best For:** Speed progression to legendary boards

### Path 2: Left Branch (7 nodes)
**Base Stats:** +40 Intelligence (8 nodes × 5 each)
**Best For:** Early damage with Elemental Balance/Studied

### Path 3: Right Branch (7 nodes)
**Base Stats:** +40 Intelligence (8 nodes × 5 each)
**Best For:** Balanced builds

---

## 🎮 Build-Specific Strategies

### Pyromancy Build (Fire)
- Prioritize: **Elemental Balance**, **Studied**
- Legendary Boards: Searing Heat, Flames of Conviction
- Path: Grab both damage rares early

### Frozen Orb Build (Ice)
- Prioritize: **Elemental Balance**, **Elementalist**
- Legendary Boards: Glacial Torrent, Frigid Fate
- Path: Center rush for CC synergy

### Chain Lightning Build (Shock)
- Prioritize: **Elemental Balance**, **Studied**
- Legendary Boards: Elemental Summoner, Shock Treatment
- Path: Elite damage for dense packs

---

## 📊 Maximum Stats (Full Board)

- **+395 Intelligence**
- **+40% Non-Physical Damage**
- **+30% Damage to Elites**
- **+8% Maximum Life**
- **+3% Total Resistance**

---

**Class:** Sorcerer | **Primary Stat:** Intelligence | **Resource:** Mana
EOF

echo "✅ Created: SORCERER_STARTING_BOARD_STATS_GUIDE.md"

# Similar structure for other classes...
