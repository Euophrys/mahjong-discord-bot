module.exports = message => {
    let name = message.content.split(" ")[1];

    if (!name || name === "") {
        return message.channel.send("You'll need to provide a name for me to look up.");
    }

    if (name.length > 8) {
        return message.channel.send("That name is too long. Tenhou names must be 8 characters or less.");
    }

    name = encodeURI(name);

    var xhr = new XMLHttpRequest();
    xhr.open('GET', `https://nodocchi.moe/api/listuser.php?name=${name}`);
    xhr.timeout = 10000;
    xhr.onload = function() {
        if (xhr.status === 200) {
            let json = JSON.parse(xhr.responseText);

            if (!json) {
                return message.channel.send(`${decodeURI(name)} hasn't played any games.`);
            }

            let rate = "less than 1800";
            let sanmaRate = "";

            if (json.rate[4]) {
                rate = json.rate[4];
            }

            if (json.rate[3] && json.rate[3] > 1800) {
                sanmaRate = `, and ${json.rate[3]}R in sanma`;
            }

            return message.channel.send(`${decodeURI(name)}: ${json.list.length} games played, with ${rate}R in four-player${sanmaRate}.`);
        }
        else {
            return message.channel.send(`Nodocchi isn't being nice to me right now. Try again later, maybe. (Error code: ${xhr.status})`);
        }
    };
    xhr.ontimeout = function() {
        return message.channel.send(`Nodocchi took too long to respond. You'll have to check yourself: https://nodocchi.moe/tenhoulog/#!&name=${name}`);
    }
    xhr.send();
}