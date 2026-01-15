const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destinationController');

router.post('/', destinationController.create);
router.get('/', destinationController.findAll);
router.get('/continent/:continent', destinationController.findByContinent);
router.get('/:id', destinationController.findOne);
router.get('/:id/voyages', destinationController.findVoyages);

module.exports = router;
