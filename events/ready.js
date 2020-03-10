var schedule = require('node-schedule');

module.exports = client => {
  console.log(`Logged in as ${client.user.tag}!`);

  var date = new Date(2020, 2, 10, 22, 0, 0, 0);

  var j = schedule.scheduleJob(date, function(){
    client.channels.get("629737480803057685").send("I was scheduled to send this at 10 PM March 3rd. Let's hope it worked!");
  }).bind(null, client);
};
