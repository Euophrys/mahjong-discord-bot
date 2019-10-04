module.exports = message => {
    let helpWith = message.content.split(" ")[1];

    if (!helpWith || helpWith === "") {
        return message.channel.send("I'll respond to any of these commands: `!efficiency <hand>` (aliases: !eff, !analyze, !ana, !ukeire, !uke), `!link <site>` (alias: !site), `!define <word>` (alias: !def, !whatis), `!tile`, `!hand` (alias: !random), `!platform <name>` (aliases: !platforms, !client, !clients), `!dice` (aliases: !roll, !break), `!minefield <optional: sort>` (alias: !sevensteps), `!rank <name>` (aliases: !rate, !games), and as you've already found out, `!help <command>`. I'll also convert a hand into emoji if you put an ! before it, like `!123m`.");
    }

    if (helpWith.startsWith("!")) helpWith = helpWith.slice(1);

    if (helps[helpWith]) {
        return message.channel.send(helps[helpWith]);
    } else {
        return message.channel.send(`I don't think I have a ${helpWith} command...`)
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
    "break": "I'll roll two dice for you if you call `!dice`, like at the start of a Mahjong game."
}