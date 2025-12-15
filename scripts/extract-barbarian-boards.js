/**
 * Extract Barbarian paragon board data
 */

const fs = require('fs');

console.log('Loading parsed data...');
const allData = JSON.parse(fs.readFileSync('paragon-all-data.json', 'utf8'));

const classBoards = allData['d4.paragonCalc.d4.classBoards'];
const boardNodes = allData['d4.paragonCalc.d4.boardNodes'];
const nodes = allData['d4.paragonCalc.d4.nodes'];
const glyphs = allData['d4.paragonCalc.d4.glyphs'];

console.log('\n=== Analyzing Classes ===');

// Analyze each class to identify Barbarian
// Barbarian typically has keywords like: Strength, Fury, Berserking, Bleeding, Physical
const classKeywords = {
    'Barbarian': ['strength', 'fury', 'berserking', 'bleeding', 'weapon', 'physical', 'shout', 'wrath'],
    'Sorcerer': ['intelligence', 'mana', 'fire', 'ice', 'lightning', 'pyromancy', 'frost', 'shock'],
    'Druid': ['willpower', 'spirit', 'earth', 'storm', 'companion', 'shapeshifting', 'wolf', 'bear'],
    'Rogue': ['dexterity', 'energy', 'shadow', 'trap', 'imbuement', 'combo', 'agility'],
    'Necromancer': ['intelligence', 'essence', 'bone', 'blood', 'minion', 'corpse', 'darkness'],
    'Spiritborn': ['willpower', 'vigor', 'spirit', 'centipede', 'eagle', 'gorilla', 'jaguar']
};

Object.entries(classBoards).forEach(([classId, boards]) => {
    console.log(`\n--- Class ID: ${classId} ---`);
    console.log(`Number of boards: ${boards.length}`);

    // Sample the first board's legendary and rare nodes for keywords
    if (boards.length > 0) {
        const firstBoard = boards[0];
        const text = JSON.stringify(firstBoard).toLowerCase();

        // Check for class keywords
        const matches = {};
        Object.entries(classKeywords).forEach(([className, keywords]) => {
            const count = keywords.filter(kw => text.includes(kw)).length;
            if (count > 0) {
                matches[className] = count;
            }
        });

        console.log('Keyword matches:', matches);

        // Show a sample legendary or rare
        if (firstBoard.legendaries && firstBoard.legendaries.length > 0) {
            console.log('Sample Legendary:', firstBoard.legendaries[0].name);
            console.log('Description:', firstBoard.legendaries[0].description.substring(0, 150) + '...');
        } else if (firstBoard.rares && firstBoard.rares.length > 0) {
            console.log('Sample Rare:', firstBoard.rares[0].name);
            console.log('Attributes:', firstBoard.rares[0].attributes.join(', '));
        }

        // Determine class
        const bestMatch = Object.entries(matches).sort((a, b) => b[1] - a[1])[0];
        if (bestMatch) {
            console.log(`>>> Likely class: ${bestMatch[0]} (${bestMatch[1]} keyword matches)`);
        }
    }
});

// Based on the analysis, extract Barbarian data
// You'll need to identify the correct class ID from the output above
console.log('\n\n=== Enter the Barbarian Class ID ===');
console.log('From the analysis above, which class ID appears to be Barbarian?');
console.log('Common attributes: Strength, Fury, Berserking, Bleeding, Physical, Weapon skills');

// Let's check all classes for Strength attribute (Barbarian primary stat)
console.log('\n=== Checking for Strength (Barbarian stat) ===');
Object.entries(classBoards).forEach(([classId, boards]) => {
    const allText = JSON.stringify(boards).toLowerCase();
    const hasStrength = allText.includes('strength');
    const hasFury = allText.includes('fury');
    const hasBerserking = allText.includes('berserking');

    if (hasStrength || hasFury || hasBerserking) {
        console.log(`Class ${classId}: Strength=${hasStrength}, Fury=${hasFury}, Berserking=${hasBerserking}`);

        // This is likely Barbarian, extract the data
        if (hasFury || hasBerserking) {
            console.log(`\n>>> Found Barbarian! Class ID: ${classId}`);

            const barbarianBoards = boards;
            const barbarianData = {
                classId: classId,
                className: 'Barbarian',
                boards: barbarianBoards.map(board => {
                    const boardId = board.sno;
                    return {
                        id: boardId,
                        name: `Board_${boardId}`, // We'll need to find names separately
                        legendaryNodes: board.legendaries,
                        rareNodes: board.rares,
                        nodes: boardNodes[boardId] || [],
                        // Add node details
                        nodeDetails: (boardNodes[boardId] || []).map(pos => {
                            const nodeId = pos.node;
                            return {
                                ...pos,
                                details: nodes[nodeId]
                            };
                        })
                    };
                }),
                allBoardIds: barbarianBoards.map(b => b.sno)
            };

            // Save Barbarian data
            fs.writeFileSync('barbarian-paragon-boards.json', JSON.stringify(barbarianData, null, 2));
            console.log('✓ Saved Barbarian data to barbarian-paragon-boards.json');

            // Create a summary
            console.log('\n=== Barbarian Paragon Boards Summary ===');
            console.log(`Total boards: ${barbarianData.boards.length}`);
            barbarianData.boards.forEach((board, idx) => {
                console.log(`\nBoard ${idx + 1} (ID: ${board.id}):`);
                console.log(`  - Nodes: ${board.nodes.length}`);
                console.log(`  - Legendary nodes: ${board.legendaryNodes.length}`);
                console.log(`  - Rare nodes: ${board.rareNodes.length}`);

                if (board.legendaryNodes.length > 0) {
                    console.log(`  - Legendary: ${board.legendaryNodes.map(l => l.name).join(', ')}`);
                }
            });
        }
    }
});
