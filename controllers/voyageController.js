const db = require('../models');

exports.create = async (req, res) => {
    try {
        const voyage = await db.Voyage.create(req.body);
        res.status(201).json(voyage);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.findAll = async (req, res) => {
    try {
        const { dateDepart, prixMax, destinationId } = req.query;
        const where = {};
        if (dateDepart) where.dateDepart = { [db.Sequelize.Op.gte]: new Date(dateDepart) };
        if (prixMax) where.prixBase = { [db.Sequelize.Op.lte]: parseFloat(prixMax) };
        if (destinationId) where.destinationId = destinationId;
        const voyages = await db.Voyage.findAll({ where, include: [{ model: db.Destination, as: 'destination' }], order: [['dateDepart', 'ASC']] });
        res.json(voyages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.findProchains = async (req, res) => {
    try {
        const maintenant = new Date();
        const dans30Jours = new Date();
        dans30Jours.setDate(dans30Jours.getDate() + 30);
        const voyages = await db.Voyage.findAll({
            where: { dateDepart: { [db.Sequelize.Op.between]: [maintenant, dans30Jours] } },
            include: [{ model: db.Destination, as: 'destination' }],
            order: [['dateDepart', 'ASC']]
        });
        res.json(voyages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.findOne = async (req, res) => {
    try {
        const voyage = await db.Voyage.findByPk(req.params.id, {
            include: [{ model: db.Destination, as: 'destination' }, { model: db.Activite, as: 'activites', through: { attributes: [] } }]
        });
        if (!voyage) return res.status(404).json({ error: 'Voyage non trouvé' });
        res.json(voyage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.reserver = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    try {
        const { clientId, nombrePersonnes } = req.body;
        
        // Utiliser lock FOR UPDATE pour éviter les problèmes de concurrence
        const voyage = await db.Voyage.findByPk(req.params.id, { 
            lock: true,
            transaction 
        });
        
        if (!voyage) {
            await transaction.rollback();
            return res.status(404).json({ error: 'Voyage non trouvé' });
        }
        
        const client = await db.Client.findByPk(clientId, { transaction });
        if (!client) {
            await transaction.rollback();
            return res.status(404).json({ error: 'Client non trouvé' });
        }
        
        if (voyage.placesDisponibles < nombrePersonnes) {
            await transaction.rollback();
            return res.status(400).json({ error: 'Pas assez de places disponibles' });
        }
        
        const prixTotal = parseFloat(voyage.prixBase) * nombrePersonnes;
        const reservation = await db.Reservation.create({ 
            voyageId: voyage.id, 
            clientId, 
            dateReservation: new Date(), 
            nombrePersonnes, 
            prixTotal, 
            statut: 'Confirmée' 
        }, { transaction });
        
        await voyage.update({ 
            placesDisponibles: voyage.placesDisponibles - nombrePersonnes 
        }, { transaction });
        
        await transaction.commit();
        
        // Récupérer la réservation complète après le commit
        const reservationComplete = await db.Reservation.findByPk(reservation.id, { 
            include: [
                { model: db.Voyage, as: 'voyage' }, 
                { model: db.Client, as: 'client' }
            ] 
        });
        
        res.status(201).json(reservationComplete);
    } catch (error) {
        await transaction.rollback();
        res.status(400).json({ error: error.message });
    }
};
