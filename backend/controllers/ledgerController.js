const db = require('../config/db');

const getLedgers = async (req, res) => {
    try {
        const [rows] = await db.query(`SELECT l.*, g.group_name, g.group_type FROM ledgers l JOIN groups_table g ON l.group_id = g.id ORDER BY l.id DESC`);
        res.json(rows);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

const addLedger = async (req, res) => {
    try {
        const { ledger_name, group_id, opening_balance } = req.body;
        const [result] = await db.query('INSERT INTO ledgers (ledger_name, group_id, opening_balance) VALUES (?, ?, ?)', [ledger_name, group_id, opening_balance]);
        res.json({ message: 'Ledger added', id: result.insertId });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

module.exports = { getLedgers, addLedger };