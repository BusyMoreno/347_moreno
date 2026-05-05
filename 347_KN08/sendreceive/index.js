const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// In index.js
const ACCOUNT_URL = process.env.ACCOUNT_SERVICE_URL || "http://localhost:4000";

app.post("/send", async (req, res) => {
    const { id, receiverId, amount } = req.body;

    try {
        // 1. Prüfen, ob receiverId ein Freund von 'id' ist
        const friendsResponse = await axios.get(`${ACCOUNT_URL}/Account/Friends?userId=${id}`);
        const friends = friendsResponse.data; // Erwartet Array von IDs oder Objekten
        
        // Prüfung (je nach API-Format von Account):
        const isFriend = friends.some(f => (f.id == receiverId || f == receiverId));

        if (!isFriend) {
            return res.status(400).json({ success: false, message: "Not a friend" });
        }

        // 2. Guthaben prüfen
        const balanceResponse = await axios.get(`${ACCOUNT_URL}/Account/Cryptos?userId=${id}`);
        if (balanceResponse.data < amount) {
            return res.status(400).json({ success: false, message: "Not enough coins" });
        }

        // 3. Transaktion durchführen (Abzug beim Sender, Gutschrift beim Empfänger)
        await axios.post(`${ACCOUNT_URL}/Account/RemoveCrypto?userId=${id}&amount=${amount}`);
        await axios.post(`${ACCOUNT_URL}/Account/AddCrypto?userId=${receiverId}&amount=${amount}`);

        res.json({ success: true }); // Sauberes JSON für das Frontend
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(8003, () => {
  console.log("SendReceive läuft auf http://localhost:8003");
});
