module.exports = async interaction => {
    if(!interaction.inGuild() || !interaction.guild.roles.resolve(roles.viewer)) {
        return interaction.reply({content:`That command isn't supported in this server.`,ephemeral:true});
    }

    if(!interaction.member) {
        return interaction.reply({content:`I can't figure out who you are. Is your status set to Invisible?`,ephemeral:true});
    }

    let request = interaction.options.getString('role');
    let requestedRole = interaction.guild.roles.resolve(roles[request]);

    if(interaction.member.roles.cache.has(requestedRole.id)) {
        interaction.member.roles.remove(requestedRole).catch(console.error);
        return interaction.reply({content:"You already had that role, so I removed it.",ephemeral:true});
    } else {
        interaction.member.roles.add(requestedRole).catch(console.error);
        return interaction.reply({content:"Role added!",ephemeral:true});
    }
}

const roles = {
    "viewer": "670274611388219402",
    "7447lfg": "732369555133038682",
    "majsoullfg": "732369495011622992",
    "autotablelfg": "732340351875940472",
}