module.exports = client => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.channels.get("629737480803057685").send("The current time for me is " + Date.now().toString());
};
