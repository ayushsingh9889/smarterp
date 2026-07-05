import { useState, useEffect } from 'react'
import API from '../axiosInstance'

function Receipt() {
  const [form, setForm] = useState({ received_from: '', amount: '', payment_mode: 'Cash', description: '' })
  const [receipts, setReceipts] = useState([])

  useEffect(() => { loadReceipts() }, [])

  const loadReceipts = async () => {
    const res = await API.get('/receipts')
    setReceipts(res.data)
  }

  const handleSave = async () => {
    if (!form.received_from || !form.amount) { alert('Fill required fields'); return }
    await API.post('/receipts', form)
    alert('Receipt saved!')
    setForm({ received_from: '', amount: '', payment_mode: 'Cash', description: '' })
    loadReceipts()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Receipt Voucher</h1>
      <p className="text-gray-500 mb-4 text-sm">Record money received</p>
      <div className="bg-white p-6 rounded shadow mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium mb-1">Received From *</label><input type="text" value={form.received_from} onChange={(e) => setForm({ ...form, received_from: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2" /></div>
          <div><label className="block text-sm font-medium mb-1">Amount *</label><input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2" /></div>
          <div><label className="block text-sm font-medium mb-1">Payment Mode</label><select value={form.payment_mode} onChange={(e) => setForm({ ...form, payment_mode: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2"><option value="Cash">Cash</option><option value="Bank">Bank</option><option value="UPI">UPI</option><option value="Cheque">Cheque</option></select></div>
          <div><label className="block text-sm font-medium mb-1">Description</label><input type="text" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2" /></div>
        </div>
        <button onClick={handleSave} className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Save Receipt</button>
      </div>
      <div className="bg-white rounded shadow overflow-hidden">
        <h2 className="text-lg font-bold px-6 py-3 border-b">Receipt History</h2>
        <table className="w-full"><thead className="bg-gray-50"><tr><th className="text-left px-6 py-2 text-xs">ID</th><th className="text-left px-6 py-2 text-xs">From</th><th className="text-left px-6 py-2 text-xs">Amount</th><th className="text-left px-6 py-2 text-xs">Mode</th><th className="text-left px-6 py-2 text-xs">Desc</th><th className="text-left px-6 py-2 text-xs">Date</th></tr></thead>
          <tbody>{receipts.map(r => (<tr key={r.id}><td className="px-6 py-2 border-b text-sm">{r.id}</td><td className="px-6 py-2 border-b text-sm">{r.received_from}</td><td className="px-6 py-2 border-b text-sm font-medium text-green-600">₹{r.amount}</td><td className="px-6 py-2 border-b text-sm">{r.payment_mode}</td><td className="px-6 py-2 border-b text-sm">{r.description}</td><td className="px-6 py-2 border-b text-sm">{new Date(r.created_at).toLocaleDateString()}</td></tr>))}</tbody></table>
      </div>
    </div>
  )
}

export default Receipt
