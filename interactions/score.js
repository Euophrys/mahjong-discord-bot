const { getPoints, getPointsString, getAotenjouPointsString, TSUMO_SCORES, RON_SCORES } = require("../utils/scoreCalculations")

module.exports = async interaction => {
    let han = interaction.options.getInteger('han');
    let fu = interaction.options.getInteger('fu');
    let dealer = interaction.options.getBoolean('dealer');

    let scoringFunction = getPointsString;
    let aotenjou = false;

    if (interaction.options.getBoolean('skyrocketing')) {
        scoringFunction = getAotenjouPointsString;
        aotenjou = true;
    }

    let response = "A " + (dealer ? "dealer" : "non-dealer");

    if (han > 13 && !aotenjou) {
        response = "You gave a han value of more than 13. Did you mean to call this with skyrocketing rules? " + response;
    }

    if (han > 4 && !aotenjou) {
        fu = 20;
        response += ` ${han} han`
    } else {
        if (fu < 20) {
            return interaction.reply({content:"Fu cannot be less than 20.", ephemeral:true});
        } else if (han <= 0) {
            return interaction.reply({content:"Han cannot be less than one, come on now.", ephemeral:true});
        }

        response += ` ${han} han ${fu} fu`;
    }

    return interaction.reply(`${response} is ${scoringFunction(han, fu, dealer, true)} on tsumo, and ${scoringFunction(han, fu, dealer, false)} on ron.`);
};

const namedValue = {
    "mangan": {han: 5, fu: 20, yakuman: 0},
    "haneman": {han: 6, fu: 20, yakuman: 0},
    "baiman": {han: 8, fu: 20, yakuman: 0},
    "sanbaiman": {han: 11, fu: 20, yakuman: 0},
    "kazoe": {han: 13, fu: 20, yakuman: 0},
    "double yakuman": {han: 1, fu: 20, yakuman: 2},
    "triple yakuman": {han: 1, fu: 20, yakuman: 3},
    "quadruple yakuman": {han: 1, fu: 20, yakuman: 4},
    "pentuple yakuman": {han: 1, fu: 20, yakuman: 5},
    "sextuple yakuman": {han: 1, fu: 20, yakuman: 6},
    "yakuman": {han: 1, fu: 20, yakuman: 1}
}

const hanToName = [
    //0,1,2, 3, 4,  5,        6,         7,         8,        9,        10,       11,          12,          13
    "","","","","", "mangan", "haneman", "haneman", "baiman", "baiman", "baiman", "sanbaiman", "sanbaiman", "yakuman"
]