const express = require('express');
const router = express.Router();
const { createPayment, getPayments } = require('../controllers/paymentController');

router.get('/', getPayments);
router.post('/', createPayment);

module.exports = router;