const db = require('../config/db');

const createReceipt = async (req, res) => {
    try {
        const { received_from, amount, payment_mode, description } = req.body;
        const [result] = await db.query('INSERT INTO receipt_vouchers (received_from, amount, payment_mode, description) VALUES (?, ?, ?, ?)', [received_from, amount, payment_mode, description]);
        res.json({ message: 'Receipt recorded', id: result.insertId });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

const getReceipts = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM receipt_vouchers ORDER BY id DESC');
        res.json(rows);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

module.exports = { createReceipt, getReceipts };