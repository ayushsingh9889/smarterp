const express = require('express');
const router = express.Router();
const { getLedgers, addLedger } = require('../controllers/ledgerController');

router.get('/', getLedgers);
router.post('/', addLedger);

module.exports = router;