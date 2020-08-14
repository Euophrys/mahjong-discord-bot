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
                    msg.reactions.removeAll().catch(error => console.log(error))
                });
        })
    }, 250);
}