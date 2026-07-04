const db = require('../config/db');

const createDebitNote = async (req, res) => {
    try {
        const { supplier_id, amount, reason } = req.body;
        const [result] = await db.query('INSERT INTO debit_notes (supplier_id, amount, reason) VALUES (?, ?, ?)', [supplier_id, amount, reason]);
        res.json({ message: 'Debit Note created', id: result.insertId });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

const getDebitNotes = async (req, res) => {
    try {
        const [rows] = await db.query(`SELECT dn.*, s.name as supplier_name FROM debit_notes dn JOIN suppliers s ON dn.supplier_id = s.id ORDER BY dn.id DESC`);
        res.json(rows);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

module.exports = { createDebitNote, getDebitNotes };