module.exports = message => {
    let viewerRole = message.guild.roles.get("670274611388219402");

    if(!viewerRole) {
        return message.channel.send(`That command isn't supported in this server.`);
    }

    if(!message.member) {
        return message.channel.send(`I can't figure out who you are. Is your status set to Invisible?`);
    }

    if(message.member.roles.has(viewerRole.id)) {
        message.member.removeRole(viewerRole).catch(console.error);
        message.react("❌");
    } else {
        message.member.addRole(viewerRole).catch(console.error);
        message.react("✅");
    }
}