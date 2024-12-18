const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

// Middleware om JSON-data te verwerken
app.use(express.json());

// Endpoint om data naar Firebase te sturen
app.post('/add', async (req, res) => {
    const { name, value } = req.body;

    // Firebase initialisatie
    const admin = require('firebase-admin');
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.applicationDefault(),
            databaseURL: 'https://<your-project-id>.firebaseio.com',
        });
    }

    const db = admin.firestore();

    try {
        await db.collection('items').add({ name, value });
        res.status(200).send({ message: 'Item toegevoegd!' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Kon item niet toevoegen.' });
    }
});

app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
});
