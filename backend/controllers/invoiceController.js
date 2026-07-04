const db = require('../config/db');
const PDFDocument = require('pdfkit');

const generateInvoice = async (req, res) => {
    try {
        const { sale_id } = req.params;

        const [sales] = await db.query(`
            SELECT s.*, c.name as customer_name, c.address as customer_address, c.phone as customer_phone
            FROM sales s
            JOIN customers c ON s.customer_id = c.id
            WHERE s.id = ?
        `, [sale_id]);

        if (sales.length === 0) return res.status(404).json({ error: 'Sale not found' });

        const sale = sales[0];

        const [items] = await db.query(`
            SELECT si.*, i.item_name
            FROM sale_items si
            JOIN items i ON si.item_id = i.id
            WHERE si.sale_id = ?
        `, [sale_id]);

        const doc = new PDFDocument({ margin: 50 });
        res.setHeader('Content-Disposition', `attachment; filename="invoice-${sale_id}.pdf"`);
        res.setHeader('Content-Type', 'application/pdf');
        doc.pipe(res);

        doc.fontSize(20).font('Helvetica-Bold').text('SmartERP', { align: 'center' });
        doc.fontSize(10).font('Helvetica').text('Tax Invoice', { align: 'center' });
        doc.moveDown();
        doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
        doc.moveDown();
        doc.fontSize(10).font('Helvetica-Bold');
        doc.text(`Invoice #: INV-${sale.id}`, { continued: true });
        doc.text(`Date: ${new Date(sale.created_at).toLocaleDateString()}`, { align: 'right' });
        doc.moveDown();
        doc.fontSize(9).font('Helvetica');
        doc.text(`Bill To: ${sale.customer_name}`);
        doc.moveDown();
        doc.fontSize(8).font('Helvetica-Bold');
        doc.text('Item', 50, doc.y, { width: 200 });
        doc.text('Qty', 250, doc.y - 10, { width: 50 });
        doc.text('Rate', 300, doc.y - 10, { width: 70 });
        doc.text('Amount', 400, doc.y - 10, { width: 100, align: 'right' });
        doc.moveDown(0.5);
        doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
        doc.moveDown(0.5);
        doc.font('Helvetica');
        items.forEach(item => {
            doc.text(item.item_name, 50, doc.y, { width: 200 });
            doc.text(item.quantity.toString(), 250, doc.y - 10, { width: 50 });
            doc.text(`Rs.${item.rate}`, 300, doc.y - 10, { width: 70 });
            doc.text(`Rs.${item.amount}`, 400, doc.y - 10, { width: 100, align: 'right' });
        });
        doc.moveDown();
        doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
        doc.moveDown(0.5);
        doc.font('Helvetica-Bold').fontSize(10);
        doc.text(`Total: Rs.${sale.total_amount}`, { align: 'right' });

        doc.end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { generateInvoice };