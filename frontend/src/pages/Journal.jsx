import { useState, useEffect } from 'react'
import API from '../axiosInstance'

function Journal() {
  const [form, setForm] = useState({ debit_account: '', credit_account: '', amount: '', description: '' })
  const [journals, setJournals] = useState([])

  useEffect(() => { loadJournals() }, [])

  const loadJournals = async () => {
    const res = await API.get('/journals')
    setJournals(res.data)
  }

  const handleSave = async () => {
    if (!form.debit_account || !form.credit_account || !form.amount) { alert('Fill required fields'); return }
    await API.post('/journals', form)
    alert('Journal saved!')
    setForm({ debit_account: '', credit_account: '', amount: '', description: '' })
    loadJournals()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Journal Voucher</h1>
      <p className="text-gray-500 mb-4 text-sm">Accounting adjustments & entries</p>
      <div className="bg-white p-6 rounded shadow mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium mb-1">Debit Account *</label><input type="text" value={form.debit_account} onChange={(e) => setForm({ ...form, debit_account: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2" /></div>
          <div><label className="block text-sm font-medium mb-1">Credit Account *</label><input type="text" value={form.credit_account} onChange={(e) => setForm({ ...form, credit_account: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2" /></div>
          <div><label className="block text-sm font-medium mb-1">Amount *</label><input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2" /></div>
          <div><label className="block text-sm font-medium mb-1">Description</label><input type="text" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2" /></div>
        </div>
        <button onClick={handleSave} className="mt-4 bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700">Save Journal</button>
      </div>
      <div className="bg-white rounded shadow overflow-hidden">
        <h2 className="text-lg font-bold px-6 py-3 border-b">Journal Entries</h2>
        <table className="w-full"><thead className="bg-gray-50"><tr><th className="text-left px-6 py-2 text-xs">ID</th><th className="text-left px-6 py-2 text-xs">Debit</th><th className="text-left px-6 py-2 text-xs">Credit</th><th className="text-left px-6 py-2 text-xs">Amount</th><th className="text-left px-6 py-2 text-xs">Desc</th><th className="text-left px-6 py-2 text-xs">Date</th></tr></thead>
          <tbody>{journals.map(j => (<tr key={j.id}><td className="px-6 py-2 border-b text-sm">{j.id}</td><td className="px-6 py-2 border-b text-sm">{j.debit_account}</td><td className="px-6 py-2 border-b text-sm">{j.credit_account}</td><td className="px-6 py-2 border-b text-sm font-medium">₹{j.amount}</td><td className="px-6 py-2 border-b text-sm">{j.description}</td><td className="px-6 py-2 border-b text-sm">{new Date(j.created_at).toLocaleDateString()}</td></tr>))}</tbody></table>
      </div>
    </div>
  )
}

export default Journal
