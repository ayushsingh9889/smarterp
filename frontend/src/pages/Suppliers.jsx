import { useState, useEffect } from 'react'
import API from '../axiosInstance'

function Suppliers() {
    const [suppliers, setSuppliers] = useState([])
    const [form, setForm] = useState({ name: '', phone: '', address: '' })
    const [editingId, setEditingId] = useState(null)
    const [showForm, setShowForm] = useState(false)

    useEffect(() => { loadSuppliers() }, [])

    const loadSuppliers = async () => {
        const res = await API.get('/suppliers')
        setSuppliers(res.data)
    }

    const handleSave = async () => {
        if (editingId) {
            await API.put(`/suppliers/${editingId}`, form)
        } else {
            await API.post('/suppliers', form)
        }
        setForm({ name: '', phone: '', address: '' })
        setEditingId(null)
        setShowForm(false)
        loadSuppliers()
    }

    const handleEdit = (supplier) => {
        setForm({ name: supplier.name, phone: supplier.phone, address: supplier.address })
        setEditingId(supplier.id)
        setShowForm(true)
    }

    const handleDelete = async (id) => {
        if (window.confirm('Delete this supplier?')) {
            await API.delete(`/suppliers/${id}`)
            loadSuppliers()
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-900">Suppliers</h1>
                <button onClick={() => { setForm({ name: '', phone: '', address: '' }); setEditingId(null); setShowForm(!showForm) }}
                    className="btn btn-primary">
                    {showForm ? 'Cancel' : '+ Add Supplier'}
                </button>
            </div>

            {showForm && (
                <div className="card mb-6 animate-fade-in">
                    <h2 className="text-lg font-semibold mb-4">{editingId ? 'Edit Supplier' : 'Add Supplier'}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                            <input type="text" placeholder="Enter name" value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <input type="text" placeholder="Enter phone" value={form.phone}
                                onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-field" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                            <input type="text" placeholder="Enter address" value={form.address}
                                onChange={(e) => setForm({ ...form, address: e.target.value })} className="input-field" />
                        </div>
                    </div>
                    <button onClick={handleSave} className="btn btn-primary mt-4">
                        {editingId ? 'Update' : 'Save'}
                    </button>
                </div>
            )}

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th><th>Name</th><th>Phone</th><th>Address</th><th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suppliers.length === 0 ? (
                            <tr><td colSpan="5" className="text-center py-8 text-gray-500">No suppliers found.</td></tr>
                        ) : (
                            suppliers.map(supplier => (
                                <tr key={supplier.id}>
                                    <td>{supplier.id}</td>
                                    <td className="font-medium">{supplier.name}</td>
                                    <td>{supplier.phone}</td>
                                    <td>{supplier.address}</td>
                                    <td>
                                        <button onClick={() => handleEdit(supplier)} className="text-indigo-600 hover:underline mr-3">Edit</button>
                                        <button onClick={() => handleDelete(supplier.id)} className="text-red-600 hover:underline">Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Suppliers