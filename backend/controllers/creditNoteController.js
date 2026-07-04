const db = require('../config/db');

const createCreditNote = async (req, res) => {
    try {
        const { customer_id, amount, reason } = req.body;
        const [result] = await db.query('INSERT INTO credit_notes (customer_id, amount, reason) VALUES (?, ?, ?)', [customer_id, amount, reason]);
        res.json({ message: 'Credit Note created', id: result.insertId });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

const getCreditNotes = async (req, res) => {
    try {
        const [rows] = await db.query(`SELECT cn.*, c.name as customer_name FROM credit_notes cn JOIN customers c ON cn.customer_id = c.id ORDER BY cn.id DESC`);
        res.json(rows);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

module.exports = { createCreditNote, getCreditNotes };