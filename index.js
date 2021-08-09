require("dotenv").config();
const Discord = require("discord.js");

const client = new Discord.Client({
    intents:[Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.DIRECT_MESSAGES],
    partials: ['MESSAGE', 'CHANNEL']
});

const messageCreate = require(`./events/message.js`);
const interactionCreate = require(`./events/interactionCreate.js`);
const ready = require(`./events/ready.js`);

client.on('messageCreate', message => {
    console.log("message");
    messageCreate(message);
});

client.on('interactionCreate', async interaction => interactionCreate(interaction));

client.on('ready', client => ready(client));

client.login(process.env.BOT_TOKEN);
