const sendResponse = require("../utils/sendResponse");

module.exports = message => {
    let viewerRole = message.guild.roles.get(roles.viewer);

    if(!viewerRole) {
        return sendResponse(message, `That command isn't supported in this server.`);
    }

    if(!message.member) {
        return sendResponse(message, `I can't figure out who you are. Is your status set to Invisible?`);
    }

    let requestArray = message.content.split(" ").slice(1);
    let request = requestArray.join("").toLowerCase();

    if (!roles[request]) {
        return sendResponse(message, "The valid roles you can request are Viewer, 7447LFG, MajsoulLFG, and AutotableLFG.")
    }

    let requestedRole = message.guild.roles.get(roles[request]);

    if(message.member.roles.has(requestedRole.id)) {
        message.member.roles.remove(requestedRole).catch(console.error);
        message.react("❌");
    } else {
        message.member.roles.add(requestedRole).catch(console.error);
        message.react("✅");
    }
}

const roles = {
    "viewer": "670274611388219402",
    "viewers": "670274611388219402",
    "7447lfg": "732369555133038682",
    "7447": "732369555133038682",
    "tenhou": "732369555133038682",
    "majsoullfg": "732369495011622992",
    "majsoul": "732369495011622992",
    "mahjongsoul": "732369495011622992",
    "autotablelfg": "732340351875940472",
    "autotable": "732340351875940472",
    "auto": "732340351875940472"
}