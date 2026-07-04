const db = require('../config/db');

const getSuppliers = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM suppliers ORDER BY id DESC');
        res.json(rows);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

const addSupplier = async (req, res) => {
    try {
        const { name, phone, address } = req.body;
        const [result] = await db.query('INSERT INTO suppliers (name, phone, address) VALUES (?, ?, ?)', [name, phone, address]);
        res.json({ message: 'Supplier added', id: result.insertId });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

const updateSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phone, address } = req.body;
        await db.query('UPDATE suppliers SET name=?, phone=?, address=? WHERE id=?', [name, phone, address, id]);
        res.json({ message: 'Supplier updated' });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

const deleteSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM suppliers WHERE id=?', [id]);
        res.json({ message: 'Supplier deleted' });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

module.exports = { getSuppliers, addSupplier, updateSupplier, deleteSupplier };