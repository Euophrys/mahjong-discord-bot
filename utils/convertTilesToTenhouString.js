module.exports = tiles => {
    let hand = Array(38).fill(0);

    if (typeof tiles === 'number') {
        hand[indexes] = 1;
    } else if (typeof tiles === 'object' && tiles.length) {
        for (let i = 0; i < tiles.length; i++) {
            hand[tiles[i]] += 1;
        }
    } else {
        return "Error."
    }

    let handString = "";
    let valuesInSuit = "";

    for (let suit = 0; suit < 4; suit++) {
        for (let i = suit * 10 + 1; i < suit * 10 + 10; i++) {
            let value = i % 10;

            // If we're at the fives, add the zeroes here, if there are any (0 = red five).
            if (value === 5 && hand[i - 5] > 0) {
                for (let j = 0; j < hand[i - 5]; j++) {
                    valuesInSuit += 0;
                }
            }

            for (let j = 0; j < hand[i]; j++) {
                valuesInSuit += value;
            }
        }

        // Don't add to the hand if there are no values in the suit, to avoid having random letters.
        if (valuesInSuit !== "") {
            handString += valuesInSuit + SUIT_CHARACTERS[suit];
            valuesInSuit = "";
        }
    };

    return handString;
}

const SUIT_CHARACTERS = ["m", "p", "s", "z"];