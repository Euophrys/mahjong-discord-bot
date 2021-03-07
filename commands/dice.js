const sendResponse = require("../utils/sendResponse");

module.exports = message => {
    let diceOne = Math.floor(Math.random() * 6) + 1;
    let diceTwo = Math.floor(Math.random() * 6) + 1;
    let total = diceOne + diceTwo;
    let intro = intros[Math.floor(Math.random() * intros.length)];

    return sendResponse(message, `${intro} The dice rolled ${diceOne} and ${diceTwo}, for a total of ${total}. That means the break is in front of the ${order[total - 1]} player.`);
}

const order = ["East", "South", "West", "North", "East", "South", "West", "North", "East", "South", "West", "North"];
const intros = ["Here we go...", "Rolling the dice...", "What will it be..."]