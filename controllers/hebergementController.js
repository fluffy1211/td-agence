const db = require('../models');

exports.create = async (req, res) => {
    try {
        const hebergement = await db.Hebergement.create(req.body);
        res.status(201).json(hebergement);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.findAll = async (req, res) => {
    try {
        const hebergements = await db.Hebergement.findAll({ include: [{ model: db.Destination, as: 'destination' }] });
        res.json(hebergements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
