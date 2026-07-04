import { useState, useEffect } from 'react'
import API from '../axiosInstance'

function Items() {
    const [items, setItems] = useState([])
    const [form, setForm] = useState({
        item_name: '', sku: '', hsn_code: '', price: '',
        purchase_price: '', gst_percentage: '18', stock: '', opening_stock: ''
    })
    const [editingId, setEditingId] = useState(null)
    const [showForm, setShowForm] = useState(false)

    useEffect(() => { loadItems() }, [])

    const loadItems = async () => {
        const res = await API.get('/items')
        setItems(res.data)
    }

    const handleSave = async () => {
        if (editingId) {
            await API.put(`/items/${editingId}`, form)
        } else {
            await API.post('/items', form)
        }
        setForm({ item_name: '', sku: '', hsn_code: '', price: '', purchase_price: '', gst_percentage: '18', stock: '', opening_stock: '' })
        setEditingId(null)
        setShowForm(false)
        loadItems()
    }

    const handleEdit = (item) => {
        setForm({
            item_name: item.item_name, sku: item.sku || '', hsn_code: item.hsn_code || '',
            price: item.price, purchase_price: item.purchase_price || '',
            gst_percentage: item.gst_percentage || '18', stock: item.stock, opening_stock: item.opening_stock || ''
        })
        setEditingId(item.id)
        setShowForm(true)
    }

    const handleDelete = async (id) => {
        if (window.confirm('Delete this item?')) {
            await API.delete(`/items/${id}`)
            loadItems()
        }
    }

    const getProfit = (item) => {
        if (item.purchase_price && item.price) return (item.price - item.purchase_price).toFixed(2)
        return '-'
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-900">Items</h1>
                <button onClick={() => {
                    setForm({ item_name: '', sku: '', hsn_code: '', price: '', purchase_price: '', gst_percentage: '18', stock: '', opening_stock: '' })
                    setEditingId(null); setShowForm(!showForm)
                }} className="btn btn-primary">
                    {showForm ? 'Cancel' : '+ Add Item'}
                </button>
            </div>

            {showForm && (
                <div className="card mb-6 animate-fade-in">
                    <h2 className="text-lg font-semibold mb-4">{editingId ? 'Edit Item' : 'Add Item'}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div><label className="block text-sm font-medium text-gray-700 mb-1">Item Name *</label>
                            <input type="text" placeholder="Item name" value={form.item_name} onChange={(e) => setForm({ ...form, item_name: e.target.value })} className="input-field" /></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                            <input type="text" placeholder="SKU" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} className="input-field" /></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-1">HSN</label>
                            <input type="text" placeholder="HSN code" value={form.hsn_code} onChange={(e) => setForm({ ...form, hsn_code: e.target.value })} className="input-field" /></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-1">Selling Price *</label>
                            <input type="number" placeholder="Selling price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="input-field" /></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-1">Purchase Price</label>
                            <input type="number" placeholder="Purchase price" value={form.purchase_price} onChange={(e) => setForm({ ...form, purchase_price: e.target.value })} className="input-field" /></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-1">GST %</label>
                            <input type="number" placeholder="18" value={form.gst_percentage} onChange={(e) => setForm({ ...form, gst_percentage: e.target.value })} className="input-field" /></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-1">Opening Stock</label>
                            <input type="number" placeholder="0" value={form.opening_stock} onChange={(e) => setForm({ ...form, opening_stock: e.target.value })} className="input-field" /></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-1">Current Stock *</label>
                            <input type="number" placeholder="Current stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="input-field" /></div>
                    </div>
                    <button onClick={handleSave} className="btn btn-primary mt-4">{editingId ? 'Update' : 'Save'}</button>
                </div>
            )}

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th><th>Item</th><th>SKU</th><th>HSN</th><th>Sell ₹</th><th>Purchase ₹</th><th>Profit</th><th>GST%</th><th>Opening</th><th>Stock</th><th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td><td className="font-medium">{item.item_name}</td><td>{item.sku || '-'}</td><td>{item.hsn_code || '-'}</td>
                                <td>₹{item.price}</td><td>₹{item.purchase_price || '-'}</td>
                                <td className={getProfit(item) > 0 ? 'text-green-600' : ''}>{getProfit(item) !== '-' ? `₹${getProfit(item)}` : '-'}</td>
                                <td>{item.gst_percentage || '18'}%</td><td>{item.opening_stock || 0}</td><td>{item.stock}</td>
                                <td>
                                    <button onClick={() => handleEdit(item)} className="text-indigo-600 hover:underline mr-2">Edit</button>
                                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Items