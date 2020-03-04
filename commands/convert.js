const emoji = require("../utils/emoji");
const characterToSuit = require("../utils/characterToSuit");
const sendResponse = require("../utils/sendResponse");
const conversionRequestRegex = /!(\d+[smzp])+/g;

module.exports = (message, client) => {
    var content = String(message.content);

    content = content.replace(conversionRequestRegex, (substring) => {
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

    conversionRequestRegex.lastIndex = 0;
    if(message.member) {
        content = `${message.member.user.username} says: "${content}"`;
    } else {
        content = `A ghost says: "${content}"`;
    }
    
    return sendResponse(message, content);
};