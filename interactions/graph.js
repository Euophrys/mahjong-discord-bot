const request = require("request");
const QuickChart = require("quickchart-js");
const { MessageAttachment } = require("discord.js")
const tenhouRegex = /\/\?log=(.+?)[&\n\b]/;

module.exports = async interaction => {
    let match = tenhouRegex.exec(interaction.options.getString('replay'));
    
    if (!match) {
        return interaction.reply({content:"This command requires a full Tenhou replay URL. For example, <https://tenhou.net/0/?log=2020070514gm-00a9-0000-e65fb7ff&tw=1>", ephemeral: true});
    }
    
    const options = {
        url: `https://tenhou.net/0/log/?${match[1]}`,
        headers: {
            'referer': 'http://tenhou.net/3/',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:65.0) Gecko/20100101 Firefox/65.0'
        },
        timeout: 2000
    }
    
    request(options, (err, res, body) => {
        if(err) {
            return interaction.reply({content:`I got this error while trying to get the replay: ${err}`, ephemeral: true});
        }
        
        let playerCount = 4;
        let graphData = {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'A',
                    data: [ ],
                    fill: false,
                    borderColor: "blue"
                }, {
                    label: 'B',
                    data: [ ],
                    fill: false,
                    borderColor: "green"
                }, {
                    label: 'C',
                    data: [ ],
                    fill: false,
                    borderColor: "yellow"
                }, {
                    label: 'D',
                    data: [ ],
                    fill: false,
                    borderColor: "red"
                }]
            }
        }
        
        let matches = 0;
        let match;
        const nameRegex = /n\d="(.*?)"/g
        while ((match = nameRegex.exec(body)) && match[1]) {
            graphData.data.datasets[matches].label = decodeURIComponent(match[1]);
            matches++;
            if (matches == 4) break;
        }
        playerCount = matches;

        matches = 0;
        const endRegex = /[AGARI|RYUUKYOKU].+?sc="(.+?)"/g
        while(match = endRegex.exec(body)) {
            matches++;
            graphData.data.labels.push(matches);

            let scores = match[1].split(",");

            for (let i = 0; i < scores.length; i += 2) {
                let score = parseInt(scores[i]) * 100;
                let change = parseInt(scores[i + 1]) * 100;
                score += change;
                graphData.data.datasets[i / 2].data.push(score);
            }
        }

        if (matches == 0) {
            return interaction.reply({content:"Hm, something went wrong. Was that link really a replay?", ephemeral:true});
        }

        graphData.data.datasets.splice(playerCount);

        const chart = new QuickChart()
            .setHeight(400)
            .setWidth(700)
            .setFormat("png")
            .setBackgroundColor("white")
            .setConfig(graphData);

        chart.toBinary()
            .then((buffer) => {
                const file = new MessageAttachment(buffer, 'graph.png');
                interaction.reply({ files: [file] });
            })
            .catch((err) => interaction.reply({content:`I got this error while making the chart: ${err}`, ephemeral:true}))
    });
};