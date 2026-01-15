const express = require('express');
const router = express.Router();
const hebergementController = require('../controllers/hebergementController');

router.post('/', hebergementController.create);
router.get('/', hebergementController.findAll);

module.exports = router;
