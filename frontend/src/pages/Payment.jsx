import { useState, useEffect } from 'react'
import axios from 'axios'

function Payment() {
    const [form, setForm] = useState({ paid_to: '', amount: '', payment_mode: 'Cash', description: '' })
    const [payments, setPayments] = useState([])

    useEffect(() => { loadPayments() }, [])

    const loadPayments = async () => {
        const res = await axios.get('http://localhost:5000/api/payments')
        setPayments(res.data)
    }

    const handleSave = async () => {
        if (!form.paid_to || !form.amount) { alert('Fill required fields'); return }
        await axios.post('http://localhost:5000/api/payments', form)
        alert('Payment saved!')
        setForm({ paid_to: '', amount: '', payment_mode: 'Cash', description: '' })
        loadPayments()
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Payment Voucher</h1>
            <p className="text-gray-500 mb-4 text-sm">Record payments (Rent, Salary, Bills etc.)</p>

            <div className="bg-white p-6 rounded shadow mb-6">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Paid To *</label>
                        <input type="text" placeholder="Name/Company" value={form.paid_to}
                            onChange={(e) => setForm({ ...form, paid_to: e.target.value })}
                            className="w-full border border-gray-300 rounded px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Amount *</label>
                        <input type="number" placeholder="Enter amount" value={form.amount}
                            onChange={(e) => setForm({ ...form, amount: e.target.value })}
                            className="w-full border border-gray-300 rounded px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Payment Mode</label>
                        <select value={form.payment_mode}
                            onChange={(e) => setForm({ ...form, payment_mode: e.target.value })}
                            className="w-full border border-gray-300 rounded px-3 py-2">
                            <option value="Cash">Cash</option>
                            <option value="Bank">Bank</option>
                            <option value="UPI">UPI</option>
                            <option value="Cheque">Cheque</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <input type="text" placeholder="Rent, Salary, etc." value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            className="w-full border border-gray-300 rounded px-3 py-2" />
                    </div>
                </div>
                <button onClick={handleSave} className="mt-4 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">Save Payment</button>
            </div>

            <div className="bg-white rounded shadow overflow-hidden">
                <h2 className="text-lg font-bold px-6 py-3 border-b">Payment History</h2>
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left px-6 py-2 text-xs">ID</th>
                            <th className="text-left px-6 py-2 text-xs">Paid To</th>
                            <th className="text-left px-6 py-2 text-xs">Amount</th>
                            <th className="text-left px-6 py-2 text-xs">Mode</th>
                            <th className="text-left px-6 py-2 text-xs">Description</th>
                            <th className="text-left px-6 py-2 text-xs">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map(p => (
                            <tr key={p.id}>
                                <td className="px-6 py-2 border-b text-sm">{p.id}</td>
                                <td className="px-6 py-2 border-b text-sm">{p.paid_to}</td>
                                <td className="px-6 py-2 border-b text-sm font-medium text-red-600">₹{p.amount}</td>
                                <td className="px-6 py-2 border-b text-sm">{p.payment_mode}</td>
                                <td className="px-6 py-2 border-b text-sm">{p.description}</td>
                                <td className="px-6 py-2 border-b text-sm">{new Date(p.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Payment