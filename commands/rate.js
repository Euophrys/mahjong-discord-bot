const request = require("request");

const parens = /\((.+)\)/

module.exports = message => {
    let name = message.content.split(" ")[1];

    if (!name || name === "") {
        return message.channel.send("You'll need to provide a name for me to look up.");
    }

    if (name === "me") {
        let username = message.member.user.username;
        let match = parens.exec(username);

        if (match && match[1]) {
            name = match[1];
        } else {
            name = username.split(" ")[0];
        }
    }

    if (name.length > 8) {
        return message.channel.send("That name is too long. Tenhou names must be 8 characters or less.");
    }

    name = encodeURI(name);

    request(`https://nodocchi.moe/api/listuser.php?name=${name}`, {json:true, timeout:10000}, (err, res, body) => {
        if(err) {
            return message.channel.send(`Nodocchi isn't being nice to me right now. Try again later, maybe. (${err})`);
        }

        if (!body) {
            return message.channel.send(`${decodeURI(name)} hasn't played any games on Tenhou.`);
        }

        let rate = "less than 1800";
        let sanmaRate = "";

        if (body.rate[4]) {
            rate = body.rate[4];
        }

        if (body.rate[3] && body.rate[3] > 1800) {
            sanmaRate = `, and ${body.rate[3]}R in sanma`;
        }

        //let lastPlayed = new Date(body.list[body.list.length - 1].starttime);

        return message.channel.send(`${decodeURI(name)}: ${body.list.length} games played, with ${rate}R in four-player${sanmaRate}.`);
    });
}