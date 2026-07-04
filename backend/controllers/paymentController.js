const db = require('../config/db');

const createPayment = async (req, res) => {
    try {
        const { paid_to, amount, payment_mode, description } = req.body;
        const [result] = await db.query('INSERT INTO payment_vouchers (paid_to, amount, payment_mode, description) VALUES (?, ?, ?, ?)', [paid_to, amount, payment_mode, description]);
        res.json({ message: 'Payment recorded', id: result.insertId });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

const getPayments = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM payment_vouchers ORDER BY id DESC');
        res.json(rows);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

module.exports = { createPayment, getPayments };