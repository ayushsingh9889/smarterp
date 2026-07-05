import { useState, useEffect } from 'react'
import API from '../axiosInstance'

function StockGroups() {
  const [stockGroups, setStockGroups] = useState([])
  const [units, setUnits] = useState([])
  const [groupForm, setGroupForm] = useState('')
  const [unitForm, setUnitForm] = useState('')

  useEffect(() => { loadData() }, [])

  const loadData = async () => {
    const sgRes = await API.get('/stockgroups')
    const uRes = await API.get('/units')
    setStockGroups(sgRes.data)
    setUnits(uRes.data)
  }

  const addStockGroup = async () => {
    if (!groupForm) return alert('Enter group name')
    await API.post('/stockgroups', { group_name: groupForm })
    setGroupForm('')
    loadData()
  }

  const addUnit = async () => {
    if (!unitForm) return alert('Enter unit name')
    await API.post('/units', { unit_name: unitForm })
    setUnitForm('')
    loadData()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Stock Groups & Units</h1>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-bold mb-3">Stock Groups</h2>
          <div className="flex gap-2 mb-4">
            <input type="text" placeholder="Group Name" value={groupForm} onChange={(e) => setGroupForm(e.target.value)} className="border border-gray-300 rounded px-3 py-2 flex-1" />
            <button onClick={addStockGroup} className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
          </div>
          <table className="w-full"><thead className="bg-gray-50"><tr><th className="text-left px-4 py-2 text-xs">ID</th><th className="text-left px-4 py-2 text-xs">Name</th></tr></thead>
            <tbody>{stockGroups.map(sg => (<tr key={sg.id}><td className="px-4 py-2 border-b text-sm">{sg.id}</td><td className="px-4 py-2 border-b text-sm">{sg.group_name}</td></tr>))}</tbody></table>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-bold mb-3">Units of Measure</h2>
          <div className="flex gap-2 mb-4">
            <input type="text" placeholder="Unit (PCS, KG...)" value={unitForm} onChange={(e) => setUnitForm(e.target.value)} className="border border-gray-300 rounded px-3 py-2 flex-1" />
            <button onClick={addUnit} className="bg-green-600 text-white px-4 py-2 rounded">Add</button>
          </div>
          <table className="w-full"><thead className="bg-gray-50"><tr><th className="text-left px-4 py-2 text-xs">ID</th><th className="text-left px-4 py-2 text-xs">Unit</th></tr></thead>
            <tbody>{units.map(u => (<tr key={u.id}><td className="px-4 py-2 border-b text-sm">{u.id}</td><td className="px-4 py-2 border-b text-sm">{u.unit_name}</td></tr>))}</tbody></table>
        </div>
      </div>
    </div>
  )
}

export default StockGroups
