import { useState, useEffect } from 'react'
import API from '../axiosInstance'

function Sales() {
    const [customers, setCustomers] = useState([])
    const [items, setItems] = useState([])
    const [customerId, setCustomerId] = useState('')
    const [paymentType, setPaymentType] = useState('Cash')
    const [paidAmount, setPaidAmount] = useState('')
    const [saleItems, setSaleItems] = useState([{ item_id: '', quantity: 1, rate: 0, amount: 0 }])
    const [sales, setSales] = useState([])

    useEffect(() => { loadData() }, [])

    const loadData = async () => {
        const custRes = await API.get('/customers')
        const itemRes = await API.get('/items')
        const saleRes = await API.get('/sales')
        setCustomers(custRes.data)
        setItems(itemRes.data)
        setSales(saleRes.data)
    }

    const handleItemChange = (index, field, value) => {
        const newItems = [...saleItems]
        newItems[index][field] = value
        if (field === 'item_id' && value) {
            const selectedItem = items.find(i => i.id == value)
            newItems[index].rate = selectedItem ? selectedItem.price : 0
        }
        if (field === 'quantity' || field === 'rate') {
            const qty = parseFloat(newItems[index].quantity) || 0
            const rate = parseFloat(newItems[index].rate) || 0
            newItems[index].amount = qty * rate
        }
        setSaleItems(newItems)
    }

    const addItemRow = () => setSaleItems([...saleItems, { item_id: '', quantity: 1, rate: 0, amount: 0 }])
    const removeItemRow = (index) => {
        if (saleItems.length > 1) setSaleItems(saleItems.filter((_, i) => i !== index))
    }
    const getTotal = () => saleItems.reduce((sum, item) => sum + (item.amount || 0), 0)

    const handleSave = async () => {
        if (!customerId) { alert('Please select a customer'); return }
        const payload = {
            customer_id: customerId,
            items: saleItems.map(item => ({
                item_id: item.item_id,
                quantity: parseInt(item.quantity),
                rate: parseFloat(item.rate)
            })),
            payment_type: paymentType,
            paid_amount: paidAmount || 0
        }
        await API.post('/sales', payload)
        alert('Sale saved!')
        setCustomerId('')
        setPaymentType('Cash')
        setPaidAmount('')
        setSaleItems([{ item_id: '', quantity: 1, rate: 0, amount: 0 }])
        loadData()
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 no-print">Sales Voucher</h1>

            <div className="bg-white p-6 rounded shadow mb-4 no-print">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Select Customer *</label>
                        <select value={customerId} onChange={(e) => setCustomerId(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2">
                            <option value="">-- Select Customer --</option>
                            {customers.map(c => <option key={c.id} value={c.id}>{c.name} - {c.phone}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Payment Type *</label>
                        <select value={paymentType} onChange={(e) => setPaymentType(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2">
                            <option value="Cash">Cash Sale</option>
                            <option value="Credit">Credit Sale</option>
                        </select>
                    </div>
                </div>
                {paymentType === 'Credit' && (
                    <div className="mt-3">
                        <label className="block text-sm font-medium mb-2">Paid Amount</label>
                        <input type="number" placeholder="0" value={paidAmount} onChange={(e) => setPaidAmount(e.target.value)} className="w-full md:w-1/3 border border-gray-300 rounded px-3 py-2" />
                    </div>
                )}
            </div>

            <div className="bg-white rounded shadow overflow-hidden mb-4 no-print">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left px-4 py-3 border-b">Item</th>
                            <th className="text-left px-4 py-3 border-b">Quantity</th>
                            <th className="text-left px-4 py-3 border-b">Rate</th>
                            <th className="text-left px-4 py-3 border-b">Amount</th>
                            <th className="text-left px-4 py-3 border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {saleItems.map((item, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2 border-b">
                                    <select value={item.item_id} onChange={(e) => handleItemChange(index, 'item_id', e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1">
                                        <option value="">-- Select Item --</option>
                                        {items.map(i => <option key={i.id} value={i.id}>{i.item_name} (Stock: {i.stock})</option>)}
                                    </select>
                                </td>
                                <td className="px-4 py-2 border-b"><input type="number" value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', e.target.value)} className="w-20 border border-gray-300 rounded px-2 py-1" min="1" /></td>
                                <td className="px-4 py-2 border-b"><input type="number" value={item.rate} readOnly className="w-24 border border-gray-300 rounded px-2 py-1 bg-gray-50" /></td>
                                <td className="px-4 py-2 border-b font-medium">₹{item.amount.toFixed(2)}</td>
                                <td className="px-4 py-2 border-b"><button onClick={() => removeItemRow(index)} className="text-red-600 hover:underline text-sm">✕</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button onClick={addItemRow} className="mb-4 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 text-sm no-print">+ Add Item</button>

            <div className="bg-white p-6 rounded shadow flex justify-between items-center no-print">
                <h2 className="text-xl font-bold">Total: ₹{getTotal().toFixed(2)}</h2>
                <button onClick={handleSave} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 text-lg">Save Sale</button>
            </div>

            {/* Sales History with print */}
            <div className="mt-8" id="print-area">
                <h2 className="text-xl font-bold mb-4 print-title">Sales Invoice</h2>
                {sales.map(sale => (
                    <div key={sale.id} className="bg-white rounded shadow mb-4 overflow-hidden print-card">
                        <div className="bg-gray-50 px-6 py-3 flex justify-between items-center border-b print-header">
                            <div>
                                <span className="font-semibold text-gray-700">Invoice #: INV-{sale.id}</span>
                                <span className="mx-2 text-gray-400">|</span>
                                <span className="text-gray-600">👤 {sale.customer_name}</span>
                                <span className={`ml-2 px-2 py-0.5 rounded text-xs font-medium ${sale.payment_status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                    {sale.payment_status || 'Pending'}
                                </span>
                            </div>
                            <div className="flex items-center gap-3 no-print">
                                <button onClick={(e) => {
                                    document.querySelectorAll('#print-area > .print-card').forEach(el => el.style.display = 'none');
                                    e.target.closest('.print-card').style.display = 'block';
                                    window.print();
                                    setTimeout(() => document.querySelectorAll('#print-area > .print-card').forEach(el => el.style.display = ''), 500);
                                }} className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700">🖨️ Print PDF</button>
                                <div className="text-right">
                                    <p className="text-xs text-gray-500">{new Date(sale.created_at).toLocaleString()}</p>
                                    <p className="font-bold text-lg text-green-600">₹{sale.total_amount}</p>
                                    {(sale.cgst > 0 || sale.sgst > 0) && <p className="text-xs text-gray-400">CGST: ₹{sale.cgst || 0} | SGST: ₹{sale.sgst || 0}</p>}
                                    {sale.payment_status !== 'Paid' && <p className="text-xs text-red-500">Due: ₹{(sale.total_amount - (sale.paid_amount || 0)).toFixed(2)}</p>}
                                </div>
                            </div>
                            <div className="print-only-amount">
                                <p>Date: {new Date(sale.created_at).toLocaleDateString()}</p>
                                <p>Total: ₹{sale.total_amount}</p>
                            </div>
                        </div>
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="text-left px-6 py-2 text-xs">Item</th>
                                    <th className="text-left px-6 py-2 text-xs">Qty</th>
                                    <th className="text-left px-6 py-2 text-xs">Rate</th>
                                    <th className="text-left px-6 py-2 text-xs">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sale.items && sale.items.map(item => (
                                    <tr key={item.id}>
                                        <td className="px-6 py-2 border-b text-sm">{item.item_name}</td>
                                        <td className="px-6 py-2 border-b text-sm">{item.quantity}</td>
                                        <td className="px-6 py-2 border-b text-sm">₹{item.rate}</td>
                                        <td className="px-6 py-2 border-b text-sm font-medium">₹{item.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {(sale.cgst > 0 || sale.sgst > 0) && (
                            <div className="px-6 py-2 bg-gray-50 border-t text-xs text-gray-600">
                                <span className="mr-4">CGST: ₹{sale.cgst || 0}</span>
                                <span className="mr-4">SGST: ₹{sale.sgst || 0}</span>
                                <span className="font-bold">Grand Total: ₹{sale.total_amount}</span>
                            </div>
                        )}
                    </div>
                ))}
                {sales.length === 0 && <p className="text-gray-500 text-center py-8">No sales yet.</p>}
            </div>
        </div>
    )
}

export default Sales