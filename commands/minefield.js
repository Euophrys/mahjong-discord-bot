const emoji = require("../utils/emoji");
const createTilePool = require("../utils/createTilePool");
const handToEmoji = require("../utils/handToEmoji");
const sendResponse = require("../utils/sendResponse");

module.exports = message => {
    let options = message.content.split(" ").slice(1).join("").toLowerCase();
    let sort = false;

    if (options && options.indexOf("sort") > -1) {
        sort = true;
    }

    let tilePool = createTilePool();
    let chosenTiles = [];
    let hand = Array(38).fill(0);

    for (let i = 0; i < 34; i++) {
        let tile = tilePool.splice(Math.floor(Math.random() * tilePool.length), 1)[0];
        hand[tile]++;
        chosenTiles.push(tile);
    }

    let response = "Try to build the highest scoring tenpai hand you can from these tiles.\n";

    if (sort) {
        let emojiString = handToEmoji(hand);

        response += emojiString.substring(0, 24 * 12);
        response += "\n";
        response += emojiString.substring(24 * 12, 24 * 24);
        response += "\n<:tileBack:466437984216940544>";
        response += emojiString.substring(24 * 24);
        response += "<:tileBack:466437984216940544>"
    } else {
        for (let i = 0; i < 12; i++) {
            response += emoji[chosenTiles[i]];
        }

        response += "\n";
        
        for (let i = 12; i < 24; i++) {
            response += emoji[chosenTiles[i]];
        }

        response += "\n<:tileBack:466437984216940544>";
        
        for (let i = 24; i < chosenTiles.length; i++) {
            response += emoji[chosenTiles[i]];
        }

        response += "<:tileBack:466437984216940544>"
    }

    let seat = emoji[Math.floor(Math.random() * 4) + 31];
    let round = emoji[Math.floor(Math.random() * 4) + 31];
    let dora = emoji[tilePool.splice(Math.floor(Math.random() * tilePool.length), 1)[0]];
    let ura = emoji[tilePool.splice(Math.floor(Math.random() * tilePool.length), 1)[0]];

    response += `\nSeat: ${seat}, Round: ${round}, Indicators: Dora: ${dora}, Ura: ||${ura}||`;

    return sendResponse(message, response);
}
