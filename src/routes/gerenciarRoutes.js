const express = require('express');
const router = express.Router();
const gerenciarController = require('../controllers/gerenciarController');

router.get('/', gerenciarController.getGerenciars);
router.get('/:id', gerenciarController.getGerenciarById);
router.post('/', gerenciarController.createGerenciar);
router.put('/:id', gerenciarController.updateGerenciar);
router.delete('/:id', gerenciarController.deleteGerenciar);

module.exports = router;
