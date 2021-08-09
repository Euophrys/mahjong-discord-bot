const convert = require("../interactions/convert");
const randomHand = require("../interactions/randomHand");
const randomTile = require("../interactions/randomTile");
const define = require("../interactions/define");
const link = require("../interactions/link.js");
const efficiency = require("../interactions/efficiency");
const platforms = require('../interactions/platforms');
const minefield = require('../interactions/minefield');
const dice = require('../interactions/dice');
const rate = require('../interactions/rate');
const explain = require('../interactions/explain');
const meme = require('../interactions/meme');
const mleague = require('../interactions/mleague');
const poll = require('../interactions/poll');
const translate = require('../interactions/translate');
const score = require('../interactions/score');
const graph = require('../interactions/graph');
const role = require('../interactions/role');
const bubblewrap = require('../interactions/bubblewrap');
const gacha = require('../interactions/gacha');

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
    "mleague": mleague,
    "poll": poll,
    "wwyd": poll,
    "translate": translate,
    "score": score,
    "graph": graph,
    "role": role,
    "bubblewrap": bubblewrap,
    "gacha": gacha
}

module.exports = (client, interaction) => {
    if (!interaction.isCommand()) return;
  
    let lower = message.content.toLowerCase();

    if (commands[interaction.commandName]) {
        try {
            await commands[command](message, client);
        } catch (e) {
            await interaction.reply({content: "There was an error: " + e.stack, ephemeral: true})
        }
    }
  };