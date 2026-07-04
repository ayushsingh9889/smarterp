import { useState, useEffect } from 'react'
import axios from 'axios'

function DebitNote() {
    const [suppliers, setSuppliers] = useState([])
    const [form, setForm] = useState({ supplier_id: '', amount: '', reason: '' })
    const [debitNotes, setDebitNotes] = useState([])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        const suppRes = await axios.get('http://localhost:5000/api/suppliers')
        const dnRes = await axios.get('http://localhost:5000/api/debitnotes')
        setSuppliers(suppRes.data)
        setDebitNotes(dnRes.data)
    }

    const handleSave = async () => {
        if (!form.supplier_id || !form.amount) { alert('Fill required fields'); return }
        await axios.post('http://localhost:5000/api/debitnotes', form)
        alert('Debit Note saved!')
        setForm({ supplier_id: '', amount: '', reason: '' })
        loadData()
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Debit Note</h1>
            <p className="text-gray-500 mb-4 text-sm">Purchase Return - Goods returned to supplier</p>

            <div className="bg-white p-6 rounded shadow mb-6">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Supplier *</label>
                        <select value={form.supplier_id} onChange={(e) => setForm({ ...form, supplier_id: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2">
                            <option value="">-- Select --</option>
                            {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
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
                <button onClick={handleSave} className="mt-4 bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-700">Save Debit Note</button>
            </div>

            <div className="bg-white rounded shadow overflow-hidden">
                <h2 className="text-lg font-bold px-6 py-3 border-b">Debit Notes</h2>
                <table className="w-full">
                    <thead className="bg-gray-50"><tr>
                        <th className="text-left px-6 py-2 text-xs">ID</th><th className="text-left px-6 py-2 text-xs">Supplier</th>
                        <th className="text-left px-6 py-2 text-xs">Amount</th><th className="text-left px-6 py-2 text-xs">Reason</th>
                        <th className="text-left px-6 py-2 text-xs">Date</th>
                    </tr></thead>
                    <tbody>
                        {debitNotes.map(dn => (
                            <tr key={dn.id}>
                                <td className="px-6 py-2 border-b text-sm">{dn.id}</td>
                                <td className="px-6 py-2 border-b text-sm">{dn.supplier_name}</td>
                                <td className="px-6 py-2 border-b text-sm font-medium text-green-600">₹{dn.amount}</td>
                                <td className="px-6 py-2 border-b text-sm">{dn.reason}</td>
                                <td className="px-6 py-2 border-b text-sm">{new Date(dn.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DebitNote