const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

router.post('/visit', analyticsController.logVisit);
router.get('/stats', analyticsController.getStats);

module.exports = router;
