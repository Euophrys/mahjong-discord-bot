module.exports = message => {
    let helpWith = message.content.split(" ")[1];

    if (helpWith.startsWith("!")) helpWith = helpWith.slice(1);

    if (helpWith == "") {
        return message.channel.send("I'll respond to any of these commands: `!efficiency <hand>`, `!link <site>`, `!define <word>`, `!tile`, `!hand`, and as you've already found out, `!help <command>`. I'll also convert a hand into emoji if you put an ! before it, like `!123m`.");
    }

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
    "clients": "I have some information on various Mahjong clients. Call `!platforms` to find out what I know about."
}