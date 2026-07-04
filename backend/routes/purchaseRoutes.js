const express = require('express');
const router = express.Router();
const { createPurchase, getPurchases } = require('../controllers/purchaseController');

router.get('/', getPurchases);
router.post('/', createPurchase);

module.exports = router;