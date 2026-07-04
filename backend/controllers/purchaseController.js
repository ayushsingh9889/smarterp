const db = require('../config/db');

const createPurchase = async (req, res) => {
    try {
        const { supplier_id, items, payment_type, paid_amount } = req.body;
        let total = 0, totalCgst = 0, totalSgst = 0;
        for (let item of items) {
            const [itemData] = await db.query('SELECT * FROM items WHERE id = ?', [item.item_id]);
            const gstRate = itemData[0].gst_percentage / 2;
            const amount = item.quantity * item.rate;
            const cgst = (amount * gstRate) / 100;
            const sgst = (amount * gstRate) / 100;
            total += amount; totalCgst += cgst; totalSgst += sgst;
        }
        const grandTotal = total + totalCgst + totalSgst;
        const paymentStatus = payment_type === 'Cash' ? 'Paid' : 'Pending';
        const paid = payment_type === 'Cash' ? grandTotal : (paid_amount || 0);
        const [purchaseResult] = await db.query(
            'INSERT INTO purchases (supplier_id, total_amount, cgst, sgst, payment_status, paid_amount) VALUES (?, ?, ?, ?, ?, ?)',
            [supplier_id, grandTotal, totalCgst, totalSgst, paymentStatus, paid]
        );
        if (payment_type === 'Credit') {
            await db.query('UPDATE suppliers SET outstanding = outstanding + ? WHERE id = ?', [grandTotal - paid, supplier_id]);
        }
        for (let item of items) {
            await db.query('INSERT INTO purchase_items (purchase_id, item_id, quantity, rate, amount) VALUES (?, ?, ?, ?, ?)',
                [purchaseResult.insertId, item.item_id, item.quantity, item.rate, item.quantity * item.rate]);
            await db.query('UPDATE items SET stock = stock + ? WHERE id = ?', [item.quantity, item.item_id]);
        }
        res.json({ message: 'Purchase created', purchase_id: purchaseResult.insertId });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

const getPurchases = async (req, res) => {
    try {
        const [rows] = await db.query(`SELECT p.*, s.name as supplier_name FROM purchases p JOIN suppliers s ON p.supplier_id = s.id ORDER BY p.id DESC`);
        res.json(rows);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

module.exports = { createPurchase, getPurchases };