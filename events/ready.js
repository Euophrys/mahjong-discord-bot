module.exports = client => {
  console.log(`Logged in as ${client.user.tag}!`);
  let date = new Date();
  client.channels.get("629737480803057685").send("The current time for me is " + date.toString() + " / " + date.toISOString());
};
