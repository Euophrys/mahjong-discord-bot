const sendResponse = require("../utils/sendResponse");
const sendDeletableResponse = require("../utils/sendDeletableResponse");
const { getPoints, getPointsString, getAotenjouPointsString, TSUMO_SCORES, RON_SCORES } = require("../utils/scoreCalculations")
const parseHandFromString = require("../utils/parseHandFromString");

const hanFuRegex = /(\d+)\D+?(\d+)/;
const yakumanRegex = /(\d).+yakuman/i;
const numberRegex = /(\d+)/;

module.exports = message => {
    let request = message.content.substr(message.content.indexOf(" ")).trim();

    if (request === "" || message.content.split(" ").length === 1) {
        return sendDeletableResponse(message, `You'll have to give either a hand value, such as [dealer] 4 han 30 fu, or a point differential, such as 5600.`);
    }

    let {tiles, handTiles} = parseHandFromString(request);

    if (tiles > 5) {
        return sendDeletableResponse(message, "Sorry, I can't score hands yet, I'm still learning the yaku.");
    }

    let scoringFunction = getPointsString;
    let aotenjou = false;

    if (request.indexOf("aotenjou") >= 0 || request.indexOf("skyrocketing") >= 0) {
        scoringFunction = getAotenjouPointsString;
        aotenjou = true;
    }

    let dealer = request.indexOf("dealer") >= 0;
    let response = "A " + (dealer ? "dealer" : "non-dealer");

    let hanFu = hanFuRegex.exec(request);

    if (hanFu) {
        let han = parseInt(hanFu[1]);
        let fu = parseInt(hanFu[2]);

        if (han > 13 && !aotenjou) {
            response = "You gave a han value of more than 13. Did you mean to call this with aotenjou? " + response;
        }

        if (han > 4 && !aotenjou) {
            fu = 20;
            response += ` ${han} han`
        } else {
            if (fu < 20) {
                return sendDeletableResponse(message, "Fu cannot be less than 20.");
            } else if (han === 0) {
                return sendDeletableResponse(message, "Han cannot be zero, come on now.");
            }

            response += ` ${han} han ${fu} fu`;
        }

        if (request.indexOf("tsumo") >= 0) {
            return sendResponse(message, `${response} tsumo is ${scoringFunction(han, fu, dealer, true)}.`);
        } else if (request.indexOf("ron") >= 0) {
            return sendResponse(message, `${response} ron is ${scoringFunction(han, fu, dealer, false)}.`);
        } else {
            return sendResponse(message, `${response} is ${scoringFunction(han, fu, dealer, true)} on tsumo, and ${scoringFunction(han, fu, dealer, false)} on ron.`);
        }
    }

    let yakuman = yakumanRegex.exec(request);

    if (yakuman) {
        let value = parseInt(yakuman[1]);

        if (value === 0) {
            return sendDeletableResponse(message, "I can't calculate a 0x yakuman.");
        }

        if (request.indexOf("tsumo") >= 0) {
            return sendResponse(message, `${response} ${value}x yakuman tsumo is ${getPointsString(1, 20, dealer, true, value)}.`);
        } else if (request.indexOf("ron") >= 0) {
            return sendResponse(message, `${response} ${value}x yakuman ron is ${getPointsString(1, 20, dealer, false, value)}.`);
        } else {
            return sendResponse(message, `${response} ${value}x yakuman is ${getPointsString(1, 20, dealer, true, value)} on tsumo, and ${getPointsString(1, 20, dealer, false, value)} on ron.`);
        }
    }

    let number = numberRegex.exec(request);

    if (number) {
        let common = request.indexOf("common") >= 0;
        let difference = parseInt(number[1]);

        if (difference < 1000) {
            return sendDeletableResponse("That difference is so small that any hand will overcome it. Were you trying to call something else?");
        }

        response = `To overcome a point difference of ${difference} as ${response.toLowerCase()}, you would need a `;

        let minTsumoVsNondealer = "multiple yakuman";
        for (let i = 0; i < TSUMO_SCORES.length; i++) {
            if (common && TSUMO_SCORES[i].fu > 40) continue;

            let gainedPoints = 0;
            
            if (dealer) {
                gainedPoints = TSUMO_SCORES[i].dealer * 3;
            } else {
                gainedPoints = TSUMO_SCORES[i].nondealer * 2 + TSUMO_SCORES[i].dealer;
            }

            let adjustedDifference = difference - (dealer ? TSUMO_SCORES[i].dealer : TSUMO_SCORES[i].nondealer);

            if (gainedPoints > adjustedDifference) {
                minTsumoVsNondealer = `${TSUMO_SCORES[i].han} han ${TSUMO_SCORES[i].fu} fu`;
                break;
            }
        }

        response += `${minTsumoVsNondealer} tsumo against a non-dealer`;

        let minTsumoVsDealer = "multiple yakuman";

        if (!dealer) {
            for (let i = 0; i < TSUMO_SCORES.length; i++) {
                if (common && TSUMO_SCORES[i].fu > 40) continue;
                let gainedPoints = 0;
                gainedPoints = TSUMO_SCORES[i].nondealer * 2 + TSUMO_SCORES[i].dealer;
                let adjustedDifference = difference - TSUMO_SCORES[i].dealer;
    
                if (gainedPoints > adjustedDifference) {
                    minTsumoVsDealer = `${TSUMO_SCORES[i].han} han ${TSUMO_SCORES[i].fu} fu`;
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
                minDirectHit = `${RON_SCORES[i].han} han ${RON_SCORES[i].fu} fu`;
                break;
            }
        }

        response += `, ${minDirectHit} direct hit`;

        let minRon = "multiple yakuman";

        for (let i = 0; i < RON_SCORES.length; i++) {
            if (common && RON_SCORES[i].fu > 40) continue;
            let gainedPoints = dealer ? RON_SCORES[i].dealer : RON_SCORES[i].nondealer;

            if (gainedPoints > difference) {
                minRon = `${RON_SCORES[i].han} han ${RON_SCORES[i].fu} fu`;
                break;
            }
        }

        response += `, or a ${minRon} ron on a different player.`;

        return sendResponse(message, response);
    }

    let namedKeys = Object.keys(namedValue);

    for (let i = 0; i < namedKeys.length; i++) {
        if (request.indexOf(namedKeys[i]) > 0) {
            let values = namedValue[namedKeys[i]];

            if (request.indexOf("tsumo") >= 0) {
                return sendResponse(message, `${response} ${namedKeys[i]} tsumo is ${getPointsString(values.han, values.fu, dealer, true, values.yakuman)}.`);
            } else if (request.indexOf("ron") >= 0) {
                return sendResponse(message, `${response} ${namedKeys[i]} ron is ${getPointsString(values.han, values.fu, dealer, false, values.yakuman)}.`);
            } else {
                return sendResponse(message, `${response} ${namedKeys[i]} is ${getPointsString(values.han, values.fu, dealer, true, values.yakuman)} on tsumo, and ${getPointsString(values.han, values.fu, dealer, false, values.yakuman)} on ron.`);
            }
        }
    }

    sendDeletableResponse(message, "I'm not really sure what you're asking.");
};

const namedValue = {
    "mangan": {han: 5, fu: 20, yakuman: 0},
    "haneman": {han: 6, fu: 20, yakuman: 0},
    "baiman": {han: 8, fu: 20, yakuman: 0},
    "sanbaiman": {han: 11, fu: 20, yakuman: 0},
    "yakuman": {han: 1, fu: 20, yakuman: 1},
    "kazoe": {han: 13, fu: 20, yakuman: 0},
    "double yakuman": {han: 1, fu: 20, yakuman: 2},
    "triple yakuman": {han: 1, fu: 20, yakuman: 3},
    "quadruple yakuman": {han: 1, fu: 20, yakuman: 4},
    "pentuple yakuman": {han: 1, fu: 20, yakuman: 5},
    "sextuple yakuman": {han: 1, fu: 20, yakuman: 6}
}