module.exports = (message, response) => {
    setTimeout(() => message.channel.send(response), 250);
}