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
const role = require('../commands/role');
const bubblewrap = require('../commands/bubblewrap');
const gacha = require('../commands/gacha');

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
  "!chart": graph,
  "!role": role,
  "!bubblewrap": bubblewrap,
  "!gacha": gacha
};

majsoul_commands = {
    "/hand": randomHand,
    "/random": randomHand,
    "/tile": randomTile,
    "/def": define,
    "/define": define,
    "/whatis": define,
    "/d": define,
    "/efficiency": efficiency,
    "/eff": efficiency,
    "/ukeire": efficiency,
    "/uke": efficiency,
    "/analyze": efficiency,
    "/ana": efficiency,
    "/poll": poll,
    "/wwyd": poll,
    "/translate": translate,
    "/translation": translate,
    "/english": translate,
    "/explain": explain,
    "/help": help,
    "/score": score,
    "/convert": convert
}

const reactions = ["274070288474439681", "👀", "🤔", "563201111184375808"]

module.exports = message => {
  if (message.author.bot) return;

  let lower = message.content.toLowerCase();
  
  if (message.guild && message.guild.id == "548440972997033996") {
    let command = lower.split(" ")[0];
    
    if (majsoul_commands[command]) {
        try {
            return majsoul_commands[command](message);
        } catch (e) {
            sendDeletableResponse(message, "I'm currently being upgraded to v13 and slash commands. Things might be broken in the meantime. Please wait.");
        }
    }
  }
  else {
    if (lower.indexOf("natsuki") > -1 || lower.indexOf("ⓝatsuki") > -1 || lower.indexOf("那月") > -1) {
      message.react(reactions[Math.floor(Math.random() * reactions.length)]).catch(console.log);
    }

    if (conversionRequestRegex.test(lower)) {
      conversionRequestRegex.lastIndex = 0;
      return convert(message);
    }
    
    let command = lower.split(" ")[0];

    if (commands[command]) {
        try {
          return commands[command](message);
        } catch (e) {
          sendDeletableResponse(message, "I'm currently being upgraded to v13 and slash commands. Things might be broken in the meantime. Please wait.");
        }
    }
  }
};
