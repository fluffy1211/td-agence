const db = require('../models');

exports.create = async (req, res) => {
    try {
        const activite = await db.Activite.create(req.body);
        res.status(201).json(activite);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.findAll = async (req, res) => {
    try {
        const activites = await db.Activite.findAll({ include: [{ model: db.Destination, as: 'destination' }] });
        res.json(activites);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
