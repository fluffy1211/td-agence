const express = require('express');
const db = require('./models');
const app = express();
app.use(express.json());
const port = 3456;

// Connexion à la base de données
db.sequelize.authenticate()
    .then(() => {
        console.log('Connexion à la base de données réussie.');
    })
    .catch(err => {
        console.error('Impossible de se connecter à la base de données :', err);
    });

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello World !');
});

// ROUTES