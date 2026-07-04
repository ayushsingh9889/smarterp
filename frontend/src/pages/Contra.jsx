import { useState, useEffect } from 'react'
import API from '../axiosInstance'

function Contra() {
    const [form, setForm] = useState({ from_account: 'Cash', to_account: 'Bank', amount: '', description: '' })
    const [contras, setContras] = useState([])

    useEffect(() => {
        loadContras()
    }, [])

    const loadContras = async () => {
        const res = await API.get('/contras')
        setContras(res.data)
    }

    const handleSave = async () => {
        if (!form.amount) {
            alert('Please enter amount')
            return
        }
        await API.post('/contras', form)
        alert('Contra entry saved!')
        setForm({ from_account: 'Cash', to_account: 'Bank', amount: '', description: '' })
        loadContras()
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Contra Voucher</h1>
            <p className="text-gray-500 mb-4 text-sm">Cash ↔ Bank Transfer</p>

            <div className="bg-white p-6 rounded shadow mb-6">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">From Account</label>
                        <select
                            value={form.from_account}
                            onChange={(e) => setForm({ ...form, from_account: e.target.value })}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        >
                            <option value="Cash">Cash</option>
                            <option value="Bank">Bank</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">To Account</label>
                        <select
                            value={form.to_account}
                            onChange={(e) => setForm({ ...form, to_account: e.target.value })}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        >
                            <option value="Bank">Bank</option>
                            <option value="Cash">Cash</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Amount *</label>
                        <input
                            type="number"
                            placeholder="Enter amount"
                            value={form.amount}
                            onChange={(e) => setForm({ ...form, amount: e.target.value })}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <input
                            type="text"
                            placeholder="Enter description"
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </div>
                </div>
                <button onClick={handleSave} className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Save Contra Entry</button>
            </div>

            <div className="bg-white rounded shadow overflow-hidden">
                <h2 className="text-lg font-bold px-6 py-3 border-b">Recent Contra Entries</h2>
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left px-6 py-2 text-xs">ID</th>
                            <th className="text-left px-6 py-2 text-xs">From</th>
                            <th className="text-left px-6 py-2 text-xs">To</th>
                            <th className="text-left px-6 py-2 text-xs">Amount</th>
                            <th className="text-left px-6 py-2 text-xs">Description</th>
                            <th className="text-left px-6 py-2 text-xs">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contras.map(c => (
                            <tr key={c.id}>
                                <td className="px-6 py-2 border-b text-sm">{c.id}</td>
                                <td className="px-6 py-2 border-b text-sm">{c.from_account}</td>
                                <td className="px-6 py-2 border-b text-sm">{c.to_account}</td>
                                <td className="px-6 py-2 border-b text-sm font-medium">₹{c.amount}</td>
                                <td className="px-6 py-2 border-b text-sm">{c.description}</td>
                                <td className="px-6 py-2 border-b text-sm">{new Date(c.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                        {contras.length === 0 && (
                            <tr><td colSpan="6" className="text-center py-6 text-gray-500">No entries yet</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Contra