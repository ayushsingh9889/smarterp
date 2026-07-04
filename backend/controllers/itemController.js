const db = require('../config/db');

const getItems = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM items ORDER BY id DESC');
        res.json(rows);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

const addItem = async (req, res) => {
    try {
        const { item_name, sku, hsn_code, price, purchase_price, gst_percentage, stock, opening_stock } = req.body;
        const [result] = await db.query(
            'INSERT INTO items (item_name, sku, hsn_code, price, purchase_price, gst_percentage, stock, opening_stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [item_name, sku, hsn_code, price, purchase_price, gst_percentage, stock, opening_stock]
        );
        res.json({ message: 'Item added', id: result.insertId });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { item_name, sku, hsn_code, price, purchase_price, gst_percentage, stock, opening_stock } = req.body;
        await db.query(
            'UPDATE items SET item_name=?, sku=?, hsn_code=?, price=?, purchase_price=?, gst_percentage=?, stock=?, opening_stock=? WHERE id=?',
            [item_name, sku, hsn_code, price, purchase_price, gst_percentage, stock, opening_stock, id]
        );
        res.json({ message: 'Item updated' });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM items WHERE id=?', [id]);
        res.json({ message: 'Item deleted' });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

module.exports = { getItems, addItem, updateItem, deleteItem };