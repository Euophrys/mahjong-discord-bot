const getStandardTiles = require("./getStandardTiles");

module.exports = (availableTiles) => {
    if(!availableTiles) availableTiles = getStandardTiles();

    let tilePool = [];

    for (let i = 0; i < availableTiles.length; i++) {
        for (let j = 0; j < availableTiles[i]; j++) {
            tilePool.push(i);
        }
    }

    return tilePool;
}