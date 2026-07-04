const db = require('../config/db');

const getCustomers = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM customers ORDER BY id DESC');
        res.json(rows);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

const addCustomer = async (req, res) => {
    try {
        const { name, phone, address } = req.body;
        const [result] = await db.query('INSERT INTO customers (name, phone, address) VALUES (?, ?, ?)', [name, phone, address]);
        res.json({ message: 'Customer added', id: result.insertId });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phone, address } = req.body;
        await db.query('UPDATE customers SET name=?, phone=?, address=? WHERE id=?', [name, phone, address, id]);
        res.json({ message: 'Customer updated' });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM customers WHERE id=?', [id]);
        res.json({ message: 'Customer deleted' });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

module.exports = { getCustomers, addCustomer, updateCustomer, deleteCustomer };