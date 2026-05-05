const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// In index.js
const ACCOUNT_URL = process.env.ACCOUNT_SERVICE_URL || "http://localhost:4000";

// BUY ROUTE (Das war vorher falsch als /sell markiert)
app.post("/buy", async (req, res) => {
    const { id, amount } = req.body;
    try {
        // Hier fügst du Cryptos hinzu (AddCrypto Endpunkt am Account-Service)
        // Pass den Endpunkt-Pfad an, falls er bei dir anders heißt (z.B. /Account/AddCrypto)
        await axios.post(`${ACCOUNT_URL}/Account/AddCrypto?userId=${id}&amount=${amount}`);
        res.json({ success: true });
    } catch (err) {
        console.error("Fehler beim Buy:", err.message);
        res.status(500).json({ success: false });
    }
});

// SELL ROUTE
app.post("/sell", async (req, res) => {
    const { id, amount } = req.body;
    try {
        // Hier entfernst du Cryptos
        await axios.post(`${ACCOUNT_URL}/Account/RemoveCrypto?userId=${id}&amount=${amount}`);
        res.json({ success: true });
    } catch (err) {
        console.error("Fehler beim Sell:", err.message);
        res.status(500).json({ success: false });
    }
});

app.listen(8002, () => {
  console.log("BuySell läuft auf http://localhost:8002");
});