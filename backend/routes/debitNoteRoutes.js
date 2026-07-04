const express = require('express');
const router = express.Router();
const { createDebitNote, getDebitNotes } = require('../controllers/debitNoteController');

router.get('/', getDebitNotes);
router.post('/', createDebitNote);

module.exports = router;