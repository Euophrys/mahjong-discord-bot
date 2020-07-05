# Adding The Bot To A Server

To add Natsuki to your server, simply click on [this link](https://discordapp.com/api/oauth2/authorize?client_id=629290905723076609&permissions=330816&scope=bot). You can also find her on [top.gg](https://top.gg/bot/629290905723076609).

# Commands

To start, you can have Natsuki introduce herself by saying `!explain yourself`, and get a list of commands with `!help`. Here's a more detailed list.

* `!define <word>` - Natsuki knows the definitions of many Mahjong words and can recall them with this command. She also has a built-in dictionary for a large number of English words as an added bonus. If you don't specify a word, she'll pick a random Mahjong term that she knows. For a list of all the terms, call `!define list` or check the `commands/define.js` file.
* `!explain <topic>` - Natsuki has some longer explanations for common topics in Mahjong. To get a list, call `!explain` with no topic or check the `commands/explain.js` file. They're a bit simplified, but good starting points if new players are asking about them.

![Define Example](./img/define.png)
* `!link <site>` - Natsuki has a number of commonly referenced pages related to Mahjong that she can recall with this command. If you don't specify a site, she'll give you a random one. For a list of all the sites, call `!link list` or check the `commands/link.js` file.
* `!efficiency <hand>` - With this command, Natsuki will analyze the ukeire of each discard in a hand and output them similar to tenhou.net/2/. If the hand only has 13 tiles (or 13 minus a multiple of 3) she'll just tell you the ukeire. The hand format is the same as in /2/. You can also call this with just `!eff`.
* `!poll <tiles>` - Natsuki will react with the emoji for each unique tiles in the list you give her.

![Efficiency Example](./img/eff.png)
* `!platform <platform>` - Natsuki has a quick intro to various Mahjong platforms available with this command. To get a list, call `!platform` with none specified, or check the `commands/platforms.js` file.
* `!minefield` - Minefield Mahjong is a 1v1 variant where each player gets 34 tiles and has to create a tenpai hand with them. Natsuki will generate 34 tiles with this command, arranged in three rows, as a fun activity. If you want the tiles sorted, call `!minefield sort`.
* `!<hand>` (anywhere in a message) - Natsuki will parrot the message, swapping any hand prefixed with ! with emoji. For example, "My favourite tile is the !4z, but my favourite set is !234s."

![Minefield Example](./img/minefield.png)
* `!rate <player>` - Natsuki will check Nodocchi and tell you how many games that player has played on Tenhou, and what their R is at. If they haven't played in Tokujou, she'll say they have less than 1800R. If they have >1800R in sanma, she'll point that out, too, just to shame them. She'll also tell you when the last time they played was.

![Rate Example](./img/rate.png)
* `!random` - Natsuki will simply generate a random hand of 14 tiles.
* `!tile` - Natsuki will pick a random tile.

![Random Example](./img/random.png)
* `!dice` - Natsuki will roll 2d6, and tell you which player the wall is broken in front of.
* `!help <command>` - Natsuki will give a quick explanation of the given command.
* `!translate <text>` - Natsuki will replace most Japanese mahjong terms in the given text with English equivalents.
* `!score <han> <fu> <dealer> <ron|tsumo> <aotenjou>` - Natsuki will convert the han and fu to a score with any of the modifiers. Dealer to change it to a dealer score, ron/tsumo to specify one out, aotenjou to remove the limiting hands.
* `!score <value> <dealer> <common>` - Natsuki will tell you what hand is required to overcome the given point difference. Use "common" to ignore fu values higher than 40.
* `!graph <url>` - Natsuki will fetch a graph showing the point changes that happened in a Tenhou replay.