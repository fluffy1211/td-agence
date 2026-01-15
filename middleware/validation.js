const validateEmail = (req, res, next) => {
    if (req.body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)) {
        return res.status(400).json({ error: 'Format email invalide' });
    }
    next();
};

const validateDates = (req, res, next) => {
    if (req.body.dateDepart && req.body.dateRetour) {
        if (new Date(req.body.dateRetour) <= new Date(req.body.dateDepart)) {
            return res.status(400).json({ error: 'dateRetour doit être après dateDepart' });
        }
    }
    next();
};

const validatePositivePrice = (req, res, next) => {
    if (req.body.prixBase && parseFloat(req.body.prixBase) <= 0) {
        return res.status(400).json({ error: 'Le prix doit être positif' });
    }
    next();
};

module.exports = { validateEmail, validateDates, validatePositivePrice };
