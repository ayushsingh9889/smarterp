import { useState, useEffect } from 'react'
import axios from 'axios'

function Groups() {
    const [groups, setGroups] = useState([])
    const [form, setForm] = useState({ group_name: '', group_type: 'Assets' })
    const [ledgers, setLedgers] = useState([])
    const [ledgerForm, setLedgerForm] = useState({ ledger_name: '', group_id: '', opening_balance: '' })

    useEffect(() => { loadData() }, [])

    const loadData = async () => {
        const gRes = await axios.get('http://localhost:5000/api/groups')
        const lRes = await axios.get('http://localhost:5000/api/ledgers')
        setGroups(gRes.data)
        setLedgers(lRes.data)
    }

    const addGroup = async () => {
        if (!form.group_name) return alert('Enter group name')
        await axios.post('http://localhost:5000/api/groups', form)
        setForm({ group_name: '', group_type: 'Assets' })
        loadData()
    }

    const addLedger = async () => {
        if (!ledgerForm.ledger_name || !ledgerForm.group_id) return alert('Fill all fields')
        await axios.post('http://localhost:5000/api/ledgers', ledgerForm)
        setLedgerForm({ ledger_name: '', group_id: '', opening_balance: '' })
        loadData()
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Groups & Ledgers</h1>

            {/* Groups Section */}
            <div className="bg-white p-6 rounded shadow mb-6">
                <h2 className="text-lg font-bold mb-3">Create Group</h2>
                <div className="flex gap-3 mb-4">
                    <input type="text" placeholder="Group Name" value={form.group_name}
                        onChange={(e) => setForm({ ...form, group_name: e.target.value })}
                        className="border border-gray-300 rounded px-3 py-2 flex-1" />
                    <select value={form.group_type} onChange={(e) => setForm({ ...form, group_type: e.target.value })}
                        className="border border-gray-300 rounded px-3 py-2">
                        <option>Assets</option><option>Liabilities</option><option>Income</option><option>Expenses</option>
                    </select>
                    <button onClick={addGroup} className="bg-blue-600 text-white px-4 py-2 rounded">Add Group</button>
                </div>
                <table className="w-full">
                    <thead className="bg-gray-50"><tr>
                        <th className="text-left px-4 py-2 text-xs">ID</th><th className="text-left px-4 py-2 text-xs">Name</th><th className="text-left px-4 py-2 text-xs">Type</th>
                    </tr></thead>
                    <tbody>
                        {groups.map(g => (
                            <tr key={g.id}><td className="px-4 py-2 border-b text-sm">{g.id}</td>
                                <td className="px-4 py-2 border-b text-sm font-medium">{g.group_name}</td>
                                <td className="px-4 py-2 border-b text-sm">{g.group_type}</td></tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Ledgers Section */}
            <div className="bg-white p-6 rounded shadow">
                <h2 className="text-lg font-bold mb-3">Create Ledger</h2>
                <div className="flex gap-3 mb-4">
                    <input type="text" placeholder="Ledger Name" value={ledgerForm.ledger_name}
                        onChange={(e) => setLedgerForm({ ...ledgerForm, ledger_name: e.target.value })}
                        className="border border-gray-300 rounded px-3 py-2 flex-1" />
                    <select value={ledgerForm.group_id} onChange={(e) => setLedgerForm({ ...ledgerForm, group_id: e.target.value })}
                        className="border border-gray-300 rounded px-3 py-2">
                        <option value="">-- Select Group --</option>
                        {groups.map(g => <option key={g.id} value={g.id}>{g.group_name}</option>)}
                    </select>
                    <input type="number" placeholder="Opening Balance" value={ledgerForm.opening_balance}
                        onChange={(e) => setLedgerForm({ ...ledgerForm, opening_balance: e.target.value })}
                        className="border border-gray-300 rounded px-3 py-2 w-40" />
                    <button onClick={addLedger} className="bg-green-600 text-white px-4 py-2 rounded">Add Ledger</button>
                </div>
                <table className="w-full">
                    <thead className="bg-gray-50"><tr>
                        <th className="text-left px-4 py-2 text-xs">ID</th><th className="text-left px-4 py-2 text-xs">Ledger</th>
                        <th className="text-left px-4 py-2 text-xs">Group</th><th className="text-left px-4 py-2 text-xs">Balance</th>
                    </tr></thead>
                    <tbody>
                        {ledgers.map(l => (
                            <tr key={l.id}><td className="px-4 py-2 border-b text-sm">{l.id}</td>
                                <td className="px-4 py-2 border-b text-sm font-medium">{l.ledger_name}</td>
                                <td className="px-4 py-2 border-b text-sm">{l.group_name} ({l.group_type})</td>
                                <td className="px-4 py-2 border-b text-sm">₹{l.opening_balance}</td></tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Groups