const holdingsUrl = "http://44.203.84.0:30002/Account/Cryptos?userId=<userId>";
const friendsUrl = "http://44.203.84.0:30002/Account/Friends?userId=<userId>";

function holdingsApiRequest(uid) {
    var theUrl = holdingsUrl.replace("<userId>", uid);
    const requestOptions = {
        method: 'GET'//,'POST'
        //headers: { 'Content-Type': 'application/json' },
        //body: JSON.stringify()
    };
    return fetch(theUrl, requestOptions)
        .then(response => response.json())
        .catch(error => {
            console.error("Fetch Error Holdings:", error);
        });
}

function friendsApiRequest(uid) {
    var theUrl = friendsUrl.replace("<userId>", uid);
    const requestOptions = {
        method: 'GET'//, 'POST'
        //headers: { 'Content-Type': 'application/json' },
        //body: JSON.stringify()
    };
    return fetch(theUrl, requestOptions)
        .then(response => response.json())
        .catch(error => {
            console.error("Fetch Error Friends:", error);
        });
}

export default {
    holdings: holdingsApiRequest,
    friends: friendsApiRequest
};