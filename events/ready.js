const { REST, Routes } = require('discord.js');
require("dotenv").config();

module.exports = async client => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`Present in ${client.guilds.cache.size} servers.`);

    const global_commands = [
        {
            name: "convert",
            description: "Converts any tile strings prefixed with ! to emoji.",
            options: [{
                name: "message",
                type: "STRING",
                description: "The message to convert.",
                required: true
            }]
        },
        {
            name: "randomhand",
            description: "Generates a random hand of 14 tiles."
        },
        {
            name: "randomtile",
            description: "Generates a random tile."
        },
        {
            name: "define",
            description: "Looks up the definition of the provided term.",
            options: [{
                name: "term",
                type: "STRING",
                description: "The term to define.",
                required: true
            }]
        },
        {
            name: "link",
            description: "Provides the link to the given resource.",
            options: [{
                name: "resource",
                type: "STRING",
                description: "The resource to fetch.",
                required: true
            }]
        },
        {
            name: "efficiency",
            description: "Calculates the ukeire of the hand, if 13 tiles, or each discard, if 14 tiles.",
            options: [{
                name: "hand",
                type: "STRING",
                description: "The hand in 123s456p789m123z format.",
                required: true
            },{
                name: "standard",
                type: "BOOLEAN",
                description: "Whether to only look at standard ukeire (no Seven Pairs or Thirteen Orphans)",
                required: false
            }]
        },
        {
            name: "minefield",
            description: "Provides 34 random tiles for playing minefield mahjong with.",
            options: [{
                name: "sort",
                type: "BOOLEAN",
                description: "Whether to sort the tiles.",
                required: false
            }]
        },
        {
            name: "break",
            description: "Rolls two dice and indicates whose wall would be broken by the roll."
        },
        {
            name: "rate",
            description: "Checks the given player's Nodocchi information to see their rank.",
            options: [{
                name: "name",
                type: "STRING",
                description: "The name of the player's tenhou account, or 'me'.",
                required: true
            }]
        },
        {
            name: "explain",
            description: "Provides lengthy explanations for a few terms.",
            options: [{
                name: "term",
                type: "STRING",
                description: "The term to explain.",
                required: true,
                choices: [
                    {
                        name:"mahjong",
                        value:"mahjong"
                    },
                    {
                        name:"yaku",
                        value:"yaku"
                    },
                    {
                        name:"furiten",
                        value:"mahjong"
                    },
                    {
                        name:"defense",
                        value:"defense"
                    },
                    {
                        name:"tile shorthand",
                        value:"tile"
                    },
                    {
                        name:"three-player mahjong",
                        value:"sanma"
                    },
                    {
                        name:"push/pull",
                        value:"push"
                    },
                    {
                        name:"yourself",
                        value:"yourself"
                    },
                ]
            }]
        },
        {
            name: "score",
            description: "Calculates the score of the given hand.",
            options: [{
                name: "han",
                type: "INTEGER",
                description: "The han value of the hand.",
                required: true
            },
            {
                name: "fu",
                type: "INTEGER",
                description: "The fu value of the hand.",
                required: true
            },
            {
                name: "dealer",
                type: "BOOLEAN",
                description: "Whether the player scoring the hand is the dealer.",
                required: false
            },
            {
                name: "skyrocketing",
                type: "BOOLEAN",
                description: "Whether to use skyrocketing (aotenjou) rules which have no limit hands.",
                required: false
            }]
        },
        {
            name: "comeback",
            description: "Calculates the hand value you need in order to come back from a given point difference.",
            options: [{
                name: "difference",
                type: "INTEGER",
                description: "Your opponent's score minus your score (minus 100 if you win the tiebreaker).",
                required: true
            },
            {
                name: "dealer",
                type: "BOOLEAN",
                description: "Whether you are the dealer. Defaults to false.",
                required: false
            },
            {
                name: "common",
                type: "BOOLEAN",
                description: "Whether to only consider hands that score 40 fu or less.",
                required: false
            },
            {
                name: "sanma",
                type: "BOOLEAN",
                description: "Whether it is a three-player game, where you only receive tsumo points from two players.",
                required: false
            }]
        },
        {
            name: "translate",
            description: "Replaces Japanese mahjong terms in the given message with English ones.",
            options: [{
                name: "message",
                type: "STRING",
                description: "The message to translate.",
                required: true
            }]
        },
        {
            name: "meme",
            description: "Provides the link to the requested meme.",
            options: [{
                name: "meme",
                type: "STRING",
                description: "The meme to link to.",
                required: true
            }]
        },
        {
            name: "gacha",
            description: "Simulates a pull on the MajSoul gacha.",
            options: [{
                name: "bamboo",
                type: "BOOLEAN",
                description: "Whether to pull for boys or not.",
                required: false
            }]
        }
    ];

    const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

    (async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands(629290905723076609), { body: global_commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
    })();

};
