const lookupResponse = require("../utils/lookupResponse");
const sendResponse = require("../utils/sendResponse");
const sendDeletableResponse = require("../utils/sendDeletableResponse");

module.exports = message => {
    let responseObject = lookupResponse(message, links, aliases);

    if (responseObject.response) {
        return sendResponse(message, responses[Math.floor(Math.random() * responses.length)] + responseObject.response);
    }

    if (responseObject.request === "" || responseObject.request === "random") {
        var keys = Object.keys(links);
        var link_key = keys[Math.floor(Math.random() * keys.length)];
        var link = links[link_key];
        return sendResponse(message, `Here's a random meme (${link_key}): ${link}`);
    }

    if (responseObject.request === "list") {
        var keys = Object.keys(links);
        keys = keys.sort();
        return sendResponse(message, `I have these memes: ${keys.join(", ")}.`);
    }

    return sendDeletableResponse(message, `I don't have a meme associated with ${responseObject.request}. Consider making a pull request to Euophrys/mahjong-discord-bot if you have something in mind.`);
}

const responses = ["Here it is: ", "Here you go: ", "Hope it helps: "];

const links = {
    "mankeys": "https://cdn.discordapp.com/attachments/150412836500275200/566796255943196702/Tonpu.jpg",
    "cersius": "https://cdn.discordapp.com/attachments/150412836500275200/629706271288983562/cersius.png",
    "kan": "https://cdn.discordapp.com/attachments/469490857716875285/630755526048743434/Majsoul_Kan.jpg",
    "betaori": "https://i.imgur.com/1OK3S6d.png",
    "yakuman": "https://cdn.discordapp.com/attachments/202201840887136256/630941803725586443/riichi_yakuman.jpg",
    "shinkiii": "https://cdn.discordapp.com/attachments/551629536144654347/566872890658652180/image0.jpg",
    "chuuren": "https://cdn.discordapp.com/attachments/469490857716875285/471106567727742996/999864_10201606872872055_991054473_n.png",
    "akanashi": "https://i.imgur.com/x9CuXCS.jpg",
    "tanki": "https://cdn.discordapp.com/attachments/150412836500275200/631867866475659274/Scr20190524135338.jpg",
    "fine": "https://cdn.discordapp.com/attachments/150412836500275200/631868008435941376/chiorithisisfine.png",
    "nom": "https://cdn.discordapp.com/attachments/150412836500275200/631869077912158254/SPOILER_chiorinom.png",
    "bop": "https://cdn.discordapp.com/attachments/150412836500275200/631869161588391942/1562206203409.png",
    "furitendoubleriichi": "https://www.youtube.com/watch?v=DfVOl94XKJk",
    "spacemahjong": "https://cdn.discordapp.com/attachments/150412836500275200/603039434786734120/what_mahjong_looks_and_sounds_like_to_those_who_cant_play_it.jpg",
    "kyuushu": "https://cdn.discordapp.com/attachments/150412836500275200/631871127916118047/Cirno-Kyuushun_Kyuuhai.jpg",
    "icecream": "https://cdn.discordapp.com/attachments/150412836500275200/631872599843930133/image0.jpg",
    "birds": "https://cdn.discordapp.com/attachments/150412836500275200/631872833424982016/image0.jpg",
    "prayers": "https://cdn.discordapp.com/attachments/150412836500275200/631875296529874984/chrome_2018-03-30_17-22-03.png",
    "damage": "https://cdn.discordapp.com/attachments/150412836500275200/631874802310709299/1560715263727.png",
    "sand": "https://cdn.discordapp.com/attachments/150412836500275200/631874748661628929/1445832212953.png",
    "ippan": "https://cdn.discordapp.com/attachments/150412836500275200/631874550774235146/ippan.gif",
    "bronze": "https://cdn.discordapp.com/attachments/150412836500275200/631874550774235146/ippan.gif",
    "occult": "https://cdn.discordapp.com/attachments/150412836500275200/631878225370415119/316ain-1.jpg",
    "mistakes": "https://cdn.discordapp.com/attachments/150412836500275200/631885275605368880/image0.jpg",
    "akaari": "https://cdn.discordapp.com/attachments/150412836500275200/631885302298050561/image0.jpg",
    "genbutsu": "https://cdn.discordapp.com/attachments/629737480803057685/631896055830544413/image0.png",
    "pongo": "https://cdn.discordapp.com/attachments/629737480803057685/631901093458214923/Scr20190224221100.gif",
    "chuurentenpai": "https://cdn.discordapp.com/attachments/560300317170728970/572592050596216832/TIM20190430091740.gif",
    "moupai": "https://cdn.discordapp.com/attachments/202201840887136256/720123086275608576/v2-0478995acd7c05d51ba49d56914f65ff_b.gif",
    "flow": "https://cdn.discordapp.com/attachments/202201840887136256/725771051296096477/unknown.png",
    "kanforflow": "https://cdn.discordapp.com/attachments/469490857716875285/623881918391517185/1564698197926.png",
    "disconnected": "https://cdn.discordapp.com/attachments/629737480803057685/631905480746467329/TIM20181211124532.gif",
    "betaori": "https://cdn.discordapp.com/attachments/150412836500275200/682944507293073410/Betaori.png",
    "genesis": "https://cdn.discordapp.com/attachments/150412836500275200/682945383462207510/Genesis.jpg",
    "corak": "https://cdn.discordapp.com/attachments/150412836500275200/615634616539152384/Screenshot_2019-08-26_at_21.26.26.png",
    "shory": "https://i.imgur.com/LLyIgDm.png",
    "3sou": "https://cdn.discordapp.com/attachments/114604012132761600/694519105314881576/unknown.png",
    "sticks": "https://i.imgur.com/DgvNEoF.jpg",
    "dasuke": "https://cdn.discordapp.com/attachments/629737480803057685/699605969302454272/dasuke-sand.png",
    "ponnya": "https://media.discordapp.net/attachments/698868399484436520/703783498284007434/image0.jpg",
    "3zou": "https://cdn.discordapp.com/attachments/629737480803057685/703785534115414116/3zou.gif",
    "kannya":"https://cdn.discordapp.com/attachments/629737480803057685/703785944360157252/kannya.gif",
    "tsumo":"https://cdn.discordapp.com/attachments/629737480803057685/703786037591146577/orgtsumo.gif",
    "pinfu":"https://cdn.discordapp.com/attachments/629737480803057685/703791737948209262/pinfu-edit.gif",
    "walltricks":"https://cdn.discordapp.com/attachments/629737480803057685/703786251458707496/walltricks.gif",
    "chiitoi":"https://cdn.discordapp.com/attachments/560284585829597194/716306206662328350/unknown.png",
    "butane":"https://cdn.discordapp.com/attachments/629737480803057685/717912488456355850/butane.png",
    "tokujou":"https://media.discordapp.net/attachments/202201840887136256/714456318240358451/tokujou_fun2.png",
    "derinov":"https://media.discordapp.net/attachments/202201840887136256/716745240354226297/deranked.png",
    "sharks":"https://cdn.discordapp.com/attachments/605624705184956447/720847398116524082/1_ToL0tC3M2E18VXQddR01UA.png",
    "cosmos":"https://cdn.discordapp.com/attachments/629737480803057685/723991767766138930/mudazumo-allwhite.png",
    "tripleron": "https://cdn.discordapp.com/attachments/469490857716875285/724995275516674078/4325.png",
    "chanta": "https://cdn.discordapp.com/attachments/150412836500275200/680857700212539416/no-chanta.png",
    "urasan": "https://cdn.discordapp.com/attachments/605624705184956447/730473247941984256/no_more_urasan.png",
    "erzzy": "https://cdn.discordapp.com/attachments/607685453218447376/731597828996071504/unknown.png",
    "promotion": "https://cdn.discordapp.com/attachments/150412836500275200/742648950112124928/20190806184127.jpg",
    "shortcut": "https://cdn.discordapp.com/attachments/749368891561738420/749788250477953034/17e1ff61d645259967ee84cf9f5614965863e832dee4576311fa4397f33db5d5.png",
}

const aliases = {
    "connectkan": "kan",
    "majsoul": "kan",
    "riichi": "yakuman",
    "tournament": "akanashi",
    "hammer": "bop",
    "furiten": "furitendoubleriichi",
    "space": "spacemahjong",
    "bird": "birds",
    "kyuushuu": "kyuushu",
    "spirit": "damage",
    "bongo": "pongo",
    "dan": "corak",
    "shark": "sharks",
    "allwhite": "cosmos",
}
