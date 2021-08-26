const { TSUMO_SCORES, RON_SCORES } = require("../utils/scoreCalculations")

module.exports = async interaction => {
    let difference = interaction.options.getInteger('difference');
    let dealer = interaction.options.getBoolean('dealer');
    let common = interaction.options.getBoolean('common');
    let sanma = interaction.options.getBoolean('sanma') ? 1 : 0;
    let response = "A " + (dealer ? "dealer" : "non-dealer");

    if (difference < 1000) {
        return interaction.reply({content:"That difference is so small that any hand will overcome it.", ethereal:true});
    }

    response = `To overcome a point difference of ${difference} as ${response.toLowerCase()}, you would need a `;

    let minTsumoVsNondealer = "multiple yakuman";
    for (let i = 0; i < TSUMO_SCORES.length; i++) {
        if (common && TSUMO_SCORES[i].fu > 40) continue;

        let gainedPoints = 0;
        
        if (dealer) {
            gainedPoints = TSUMO_SCORES[i].dealer * (3 - sanma);
        } else {
            gainedPoints = TSUMO_SCORES[i].nondealer * (2 - sanma) + TSUMO_SCORES[i].dealer;
        }

        let adjustedDifference = difference - (dealer ? TSUMO_SCORES[i].dealer : TSUMO_SCORES[i].nondealer);

        if (gainedPoints > adjustedDifference) {
            if (TSUMO_SCORES[i].han > 4) {
                minTsumoVsNondealer = hanToName[TSUMO_SCORES[i].han];
            } else {
                minTsumoVsNondealer = `${TSUMO_SCORES[i].han} han ${TSUMO_SCORES[i].fu} fu`;
            }

            break;
        }
    }

    response += `${minTsumoVsNondealer} tsumo against a non-dealer`;

    let minTsumoVsDealer = "multiple yakuman";

    if (!dealer) {
        for (let i = 0; i < TSUMO_SCORES.length; i++) {
            if (common && TSUMO_SCORES[i].fu > 40) continue;
            let gainedPoints = 0;
            gainedPoints = TSUMO_SCORES[i].nondealer * (2 - sanma) + TSUMO_SCORES[i].dealer;
            let adjustedDifference = difference - TSUMO_SCORES[i].dealer;

            if (gainedPoints > adjustedDifference) {
                if (TSUMO_SCORES[i].han > 4) {
                    minTsumoVsDealer = hanToName[TSUMO_SCORES[i].han];
                } else {
                    minTsumoVsDealer = `${TSUMO_SCORES[i].han} han ${TSUMO_SCORES[i].fu} fu`;
                }
                break;
            }
        }

        response += `, ${minTsumoVsDealer} tsumo against a dealer`;
    }

    let minDirectHit = "multiple yakuman";

    for (let i = 0; i < RON_SCORES.length; i++) {
        if (common && RON_SCORES[i].fu > 40) continue;
        let gainedPoints = dealer ? RON_SCORES[i].dealer : RON_SCORES[i].nondealer;
        let adjustedDifference = difference - gainedPoints;

        if (gainedPoints > adjustedDifference) {
            if (RON_SCORES[i].han > 4) {
                minDirectHit = hanToName[RON_SCORES[i].han];
            } else {
                minDirectHit = `${RON_SCORES[i].han} han ${RON_SCORES[i].fu} fu`;
            }
            break;
        }
    }

    response += `, ${minDirectHit} direct hit`;

    let minRon = "multiple yakuman";

    for (let i = 0; i < RON_SCORES.length; i++) {
        if (common && RON_SCORES[i].fu > 40) continue;
        let gainedPoints = dealer ? RON_SCORES[i].dealer : RON_SCORES[i].nondealer;

        if (gainedPoints > difference) {
            if (RON_SCORES[i].han > 4) {
                minRon = hanToName[RON_SCORES[i].han];
            } else {
                minRon = `${RON_SCORES[i].han} han ${RON_SCORES[i].fu} fu`;
            }
            break;
        }
    }

    response += `, or a ${minRon} ron on a different player.`;

    return interaction.reply(response);
};


const hanToName = [
    //0,1,2, 3, 4,  5,        6,         7,         8,        9,        10,       11,          12,          13
    "","","","","", "mangan", "haneman", "haneman", "baiman", "baiman", "baiman", "sanbaiman", "sanbaiman", "yakuman"
]