const db = require('../config/db');

const getGroups = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM groups_table ORDER BY id');
        res.json(rows);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

const addGroup = async (req, res) => {
    try {
        const { group_name, group_type } = req.body;
        const [result] = await db.query('INSERT INTO groups_table (group_name, group_type) VALUES (?, ?)', [group_name, group_type]);
        res.json({ message: 'Group added', id: result.insertId });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

module.exports = { getGroups, addGroup };