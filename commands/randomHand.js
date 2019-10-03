const emoji = require("../utils/emoji");
const responses = ["Here's a random hand: ", "Fresh from the wall: ", "Is this what you want? "]

module.exports = message => {
    let availableTiles = Array(38).fill(4);
    availableTiles[30] = 0;
    availableTiles[0] = 1;
    availableTiles[10] = 1;
    availableTiles[20] = 1;
    availableTiles[5] = 3;
    availableTiles[15] = 3;
    availableTiles[25] = 3;

    let tilePool = [];

    for (let i = 0; i < availableTiles.length; i++) {
        for (let j = 0; j < availableTiles[i]; j++) {
            tilePool.push(i);
        }
    }

    let hand = Array(38).fill(0);

    for (let i = 0; i < 14; i++) {
        let tile = tilePool.splice(Math.floor(Math.random() * tilePool.length), 1)[0];
        hand[tile]++;
    }

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

    return message.channel.send(`${responses[Math.floor(Math.random() * responses.length)]}${result}`);
}