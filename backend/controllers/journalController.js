const db = require('../config/db');

const createJournal = async (req, res) => {
    try {
        const { debit_account, credit_account, amount, description } = req.body;
        const [result] = await db.query('INSERT INTO journal_vouchers (debit_account, credit_account, amount, description) VALUES (?, ?, ?, ?)', [debit_account, credit_account, amount, description]);
        res.json({ message: 'Journal entry created', id: result.insertId });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

const getJournals = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM journal_vouchers ORDER BY id DESC');
        res.json(rows);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

module.exports = { createJournal, getJournals };