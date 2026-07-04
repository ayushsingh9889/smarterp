const express = require('express');
const router = express.Router();
const { generateInvoice } = require('../controllers/invoiceController');

router.get('/:sale_id', generateInvoice);

module.exports = router;