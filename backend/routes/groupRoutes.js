const express = require('express');
const router = express.Router();
const { getGroups, addGroup } = require('../controllers/groupController');

router.get('/', getGroups);
router.post('/', addGroup);

module.exports = router;