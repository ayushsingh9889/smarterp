const db = require('../config/db');

const getUnits = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM units ORDER BY id');
        res.json(rows);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

const addUnit = async (req, res) => {
    try {
        const { unit_name } = req.body;
        const [result] = await db.query('INSERT INTO units (unit_name) VALUES (?)', [unit_name]);
        res.json({ message: 'Unit added', id: result.insertId });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

module.exports = { getUnits, addUnit };