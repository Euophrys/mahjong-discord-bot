const sendResponse = require("../utils/sendResponse");
const sendDeletableResponse = require("../utils/sendDeletableResponse");

module.exports = message => {
    let helpWith = message.content.split(" ")[1];

    if (!helpWith || helpWith === "") {
        return sendResponse(message, "You can find the full list of commands on GitHub, here: <https://github.com/Euophrys/mahjong-discord-bot/blob/master/README.md>");
    }

    if (helpWith.startsWith("!")) helpWith = helpWith.slice(1);

    if (helps[helpWith]) {
        return sendResponse(message, helps[helpWith]);
    } else {
        return sendDeletableResponse(message, `I don't think I have a ${helpWith} command...`)
    }
}

const helps = {
    "link": "I can retrieve links to some common websites for you. Try, `!link efficiency trainer`, or `!link fundamentals`, or maybe even `!link rb1`.",
    "site": "I can retrieve links to some common websites for you. Try, `!link efficiency trainer`, or `!link fundamentals`, or maybe even `!link rb1`.",
    "efficiency": "I can calculate the ukeire of a hand, or the resulting ukeire of each discard. Just call `!efficiency <hand>`, like `!efficiency 1235m4568s789p111z`.",
    "eff": "I can calculate the ukeire of a hand, or the resulting ukeire of each discard. Just call `!efficiency <hand>`, like `!efficiency 1235m4568s789p111z`.",
    "ukeire": "I can calculate the ukeire of a hand, or the resulting ukeire of each discard. Just call `!efficiency <hand>`, like `!efficiency 1235m4568s789p111z`.",
    "uke": "I can calculate the ukeire of a hand, or the resulting ukeire of each discard. Just call `!efficiency <hand>`, like `!efficiency 1235m4568s789p111z`.",
    "analyze": "I can calculate the ukeire of a hand, or the resulting ukeire of each discard. Just call `!efficiency <hand>`, like `!efficiency 1235m4568s789p111z`.",
    "ana": "I can calculate the ukeire of a hand, or the resulting ukeire of each discard. Just call `!efficiency <hand>`, like `!efficiency 1235m4568s789p111z`.",
    "tile": "I can generate a random tile for you if you say `!tile`.",
    "hand": "I'll generate a random hand if you say `!hand`.",
    "random": "I'll generate a random hand if you say `!hand`.",
    "help": "`!help help` is kind of weird, don't you think? Well, you can call `!help <command>` to get help on any command. Including help, apparently.",
    "define": "I can define a bunch of mahjong-related words if you call `!define <word>`. If I don't know the definition, yell at Amber to teach it to me.",
    "def": "I can define a bunch of mahjong-related words if you call `!define <word>`. If I don't know the definition, yell at Amber to teach it to me.",
    "whatis": "I can define a bunch of mahjong-related words if you call `!define <word>`. If I don't know the definition, yell at Amber to teach it to me.",
    "platform": "I have some information on various Mahjong clients. Call `!platforms` to find out what I know about.",
    "platforms": "I have some information on various Mahjong clients. Call `!platforms` to find out what I know about.",
    "client": "I have some information on various Mahjong clients. Call `!platforms` to find out what I know about.",
    "clients": "I have some information on various Mahjong clients. Call `!platforms` to find out what I know about.",
    "minefield": "Minefield is a two-player variant of Mahjong, where both players get 34 tiles and have to try to make the best tenpai hand they can. Then, they discard the rest of the tiles one-by-one until a draw or someone deals in. I can generate a group of 34 tiles for you. If you call `!minefield sort`, I'll even sort them for you. I'm so nice.",
    "sevensteps": "Minefield is a two-player variant of Mahjong, where both players get 34 tiles and have to try to make the best tenpai hand they can. Then, they discard the rest of the tiles one-by-one until a draw or someone deals in. I can generate a group of 34 tiles for you. If you call `!minefield sort`, I'll even sort them for you. I'm so nice.",
    "rate": "I can check Nodocchi to see the number of games a player has played, along with their rate. Just call `!rate <name>`.",
    "rank": "I can check Nodocchi to see the number of games a player has played, along with their rate. Just call `!rate <name>`.",
    "games": "I can check Nodocchi to see the number of games a player has played, along with their rate. Just call `!rate <name>`.",
    "dice": "I'll roll two dice for you if you call `!dice`, like at the start of a Mahjong game.",
    "roll": "I'll roll two dice for you if you call `!dice`, like at the start of a Mahjong game.",
    "break": "I'll roll two dice for you if you call `!dice`, like at the start of a Mahjong game.",
    "explain": "I have detailed explanations for some Mahjong topics. If I don't have an explanation, I'll check my list of definitions.",
    "meme": "I have links to some Mahjong memes. To keep them separated from the links command, you can use `!meme` to find them, and get a list with `!meme list`.",
    "poll": "Want to ask people to decide between tiles? Call !poll <tiles> and I'll react with each tile for people to click as they please.",
    "wwyd": "Want to ask people to decide between tiles? Call !poll <tiles> and I'll react with each tile for people to click as they please.",
    "translate": "Did someone send a message with several strange terms? Copy paste it after a `!translate` call and I'll replace anything I know to make it easier to follow.",
    "translation": "Did someone send a message with several strange terms? Copy paste it after a `!translate` call and I'll replace anything I know to make it easier to follow.",
    "english": "Did someone send a message with several strange terms? Copy paste it after a `!translate` call and I'll replace anything I know to make it easier to follow.",
    "score": "The score command has two uses. First, you can provide a han and fu value to have it converted to points. You can also specify dealer, or add aotenjou to ignore limiting hands. Second, if you provide a single number, I'll assume it's a point difference and tell you what hands you need minimum to overcome it. Add dealer for dealer scores, or common to ignore fu values over 40.",
    "graph": "I can get a graph that shows the point changes that happened in a Tenhou replay if you give me the URL!",
    "bubblewrap": "I'll individually spoiler a full set of tiles. Reveal them one by one and try to get a complete hand!",
    "gacha": "I'll simulate a 10-pull on the Mahjong Soul gacha for you. If you call `!gacha bamboo` the characters will be boys instead of girls. I won't stop you from doing this, but I will judge you."
}