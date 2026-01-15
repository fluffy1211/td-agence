const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const { validateEmail } = require('../middleware/validation');

router.post('/', validateEmail, clientController.create);
router.get('/', clientController.findAll);
router.get('/:id', clientController.findOne);
router.put('/:id', validateEmail, clientController.update);
router.delete('/:id', clientController.delete);

module.exports = router;
