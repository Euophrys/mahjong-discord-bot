const schedule = require('node-schedule');
const mleague = require('../utils/mleague');

module.exports = client => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`Present in ${client.guilds.cache.size} servers.`);
  
  let now = new Date();
  let games = mleague.games;

  for (let i = 0; i < games.length; i++) {
    var date = new Date(2020, games[i].month, games[i].day, games[i].hour, 0, 0, 0);

    if (date < now) continue; // game already happened

    var job = schedule.scheduleJob(date, function(client, game){
      var winner1 = game.teams[Math.floor(Math.random() * game.teams.length)];
      var winner2 = game.teams[Math.floor(Math.random() * game.teams.length)];
      var teamsString = game.teams.slice(0, -1).join(", ") + ', and ' + game.teams.slice(-1);
      var message = `Hey, <@&670274611388219402>! Day ${i + 1} of M-League between ${teamsString} is now live! Come watch at <https://abema.tv/now-on-air/mahjong> (or catch the VoD afterwards)! My money is on ${winner1} for the first hanchan, and ${winner2} for the second. Who do you think will win today?`;
      client.channels.get("669652926037360651").send(message).then((msg) => {
        for(let i = 0; i < game.teams.length; i++) {
          msg.react(mleague.teams[game.teams[i]].emoji);
        }
      });
    }.bind(null, client, games[i]));
  }
};
