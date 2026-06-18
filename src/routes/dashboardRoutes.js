const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/ranking', dashboardController.getRanking);

module.exports = router;