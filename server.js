const express = require('express');
const { createCheckout } = require('./payments/stripe');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Útvonalak
app.post('/webhook', (req, res) => {
    console.log("Tranzakció érkezett:", req.body);
    res.status(200).send({ status: 'success' });
});

app.get('/health', (req, res) => {
    res.status(200).send({ status: 'ok' });
});

// A fizetési motor végpontja
app.post('/checkout', async (req, res) => {
    try {
        const url = await createCheckout(req.body.email, req.body.score);
        res.json({ url });
    } catch (error) {
        res.status(500).json({ error: "Fizetési hiba" });
    }
});

app.listen(PORT, () => console.log(`Titanium Engine fut a ${PORT} porton`));
