require("dotenv").config();
const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client({intents:[Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.DIRECT_MESSAGES], partials: ['MESSAGE', 'CHANNEL']});

fs.readdir("./events/", (err, files) => {
    files.forEach(file => {
        const eventHandler = require(`./events/${file}`);
        const eventName = file.split(".")[0];
        console.log(eventName)
        client.on(eventName, async (...args) => {
            console.log("message?")
            eventHandler(client, ...args)
        });
    });
});

client.login(process.env.BOT_TOKEN);
