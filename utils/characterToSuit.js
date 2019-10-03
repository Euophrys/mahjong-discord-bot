module.exports = character => {
    if (character === "m" || character === "w" || character === "c") {
        return 0;
    }

    if (character === "p") {
        return 10;
    }

    if (character === "s" || character === "b") {
        return 20;
    }

    if (character === "z" || character === "h") {
        return 30;
    }

    return -1;
}