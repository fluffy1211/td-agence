const db = require('../models');

exports.create = async (req, res) => {
    try {
        const destination = await db.Destination.create(req.body);
        res.status(201).json(destination);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.findAll = async (req, res) => {
    try {
        const destinations = await db.Destination.findAll({ order: [['nom', 'ASC']] });
        res.json(destinations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.findByContinent = async (req, res) => {
    try {
        const destinations = await db.Destination.findAll({ where: { continent: req.params.continent }, order: [['nom', 'ASC']] });
        res.json(destinations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.findOne = async (req, res) => {
    try {
        const destination = await db.Destination.findByPk(req.params.id, {
            include: [{ model: db.Voyage, as: 'voyages' }, { model: db.Hebergement, as: 'hebergements' }, { model: db.Activite, as: 'activites' }]
        });
        if (!destination) return res.status(404).json({ error: 'Destination non trouvée' });
        res.json(destination);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.findVoyages = async (req, res) => {
    try {
        const destination = await db.Destination.findByPk(req.params.id);
        if (!destination) return res.status(404).json({ error: 'Destination non trouvée' });
        const voyages = await db.Voyage.findAll({ where: { destinationId: req.params.id }, include: [{ model: db.Destination, as: 'destination' }] });
        res.json(voyages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
