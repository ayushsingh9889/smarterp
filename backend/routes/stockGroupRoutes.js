const express = require('express');
const router = express.Router();
const { getStockGroups, addStockGroup } = require('../controllers/stockGroupController');

router.get('/', getStockGroups);
router.post('/', addStockGroup);

module.exports = router;