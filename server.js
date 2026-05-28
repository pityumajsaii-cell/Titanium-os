const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Webhook végpont a pénzmozgáshoz
app.post('/webhook', (req, res) => {
    console.log("Tranzakció érkezett:", req.body);
    res.status(200).send({ status: 'success' });
});

// Egészségügyi ellenőrzés
app.get('/health', (req, res) => {
    res.status(200).send({ status: 'ok' });
});

app.listen(PORT, () => {
    console.log(`Titanium Engine fut a ${PORT} porton`);
});
