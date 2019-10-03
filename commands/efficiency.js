const emoji = require("../utils/emoji");
const characterToSuit = require("../utils/characterToSuit");

module.exports = message => {
    let command = message.content.split(" ")[0].toLowerCase();
    let handString = message.content.split(" ").slice(1).join("").toLowerCase();

    if (command == "!eff" && handString == "you") {
        message.channel.send("Hey, that's not nice! Admin, help!");
    } else if (command == "!eff" && handString == "me") {
        message.channel.send("You're not really my type. You're, you know... human.");
    }

    let handTiles = Array(38).fill(0);

    let characters = handString.split('').reverse();
    let index = 0;
    let tiles = 0;
    
    while (index < characters.length) {
        do {
            offset = characterToSuit(characters[index]);
            index++;
        } while (offset === -1 && index < characters.length);

        while (!isNaN(characters[index]) && index < characters.length) {
            let tile = parseInt(characters[index]);

            if (tile >= 0) {
                tile += offset;

                if (tile == 30) {
                    continue;
                }

                if (tile % 10 == 0) {
                    tile += 5;
                }

                handTiles[tile] += 1;
                tiles++;
            }

            index++;
        }
    }

    if (tiles == 0) {
        return message.channel.send("You'll need to give me a hand to calculate. The format is like this: 1236m4568p789s111z")
    }

    if (tiles > 14) {
        return message.channel.send(`That hand has ${tiles - 14} too many tiles.`);
    }

    if (tiles < 13) {
        return message.channel.send(`That hand needs at least ${13 - tiles} more tiles.`);
    }

    let remainingTiles = Array(38).fill(4);
    remainingTiles[0] = 0;
    remainingTiles[10] = 0;
    remainingTiles[20] = 0;
    remainingTiles[30] = 0;

    for (let i = 0; i < remainingTiles.length; i++) {
        remainingTiles[i] = Math.max(0, remainingTiles[i] - handTiles[i]);
    }
    
    let shanten = calculateMinimumShanten(handTiles);
    let response = `${handToEmoji(handTiles)} (${shanten}-shanten)\n`;

    if (tiles == 13) {
        let ukeire = calculateUkeire(handTiles, remainingTiles, calculateMinimumShanten, shanten);
        response += `Ukeire: ${ukeire.value} (`;
        
        for (let i = 0; i < ukeire.tiles.length; i++) {
            response += emoji[ukeire.tiles[i]];
        }

        response += ")";

        return message.channel.send(response);
    }

    let discardUkeire = calculateDiscardUkeire(handTiles, remainingTiles, calculateMinimumShanten, shanten);
    sortedUkeire = discardUkeire.slice().sort((a, b) => b.value - a.value);

    for (let i = 0; i < sortedUkeire.length; i++) {
        if (sortedUkeire[i].value == 0) continue;

        response += `Discard ${emoji[discardUkeire.indexOf(sortedUkeire[i])]} -> ${sortedUkeire[i].value} ukeire (`;

        for (let j = 0; j < sortedUkeire[i].tiles.length; j++) {
            response += emoji[sortedUkeire[i].tiles[j]];
        }

        response += ")\n";
    }

    return message.channel.send(response);
}

function handToEmoji(hand) {
    let result = "";

    for (let i = 0; i < hand.length; i++) {
        if (i % 10 === 5 && hand[i - 5] > 0) {
            result += emoji[i - 5];
        }

        if (i % 10 === 0) continue;

        for (let j = 0; j < hand[i]; j++) {
            result += emoji[i];
        }
    }

    return result;
}

let hand = new Array(38);
let completeSets;
let pair;
let partialSets;
let bestShanten;
let mininumShanten;

function calculateMinimumShanten(handToCheck, mininumShanten = -1) {
    let standardShanten = calculateStandardShanten(handToCheck, mininumShanten);
    let chiitoiShanten = calculateChiitoitsuShanten(handToCheck);
    let kokushiShanten = calculateKokushiShanten(handToCheck);

    return Math.min(standardShanten, chiitoiShanten, kokushiShanten);
}

function calculateChiitoitsuShanten(handToCheck) {
    hand = handToCheck.slice();
    let pairCount = 0, uniqueTiles = 0;

    for (let i = 1; i < hand.length; i++) {
        if (hand[i] === 0) continue;

        uniqueTiles++;

        if (hand[i] >= 2) {
            pairCount++;
        }
    }

    let shanten = 6 - pairCount;

    if (uniqueTiles < 7) {
        shanten += 7 - uniqueTiles;
    }

    return shanten;
}

function calculateKokushiShanten(handToCheck) {
    let uniqueTiles = 0;
    let hasPair = 0;

    for (let i = 1; i < handToCheck.length; i++) {
        if (i % 10 === 1 || i % 10 === 9 || i > 30) {
            if (handToCheck[i] !== 0) {
                uniqueTiles++;

                if (handToCheck[i] >= 2) {
                    hasPair = 1;
                }
            }
        }
    }

    return 13 - uniqueTiles - hasPair;
}

function calculateStandardShanten(handToCheck, mininumShanten_ = -1) {
    hand = handToCheck.slice();
    mininumShanten = mininumShanten_;

    // Initialize variables
    completeSets = 0;
    pair = 0;
    partialSets = 0;
    bestShanten = 8;

    // Loop through hand, removing all pair candidates and checking their shanten
    for (let i = 1; i < hand.length; i++) {
        if (hand[i] >= 2) {
            pair++;
            hand[i] -= 2;
            removeCompletedSets(1);
            hand[i] += 2;
            pair--;
        }
    }

    // Check shanten when there's nothing used as a pair
    removeCompletedSets(1);

    return bestShanten;
}

function removeCompletedSets(i) {
    if (bestShanten <= mininumShanten) return;
    // Skip to the next tile that exists in the hand.
    for (; i < hand.length && hand[i] === 0; i++) { }

    if (i >= hand.length) {
        // We've gone through the whole hand, now check for partial sets.
        removePotentialSets(1);
        return;
    }

    // Pung
    if (hand[i] >= 3) {
        completeSets++;
        hand[i] -= 3;
        removeCompletedSets(i);
        hand[i] += 3;
        completeSets--;
    }

    // Chow
    if (i < 30 && hand[i + 1] !== 0 && hand[i + 2] !== 0) {
        completeSets++;
        hand[i]--; hand[i + 1]--; hand[i + 2]--;
        removeCompletedSets(i);
        hand[i]++; hand[i + 1]++; hand[i + 2]++;
        completeSets--;
    }

    // Check all alternative hand configurations
    removeCompletedSets(i + 1);
}

function removePotentialSets(i) {
    if (bestShanten <= mininumShanten) return;
    // Skip to the next tile that exists in the hand
    for (; i < hand.length && hand[i] === 0; i++) { }

    if (i >= hand.length) {
        // We've checked everything. See if this shanten is better than the current best.
        let currentShanten = 8 - (completeSets * 2) - partialSets - pair;
        if (currentShanten < bestShanten) {
            bestShanten = currentShanten;
        }
        return;
    }

    // A standard hand will only ever have four groups plus a pair.
    if (completeSets + partialSets < 4) {
        // Pair
        if (hand[i] === 2) {
            partialSets++;
            hand[i] -= 2;
            removePotentialSets(i);
            hand[i] += 2;
            partialSets--;
        }

        // Edge or Side wait protorun
        if (i < 30 && hand[i + 1] !== 0) {
            partialSets++;
            hand[i]--; hand[i + 1]--;
            removePotentialSets(i);
            hand[i]++; hand[i + 1]++;
            partialSets--;
        }

        // Closed wait protorun
        if (i < 30 && i % 10 <= 8 && hand[i + 2] !== 0) {
            partialSets++;
            hand[i]--; hand[i + 2]--;
            removePotentialSets(i);
            hand[i]++; hand[i + 2]++;
            partialSets--;
        }
    }

    // Check all alternative hand configurations
    removePotentialSets(i + 1);
}

function calculateDiscardUkeire(hand, remainingTiles, shantenFunction, baseShanten = -2) {
    let results = Array(hand.length).fill(0);
    let convertedHand = hand.slice();

    if (baseShanten === -2) {
        baseShanten = shantenFunction(convertedHand);
    }

    // Check the ukeire of each hand that results from each discard
    for (let handIndex = 0; handIndex < convertedHand.length; handIndex++) {
        if (convertedHand[handIndex] === 0) {
            results[handIndex] = { value: 0, tiles: [] };
            continue;
        }

        convertedHand[handIndex]--;
        let ukeire = calculateUkeire(convertedHand, remainingTiles, shantenFunction, baseShanten);
        convertedHand[handIndex]++;

        results[handIndex] = ukeire;
    }

    return results;
}

function calculateUkeire(hand, remainingTiles, shantenFunction, baseShanten = -2) {
    let convertedHand = hand.slice();
    let convertedTiles = remainingTiles.slice();

    if (baseShanten === -2) {
        baseShanten = shantenFunction(convertedHand);
    }

    let value = 0;
    let tiles = [];

    // Check adding every tile to see if it improves the shanten
    for (let addedTile = 1; addedTile < convertedHand.length; addedTile++) {
        if (remainingTiles[addedTile] === 0) continue;
        if (addedTile % 10 === 0) continue;

        convertedHand[addedTile]++;

        if (shantenFunction(convertedHand, baseShanten - 1) < baseShanten) {
            // Improves shanten. Add the number of remaining tiles to the ukeire count
            value += convertedTiles[addedTile];
            tiles.push(addedTile);
        }

        convertedHand[addedTile]--;
    }

    return {
        value,
        tiles
    };
}