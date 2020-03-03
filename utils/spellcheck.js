const levenshtein = require("js-levenshtein");

module.exports = (input, keys) => {
    let closest = [];
    let closestDistance = 1000;

    keys.forEach(key => {
        let distance = levenshtein(input, key);
        if (distance < closestDistance) {
            closest = [key];
            closestDistance = distance;
        } else if (distance === closestDistance) {
            closest.push(key);
        }
    });

    return {
        closest,
        distance: closestDistance
    };
}