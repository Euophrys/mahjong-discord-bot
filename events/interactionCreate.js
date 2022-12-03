const convert = require("../interactions/convert");
const randomHand = require("../interactions/randomHand");
const randomTile = require("../interactions/randomTile");
const { define, keys:definitions } = require("../interactions/define");
const { link, keys:links } = require("../interactions/link.js");
const efficiency = require("../interactions/efficiency");
const platforms = require('../interactions/platforms');
const minefield = require('../interactions/minefield');
const dice = require('../interactions/dice');
const rate = require('../interactions/rate');
const explain = require('../interactions/explain');
const { meme, keys:memes }  = require('../interactions/meme');
const translate = require('../interactions/translate');
const score = require('../interactions/score');
const graph = require('../interactions/graph');
const role = require('../interactions/role');
const bubblewrap = require('../interactions/bubblewrap');
const gacha = require('../interactions/gacha');
const comeback = require('../interactions/comeback');

const commands = {
    "convert": convert,
    "randomhand": randomHand,
    "randomtile": randomTile,
    "define": define,
    "link": link,
    "efficiency": efficiency,
    "platform": platforms,
    "break": dice,
    "minefield": minefield,
    "rate": rate,
    "explain": explain,
    "meme": meme,
    "translate": translate,
    "score": score,
    "graph": graph,
    "role": role,
    "bubblewrap": bubblewrap,
    "gacha": gacha,
    "comeback": comeback
}

const keys = {
    "define": definitions,
    "link": links,
    "meme": memes
}

module.exports = async interaction => {
    if (interaction.isChatInputCommand()) {
        if (commands[interaction.commandName]) {
            try {
                await commands[interaction.commandName](interaction);
            } catch (e) {
                console.log(e.stack);
                await interaction.reply({content: "There was an error: " + e.stack, ephemeral: true})
            }
        }
    } else if (interaction.isAutoComplete()) {
        if (keys[interaction.commandName]) {
            const focusedValue = interaction.options.getFocused();
            if (!focusedValue) {
                await interaction.respond([{ name: 'tanyao', value: 'tanyao'}]);
                return;
            }
            const filtered = keys[interaction.commandName].filter(choice => choice.includes(focusedValue.toLowerCase()));
            filtered.length = Math.min(filtered.length, 24);
            filtered.push('tanyao');
            await interaction.respond(
                filtered.map(choice => ({ name: choice, value: choice })),
            );
        }
    }

  };