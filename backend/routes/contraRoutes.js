const express = require('express');
const router = express.Router();
const { createContra, getContras } = require('../controllers/contraController');

router.get('/', getContras);
router.post('/', createContra);

module.exports = router;