const express = require('express');
const router = express.Router();
const { createCreditNote, getCreditNotes } = require('../controllers/creditNoteController');

router.get('/', getCreditNotes);
router.post('/', createCreditNote);

module.exports = router;