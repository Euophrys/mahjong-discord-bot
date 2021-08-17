const define = require("./define");
const lookupResponse = require("../utils/lookupResponse");

module.exports = async interaction => {
    let responseObject = lookupResponse(interaction.options.getString('term'), explanations, aliases);

    if (responseObject.response) {
        return interaction.reply(responseObject.response);
    }

    message.channel.send(`I don't have an explanation for ${responseObject.request}. Let me see if I have a definition...`);
    await define(interaction);
}

const explanations = {
    "mahjong": `
Mahjong, or at least the style we play here, is a four-player game. Each player takes turns drawing, then discarding, a tile from their hand.
Hands consist of 13 tiles across three suits with seven special tiles. There are four of each tile, and 9 tiles in each suit, for a total of 136.
The goal of the game is to form a hand with four sets and a pair, where a set is either a triplet like <:2s:466437921663352842><:2s:466437921663352842><:2s:466437921663352842> or a run within a suit like <:3p:466437922426716161><:4p:466437922401550337><:5p:466437922732769290>.
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
Imagine a ryanmen shape like <:3s:466437922258681869><:4s:466437922527248384>. If a <:5s:466437922258812929> was in their discards, they could not win on the <:2s:466437921663352842>, because it completes the hand. So, the <:2s:466437921663352842> is safe if they have a ryanmen.
Note that a <:2s:466437921663352842> in the discards doesn't make <:5s:466437922258812929> safe, since it could still be a <:6s:466437922586099723><:7s:466437922632105984> shape. They would need both <:2s:466437921663352842> and <:8s:466437922380316673> in their discards for <:5s:466437922258812929> to be safe.
Players have a ryanmen about half of the time when they riichi, so falling back on suji when you don't have any totally safe tiles is fine.
One last thing you can consider is kabe. If you can see all four of a tile, they can't have that tile. So, if you see all of the <:3p:466437922426716161>, you know <:1p:466437920908378113> and <:2p:466437922669985823> are pretty safe, as they would have to be tanki or shanpon waits.
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
For example, if your last shape is <:2p:466437922669985823><:3p:466437922426716161>, and you have a <:1p:466437920908378113> in your discards, you cannot win by ron, as that <:1p:466437920908378113> would have completed your hand.
This applies even if you could not win on that tile. If tanyao is your only yaku, and thus you cannot win with the <:1p:466437920908378113>, you're still furiten.
While furiten, you cannot ron ANY tile. Not even the <:4p:466437922401550337> in this situation. If you drew the <:5p:466437922732769290> and discarded the <:2p:466437922669985823>, you'd now only be waiting on <:4p:466437922401550337>, and would no longer be furiten.
You can also be in temporary furiten. If someone discards a tile that completes your hand, you're furiten until your next discard if you don't call ron. If you're in riichi, you're furiten forever, so dama if you want to target someone.
    `,
    "yourself": `
Hello, I'm Natsuki! I'm a bot with a bunch of useful abilities for Riichi Mahjong! You can call \`!help\` to see all my commands.
If you just want to get started, I can define a lot of Mahjong terms with \`!define\` or tell you the most efficienct discard with \`!efficiency\`.
If you don't want to spam the channel with my responses, you can also just PM me the commands. But, no funny business!
I hope I can be helpful to you! Good luck in your games!
    `,
    "tile": `
You'll often see hands written like 123m456s789p12345z. It's a quick way to describe a hand.
The characters come from the Japanese suit names. M is for Manzu, S is for Souzu, P is for Pinzu, and Z is for Zihai (an alternate romanization of Jihai).
The honors go in this order: 1234567z -> <:1z:466437921688518656><:2z:466437922594226187><:3z:466437922560671744><:4z:466437922518728744><:5z:466437921550106625><:6z:466437922317402143><:7z:466437922279784469>
You also might see a 0, which just represents a red five. 0z isn't used, but might represent a concealed tile or a special haku.
    `,
    "sanma": `
Sanma is a three-player variant of Riichi Mahjong. It follows most of the same rules as four-player, but with a few differences due to the lower number of players.
All of the manzu tiles from 2~8 are removed, leaving only 1 and 9 so kokushi remains possible. This means sanshoku doujun is impossible, and the 1m as indicator makes 9m dora.
As there is no North seat, if you draw a North tile, you can set it aside and take a replacement tile from the dead wall. This counts a dora (nuki dora), and you can score rinshan with this.
Hands are higher valued. Honitsu and yakuman are more prevalent, and the nuki dora increase the scores a lot. Because of this, players usually start with 35k points.
The one other difference is that you're not allowed to call chii. By the way, since there are only two opponents, tsumo gets less valuable.
    `
}

const aliases = {
    "folding": "defense",
    "push/pull": "push"
}