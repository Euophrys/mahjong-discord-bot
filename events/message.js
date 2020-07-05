const convert = require("../commands/convert");
const randomHand = require("../commands/randomHand");
const randomTile = require("../commands/randomTile");
const define = require("../commands/define");
const link = require("../commands/link.js");
const efficiency = require("../commands/efficiency");
const help = require('../commands/help');
const platforms = require('../commands/platforms');
const minefield = require('../commands/minefield');
const dice = require('../commands/dice');
const rate = require('../commands/rate');
const explain = require('../commands/explain');
const meme = require('../commands/meme');
const viewer = require('../commands/viewer');
const mleague = require('../commands/mleague');
const poll = require('../commands/poll');
const translate = require('../commands/translate');
const score = require('../commands/score');
const graph = require('../commands/graph');

const sendDeletableResponse = require("../utils/sendDeletableResponse");
const conversionRequestRegex = /!(\d+[smzp])+/g;

commands = {
  "!hand": randomHand,
  "!random": randomHand,
  "!tile": randomTile,
  "!def": define,
  "!define": define,
  "!whatis": define,
  "!d": define,
  "!link": link,
  "!links": link,
  "!url": link,
  "!site": link,
  "!efficiency": efficiency,
  "!eff": efficiency,
  "!ukeire": efficiency,
  "!uke": efficiency,
  "!analyze": efficiency,
  "!ana": efficiency,
  "!help": help,
  "!?": help,
  "!commands": help,
  "!platform": platforms,
  "!platforms": platforms,
  "!client": platforms,
  "!clients": platforms,
  "!dice": dice,
  "!break": dice,
  "!roll": dice,
  "!minefield": minefield,
  "!sevensteps": minefield,
  "!rate": rate,
  "!rank": rate,
  "!games": rate,
  "!explain": explain,
  "!meme": meme,
  "!memes": meme,
  "!viewer": viewer,
  "!watcher": viewer,
  "!viewers": viewer,
  "!watchers": viewer,
  "!mleague": mleague,
  "!poll": poll,
  "!wwyd": poll,
  "!translate": translate,
  "!translation": translate,
  "!english": translate,
  "!score": score,
  "!graph": graph,
  "!chart": graph
};

const reactions = ["274070288474439681", "👀", "🤔", "563201111184375808"]

module.exports = (client, message) => {
  if (message.author.bot) return;

  let lower = message.content.toLowerCase();
  if (lower.indexOf("natsuki") > -1 || lower.indexOf("ⓝatsuki") > -1 || lower.indexOf("那月") > -1) {
    message.react(reactions[Math.floor(Math.random() * reactions.length)]);
  }

  if (conversionRequestRegex.test(lower)) {
    conversionRequestRegex.lastIndex = 0;
    return convert(message);
  }

  let command = lower.split(" ")[0];

  if (commands[command]) {
    try {
      return commands[command](message, client);
    } catch (e) {
      sendDeletableResponse(message, e.message);
    }
  }
};
