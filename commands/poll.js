const emoji = require("../utils/emoji");
const parseHandFromString = require("../utils/parseHandFromString");
const sendDeletableResponse = require("../utils/sendDeletableResponse");

module.exports = message => {
    let handString = message.content.split(" ").slice(1).join("").toLowerCase();

    let {tiles, handTiles} = parseHandFromString(handString);

    if (tiles == 0) {
        return sendDeletableResponse(message, "You'll need to give me some tiles. The format is like this: 1236m4568p789s111z")
    }

    let promise = null;

    for(let i = 0; i < handTiles.length; i++) {
        if (handTiles[i]) {
            let emoji_id = emoji[i].split(":")[2].split(">")[0];
            
            if (promise == null) {
                promise = message.react(emoji_id);
            } else {
                promise.then(() => message.react(emoji_id));
            }
        }
    }
}