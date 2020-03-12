module.exports = (message, response) => {
    if (response.length > 1800) {
        response = response.substring(0, 1797) + "...";
    }
    
    setTimeout(() => {
        message.channel.send(response).then((msg) => {
            const reactionFilter = (reaction, user) => {
                return reaction.emoji.name === '❌' && user.id === message.author.id;
            };
            
            msg.awaitReactions(reactionFilter, { max: 1, time: 30000, errors: ['time'] })
                .then(collected => msg.delete())
                .catch(collected => {
                    const reaction = msg.reactions.get('❌');
                    try {
                        await reaction.remove('629290905723076609');
                    } catch (error) {
                        console.log('Failed to remove reaction.');
                    }
                });
        })
    }, 250);
}