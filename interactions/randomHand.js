const createTilePool = require("../utils/createTilePool");
const handToEmoji = require("../utils/handToEmoji");
const responses = ["Here's a random hand: ", "Fresh from the wall: ", "Is this what you want? "];

module.exports = async interaction => {
    let tilePool = createTilePool();

    let hand = Array(38).fill(0);

    for (let i = 0; i < 14; i++) {
        let tile = tilePool.splice(Math.floor(Math.random() * tilePool.length), 1)[0];
        hand[tile]++;
    }

    let result = handToEmoji(hand);

    return interaction.reply(`${responses[Math.floor(Math.random() * responses.length)]}${result}`);
}