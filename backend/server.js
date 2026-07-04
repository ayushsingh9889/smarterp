const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// All Routes (No Auth)
const customerRoutes = require('./routes/customerRoutes');
app.use('/api/customers', customerRoutes);

const supplierRoutes = require('./routes/supplierRoutes');
app.use('/api/suppliers', supplierRoutes);

const itemRoutes = require('./routes/itemRoutes');
app.use('/api/items', itemRoutes);

const saleRoutes = require('./routes/saleRoutes');
app.use('/api/sales', saleRoutes);

const purchaseRoutes = require('./routes/purchaseRoutes');
app.use('/api/purchases', purchaseRoutes);

const contraRoutes = require('./routes/contraRoutes');
app.use('/api/contras', contraRoutes);

const paymentRoutes = require('./routes/paymentRoutes');
app.use('/api/payments', paymentRoutes);

const receiptRoutes = require('./routes/receiptRoutes');
app.use('/api/receipts', receiptRoutes);

const journalRoutes = require('./routes/journalRoutes');
app.use('/api/journals', journalRoutes);

const creditNoteRoutes = require('./routes/creditNoteRoutes');
app.use('/api/creditnotes', creditNoteRoutes);

const debitNoteRoutes = require('./routes/debitNoteRoutes');
app.use('/api/debitnotes', debitNoteRoutes);

const groupRoutes = require('./routes/groupRoutes');
app.use('/api/groups', groupRoutes);

const ledgerRoutes = require('./routes/ledgerRoutes');
app.use('/api/ledgers', ledgerRoutes);

const stockGroupRoutes = require('./routes/stockGroupRoutes');
app.use('/api/stockgroups', stockGroupRoutes);

const unitRoutes = require('./routes/unitRoutes');
app.use('/api/units', unitRoutes);

app.get('/', (req, res) => res.send('SmartERP Backend Running'));

const db = require('./config/db');
app.get('/test-db', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT 1 + 1 AS solution');
        res.json({ message: 'Database connected', solution: rows[0].solution });
    } catch (error) {
        res.json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));