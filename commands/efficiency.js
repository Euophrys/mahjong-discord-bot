const emoji = require("../utils/emoji");
const handToEmoji = require("../utils/handToEmoji");
const sendResponse = require("../utils/sendResponse");
const sendDeletableResponse = require("../utils/sendDeletableResponse");
const convertTilesToTenhouString = require("../utils/convertTilesToTenhouString");
const parseHandFromString = require("../utils/parseHandFromString");

module.exports = (message, client) => {
    let command = message.content.split(" ")[0].toLowerCase();
    let handString = message.content.split(" ").slice(1).join("").toLowerCase();

    if (command == "!eff" && handString == "you") {
        return sendResponse(message, "Hey, that's not nice! Admin, help!");
    } else if (command == "!eff" && handString == "me") {
        return sendResponse(message, "You're not really my type. You're, you know... human.");
    }

    if ((handString == "that" || handString == "thatstandard") && client.user.lastMessage.content) {
        handString = client.user.lastMessage.content;
    }

    let {tiles, handTiles} = parseHandFromString(handString);

    if (tiles == 0) {
        // Sometimes people call it with just numbers, so add a p and see if that helps.
        handString += "p";
        let added = parseHandFromString(handString);
        tiles = added.tiles;
        handTiles = added.handTiles;

        if (tiles == 0) {
            return sendDeletableResponse(message, "You'll need to give me a hand to calculate. The format is like this: 1236m4568p789s111z");
        }
    }

    if (tiles > 14) {
        return sendDeletableResponse(message, `That hand has ${tiles - 14} too many tiles.`);
    }

    if (tiles % 3 === 0) {
        return sendDeletableResponse(message, `That hand has ${tiles} tiles, which is a multiple of three, which can't happen.`);
    }

    let remainingTiles = Array(38).fill(4);
    remainingTiles[0] = 0;
    remainingTiles[10] = 0;
    remainingTiles[20] = 0;
    remainingTiles[30] = 0;

    for (let i = 0; i < remainingTiles.length; i++) {
        remainingTiles[i] = Math.max(0, remainingTiles[i] - handTiles[i]);
    }

    let response = `${handToEmoji(handTiles)} `;
    let handActuallyHasTon = handTiles[31] > 0;

    // We add East triplets just to make the shanten calculation accurate for called hands.
    while (tiles < 13) {
        handTiles[31] += 3;
        tiles += 3;
    }
    
    let shantenFunction = message.content.toLowerCase().indexOf("standard") > 0 ? calculateStandardShanten : calculateMinimumShanten;
    let shanten = shantenFunction(handTiles);

    if (shanten === -1) {
        response += "(Complete)\n";
        shanten = 0;
    }
    else if (shanten === 0) {
        response += "(Tenpai)\n";
    }
    else {
        response += `(${shanten}-shanten)\n`;
    }

    // Check just the ukeire of 13 tile hands (or tiles % 3 === 1 hands)
    if (tiles == 13) {
        let ukeire = calculateUkeire(handTiles, remainingTiles, shantenFunction, shanten);
        response += `Ukeire: ${ukeire.value} (`;
        
        for (let i = 0; i < ukeire.tiles.length; i++) {
            response += emoji[ukeire.tiles[i]];
        }

        response += ")";

        return sendResponse(message, response);
    }

    // Check the ukeire of each discard for 14 tile hands (or tiles % 3 === 2 hands)
    let discardUkeire = calculateDiscardUkeire(handTiles, remainingTiles, shantenFunction, shanten);
    let groups = createUkeireGroups(discardUkeire, handActuallyHasTon);

    if (shanten === 1) {
        groups = filterBadUkeire(handTiles, groups, remainingTiles);
    }

    groups = sortGroups(groups);

    let ukeire = "";

    for (let i = 0; i < groups.length; i++) {
        let group = groups[i];
        
        if (shanten === 1) {
            ukeire += `Discard ${tilesToEmoji(group.discards)} -> ${group.value} (${group.good}\\*) ukeire (${tilesToEmoji(group.goodTiles)}\\*${tilesToEmoji(group.tiles)})\n`;
        } else {
            ukeire += `Discard ${tilesToEmoji(group.discards)} -> ${group.value} ukeire (${tilesToEmoji(group.tiles)})\n`;
        }
    }

    if ((response + ukeire).length > 1800) {
        ukeire = "";
        
        for (let i = 0; i < groups.length; i++) {
            let group = groups[i];

            if (shanten === 1) {
                ukeire += `Discard ${tilesToEmoji(group.discards)} -> ${group.value} (${group.good}\\*) ukeire (${convertTilesToTenhouString(group.goodTiles)} \\* ${convertTilesToTenhouString(group.tiles)})\n`;
            } else {
                ukeire += `Discard ${tilesToEmoji(group.discards)} -> ${group.value} ukeire (${convertTilesToTenhouString(group.tiles)})\n`;
            }
        }
    }

    if (shanten === 1) {
        ukeire += "* Resulting in good wait tenpai"
    }

    response += ukeire;

    return sendResponse(message, response);
}

function createUkeireGroups(discardUkeire, handActuallyHasTon) {
    let groupsObject = {};

    for (let i = 0; i < discardUkeire.length; i++) {
        if (i === 31 && !handActuallyHasTon) continue;
        if (discardUkeire[i].value == 0) continue;

        let tiles = discardUkeire[i].tiles.join("");

        if (!groupsObject[tiles]) {
            groupsObject[tiles] = {
                discards: [i],
                value: discardUkeire[i].value,
                tiles: discardUkeire[i].tiles
            };
        } else {
            groupsObject[tiles].discards.push(i);
        }
    }

    let groups = [];

    for (key in groupsObject) {
        if(!groupsObject[key].tiles) continue;
        groups.push(groupsObject[key]);
    }

    return groups;
}

function filterBadUkeire(hand, groups, remainingTiles) {
    let adjustedRemainingTiles = Array(38).fill(0);

    // Makes it so the ukeire only checks tiles that are possible to improve the hand
    for(let i = 0; i < groups.length; i++) {
        let tiles = groups[i].tiles;
        for(let j = 0; j < tiles.length; j++) {
            adjustedRemainingTiles[tiles[j]] = remainingTiles[tiles[j]];
        }

        groups[i].good = groups[i].value;
        groups[i].goodTiles = [];
    }

    for(let i = 0; i < groups.length; i++) {
        hand[groups[i].discards[0]]--;
        let tiles = groups[i].tiles.slice();

        for(let j = 0; j < tiles.length; j++) {
            let tile = tiles[j];
            hand[tile]++;

            let ukeire = calculateDiscardUkeire(hand, remainingTiles, calculateStandardShanten, 0);
            let bestUkeire = Math.max(...ukeire.map((u) => u.value));

            if (bestUkeire <= 4) {
                groups[i].good -= remainingTiles[tile];
            } else {
                groups[i].tiles.splice(groups[i].tiles.indexOf(tile), 1);
                groups[i].goodTiles.push(tile);
            }

            hand[tile]--;
        }
        hand[groups[i].discards[0]]++;
    }

    return groups;
}

function sortGroups(groups) {
    return groups.sort((a, b) => {
        let result = b.value - a.value;
        if (result == 0) {
            result = b.discards.length - a.discards.length;
        }
        if (result == 0) {
            result = a.discards[0] - b.discards[0];
        }
        return result;
    });
}

function tilesToEmoji(tiles) {
    let result = "";

    for (i = 0; i < tiles.length; i++) {
        result += emoji[tiles[i]];
    }

    return result;
}

// Todo: Put all these in their own file lol
let hand = new Array(38);
let completeSets;
let pair;
let partialSets;
let bestShanten;
let minimumShanten;
let hasGivenMinimum;

function calculateMinimumShanten(handToCheck, minimumShanten = -2) {
    let chiitoiShanten = calculateChiitoitsuShanten(handToCheck);
    
    if (chiitoiShanten < 1) {
        return chiitoiShanten;
    }

    let kokushiShanten = calculateKokushiShanten(handToCheck);

    if (kokushiShanten < 4) {
        return kokushiShanten;
    }

    let standardShanten = calculateStandardShanten(handToCheck, minimumShanten);

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

function calculateStandardShanten(handToCheck, minimumShanten_ = -2) {
    hand = handToCheck.slice();

    // Initialize variables
    hasGivenMinimum = true;
    minimumShanten = minimumShanten_;
    completeSets = 0;
    pair = 0;
    partialSets = 0;
    bestShanten = 8;

    if (minimumShanten_ == -2) {
        hasGivenMinimum = false;
        minimumShanten = -1;
    }

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
    if (bestShanten <= minimumShanten) return;
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
    if (bestShanten <= minimumShanten) return;
    if (hasGivenMinimum && completeSets < 3 - minimumShanten) return;

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

    let hasManzu = false
    let hasPinzu = false
    let hasSouzu = false

    for (let i = 1; i < 10; i++) {
        if (hand[i] > 0)
            hasManzu = true;
        if (hand[i+10] > 0)
            hasPinzu = true;
        if (hand[i+20] > 0)
            hasSouzu = true;
    }

    // Check adding every tile to see if it improves the shanten
    for (let addedTile = 1; addedTile < convertedHand.length; addedTile++) {
        if (remainingTiles[addedTile] === 0) continue;
        if (addedTile % 10 === 0) continue;
        if (!hasManzu && addedTile > 1 && addedTile < 9) continue;
        if (!hasPinzu && addedTile > 11 && addedTile < 19) continue;
        if (!hasSouzu && addedTile > 21 && addedTile < 29) continue;

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