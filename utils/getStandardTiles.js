module.exports = () => {
    let availableTiles = Array(38).fill(4);
    availableTiles[30] = 0;
    availableTiles[0] = 1;
    availableTiles[10] = 1;
    availableTiles[20] = 1;
    availableTiles[5] = 3;
    availableTiles[15] = 3;
    availableTiles[25] = 3;
    return availableTiles;
}