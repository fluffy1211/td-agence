const db = require('../models');

exports.create = async (req, res) => {
    try {
        const reservation = await db.Reservation.create(req.body);
        const reservationComplete = await db.Reservation.findByPk(reservation.id, { include: [{ model: db.Voyage, as: 'voyage' }, { model: db.Client, as: 'client' }] });
        res.status(201).json(reservationComplete);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.findByClient = async (req, res) => {
    try {
        const reservations = await db.Reservation.findAll({
            where: { clientId: req.params.clientId },
            include: [{ model: db.Voyage, as: 'voyage', include: [{ model: db.Destination, as: 'destination' }] }, { model: db.Client, as: 'client' }],
            order: [['dateReservation', 'DESC']]
        });
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.findByVoyage = async (req, res) => {
    try {
        const reservations = await db.Reservation.findAll({
            where: { voyageId: req.params.voyageId },
            include: [{ model: db.Voyage, as: 'voyage' }, { model: db.Client, as: 'client' }],
            order: [['dateReservation', 'DESC']]
        });
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.annuler = async (req, res) => {
    try {
        const reservation = await db.Reservation.findByPk(req.params.id, { include: [{ model: db.Voyage, as: 'voyage' }] });
        if (!reservation) return res.status(404).json({ error: 'Réservation non trouvée' });
        if (reservation.statut === 'Annulée') return res.status(400).json({ error: 'Cette réservation est déjà annulée' });
        await reservation.voyage.update({ placesDisponibles: reservation.voyage.placesDisponibles + reservation.nombrePersonnes });
        await reservation.update({ statut: 'Annulée' });
        res.json(reservation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
