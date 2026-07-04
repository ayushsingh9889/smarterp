const express = require('express');
const router = express.Router();
const { createJournal, getJournals } = require('../controllers/journalController');

router.get('/', getJournals);
router.post('/', createJournal);

module.exports = router;