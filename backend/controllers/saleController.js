const db = require('../config/db');

const createSale = async (req, res) => {
    try {
        const { customer_id, items, payment_type, paid_amount } = req.body;
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
        const [saleResult] = await db.query(
            'INSERT INTO sales (customer_id, total_amount, cgst, sgst, payment_status, paid_amount) VALUES (?, ?, ?, ?, ?, ?)',
            [customer_id, grandTotal, totalCgst, totalSgst, paymentStatus, paid]
        );
        if (payment_type === 'Credit') {
            await db.query('UPDATE customers SET outstanding = outstanding + ? WHERE id = ?', [grandTotal - paid, customer_id]);
        }
        for (let item of items) {
            await db.query('INSERT INTO sale_items (sale_id, item_id, quantity, rate, amount) VALUES (?, ?, ?, ?, ?)',
                [saleResult.insertId, item.item_id, item.quantity, item.rate, item.quantity * item.rate]);
            await db.query('UPDATE items SET stock = stock - ? WHERE id = ?', [item.quantity, item.item_id]);
        }
        res.json({ message: 'Sale created', sale_id: saleResult.insertId });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

const getSales = async (req, res) => {
    try {
        const [sales] = await db.query(`SELECT s.*, c.name as customer_name FROM sales s JOIN customers c ON s.customer_id = c.id ORDER BY s.id DESC`);
        for (let sale of sales) {
            const [items] = await db.query(`SELECT si.*, i.item_name FROM sale_items si JOIN items i ON si.item_id = i.id WHERE si.sale_id = ?`, [sale.id]);
            sale.items = items;
        }
        res.json(sales);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

module.exports = { createSale, getSales };