module.exports = (message, response) => {
    if (response.length > 1800) {
        response = response.substring(0, 1797) + "...";
    }
    
    setTimeout(() => {
        message.channel.send(response).then((msg) => {
            msg.react('❌');

            const reactionFilter = (reaction, user) => {
                return reaction.emoji.name === '❌' && user.id === message.author.id;
            };
            
            msg.awaitReactions(reactionFilter, { max: 1, time: 20000, errors: ['time'] })
                .then(collected => msg.delete())
                .catch(collected => {
                    const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has("629290905723076609"));
                    try {
                        for (const reaction of userReactions.values()) {
                            reaction.users.remove("629290905723076609");
                        }
                    } catch (error) {
                        console.log('Failed to remove reactions.');
                    }
                });
        }).catch(console.log);
    }, 250);
}