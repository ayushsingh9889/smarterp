import { useState, useEffect } from 'react'
import API from '../axiosInstance'

function Purchase() {
    const [suppliers, setSuppliers] = useState([])
    const [items, setItems] = useState([])
    const [supplierId, setSupplierId] = useState('')
    const [paymentType, setPaymentType] = useState('Cash')
    const [paidAmount, setPaidAmount] = useState('')
    const [purchaseItems, setPurchaseItems] = useState([{ item_id: '', quantity: 1, rate: 0, amount: 0 }])
    const [purchases, setPurchases] = useState([])

    useEffect(() => { loadData() }, [])

    const loadData = async () => {
        const suppRes = await API.get('/suppliers')
        const itemRes = await API.get('/items')
        const purchaseRes = await API.get('/purchases')
        setSuppliers(suppRes.data)
        setItems(itemRes.data)
        setPurchases(purchaseRes.data)
    }

    const handleItemChange = (index, field, value) => {
        const newItems = [...purchaseItems]
        newItems[index][field] = value
        if (field === 'item_id' && value) {
            const selectedItem = items.find(i => i.id == value)
            newItems[index].rate = selectedItem ? selectedItem.purchase_price || selectedItem.price : 0
        }
        if (field === 'quantity' || field === 'rate') {
            newItems[index].amount = (newItems[index].quantity || 0) * (newItems[index].rate || 0)
        }
        setPurchaseItems(newItems)
    }

    const addItemRow = () => setPurchaseItems([...purchaseItems, { item_id: '', quantity: 1, rate: 0, amount: 0 }])
    const removeItemRow = (index) => {
        if (purchaseItems.length > 1) setPurchaseItems(purchaseItems.filter((_, i) => i !== index))
    }
    const getTotal = () => purchaseItems.reduce((sum, item) => sum + (item.amount || 0), 0)

    const handleSave = async () => {
        if (!supplierId) { alert('Please select a supplier'); return }
        const payload = {
            supplier_id: supplierId,
            items: purchaseItems.map(item => ({
                item_id: item.item_id,
                quantity: parseInt(item.quantity),
                rate: parseFloat(item.rate)
            })),
            payment_type: paymentType,
            paid_amount: paidAmount || 0
        }
        await API.post('/purchases', payload)
        alert('Purchase saved!')
        setSupplierId('')
        setPaymentType('Cash')
        setPaidAmount('')
        setPurchaseItems([{ item_id: '', quantity: 1, rate: 0, amount: 0 }])
        loadData()
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Purchase Voucher</h1>

            <div className="bg-white p-6 rounded shadow mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Select Supplier *</label>
                        <select value={supplierId} onChange={(e) => setSupplierId(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2">
                            <option value="">-- Select Supplier --</option>
                            {suppliers.map(s => <option key={s.id} value={s.id}>{s.name} - {s.phone}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Payment Type *</label>
                        <select value={paymentType} onChange={(e) => setPaymentType(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2">
                            <option value="Cash">Cash Purchase</option>
                            <option value="Credit">Credit Purchase</option>
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

            <div className="bg-white rounded shadow overflow-hidden mb-4">
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
                        {purchaseItems.map((item, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2 border-b">
                                    <select value={item.item_id} onChange={(e) => handleItemChange(index, 'item_id', e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1">
                                        <option value="">-- Select Item --</option>
                                        {items.map(i => <option key={i.id} value={i.id}>{i.item_name} (Stock: {i.stock})</option>)}
                                    </select>
                                </td>
                                <td className="px-4 py-2 border-b"><input type="number" value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', e.target.value)} className="w-20 border border-gray-300 rounded px-2 py-1" min="1" /></td>
                                <td className="px-4 py-2 border-b"><input type="number" value={item.rate} readOnly className="w-24 border border-gray-300 rounded px-2 py-1 bg-gray-50" /></td>
                                <td className="px-4 py-2 border-b font-medium">₹{(item.amount || 0).toFixed(2)}</td>
                                <td className="px-4 py-2 border-b"><button onClick={() => removeItemRow(index)} className="text-red-600 hover:underline text-sm">✕</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button onClick={addItemRow} className="mb-4 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 text-sm">+ Add Item</button>

            <div className="bg-white p-6 rounded shadow flex justify-between items-center">
                <h2 className="text-xl font-bold">Total: ₹{getTotal().toFixed(2)}</h2>
                <button onClick={handleSave} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 text-lg">Save Purchase</button>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Recent Purchases</h2>
                <div className="bg-white rounded shadow overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr><th className="text-left px-4 py-3 border-b">ID</th><th className="text-left px-4 py-3 border-b">Supplier</th><th className="text-left px-4 py-3 border-b">Status</th><th className="text-left px-4 py-3 border-b">Amount</th><th className="text-left px-4 py-3 border-b">Date</th></tr>
                        </thead>
                        <tbody>
                            {purchases.map(p => (
                                <tr key={p.id}>
                                    <td className="px-4 py-3 border-b">{p.id}</td>
                                    <td className="px-4 py-3 border-b">{p.supplier_name}</td>
                                    <td className="px-4 py-3 border-b">
                                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${p.payment_status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {p.payment_status || 'Pending'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 border-b font-medium">₹{p.total_amount}</td>
                                    <td className="px-4 py-3 border-b">{new Date(p.created_at).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Purchase