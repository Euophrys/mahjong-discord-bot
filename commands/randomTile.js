const emoji = require("../utils/emoji");
const responses = ["Here's a tile: ", "Does this one work? ", "How about this one? ", "Don't blame me if it's bad: "]

module.exports = message => {
    let tile = emoji[Math.floor(Math.random() * emoji.length)];

    return message.channel.send(`${responses[Math.floor(Math.random() * responses.length)]}${tile}`);
}