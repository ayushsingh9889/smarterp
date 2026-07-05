import { useState, useEffect } from 'react'
import API from '../axiosInstance'

function Inventory() {
  const [items, setItems] = useState([])
  const [sales, setSales] = useState([])
  const [purchases, setPurchases] = useState([])
  const [activeTab, setActiveTab] = useState('stock')

  useEffect(() => { loadData() }, [])

  const loadData = async () => {
    const itemRes = await API.get('/items')
    const saleRes = await API.get('/sales')
    const purchaseRes = await API.get('/purchases')
    setItems(itemRes.data)
    setSales(saleRes.data)
    setPurchases(purchaseRes.data)
  }

  const totalStock = items.reduce((sum, i) => sum + (i.stock || 0), 0)
  const lowStock = items.filter(i => i.stock < 10)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">📦 Inventory Management</h1>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow text-center"><p className="text-2xl font-bold text-blue-600">{items.length}</p><p className="text-xs text-gray-500">Total Items</p></div>
        <div className="bg-white p-4 rounded shadow text-center"><p className="text-2xl font-bold text-green-600">{totalStock}</p><p className="text-xs text-gray-500">Total Stock</p></div>
        <div className="bg-white p-4 rounded shadow text-center"><p className="text-2xl font-bold text-red-600">{lowStock.length}</p><p className="text-xs text-gray-500">Low Stock</p></div>
        <div className="bg-white p-4 rounded shadow text-center"><p className="text-2xl font-bold text-purple-600">{sales.length + purchases.length}</p><p className="text-xs text-gray-500">Transactions</p></div>
      </div>

      <div className="flex gap-2 mb-4">
        {['stock', 'sales', 'purchases'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded text-sm font-medium capitalize ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>{tab}</button>
        ))}
      </div>

      {activeTab === 'stock' && (
        <div className="bg-white rounded shadow overflow-hidden">
          <table className="w-full"><thead className="bg-gray-50"><tr><th className="text-left px-6 py-3 text-xs">Item</th><th className="text-left px-6 py-3 text-xs">Price</th><th className="text-left px-6 py-3 text-xs">Stock</th><th className="text-left px-6 py-3 text-xs">Status</th></tr></thead>
            <tbody>{items.map(item => (
              <tr key={item.id}><td className="px-6 py-3 border-b text-sm font-medium">{item.item_name}</td><td className="px-6 py-3 border-b text-sm">₹{item.price}</td><td className="px-6 py-3 border-b text-sm">{item.stock}</td>
                <td className="px-6 py-3 border-b text-sm"><span className={`px-2 py-1 rounded text-xs font-medium ${item.stock > 20 ? 'bg-green-100 text-green-700' : item.stock > 10 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{item.stock > 20 ? 'In Stock' : item.stock > 10 ? 'Low' : 'Critical'}</span></td></tr>
            ))}</tbody></table>
        </div>
      )}

      {activeTab === 'sales' && (
        <div className="bg-white rounded shadow overflow-hidden">
          <table className="w-full"><thead className="bg-gray-50"><tr><th className="text-left px-6 py-3 text-xs">ID</th><th className="text-left px-6 py-3 text-xs">Customer</th><th className="text-left px-6 py-3 text-xs">Amount</th><th className="text-left px-6 py-3 text-xs">Date</th></tr></thead>
            <tbody>{sales.map(s => (<tr key={s.id}><td className="px-6 py-3 border-b text-sm">{s.id}</td><td className="px-6 py-3 border-b text-sm">{s.customer_name}</td><td className="px-6 py-3 border-b text-sm text-red-600">₹{s.total_amount}</td><td className="px-6 py-3 border-b text-sm">{new Date(s.created_at).toLocaleDateString()}</td></tr>))}</tbody></table>
        </div>
      )}

      {activeTab === 'purchases' && (
        <div className="bg-white rounded shadow overflow-hidden">
          <table className="w-full"><thead className="bg-gray-50"><tr><th className="text-left px-6 py-3 text-xs">ID</th><th className="text-left px-6 py-3 text-xs">Supplier</th><th className="text-left px-6 py-3 text-xs">Amount</th><th className="text-left px-6 py-3 text-xs">Date</th></tr></thead>
            <tbody>{purchases.map(p => (<tr key={p.id}><td className="px-6 py-3 border-b text-sm">{p.id}</td><td className="px-6 py-3 border-b text-sm">{p.supplier_name}</td><td className="px-6 py-3 border-b text-sm text-green-600">₹{p.total_amount}</td><td className="px-6 py-3 border-b text-sm">{new Date(p.created_at).toLocaleDateString()}</td></tr>))}</tbody></table>
        </div>
      )}
    </div>
  )
}

export default Inventory
