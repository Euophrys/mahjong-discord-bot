const mleague = require('../utils/mleague');
const sendResponse = require("../utils/sendResponse");

module.exports = async interaction => {
    let now = new Date();
    let games = mleague.games;
    
    for (let i = 0; i < games.length; i++) {
        var date = new Date(2020, games[i].month, games[i].day, games[i].hour, 0, 0, 0);

        if (date < now) continue;

        var teamsString = games[i].teams.slice(0, -1).join(", ") + ', and ' + games[i].teams.slice(-1)
        return interaction.reply(`M-League is a team league tournament. On game days, four teams will play two hanchans, sending out one of their members for each. The next game is on ${date.toString()} between ${teamsString}. You can watch it at <https://abema.tv/now-on-air/mahjong> at that time.`);
    }
}