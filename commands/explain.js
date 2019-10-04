const define = require("./define");

module.exports = message => {
    let requestArray = message.content.split(" ").slice(1);
    let request = requestArray.join("").toLowerCase();

    if (!request || request == "") {
        return message.channel.send(`I can explain Mahjong, Yaku, Defense, Push Pull, and Furiten. These are kind of long, so please use it sparingly.`);
    }

    if (explanations[request]) {
        return message.channel.send(explanations[request]);
    } else {
        for(let i = 0; i < requestArray.length; i++) {
            if (explanations[requestArray[i].toLowerCase()]) {
                return message.channel.send(explanations[requestArray[i].toLowerCase()]);
            }
        }
    }

    message.channel.send(`I don't have an explanation for ${request}. Let me see if I have a definition...`);
    return define(message);
}

const explanations = {
    "mahjong": `
Mahjong, or at least the style we play here, is a four-player game. Each player takes turns drawing, then discarding, a tile from their hand.
Hands consist of 13 tiles across three suits with seven special tiles. There are four of each tile, and 9 tiles in each suit, for a total of 136.
The goal of the game is to form a hand with four sets and a pair, where a set is either a triplet like :2s::2s::2s: or a run within a suit like :3p::4p::5p:.
    `,
    "yaku": `
Yaku are the winning conditions in Japanese Mahjong. Each one increases the value of a hand, and you need at least one in order to declare a win.
It bears repeating that if you don't have a yaku, you cannot declare a win. This is a common point of confusion among new players. Check \`!link yaku\` for a list of valid yaku.
Also, note that although dora tiles give you extra han, they do not count as yaku. You need more than just dora to win.
    `,
    "defense": `
The core of defense in Japanese Mahjong revolves around the furiten rule. Players cannot win on a tile that is in their discards.
The most obvious take-away here is that if you discard a tile that is in your opponents' discards, they can not win off that tile. These tiles are known as genbutsu.
Suji is less obvious. Furiten is "if any tile _that would complete your hand_ is in your discards, you cannot win by ron." That's the key to suji.
Imagine a ryanmen shape like :3s::4s:. If a :5s: was in their discards, they could not win on the :2s:, because it completes the hand. So, the :2s: is safe if they have a ryanmen.
Note that a :2s: in the discards doesn't make :5s: safe, since it could still be a :6s::7s: shape. They would need both :2s: and :8s: in their discards for :5s: to be safe.
Players have a ryanmen about half of the time when they riichi, so falling back on suji when you don't have any totally safe tiles is fine.
One last thing you can consider is kabe. If you can see all four of a tile, they can't have that tile. So, if you see all of the :3p:, you know :1p: and :2p: are pretty safe, as they would have to be tanki or shanpon waits.
    `,
    "push": `
Push/pull decision making is an important part of Mahjong. If you fold every time someone riichis, you'll miss out on a lot of hands you could have won. But, if you push every time, you'll deal in a lot more than you should.
So, how do you balance it? Generally, if your hand is not tenpai, you should fold unless it's very early (first row) and you have a good 1-shanten hand.
If you are tenpai, then it's trickier. A good starting guideline is that you can push if you have 3+ han and a good wait, or a mangan with a bad wait, against a non-dealer riichi.
Dealers get more value, so to push against them you need a better hand. Four han with a good wait, or haneman with a bad wait.
As you improve, you can start considering more things, such as the number of live suji or how late in the round and game it is, but this is a good starting point.
    `,
    "furiten": `
Furiten is a state you can be in where you are not allowed to win a hand by ron. This happens when there is a tile that could complete your hand in your discards.
For example, if your last shape is :2p::3p:, and you have a :1p: in your discards, you cannot win by ron, as that :1p: would have completed your hand.
This applies even if you could not win on that tile. If tanyao is your only yaku, and thus you cannot win with the :1p:, you're still furiten.
While furiten, you cannot ron ANY tile. Not even the :4p: in this situation. If you drew the :5p: and discarded the :2p:, you'd now only be waiting on :4p:, and would no longer be furiten.
    `
}