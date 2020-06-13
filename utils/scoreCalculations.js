module.exports = {
    getPoints,
    getPointsString,
    getAotenjouPointsString,
    RON_SCORES: [
        { han: 1, fu: 30, nondealer: 1000, dealer: 1500 }, { han: 1, fu: 40, nondealer: 1300, dealer: 2000 }, { han: 2, fu: 25, nondealer: 1600, dealer: 2400 },
        { han: 2, fu: 30, nondealer: 2000, dealer: 2900 }, { han: 1, fu: 70, nondealer: 2300, dealer: 3400 }, { han: 2, fu: 40, nondealer: 2600, dealer: 3900 },
        { han: 1, fu: 90, nondealer: 2900, dealer: 4400 }, { han: 3, fu: 25, nondealer: 3200, dealer: 4800 }, { han: 1, fu: 110, nondealer: 3600, dealer: 5300 },
        { han: 3, fu: 30, nondealer: 3900, dealer: 5800 }, { han: 2, fu: 70, nondealer: 4500, dealer: 6800 }, { han: 3, fu: 40, nondealer: 5200, dealer: 7700 },
        { han: 2, fu: 90, nondealer: 5800, dealer: 8700 }, { han: 4, fu: 25, nondealer: 6400, dealer: 9600 }, { han: 2, fu: 110, nondealer: 7100, dealer: 10600 },
        { han: 4, fu: 30, nondealer: 7700, dealer: 11600 }, { han: 5, fu: 30, nondealer: 8000, dealer: 12000 }, { han: 6, fu: 30, nondealer: 12000, dealer: 18000 },
        { han: 8, fu: 30, nondealer: 16000, dealer: 24000 }, { han: 11, fu: 30, nondealer: 24000, dealer: 36000 }, { han: 13, fu: 30, nondealer: 32000, dealer: 48000 }
    ],
    TSUMO_SCORES: [
        { han: 1, fu: 30, nondealer: 300, dealer: 500 }, { han: 2, fu: 20, nondealer: 400, dealer: 700 }, { han: 1, fu: 50, nondealer: 400, dealer: 800 },
        { han: 2, fu: 30, nondealer: 500, dealer: 1000 }, { han: 1, fu: 70, nondealer: 600, dealer: 1200 }, { han: 2, fu: 40, nondealer: 700, dealer: 1300 },
        { han: 1, fu: 90, nondealer: 800, dealer: 1500 }, { han: 3, fu: 25, nondealer: 800, dealer: 1600 }, { han: 1, fu: 110, nondealer: 900, dealer: 1800 },
        { han: 3, fu: 30, nondealer: 1000, dealer: 2000 }, { han: 2, fu: 70, nondealer: 1200, dealer: 2300 }, { han: 3, fu: 40, nondealer: 1300, dealer: 2600 },
        { han: 2, fu: 90, nondealer: 1500, dealer: 2900 }, { han: 4, fu: 25, nondealer: 1600, dealer: 3200 }, { han: 2, fu: 110, nondealer: 1800, dealer: 3600 },
        { han: 4, fu: 30, nondealer: 2000, dealer: 3900 }, { han: 5, fu: 20, nondealer: 2000, dealer: 4000 }, { han: 6, fu: 20, nondealer: 3000, dealer: 6000 },
        { han: 8, fu: 20, nondealer: 4000, dealer: 8000 }, { han: 11, fu: 20, nondealer: 6000, dealer: 12000 }, { han: 13, fu: 20, nondealer: 8000, dealer: 16000 }
    ]
}

function calculateBasicPoints(han, fu, yakuman) {
    if (han <= 0) return 0;

    var basicPoints;

    if (yakuman > 0) {
        basicPoints = 8000 * yakuman;
    }
    else if (han < 5) {
        basicPoints = Math.min(fu * Math.pow(2, han + 2), 2000);
    }
    else if (han === 5) {
        basicPoints = 2000;
    }
    else if (han < 8) {
        basicPoints = 3000;
    }
    else if (han < 11) {
        basicPoints = 4000;
    }
    else if (han < 13) {
        basicPoints = 6000;
    }
    else {
        // Counted yakuman
        basicPoints = 8000;
    }

    return basicPoints;
}

function getAotenjouPointsString(han = 1, fu = 20, dealer = false, tsumo = true) {
    if (han <= 0) return 0;
    let basicPoints = Math.min(fu * Math.pow(2, han + 2), 2000);

    if (tsumo) {
        if (dealer) {
            return roundPoints(basicPoints * 2);
        }
        else {
            return roundPoints(basicPoints) + " / " + roundPoints(basicPoints * 2);
        }
    }
    else {
        if (dealer) {
            return roundPoints(basicPoints * 6);
        }
        else {
            return roundPoints(basicPoints * 4);
        }
    }
}

function getPointsString(han = 1, fu = 20, dealer = false, tsumo = true, yakuman = 0) {
    let basicPoints = calculateBasicPoints(han, fu, yakuman);

    if (tsumo) {
        if (dealer) {
            return roundPoints(basicPoints * 2);
        }
        else {
            return roundPoints(basicPoints) + " / " + roundPoints(basicPoints * 2);
        }
    }
    else {
        if (dealer) {
            return roundPoints(basicPoints * 6);
        }
        else {
            return roundPoints(basicPoints * 4);
        }
    }
}

function getPoints(han = 1, fu = 20, dealer = false, tsumo = true, yakuman = 0) {
    let basicPoints = calculateBasicPoints(han, fu, yakuman);

    if (tsumo) {
        if (dealer) {
            let points = roundPoints(basicPoints * 2);
            return [points, points];
        }
        else {
            return [roundPoints(basicPoints), roundPoints(basicPoints * 2)];
        }
    }
    else {
        if (dealer) {
            return roundPoints(basicPoints * 6);
        }
        else {
            return roundPoints(basicPoints * 4);
        }
    }
}

function roundPoints(points) {
    return Math.ceil(points / 100) * 100;
}