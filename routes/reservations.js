const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

router.post('/', reservationController.create);
router.get('/client/:clientId', reservationController.findByClient);
router.get('/voyage/:voyageId', reservationController.findByVoyage);
router.put('/:id/annuler', reservationController.annuler);

module.exports = router;
