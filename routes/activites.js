const express = require('express');
const router = express.Router();
const activiteController = require('../controllers/activiteController');

router.post('/', activiteController.create);
router.get('/', activiteController.findAll);

module.exports = router;
