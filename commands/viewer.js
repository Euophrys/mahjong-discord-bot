const sendResponse = require("../utils/sendResponse");

module.exports = message => {
    let viewerRole = message.guild.roles.get("670274611388219402");

    if(!viewerRole) {
        return sendResponse(message, `That command isn't supported in this server.`);
    }

    if(!message.member) {
        return sendResponse(message, `I can't figure out who you are. Is your status set to Invisible?`);
    }

    if(message.member.roles.has(viewerRole.id)) {
        message.member.roles.remove(viewerRole).catch(console.error);
        message.react("❌");
    } else {
        message.member.roles.add(viewerRole).catch(console.error);
        message.react("✅");
    }
}