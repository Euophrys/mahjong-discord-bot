const lookupResponse = require("../utils/lookupResponse");
const sendResponse = require("../utils/sendResponse");

module.exports = message => {
    let responseObject = lookupResponse(message, platforms, aliases);

    if (responseObject.response) {
        return sendResponse(message, responseObject.response);
    }

    if (responseObject.request === "") {
        return sendResponse(message, "The Mahjong platforms I know about are Tenhou, Mahjong Soul, Final Fantasy XIV, Kemono Mahjong, Sega MJ, and Mahjong Hime. Ask for more details with `!platform <name>`.");
    }

    return sendResponse(message, `I don't know about a Mahjong platform named ${responseObject.request}. You're on your own.`);
};

const platforms = {
    "tenhou": "Often viewed as the most competitive platform, Tenhou is a no-frills platform with both web and mobile versions. http://tenhou.net/ There are English translations available at https://chrome.google.com/webstore/detail/tenhou-english-ui/cbomnmkpjmleifejmnjhfnfnpiileiin (Chrome) or https://addons.mozilla.org/en-US/firefox/addon/tenhou-english/ (Firefox).",
    "majsoul": "Mahjong Soul, or Majsoul for short, is a prettified Mahjong client with a native English translation. There are gacha mechanics to acquire new characters to play as and cosmetics, such as different riichi sticks and tile styles. https://mahjongsoul.yo-star.com/",
    "ffxiv": "Final Fantasy XIV has a Mahjong minigame found inside the Gold Saucer, with rank and matchmaking. As it is an MMO, there is a lot of character customization to be had. To access this, start a free trial and follow the story until completing the airships quest (around level 15 or so). Then, in Ul'dah, you'll find a quest called 'It Could Happen To You' which will unlock the Gold Saucer, and therefore Mahjong. https://www.finalfantasyxiv.com/",
    "kemono": "Kemono Mahjong is a paid phone app with a fairly in-depth tutorial. You can play against many AIs with different playstyles, and multiplayer is said to be coming. http://cyberdog.ca/kemono-mahjong/",
    "sega": "Sega Mahjong is a Japanese client. It's primarily for tonpu or sanma play. One notable thing is that, at higher ranks, you have 1.6s to make each move, with a 30s time bank. A very blistering pace. http://www.sega-mj.com/arcade/ Guide: http://arcturus.su/wiki/Sega_MJ",
    "hime": "Mahjong Hime, or HimeMJ, is a Chinese client with a Japanese translation. An English translation is supposedly in the works. It's very similar to Mahjong Soul, aesthetically, and has a sort of battle pass system. https://www.himemj.jp",
    "janryumonm": "Janryumon M is a mobile platform. The game provides fancy ingame effects, as well as distinct musics. Although with payment, players can still play freely with coins from daily and rewards, as well as free room is also provided. https://jmm.ncsoft.jp",
};

const aliases = {
    "soul": "majsoul",
    "final": "ffxiv",
    "segamj": "sega",
    "himemj": "hime",
    "janhime": "hime",
    "jrmm": "janryumonm",
}
