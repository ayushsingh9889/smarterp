import { useState, useEffect } from 'react'
import axios from 'axios'

function CreditNote() {
    const [customers, setCustomers] = useState([])
    const [form, setForm] = useState({ customer_id: '', amount: '', reason: '' })
    const [creditNotes, setCreditNotes] = useState([])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        const custRes = await axios.get('http://localhost:5000/api/customers')
        const cnRes = await axios.get('http://localhost:5000/api/creditnotes')
        setCustomers(custRes.data)
        setCreditNotes(cnRes.data)
    }

    const handleSave = async () => {
        if (!form.customer_id || !form.amount) { alert('Fill required fields'); return }
        await axios.post('http://localhost:5000/api/creditnotes', form)
        alert('Credit Note saved!')
        setForm({ customer_id: '', amount: '', reason: '' })
        loadData()
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Credit Note</h1>
            <p className="text-gray-500 mb-4 text-sm">Sales Return - Customer returned goods</p>

            <div className="bg-white p-6 rounded shadow mb-6">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Customer *</label>
                        <select value={form.customer_id} onChange={(e) => setForm({ ...form, customer_id: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2">
                            <option value="">-- Select --</option>
                            {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Amount *</label>
                        <input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2" />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium mb-1">Reason</label>
                        <input type="text" value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2" />
                    </div>
                </div>
                <button onClick={handleSave} className="mt-4 bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700">Save Credit Note</button>
            </div>

            <div className="bg-white rounded shadow overflow-hidden">
                <h2 className="text-lg font-bold px-6 py-3 border-b">Credit Notes</h2>
                <table className="w-full">
                    <thead className="bg-gray-50"><tr>
                        <th className="text-left px-6 py-2 text-xs">ID</th><th className="text-left px-6 py-2 text-xs">Customer</th>
                        <th className="text-left px-6 py-2 text-xs">Amount</th><th className="text-left px-6 py-2 text-xs">Reason</th>
                        <th className="text-left px-6 py-2 text-xs">Date</th>
                    </tr></thead>
                    <tbody>
                        {creditNotes.map(cn => (
                            <tr key={cn.id}>
                                <td className="px-6 py-2 border-b text-sm">{cn.id}</td>
                                <td className="px-6 py-2 border-b text-sm">{cn.customer_name}</td>
                                <td className="px-6 py-2 border-b text-sm font-medium text-red-600">₹{cn.amount}</td>
                                <td className="px-6 py-2 border-b text-sm">{cn.reason}</td>
                                <td className="px-6 py-2 border-b text-sm">{new Date(cn.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CreditNote