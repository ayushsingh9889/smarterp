const express = require('express');
const router = express.Router();
const { getUnits, addUnit } = require('../controllers/unitController');

router.get('/', getUnits);
router.post('/', addUnit);

module.exports = router;