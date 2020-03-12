const characterToSuit = require("./characterToSuit");

module.exports = (handString) => {
    let handTiles = Array(38).fill(0);
    let characters = handString.split('').reverse();
    let index = 0;
    let tiles = 0;
    
    while (index < characters.length) {
        do {
            offset = characterToSuit(characters[index]);
            index++;
        } while (offset === -1 && index < characters.length);

        while (!isNaN(characters[index]) && index < characters.length) {
            let tile = parseInt(characters[index]);

            if (tile >= 0) {
                tile += offset;

                if (tile == 30) {
                    index++;
                    continue;
                }

                if (tile % 10 == 0) {
                    tile += 5;
                }

                handTiles[tile] += 1;
                tiles++;
            }

            index++;
        }
    }

    return {
        tiles,
        handTiles
    }
}