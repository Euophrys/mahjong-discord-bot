module.exports = (message, response) => {
    if (response.length > 1800) {
        response = response.substring(0, 1797) + "...";
    }
    
    setTimeout(() => message.channel.send(response), 250);
}