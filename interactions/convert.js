const emoji = require("../utils/emoji");
const characterToSuit = require("../utils/characterToSuit");
const conversionRequestRegex = /!(\d+[smzp])+/g;

module.exports = async interaction => {
    var content = interaction.options.getString('message');
    var regex = conversionRequestRegex;

    content = content.replace(regex, (substring) => {
        converted = []
        characters = substring.split('').reverse();
        index = 0;

        while (index < characters.length) {
            do {
                offset = characterToSuit(characters[index]);
                index++;
            } while (offset === -1 && index < characters.length);

            while (!isNaN(characters[index]) && index < characters.length) {
                let tile = parseInt(characters[index]);

                if (tile >= 0) {
                    tile += offset;
                    converted.push(emoji[tile]);
                }

                index++;
            }
        }

        return converted.reverse().join('');
    })

    regex.lastIndex = 0;
    content = `Converted: ${content}`;
    
    await interaction.reply(content)
};