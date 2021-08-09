const sendResponse = require("../utils/sendResponse");

const starting_messages = [
    "Here are the results of your ten rolls: ",
    "That'll be thirty dollars. ",
    "Items not redeemable in-game. ",
    "Not indicative of any items you may or may not get in-game. "
] 

module.exports = async interaction => {
    let roll_boys = interaction.options.getBoolean('bamboo');

    let result = starting_messages[Math.floor(Math.random() * starting_messages.length)];
    let hasCharacter = false;
    let pity = true;

    for(i = 0; i < 10; i++) {
        let roll = Math.random();

        if (i == 9 && pity) {
            roll = 0.78;
        }

        if (roll < 0.24) {
            // green
            result += greens[Math.floor(Math.random() * greens.length)];
            result += " 🟩";
        } else if (roll < 0.75) {
            // blue
            result += blues[Math.floor(Math.random() * blues.length)];
            result += " 🟦";
        } else if (roll < 0.8) {
            // purple
            result += purples[Math.floor(Math.random() * purples.length)];
            result += " 🟪";
            pity = false;
        } else if (roll < 0.95) {
            // decoration
            result += decorations[Math.floor(Math.random() * decorations.length)];
        } else {
            // character
            if (roll_boys) {
                result += boys[Math.floor(Math.random() * boys.length)];
            } else {
                result += girls[Math.floor(Math.random() * girls.length)];
            }

            result += " ✨";

            if (!hasCharacter) {
                result = "☄️ " + result
                hasCharacter = true;
            }
        }

        if (i < 9) {
            result += ", "
        }
    }

    await interaction.reply(result);
}

const greens = [
    "Handmade Cookie", "Simple Art", "Small Diamond", "Fanzine Booklet", 
    "Nostalgic Console", "Common Beer Mug", "Teddy Bear", "Simple Dress"
]
const blues = [
    "Danish Cookie", "Wall Painting", "Large Diamond", "Simple Fanzine",
    "Xwitch Console", "Exquisite Wine Glass", "Teddy Bear L", "Normal Dress"
]
const purples = [
    "Delicious Cookie", "Classic Painting", "Heart of the Ocean", "Delicate Fanzine",
    "Powerful Console", "Valuable Goblet", "Teddy Bear XXL", "Gorgeous Dress"
]
const decorations = [
    "Riichi Bet - Fish <:pts1000:466438974160764928>", "Riichi Bet - Green Onion <:pts1000:466438974160764928>", "Riichi Bet - Bone <:pts1000:466438974160764928>", "Riichi Bet - Crimson <:pts1000:466438974160764928>", "Riichi Bet - 24K Gold <:pts1000:466438974160764928>", "Riichi Bet - Sever <:pts1000:466438974160764928>", "Riichi Bet - Ice Cream <:pts1000:466438974160764928>", "Riichi Bet - Impish Bat <:pts1000:466438974160764928>",   
    "Winning - Flame 🔥", "Winning - Cyclone 🌪️", "Winning - Sakura 🌸", "Winning - Dark Flame 🔥", "Winning - Firestorm 🔥", "Winning - Laser Blast 🚨", "Winning - Dancing Rose 🌹", "Winning - K.O. 🥊", "Winning - Dragon Scale 🐉", "Winning - Screaming Ghost 👻",
    "Riichi - Blue Flame 🔥", "Riichi - Ice ❄️", "Riichi - Fire 🔥", "Riichi - Phantom 👻", "Riichi - Feather 🪶", "Riichi - \"Beep\"! 🪙", "Riichi - Dragon 🐉", "Riichi - Bat Swarm 🦇", 
    "Tablecloth - Green 🍽️", "Tablecloth - Violet 🍽️", "Tablecloth - Lavender 🍽️", "Tablecloth - Melon 🍉", 
    "Tile Back - Yellow <:tileBack:466437984216940544>", "Tile Back - Green <:tileBack:466437984216940544>", "Tile Back - Red <:tileBack:466437984216940544>", "Tile Back - Bumpkin <:tileBack:466437984216940544>",
    '"Serious Game" 🎵', '"Intensive Battle" 🎵', '"Charge" 🎵', '"On The Edge" 🎵',
    "Ginger Cat Paw <:NoPonCats:667155145607479296>"
]
const girls = [
    "Kana Fujita", "Chiori Mikami", "Mai Aihara", "Nadeshiko", "Yui Yagi", "Riu Kujou", "Xenia", "Kaavi",
    "Sara", "Hana Ninomiya", "Nana Shiraishi", "Hinata Takanashi", "Haruna Igarashi", "Anju Suzumiya",
    "Sawako Kitami", "Momo Hina", "Kaguyahime", "Kirara Fujimoto", "Eliisa", "Chihori Terasaki", "Fu Ji"
]
const boys = [
    "Natsuki Shinomiya", "Wanjirou", "Sora Ichinose", "Hideki Akechi", "Joseph", "Ein",
    "Zan Tsukimi", "Ren Kisaragi", "Usumi Ishihara", "Qi Xi"
]