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

// ==================== Groupe 1 : Gestion des Clients ====================

// POST /api/clients : Créer un nouveau client
app.post('/api/clients', async (req, res) => {
    try {
        const client = await db.Client.create(req.body);
        res.status(201).json(client);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET /api/clients : Lister tous les clients (avec pagination)
app.get('/api/clients', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await db.Client.findAndCountAll({
            limit,
            offset,
            order: [['createdAt', 'DESC']]
        });

        res.json({
            clients: rows,
            totalClients: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/clients/:id : Récupérer un client spécifique
app.get('/api/clients/:id', async (req, res) => {
    try {
        const client = await db.Client.findByPk(req.params.id, {
            include: [{
                model: db.Reservation,
                as: 'reservations',
                include: [{
                    model: db.Voyage,
                    as: 'voyage'
                }]
            }]
        });
        
        if (!client) {
            return res.status(404).json({ error: 'Client non trouvé' });
        }
        
        res.json(client);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /api/clients/:id : Mettre à jour un client
app.put('/api/clients/:id', async (req, res) => {
    try {
        const client = await db.Client.findByPk(req.params.id);
        
        if (!client) {
            return res.status(404).json({ error: 'Client non trouvé' });
        }
        
        await client.update(req.body);
        res.json(client);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE /api/clients/:id : Supprimer un client
app.delete('/api/clients/:id', async (req, res) => {
    try {
        const client = await db.Client.findByPk(req.params.id);
        
        if (!client) {
            return res.status(404).json({ error: 'Client non trouvé' });
        }
        
        await client.destroy();
        res.json({ message: 'Client supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==================== Groupe 2 : Gestion des Destinations ====================

// POST /api/destinations : Créer une nouvelle destination
app.post('/api/destinations', async (req, res) => {
    try {
        const destination = await db.Destination.create(req.body);
        res.status(201).json(destination);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET /api/destinations : Lister toutes les destinations
app.get('/api/destinations', async (req, res) => {
    try {
        const destinations = await db.Destination.findAll({
            order: [['nom', 'ASC']]
        });
        res.json(destinations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/destinations/:id : Récupérer une destination avec ses voyages, hébergements et activités
app.get('/api/destinations/:id', async (req, res) => {
    try {
        const destination = await db.Destination.findByPk(req.params.id, {
            include: [
                { model: db.Voyage, as: 'voyages' },
                { model: db.Hebergement, as: 'hebergements' },
                { model: db.Activite, as: 'activites' }
            ]
        });
        
        if (!destination) {
            return res.status(404).json({ error: 'Destination non trouvée' });
        }
        
        res.json(destination);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/destinations/:id/voyages : Récupérer tous les voyages d'une destination
app.get('/api/destinations/:id/voyages', async (req, res) => {
    try {
        const destination = await db.Destination.findByPk(req.params.id);
        
        if (!destination) {
            return res.status(404).json({ error: 'Destination non trouvée' });
        }
        
        const voyages = await db.Voyage.findAll({
            where: { destinationId: req.params.id },
            include: [{ model: db.Destination, as: 'destination' }]
        });
        
        res.json(voyages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/destinations/continent/:continent : Lister les destinations par continent
app.get('/api/destinations/continent/:continent', async (req, res) => {
    try {
        const destinations = await db.Destination.findAll({
            where: { continent: req.params.continent },
            order: [['nom', 'ASC']]
        });
        res.json(destinations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==================== Groupe 3 : Gestion des Voyages ====================

// GET /api/voyages/prochains : Récupérer les voyages dont la date de départ est dans les 30 prochains jours
app.get('/api/voyages/prochains', async (req, res) => {
    try {
        const maintenant = new Date();
        const dans30Jours = new Date();
        dans30Jours.setDate(dans30Jours.getDate() + 30);
        
        const voyages = await db.Voyage.findAll({
            where: {
                dateDepart: {
                    [db.Sequelize.Op.between]: [maintenant, dans30Jours]
                }
            },
            include: [{ model: db.Destination, as: 'destination' }],
            order: [['dateDepart', 'ASC']]
        });
        
        res.json(voyages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/voyages : Créer un nouveau voyage
app.post('/api/voyages', async (req, res) => {
    try {
        const voyage = await db.Voyage.create(req.body);
        res.status(201).json(voyage);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET /api/voyages : Lister tous les voyages (filtres optionnels : date, prix, destination)
app.get('/api/voyages', async (req, res) => {
    try {
        const { dateDepart, prixMax, destinationId } = req.query;
        const where = {};
        
        if (dateDepart) {
            where.dateDepart = { [db.Sequelize.Op.gte]: new Date(dateDepart) };
        }
        
        if (prixMax) {
            where.prixBase = { [db.Sequelize.Op.lte]: parseFloat(prixMax) };
        }
        
        if (destinationId) {
            where.destinationId = destinationId;
        }
        
        const voyages = await db.Voyage.findAll({
            where,
            include: [{ model: db.Destination, as: 'destination' }],
            order: [['dateDepart', 'ASC']]
        });
        
        res.json(voyages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/voyages/:id : Récupérer un voyage avec sa destination et activités incluses
app.get('/api/voyages/:id', async (req, res) => {
    try {
        const voyage = await db.Voyage.findByPk(req.params.id, {
            include: [
                { model: db.Destination, as: 'destination' },
                { 
                    model: db.Activite, 
                    as: 'activites',
                    through: { attributes: [] }
                }
            ]
        });
        
        if (!voyage) {
            return res.status(404).json({ error: 'Voyage non trouvé' });
        }
        
        res.json(voyage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/voyages/:id/reserver : Réserver un voyage pour un client
app.post('/api/voyages/:id/reserver', async (req, res) => {
    try {
        const { clientId, nombrePersonnes } = req.body;
        
        const voyage = await db.Voyage.findByPk(req.params.id);
        if (!voyage) {
            return res.status(404).json({ error: 'Voyage non trouvé' });
        }
        
        const client = await db.Client.findByPk(clientId);
        if (!client) {
            return res.status(404).json({ error: 'Client non trouvé' });
        }
        
        if (voyage.placesDisponibles < nombrePersonnes) {
            return res.status(400).json({ error: 'Pas assez de places disponibles' });
        }
        
        const prixTotal = parseFloat(voyage.prixBase) * nombrePersonnes;
        
        const reservation = await db.Reservation.create({
            voyageId: voyage.id,
            clientId: clientId,
            dateReservation: new Date(),
            nombrePersonnes: nombrePersonnes,
            prixTotal: prixTotal,
            statut: 'Confirmée'
        });
        
        // Mise à jour des places disponibles
        await voyage.update({
            placesDisponibles: voyage.placesDisponibles - nombrePersonnes
        });
        
        const reservationComplete = await db.Reservation.findByPk(reservation.id, {
            include: [
                { model: db.Voyage, as: 'voyage' },
                { model: db.Client, as: 'client' }
            ]
        });
        
        res.status(201).json(reservationComplete);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// ==================== Groupe 4 : Gestion des Réservations ====================

// POST /api/reservations : Créer une réservation
app.post('/api/reservations', async (req, res) => {
    try {
        const reservation = await db.Reservation.create(req.body);
        
        const reservationComplete = await db.Reservation.findByPk(reservation.id, {
            include: [
                { model: db.Voyage, as: 'voyage' },
                { model: db.Client, as: 'client' }
            ]
        });
        
        res.status(201).json(reservationComplete);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET /api/reservations/client/:clientId : Récupérer toutes les réservations d'un client
app.get('/api/reservations/client/:clientId', async (req, res) => {
    try {
        const reservations = await db.Reservation.findAll({
            where: { clientId: req.params.clientId },
            include: [
                { 
                    model: db.Voyage, 
                    as: 'voyage',
                    include: [{ model: db.Destination, as: 'destination' }]
                },
                { model: db.Client, as: 'client' }
            ],
            order: [['dateReservation', 'DESC']]
        });
        
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /api/reservations/:id/annuler : Annuler une réservation
app.put('/api/reservations/:id/annuler', async (req, res) => {
    try {
        const reservation = await db.Reservation.findByPk(req.params.id, {
            include: [{ model: db.Voyage, as: 'voyage' }]
        });
        
        if (!reservation) {
            return res.status(404).json({ error: 'Réservation non trouvée' });
        }
        
        if (reservation.statut === 'Annulée') {
            return res.status(400).json({ error: 'Cette réservation est déjà annulée' });
        }
        
        // Remettre les places disponibles
        const voyage = reservation.voyage;
        await voyage.update({
            placesDisponibles: voyage.placesDisponibles + reservation.nombrePersonnes
        });
        
        await reservation.update({ statut: 'Annulée' });
        
        res.json(reservation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/reservations/voyage/:voyageId : Voir toutes les réservations d'un voyage
app.get('/api/reservations/voyage/:voyageId', async (req, res) => {
    try {
        const reservations = await db.Reservation.findAll({
            where: { voyageId: req.params.voyageId },
            include: [
                { model: db.Voyage, as: 'voyage' },
                { model: db.Client, as: 'client' }
            ],
            order: [['dateReservation', 'DESC']]
        });
        
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Middleware d'erreurs centralisé
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: err.message || 'Erreur serveur interne',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});