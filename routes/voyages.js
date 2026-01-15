const express = require('express');
const router = express.Router();
const voyageController = require('../controllers/voyageController');
const { validateDates, validatePositivePrice } = require('../middleware/validation');

router.get('/prochains', voyageController.findProchains);
router.post('/', validateDates, validatePositivePrice, voyageController.create);
router.get('/', voyageController.findAll);
router.get('/:id', voyageController.findOne);
router.post('/:id/reserver', voyageController.reserver);

module.exports = router;
