import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '' })
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        try {
            await axios.post('http://localhost:5000/api/auth/register', form)
            setSuccess('Registration successful! Redirecting to login...')
            setTimeout(() => navigate('/login'), 1500)
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-4">
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-indigo-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">S</div>
                    <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
                    <p className="text-gray-500 text-sm mt-1">Register for SmartERP</p>
                </div>

                {error && <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm mb-4">{error}</div>}
                {success && <div className="bg-green-50 text-green-600 px-4 py-2 rounded-lg text-sm mb-4">{success}</div>}

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text" required placeholder="Enter name"
                            value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email" required placeholder="Enter email"
                            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password" required placeholder="Enter password"
                            value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 outline-none"
                        />
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                        Create Account
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-4">
                    Already have an account? <Link to="/login" className="text-indigo-600 font-medium hover:underline">Sign In</Link>
                </p>
            </div>
        </div>
    )
}

export default Register