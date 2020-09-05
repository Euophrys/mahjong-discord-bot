const emoji = require('../utils/emoji')

module.exports = message => {
    let tiles = []

    for (let i = 0; i < 38; i++) {
        if (i < 30 && i % 10 == 0) {
            tiles.push(emoji[i]);
        } else if (i < 30 && i % 10 == 5) {
            tiles.push(emoji[i]);
            tiles.push(emoji[i]);
            tiles.push(emoji[i]);
        } else if (i != 30) {
            tiles.push(emoji[i]);
            tiles.push(emoji[i]);
            tiles.push(emoji[i]);
            tiles.push(emoji[i]);
        }
    }

    tiles = shuffle(tiles);
    
    let messages = ["\u200c\n", "\u200c\n"]

    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 4; j++) {
            for (let k = 0; k < 17; k++) {
                messages[i] += `||${tiles[(j + 4 * i) * 17 + k]}||`;
            }
            messages[i] += "\n";
        }
    }
    
    return message.channel.send(messages[0])
        .then((message) => message.channel.send(messages[1]))
        .catch(console.log);
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}