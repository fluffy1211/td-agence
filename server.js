const express = require('express');
const db = require('./models');
const app = express();
app.use(express.json());
const port = 3456;

db.sequelize.authenticate()
    .then(() => {
        console.log('Connexion à la base de données réussie.');
    })
    .catch(err => {
        console.error('Impossible de se connecter à la base de données :', err);
    });

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello World !');
});

app.use('/api/clients', require('./routes/clients'));
app.use('/api/destinations', require('./routes/destinations'));
app.use('/api/voyages', require('./routes/voyages'));
app.use('/api/reservations', require('./routes/reservations'));

app.use(require('./middleware/errorHandler'));