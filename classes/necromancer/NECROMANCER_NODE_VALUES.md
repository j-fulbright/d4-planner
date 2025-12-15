# Necromancer Starting Board - Node Value Analysis

Theorycraft value calculations for starting board nodes.

---

## 📊 Node Type Values

### **Normal Nodes (Baseline)**
- **Bonus:** +5 to one primary stat (Str/Dex/Will/Int)
- **Value:** 1 point (baseline)

### **Magic Nodes**
- **Possible Bonuses:**
  - +10.0% Damage
  - +2.0% Maximum Life
  - +1.5% Total Armor
- **Value:** 3-20 points (depending on bonus type)

---

## 💎 Rare Node Values (Starting Board)

| Rare Node | Bonuses | Equivalent Normal Nodes | Value Score |
|-----------|---------|------------------------|-------------|
| **Grasp** | +30% Damage to Elites, +10 Intelligence | ~62 | 62 |
| **Knowledge** | +20% Damage, +10 Intelligence | ~42 | 42 |
| **Prime** | +20% Damage, +4% Maximum Life | ~40 | 40 |
| **Resilience** | +3% Total Resistance, +4% Maximum Life | ~14 | 14 |

**Sorted by value (highest to lowest)**

---

## 📈 Value Efficiency Table

| Node Type | Points to Allocate | Value Score | Efficiency |
|-----------|-------------------|-------------|------------|
| **Grasp** (rare) | 1 | 62 | 62.00x |
| **Knowledge** (rare) | 1 | 42 | 42.00x |
| **Prime** (rare) | 1 | 40 | 40.00x |
| **Magic (+10% Dmg)** | 1 | 20 | 20.00x |
| **Resilience** (rare) | 1 | 14 | 14.00x |
| **Magic (+2% Life)** | 1 | 4 | 4.00x |
| **Magic (+1.5% Armor)** | 1 | 3 | 3.00x |
| **Normal** | 1 | 1 | 1.00x |

---

## 🎯 Value Per Point Investment

**To reach each rare node from start:**

| Rare Node | Distance | Total Investment | Total Value | Net Efficiency |
|-----------|----------|------------------|-------------|----------------|
| **Gate** | 14 nodes | 14 | 14 | 1.00x |
| **Prime** (accessible) | ~7 nodes + rare | 8 | ~48 | 6.00x |
| **Resilience** (accessible) | ~7 nodes + rare | 8 | ~22 | 2.75x |
| **Knowledge** (far) | ~15 nodes + rare | 16 | ~58 | 3.63x |
| **Grasp** (far) | ~17 nodes + rare | 18 | ~80 | 4.44x |

**Key Insight:** Even far rare nodes have good ROI, but accessible rares are more point-efficient.

---

## 🔬 Optimal Node Priority (Pure Math)

**For damage builds:**
1. Grasp (62 value) - Best single node
2. Knowledge (42 value) - High damage
3. Magic +10% Damage nodes (20 value) - If on path
4. Prime (40 value) - Balanced damage
5. Resilience (14 value) - Defensive

**For tank builds:**
1. Resilience (14 value) - Best defensive rare
2. Prime (40 value) - Damage + life
3. Magic +2% Life nodes (4 value) - If on path
4. Knowledge (42 value) - Still want damage
5. Grasp (62 value) - Elite damage

---

## 📐 Value Calculations

**How values are calculated:**

**Damage bonuses:**
- +10% Damage ≈ 20 normal nodes (rough estimate)
- +20% Damage ≈ 40 normal nodes
- +30% Elite Damage ≈ 60 normal nodes (very valuable)

**Primary stat bonuses:**
- +10 Intelligence ≈ 2 normal nodes
- Combined with % bonuses = rare node total value

**Defensive bonuses:**
- +4% Life ≈ 8 normal nodes
- +2% Armor ≈ 4 normal nodes
- +3% Resistance ≈ 6 normal nodes

**Note:** Values assume damage-focused build. Tank builds may value defensive stats higher.

---

**All data from:** `classes/necromancer/necromancer-boards-summary.json`
