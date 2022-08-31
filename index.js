require("dotenv").config();
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const interactionCreate = require(`./events/interactionCreate.js`);
const ready = require(`./events/ready.js`);

client.on('interactionCreate', async interaction => interactionCreate(interaction));
client.on('ready', client => ready(client));
client.login(process.env.BOT_TOKEN);
