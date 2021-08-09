module.exports = (content, responses, aliases) => {
    let dashesRemoved = content.replace("-", " ");
    let requestArray = dashesRemoved.split(" ");
    let request = requestArray.join("").toLowerCase();

    if (aliases[request]) {
        request = aliases[request];
    }

    if (responses[request]) {
        return {response: responses[request], request: requestArray.join(" ")};
    } else {
        // Try every word to see if it's something valid
        for(let i = 0; i < requestArray.length; i++) {
            request = requestArray[i].toLowerCase();

            if (aliases[request]) {
                request = aliases[request];
            }
            
            if (responses[request]) {
                return {response: responses[request], request: requestArray.join(" ")};
            }
        }
    }

    return {response: false, request: requestArray.join(" ")};
}