var schedule = require('node-schedule');
var games = require('../utils/mleagueGames');

module.exports = client => {
  console.log(`Logged in as ${client.user.tag}!`);

  let now = new Date();

  for (let i = 0; i < games.length; i++) {
    var date = new Date(2020, games[i].month, games[i].day, games[i].hour, 0, 0, 0);
    
    if (date < now) continue; // game already happened

    var winner1 = games[i].teams[Math.floor(Math.random() * games[i].teams.length)];
    var winner2 = games[i].teams[Math.floor(Math.random() * games[i].teams.length)];
    var teamsString = games[i].teams.slice(0, -1).join(", ") + ', and ' + games[i].teams.slice(-1);

    var message = `Day ${i + 1} of the M-League semi-finals is now live! Playing today is ${teamsString}. Come watch at <https://abema.tv/now-on-air/mahjong> (or catch the VoD afterwards)! My money is on ${winner1} for the first hanchan, and ${winner2} for the second.`;

    var job = schedule.scheduleJob(date, function(client, message){
      client.channels.get("669652926037360651").send(message);
    }.bind(null, client, message));
  }
};
