const express = require('express');
const router = express.Router();
const doacaoController = require('../Controllers/doacaoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware.verificarToken, doacaoController.createDoacao);

router.get('/', doacaoController.getDoacoes);

router.get('/:id', doacaoController.getDoacaoById);

router.post('/', doacaoController.createDoacao);

router.put('/:id', doacaoController.updateDoacao);

router.delete('/:id', doacaoController.deleteDoacao);

module.exports = router;