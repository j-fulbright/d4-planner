# Diablo 4 Paragon Board - Node Types Reference

Universal node types across ALL paragon boards and ALL classes.
Based on actual in-game tooltips and screenshots.

---

## 🟫 Normal Nodes (Brown/Bronze)

**Visual:** Brown/bronze circular icons with small symbols inside

**Stats:** Each gives **+5 to ONE primary stat**

**Possible stats:**
- +5 Strength
- +5 Dexterity
- +5 Willpower
- +5 Intelligence

**Note:** Which stat you get depends on the specific node. Hover to see tooltip.

---

## 🔵 Magic Nodes (Blue)

**Visual:** Blue circular icons (brighter, stands out from brown)

**Stats:** Percentage bonuses (better than +5 stats!)

**Confirmed bonuses:**
- +10.0% Damage
- +1.5% Total Armor
- +2.0% Maximum Life

**Note:** Magic nodes are more valuable than normal nodes. Prioritize them when possible.

---

## 🟠 Rare Nodes (Gold/Orange)

**Visual:** Gold/orange circular icons with NAME displayed in tooltip

**Stats:** POWERFUL bonuses + bonus effects with stat thresholds

**Characteristics:**
- Named nodes (hover to see name like "Brawn", "Tenacity", etc.)
- 2-3 bonuses (e.g., +20% Damage, +4% Life)
- Often have BONUS EFFECTS at high stat thresholds
- Threshold examples: 630 Strength, 190 Willpower, 190 Dexterity
- Worth 20-60x more value than normal nodes

**Examples of rare node bonuses (vary by class and board):**
- Damage bonuses: +20-30%
- Elite damage: +30%
- Primary stat bonuses: +10
- Life/Armor bonuses: +2-4%
- Bonus effects: Additional bonuses if stat thresholds met

**How to identify:**
- Gold/orange color (very obvious)
- Has a NAME in the tooltip (not just "Normal Node" or "Magic Node")
- Multiple bonuses listed
- Usually shows threshold requirements at bottom of tooltip

**Note:** Each paragon board has 4 rare nodes. Which specific rares depend on the board. Check `classBoards` data or in-game tooltips for board-specific rare nodes.

---

## 🔴 Glyph Socket

**Visual:** Red circular socket in center of board

**Purpose:**
- Insert glyphs here
- Glyphs boost nodes within their radius
- Different glyphs provide different bonuses

**Note:** Not a node you allocate - it's a socket for glyph items

---

## 📊 Node Value Comparison

| Node Type | Example Bonus | Value vs Normal Node |
|-----------|---------------|----------------------|
| **Normal** | +5 Strength | 1x (baseline) |
| **Magic** | +10% Damage | ~20x better! |
| **Rare** | +20% Damage + 4% Life | ~40x better! |

**Takeaway:** Magic and Rare nodes are SIGNIFICANTLY more valuable than normal nodes!

---

## 🎯 Node Priority for Builds

### **For 36-Point Build:**

**Must Have:**
1. Gate node (unlocks legendary boards)
2. 2 Rare nodes - **Brawn** and **Tenacity** (accessible from start)

**Nice to Have:**
3. Magic nodes (blue) - grab if on your path
4. Normal nodes - only to connect paths

**Skip (for 36pts):**
- Raw Power rare (too far/past gate)
- Iron Strength rare (too far/past gate)
- Normal nodes far from your path

---

## 🔍 Rare Node Bonus Thresholds (Universal Mechanic)

**How thresholds work:**
- Rare nodes have BASE bonuses (always active)
- Rare nodes have BONUS effects (require stat thresholds)
- Thresholds vary: Common values are 190, 630, or other high numbers
- Threshold stats vary: Strength, Dexterity, Willpower, Intelligence

**Example format:**
```
Rare Node Name
  • Base: +20% Damage, +4% Life
  • Bonus: Another +20% Damage if requirements met:
    ♦ 630 Strength
```

**Reality Check:**
- With 36 points on one board: BASE bonuses only ✅
- With 100+ points across multiple boards: Some thresholds unlocked ✅
- Thresholds are endgame optimization, not early-game concern

**Note:** Specific rare nodes and their thresholds are in the class-specific data files. Check `classes/[classname]/[class]-boards-summary.json` for exact rare node details per board.

---

**This reference helps you identify node types across all classes and boards!**

For class-specific rare node details, see: `classes/[classname]/[class]-boards-summary.json`
