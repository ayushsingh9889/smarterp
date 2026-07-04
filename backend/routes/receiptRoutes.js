const express = require('express');
const router = express.Router();
const { createReceipt, getReceipts } = require('../controllers/receiptController');

router.get('/', getReceipts);
router.post('/', createReceipt);

module.exports = router;