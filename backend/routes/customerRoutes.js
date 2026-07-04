const express = require('express');
const router = express.Router();
const { getCustomers, addCustomer, updateCustomer, deleteCustomer } = require('../controllers/customerController');

router.get('/', getCustomers);
router.post('/', addCustomer);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

module.exports = router;