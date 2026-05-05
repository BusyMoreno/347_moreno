// Wir ersetzen die fehlerhaften .env Variablen hart durch die echten URLs.
// Wichtig: Das <userId> muss im Text stehen bleiben, damit die .replace() Funktion unten funktioniert!
const holdingsUrl = "http://localhost:4000/Account/Cryptos?userId=<userId>";
const friendsUrl = "http://localhost:4000/Account/Friends?userId=<userId>";

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