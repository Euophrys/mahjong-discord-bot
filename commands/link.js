module.exports = message => {
    let requestArray = message.content.split(" ").slice(1);
    let request = requestArray.join("").toLowerCase();

    if (request == "random" || request == "") {
        var keys = Object.keys(links);
        var link = links[keys[Math.floor(Math.random() * keys.length)]]
        return message.channel.send(`Here's a random link: ${link}`)
    }

    if (links[request]) {
        return message.channel.send(`${responses[Math.floor(Math.random() * responses.length)]}${links[request]}`);
    } else {
        for (let i = 0; i < requestArray.length; i++) {
            if (links[requestArray[i].toLowerCase()]) {
                return message.channel.send(`${responses[Math.floor(Math.random() * responses.length)]}${links[requestArray[i].toLowerCase()]}`);
            }
        }
    }

    return message.channel.send(`I don't have a link associated with ${requestArray.join(" ")}. Are you sure you spelt it right?`);
}

const responses = ["Here's the link: ", "Here you go: ", "Hope it helps: "];

const links = {
    "toitoi": "https://mahjong.guide/2017/11/08/toitoi-dash/",
    "kokushi": "https://osamuko.com/i-told-you-not-to-go-for-kokushi/",
    "path": "https://pathofhouou.blogspot.com/",
    "pathofhouou": "https://pathofhouou.blogspot.com/",
    "books": "https://docs.google.com/spreadsheets/d/1eQ0-lGFHCsgpPtcsx8YoRMsVUTET3UDFIxNa_opMbP8/edit#gid=0",
    "wiki": "http://arcturus.su/wiki/Main_Page",
    "jajmb": "http://justanotherjapanesemahjongblog.blogspot.com/",
    "justanother": "http://justanotherjapanesemahjongblog.blogspot.com/",
    "mahjongguide": "https://mahjong.guide/list-of-articles/",
    "trainer": "https://euophrys.itch.io/mahjong-efficiency-trainer",
    "efficiency": "https://euophrys.itch.io/mahjong-efficiency-trainer",
    "scoretrainer": "https://pathofhouou.blogspot.com/2019/05/training-tool-maru-jan-score-trainer.html",
    "hms": "https://pathofhouou.blogspot.com/2019/05/training-tool-hitori-mahjong-simulator.html",
    "hittori": "https://pathofhouou.blogspot.com/2019/05/training-tool-hitori-mahjong-simulator.html",
    "yaku": "http://mahjong-ny.com/files/YakuSheet.jpg",
    "score": "http://arcturus.su/mjw/images/Scoring_Table.png",
    "table": "http://arcturus.su/mjw/images/Scoring_Table.png",
    "reddit": "https://www.reddit.com/r/Mahjong/",
    "book": "https://dainachiba.github.io/RiichiBooks/",
    "rb1": "https://dainachiba.github.io/RiichiBooks/",
    "english": "https://chrome.google.com/webstore/detail/tenhou-english-ui/cbomnmkpjmleifejmnjhfnfnpiileiin (Chrome) or https://addons.mozilla.org/en-US/firefox/addon/tenhou-english/ (Firefox)",
    "nodocchi": "https://nodocchi.moe/tenhoulog/",
    "stats": "https://nodocchi.moe/tenhoulog/, and http://arcturus.su/tenhou/ranking/",
    "directory": "https://docs.google.com/spreadsheets/d/1iu_LIFGk4P4AyHTK1dR9kso71m08lGbQ0TeZI9y4gZg/, and the form is here: https://goo.gl/forms/RCJccspSn10mJPOE2",
    "majsoul": "https://mahjongsoul.yo-star.com/",
    "soul": "https://mahjongsoul.yo-star.com/",
    "twitch": "https://www.twitch.tv/directory/game/Mahjong",
    "beginner": "https://mahjong.guide/2017/12/29/mahjong-fundamentals-2-starting-hands-five-block-theory/",
    "fundamentals": "https://mahjong.guide/2017/12/29/mahjong-fundamentals-2-starting-hands-five-block-theory/",
    "block": "https://mahjong.guide/2017/12/29/mahjong-fundamentals-2-starting-hands-five-block-theory/",
    "riichivalue": "https://osamuko.com/paifu-analysis-is-their-riichi-hand-expensive/",
    "averagevalue": "https://osamuko.com/paifu-analysis-is-their-riichi-hand-expensive/",
    "dama": "https://mahjong.guide/2018/03/16/rules-for-riichi/",
    "rules": "https://ooyamaneko.net/mahjong/rratw/",
    "reporter": "http://riichireporter.com/",
    "ny": "http://mahjong-ny.com/",
    "mankeys": "https://cdn.discordapp.com/attachments/150412836500275200/566796255943196702/Tonpu.jpg",
    "yakurate": "http://tenhou.net/sc/prof.html",
    "yakurates": "http://tenhou.net/sc/prof.html",
    "abema": "https://riichireporter.com/abematv-guide/",
    "doradragon": "https://pathofhouou.blogspot.com/2019/09/analysis-lone-dora-dragons.html",
    "doradragons": "https://pathofhouou.blogspot.com/2019/09/analysis-lone-dora-dragons.html",
    "pao": "https://pathofhouou.blogspot.com/2019/08/analysis-threat-of-pao.html"
}