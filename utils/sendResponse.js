module.exports = (message, response) => {
    if (Math.random() < 0.2) {
        response = "Starting April 30th, I won't be able to respond to text commands like this. Please start using the slash commands, or give me permission to create them if I don't already have it and I'll add them next time I restart.\n" + response;
    }
    
    if (typeof response === 'string' && response.length > 1800) {
        response = response.substring(0, 1797) + "...";
    }
    
    setTimeout(() => message.channel.send(response), 250);
}