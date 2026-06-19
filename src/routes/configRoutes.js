const express = require('express');
const router = express.Router();
const configController = require('../controllers/configController');

router.get('/', configController.getConfiguracoes);
router.get('/:id', configController.getConfiguracaoById);
router.post('/', configController.createConfiguracao);
router.put('/:id', configController.updateConfiguracao);
router.delete('/:id', configController.deleteConfiguracao);

module.exports = router;
