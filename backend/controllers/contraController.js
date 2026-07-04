const db = require('../config/db');

const createContra = async (req, res) => {
    try {
        const { from_account, to_account, amount, description } = req.body;
        const [result] = await db.query('INSERT INTO contra_vouchers (from_account, to_account, amount, description) VALUES (?, ?, ?, ?)', [from_account, to_account, amount, description]);
        res.json({ message: 'Contra entry created', id: result.insertId });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

const getContras = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM contra_vouchers ORDER BY id DESC');
        res.json(rows);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

module.exports = { createContra, getContras };