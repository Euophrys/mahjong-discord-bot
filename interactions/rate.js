const request = require("request");
const sendDeletableResponse = require("../utils/sendDeletableResponse");

const parens = /\((.+)\)/

module.exports = async interaction => {
    let name = interaction.options.getString('name');

    if (name.length > 8) {
        return interaction.reply({content:"That name is too long. Tenhou names must be 8 characters or less.", ephemeral:true});
    }

    name = encodeURI(name);

    request(`https://nodocchi.moe/api/listuser.php?name=${name}`, {json:true, timeout:2500}, (err, res, body) => {
        if(err) {
            return interaction.reply({content:`Nodocchi isn't being nice to me right now. Try again later, maybe. (${err})`, ephemeral:true});
        }

        if (!body) {
            return interaction.reply({content:`${decodeURI(name)} hasn't played any games on Tenhou.`, ephemeral:true});
        }

        let rate = "less than 1800";
        let sanmaRate = "";

        if (body.rate[4]) {
            rate = body.rate[4];
        }

        if (body.rate[3] && body.rate[3] > 1800) {
            sanmaRate = `, and ${body.rate[3]}R in sanma`;
        }

        let lastPlayed = new Date(parseInt(body.list[body.list.length - 1].starttime) * 1000);
        let stats = getStats(body.list, decodeURI(name));

        return interaction.reply(`${decodeURI(name)}: ${stats.games} games played, currently estimated at ${stats.dan} ${stats.points}/${stats.neededPoints} with ${rate}R in four-player${sanmaRate}. Past five results: ${stats.pastFive.join(", ")}. Last played on ${lastPlayed.toISOString().split("T")[0]}.`);
    });
}

function getStats(gamesList, name) {
    let dan = 0;
    let points = 0;
    let lastStart = 0;
    let games = 0;
    let pastFive = ["?", "?", "?", "?", "?"]
    
    for(let i = 0; i < gamesList.length; i++) {
        let game = gamesList[i];

        if (game.starttime - lastStart > maxDifference) {
            dan = 0;
            points = 0;
            games = 0;
        }

        games++;
        lastStart = game.starttime;
        let correctGameType = game.sctype === "b" || game.rate;
        
        if (!correctGameType || game.playernum !== "4") continue;
        pastFive.pop();
        
        if (game.player1 === name) {
            points += firstGains[parseInt(game.playlength)][parseInt(game.playerlevel)];
            pastFive.unshift("1st");
        } else if (game.player2 === name) {
            points += secondGains[parseInt(game.playlength)][parseInt(game.playerlevel)];
            pastFive.unshift("2nd");
        } else if (game.player4 === name) {
            points += fourthGains[parseInt(game.playlength)][dan];
            pastFive.unshift("4th");
        } else {
            pastFive.unshift("3rd");
        }
        
        if (dan < 20 && points >= requirement[dan]) {
            dan++;
            points = starting[dan];
        } else if (points < 0) {
            if (dan >= 10 && dan < 20) {
                dan--;
                points = starting[dan];
            } else {
                points = 0;
            }
        } 
    }
    
    return {
        dan: danNames[dan],
        points,
        neededPoints: requirement[dan],
        games,
        pastFive
    };
}

const maxDifference = 180 * 24 * 60 * 60;
const firstGains = [[], [20, 40, 50, 60], [30, 60, 75, 90]];
const secondGains = [[], [10, 10, 20, 30], [15, 15, 30, 45]];
const requirement = [20,20,20,20,40,60,80,100,100,100,400,800,1200,1600,2000,2400,2800,3200,3600,4000, 0];
const starting = [0,0,0,0,0,0,0,0,0,0,200,400,600,800,1000,1200,1400,1600,1800,2000, 0];
const fourthGains = [[],
    [0,0,0,0,0,0,0,0,-10,-20,-30,-40,-50,-60,-70,-80,-90,-100,-110,-120, 0],
    [0,0,0,0,0,0,0,0,-15,-30,-45,-60,-75,-90,-105,-120,-135,-150,-165,-180, 0]
];
const danNames = [
    "10k", "9k", "8k", "7k", "6k", "5k", "4k", "3k", "2k", "1k",
    "1d", "2d", "3d", "4d", "5d", "6d", "7d", "8d", "9d", "10d", "Tenhoui"
];