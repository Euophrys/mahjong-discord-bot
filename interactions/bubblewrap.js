const emoji = require('../utils/emoji')

module.exports = async interaction => {
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
    
    const intro = `I got ${hands[~~(Math.pow(Math.random(), 2) * 4 + 0.5)]} after ${Math.floor(18 + Math.random() * 15)}.\n`
    let messages = [intro, ""]

    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 4; j++) {
            for (let k = 0; k < 17; k++) {
                messages[i] += `||${tiles[(j + 4 * i) * 17 + k]}||`;
            }
            messages[i] += "\n";
        }
    }
    
    await interaction.reply(messages[0])
    //await interaction.followUp(message[1])
}

const hands = ["chiitoi", "a normal hand", "pinfu", "nothing", "kokushi"];

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