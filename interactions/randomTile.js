const emoji = require("../utils/emoji");
const createTilePool = require("../utils/createTilePool");
const responses = ["Here's a tile: ", "Does this one work? ", "How about this one? ", "Don't blame me if it's bad: "];

module.exports = async interaction => {
    let tilePool = createTilePool();
    let tile = tilePool.splice(Math.floor(Math.random() * tilePool.length), 1)[0];
    tile = emoji[tile];

    return interaction.reply(`${responses[Math.floor(Math.random() * responses.length)]}${tile}`);
}