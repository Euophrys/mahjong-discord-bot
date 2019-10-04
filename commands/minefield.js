const emoji = require("../utils/emoji");
const createTilePool = require("../utils/createTilePool");
const handToEmoji = require("../utils/handToEmoji");

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

    let response = "Try to build the highest scoring hand you can from these tiles.\n";

    if (sort) {
        let emojiString = handToEmoji(hand);

        response += emojiString.substring(0, 4 * 12);
        response += "\n";
        response += emojiString.substring(4 * 12, 4 * 24);
        response += "\n:tileBack:";
        response += emojiString.substring(4 * 24);
        response += ":tileBack:"
    } else {
        for (let i = 0; i < 12; i++) {
            response += emoji[chosenTiles[i]];
        }

        response += "\n";
        
        for (let i = 12; i < 24; i++) {
            response += emoji[chosenTiles[i]];
        }

        response += "\n:tileBack:";
        
        for (let i = 24; i < chosenTiles.length; i++) {
            response += emoji[chosenTiles[i]];
        }

        response += ":tileBack:"
    }

    return message.channel.send(response);
}
