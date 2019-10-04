const request = require("request");

module.exports = message => {
    let name = message.content.split(" ")[1];

    if (!name || name === "") {
        return message.channel.send("You'll need to provide a name for me to look up.");
    }

    if (name.length > 8) {
        return message.channel.send("That name is too long. Tenhou names must be 8 characters or less.");
    }

    name = encodeURI(name);

    request(`https://nodocchi.moe/api/listuser.php?name=${name}`, {json:true, timeout=10000}, (err, res, body) => {
        if(err) {
            return message.channel.send(`Nodocchi isn't being nice to me right now. Try again later, maybe. (Error: ${err})`);
        }

        if (!body) {
            return message.channel.send(`${decodeURI(name)} hasn't played any games.`);
        }

        let rate = "less than 1800";
        let sanmaRate = "";

        if (body.rate[4]) {
            rate = body.rate[4];
        }

        if (body.rate[3] && json.rate[3] > 1800) {
            sanmaRate = `, and ${body.rate[3]}R in sanma`;
        }

        return message.channel.send(`${decodeURI(name)}: ${body.list.length} games played, with ${rate}R in four-player${sanmaRate}.`);
    });
}