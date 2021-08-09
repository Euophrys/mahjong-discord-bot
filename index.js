require("dotenv").config();
const Discord = require("discord.js");
const fs = require("fs");

const client = new Discord.Client({
    intents:[Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.DIRECT_MESSAGES],
    partials: ['MESSAGE', 'CHANNEL']
});

const messageCreate = require(`./events/message.js`);
const interactionCreate = require(`./events/interactionCreate.js`);
const ready = require(`./events/ready.js`);

client.on('messageCreate', (client, message) => {
    console.log("message");
    messageCreate(client, message);
});

client.on('interactionCreate', async interaction => interactionCreate(interaction));

client.on('ready', client => ready(client));

client.login(process.env.BOT_TOKEN);
