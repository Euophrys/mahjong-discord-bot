const emoji = require("../utils/emoji");
const createTilePool = require("../utils/createTilePool");
const responses = ["Here's a tile: ", "Does this one work? ", "How about this one? ", "Don't blame me if it's bad: "];
const sendResponse = require("../utils/sendResponse");

module.exports = message => {
    let tilePool = createTilePool();
    let tile = tilePool.splice(Math.floor(Math.random() * tilePool.length), 1)[0];
    tile = emoji[tile];

    return sendResponse(message, `${responses[Math.floor(Math.random() * responses.length)]}${tile}`);
}