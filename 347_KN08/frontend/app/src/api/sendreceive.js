// Direkt-Link statt process.env
const sendUrl = "http://44.203.84.0:8003/send";

function sendApiRequest(receiverId, senderId, amount) {
    const data = { id: senderId, receiverId: receiverId, amount: amount };
    return fetch(sendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(async response => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson ? await response.json() : null;

        if (!response.ok) {
            alert("Fehler: " + (data?.message || "Unbekannter Fehler"));
            return { success: false };
        }
        return data;
    });
}

export default {
    send: sendApiRequest
};