// Direkt-Links statt process.env
const buyUrl = "http://44.203.84.0:8002/buy";
const sellUrl = "http://44.203.84.0:8002/sell";

function buyApiRequest(uid, amount) {
    const data = {
        id: uid,
        amount: amount
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    return fetch(buyUrl, requestOptions)
        .then(response => response.json())
        .catch(error => {
            console.error("Buy Error:", error);
        });
}

function sellApiRequest(uid, amount) {
    const data = {
        id: uid,
        amount: amount
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    return fetch(sellUrl, requestOptions)
        .then(response => response.json())
        .catch(error => {
            console.error("Sell Error:", error);
        });
}

export default {
    buy: buyApiRequest,
    sell: sellApiRequest
};