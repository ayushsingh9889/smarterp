import { useState, useEffect } from 'react'
import axios from 'axios'

function StockReport() {
    const [items, setItems] = useState([])
    const [totalValue, setTotalValue] = useState(0)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        const res = await axios.get('http://localhost:5000/api/items')
        setItems(res.data)
        const value = res.data.reduce((sum, item) => sum + (item.stock * item.price), 0)
        setTotalValue(value)
    }

    const totalStock = items.reduce((sum, i) => sum + i.stock, 0)

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">📊 Stock Report</h1>

            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded shadow text-center">
                    <p className="text-2xl font-bold text-blue-600">{items.length}</p>
                    <p className="text-xs text-gray-500">Total Items</p>
                </div>
                <div className="bg-white p-4 rounded shadow text-center">
                    <p className="text-2xl font-bold text-green-600">{totalStock}</p>
                    <p className="text-xs text-gray-500">Total Quantity</p>
                </div>
                <div className="bg-white p-4 rounded shadow text-center">
                    <p className="text-2xl font-bold text-purple-600">₹{totalValue.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">Inventory Value</p>
                </div>
            </div>

            <div className="bg-white rounded shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left px-4 py-3 text-xs">Item</th>
                            <th className="text-left px-4 py-3 text-xs">SKU</th>
                            <th className="text-left px-4 py-3 text-xs">Sell Price</th>
                            <th className="text-left px-4 py-3 text-xs">Purchase</th>
                            <th className="text-left px-4 py-3 text-xs">Stock Qty</th>
                            <th className="text-left px-4 py-3 text-xs">Stock Value</th>
                            <th className="text-left px-4 py-3 text-xs">Profit/Item</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id}>
                                <td className="px-4 py-3 border-b font-medium">{item.item_name}</td>
                                <td className="px-4 py-3 border-b text-xs text-gray-500">{item.sku || '-'}</td>
                                <td className="px-4 py-3 border-b">₹{item.price}</td>
                                <td className="px-4 py-3 border-b">₹{item.purchase_price || '-'}</td>
                                <td className="px-4 py-3 border-b">{item.stock}</td>
                                <td className="px-4 py-3 border-b font-medium">₹{(item.stock * item.price).toFixed(2)}</td>
                                <td className={`px-4 py-3 border-b font-medium ${item.purchase_price && item.price > item.purchase_price ? 'text-green-600' : 'text-gray-400'}`}>
                                    {item.purchase_price ? `₹${(item.price - item.purchase_price).toFixed(2)}` : '-'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default StockReport