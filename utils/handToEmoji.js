const emoji = require("./emoji");

module.exports = hand => {
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

    return result;
}