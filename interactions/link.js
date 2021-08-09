const lookupResponse = require("../utils/lookupResponse");
const sendResponse = require("../utils/sendResponse");
const sendDeletableResponse = require("../utils/sendDeletableResponse");

module.exports = async interaction => {
    let responseObject = lookupResponse(interaction.options.getString('term'), links, aliases);

    if (responseObject.response) {
        return interaction.reply(responses[Math.floor(Math.random() * responses.length)] + responseObject.response);
    }

    if (responseObject.request === "" || responseObject.request === "random") {
        var keys = Object.keys(links);
        var link_key = keys[Math.floor(Math.random() * keys.length)];
        var link = links[link_key];
        return interaction.reply(`Here's a random link (${link_key}): ${link}`);
    }

    if (responseObject.request === "list") {
        var keys = Object.keys(links);
        keys = keys.sort();
        return interaction.reply({content:`I have links for these things: ${keys.join(", ")}.`, ephemeral:true});
    }

    return interaction.reply({content:`I don't have a link associated with ${responseObject.request}. Consider making a pull request to Euophrys/mahjong-discord-bot if you have something in mind.`, ephemeral:true});
}

const responses = ["Here's the link: ", "Here you go: ", "Hope it helps: "];

const links = {
    "toitoi": "https://mahjong.guide/2017/11/08/toitoi-dash/",
    "kokushi": "https://pathofhouou.blogspot.com/2020/04/analysis-kokushi-success-rates.html",
    "pathofhouou": "https://pathofhouou.blogspot.com/",
    "books": "https://docs.google.com/spreadsheets/d/1eQ0-lGFHCsgpPtcsx8YoRMsVUTET3UDFIxNa_opMbP8/edit#gid=0",
    "wiki": "http://arcturus.su/wiki/Main_Page",
    "justanother": "http://justanotherjapanesemahjongblog.blogspot.com/",
    "mahjongguide": "https://mahjong.guide/list-of-articles/",
    "trainer": "https://euophrys.itch.io/mahjong-efficiency-trainer",
    "scoretrainer": "https://pathofhouou.blogspot.com/2019/05/training-tool-maru-jan-score-trainer.html",
    "hms": "https://pathofhouou.blogspot.com/2019/05/training-tool-hitori-mahjong-simulator.html",
    "yaku": "https://cdn.discordapp.com/attachments/704795082028744755/801786645590048768/yakulist3.png",
    "table": "http://arcturus.su/mjw/images/Scoring_Table.png",
    "reddit": "https://www.reddit.com/r/Mahjong/",
    "rb1": "https://dainachiba.github.io/RiichiBooks/",
    "english": "https://chrome.google.com/webstore/detail/tenhou-english-ui/cbomnmkpjmleifejmnjhfnfnpiileiin (Chrome) or https://addons.mozilla.org/en-US/firefox/addon/tenhou-english/ (Firefox)",
    "nodocchi": "https://nodocchi.moe/tenhoulog/",
    "stats": "https://nodocchi.moe/tenhoulog/, and http://arcturus.su/tenhou/ranking/",
    "directory": "https://docs.google.com/spreadsheets/d/1iu_LIFGk4P4AyHTK1dR9kso71m08lGbQ0TeZI9y4gZg/, and the form is here: https://goo.gl/forms/RCJccspSn10mJPOE2",
    "majsoul": "https://mahjongsoul.yo-star.com/",
    "soul": "https://mahjongsoul.yo-star.com/",
    "twitch": "https://www.twitch.tv/directory/game/Mahjong",
    "block": "https://mahjong.guide/2017/12/29/mahjong-fundamentals-2-starting-hands-five-block-theory/",
    "riichivalue": "https://osamuko.com/paifu-analysis-is-their-riichi-hand-expensive/",
    "dama": "https://mahjong.guide/2018/03/16/rules-for-riichi/",
    "rules": "https://ooyamaneko.net/mahjong/rratw/",
    "reporter": "http://riichireporter.com/",
    "ny": "http://mahjong-ny.com/",
    "yakurate": "http://tenhou.net/sc/prof.html",
    "abema": "https://riichireporter.com/abematv-guide/",
    "doradragon": "https://pathofhouou.blogspot.com/2019/09/analysis-lone-dora-dragons.html",
    "pao": "https://pathofhouou.blogspot.com/2019/08/analysis-threat-of-pao.html",
    "wrc": "https://worldriichi.org/wrc-rules",
    "ema": "http://mahjong-europe.org/portal/index.php?option=com_content&view=article&id=30&Itemid=166",
    "horoscope": "https://s3.us-east-2.amazonaws.com/mahjong-horoscopes/index.html",
    "learningscoring": "https://pathofhouou.blogspot.com/2019/05/tips-for-learning-score-table.html",
    "countingsuji": "https://pathofhouou.blogspot.com/2019/08/guide-counting-suji.html",
    "toutenkou": "http://arcturus.su/wiki/Toutenkou",
    "mattari": "https://pathofhouou.blogspot.com/2020/01/training-tool-mattari-mahjong.html",
    "calling": "https://mahjong.guide/2017/07/22/puyos-guide-to-calling-tiles-part-1/",
    "push": "https://docs.google.com/spreadsheets/d/172LFySNLUtboZUiDguf8I3QpmFT-TApUfjOs5iRy3os/edit#gid=212618921",
    "winrate": "https://docs.google.com/spreadsheets/d/1x1CYlIPYTeOodGY4bmPevlbyeZOIcmHICcQaoSjHJEk/edit#gid=1942793675",
    "nisi": "https://cdn.discordapp.com/attachments/558750531028385792/742161211101282384/unknown.png",
    "akochan": "https://pathofhouou.blogspot.com/2020/08/training-tool-ako-chan-reviewer.html",
    "ura": "https://pathofhouou.blogspot.com/2020/08/analysis-ura-rates-by-unique-tiles-in.html",
    "kabe": "https://pathofhouou.blogspot.com/2020/07/guideanalysis-defense-techniques-kabe.html",
    "aidayonken": "https://pathofhouou.blogspot.com/2020/07/guide-defense-techniques-aida-yon-ken.html",
    "winrate": "https://docs.google.com/spreadsheets/d/1x1CYlIPYTeOodGY4bmPevlbyeZOIcmHICcQaoSjHJEk/edit#gid=1942793675",
    "dealinrate": "https://pathofhouou.blogspot.com/2020/05/analysis-tile-deal-in-rates-by-live-suji.html",
    "kuinobashi": "https://pathofhouou.blogspot.com/2020/05/guide-defense-techniques-kuinobashi.html",
    "sotogawa": "https://pathofhouou.blogspot.com/2020/07/analysis-sotogawa-effectiveness-by-turn.html",
}

const aliases = {
    "yakurates": "yakurate",
    "doradragons": "doradragon",
    "averagevalue": "riichivalue",
    "beginner": "block",
    "fundamentals": "block",
    "book": "rb1",
    "score": "table",
    "hittori": "hms",
    "efficiency": "trainer",
    "jajmb": "justanother",
    "path": "pathofhouou",
    "horoscopes": "horoscope",
    "count": "countingsuji",
    "sujicounting": "countingsuji",
    "call": "calling",
    "winrates": "winrate",
    "dealinrates": "dealinrate"
}
