const db = require('../models');

exports.create = async (req, res) => {
    try {
        const client = await db.Client.create(req.body);
        res.status(201).json(client);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.findAll = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const { count, rows } = await db.Client.findAndCountAll({ limit, offset, order: [['createdAt', 'DESC']] });
        res.json({ clients: rows, totalClients: count, currentPage: page, totalPages: Math.ceil(count / limit) });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.findOne = async (req, res) => {
    try {
        const client = await db.Client.findByPk(req.params.id, {
            include: [{ model: db.Reservation, as: 'reservations', include: [{ model: db.Voyage, as: 'voyage' }] }]
        });
        if (!client) return res.status(404).json({ error: 'Client non trouvé' });
        res.json(client);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const client = await db.Client.findByPk(req.params.id);
        if (!client) return res.status(404).json({ error: 'Client non trouvé' });
        await client.update(req.body);
        res.json(client);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const client = await db.Client.findByPk(req.params.id);
        if (!client) return res.status(404).json({ error: 'Client non trouvé' });
        await client.destroy();
        res.json({ message: 'Client supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
