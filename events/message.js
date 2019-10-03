const convert = require("../commands/convert");
const randomHand = require("../commands/randomHand");
const randomTile = require("../commands/randomTile");
const define = require("../commands/define");
const link = require("../commands/link.js");
const efficiency = require("../commands/efficiency");
const help = require('../commands/help');
const platforms = require('../commands/platforms')

const conversionRequestRegex = /!(\d+[smzp])+/g;

commands = {
  "!hand": randomHand,
  "!random": randomHand,
  "!tile": randomTile,
  "!def": define,
  "!define": define,
  "!whatis": define,
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
  "!platform": platforms,
  "!platforms": platforms,
  "!client": platforms,
  "!clients": platforms
};

module.exports = (client, message) => {
  if (message.author.bot) return;

  if (conversionRequestRegex.test(message.content)) {
    conversionRequestRegex.lastIndex = 0;
    return convert(message);
  }

  let command = message.content.split(" ")[0].toLowerCase();

  if (commands[command]) {
    commands[command](message);
  }
};
