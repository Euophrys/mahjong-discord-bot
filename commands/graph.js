const request = require("request");
const sendResponse = require("../utils/sendResponse");
const sendDeletableResponse = require("../utils/sendDeletableResponse");
const tenhouRegex = /\/\?log=(.+?)&tw/;

module.exports = (message, client) => {
    let match = tenhouRegex.exec(message.content);

    if (!match) {
        return sendResponse(message, "This command requires a full Tenhou replay URL. For example, <https://tenhou.net/0/?log=2020070514gm-00a9-0000-e65fb7ff&tw=1>");
    }
    
    const options = {
        url: `https://tenhou.net/0/log/?${match[1]}`,
        headers: {
            'referer': 'http://tenhou.net/3/',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:65.0) Gecko/20100101 Firefox/65.0'
        },
        timeout: 10000
    }

    request(options, (err, res, body) => {
        if(err) {
            return sendDeletableResponse(message, `${err}`);
        }

        return sendResponse(message, body);
    });

    return sendResponse(message, content);
};