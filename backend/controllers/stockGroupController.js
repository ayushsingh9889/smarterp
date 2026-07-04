const db = require('../config/db');

const getStockGroups = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM stock_groups ORDER BY id');
        res.json(rows);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

const addStockGroup = async (req, res) => {
    try {
        const { group_name } = req.body;
        const [result] = await db.query('INSERT INTO stock_groups (group_name) VALUES (?)', [group_name]);
        res.json({ message: 'Stock group added', id: result.insertId });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

module.exports = { getStockGroups, addStockGroup };