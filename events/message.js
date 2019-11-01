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
  "!memes": meme
};

const reactions = ["274070288474439681", "👀", "🤔", "563201111184375808"]

module.exports = (client, message) => {
  if (message.author.bot) return;

  if (conversionRequestRegex.test(message.content)) {
    conversionRequestRegex.lastIndex = 0;
    return convert(message);
  }

  let command = message.content.split(" ")[0].toLowerCase();

  if (commands[command]) {
    return commands[command](message);
  }

  let lower = message.content.toLowerCase();

  if (lower.indexOf("natsuki") > -1 || lower.indexOf("ⓝatsuki") > -1 || lower.indexOf("那月") > -1) {
    message.react(reactions[Math.floor(Math.random() * reactions.length)]);
  }
};
