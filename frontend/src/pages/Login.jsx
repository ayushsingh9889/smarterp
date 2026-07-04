import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

function Login() {
    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', form)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user', JSON.stringify(res.data.user))
            navigate('/')
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-4">
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-indigo-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">S</div>
                    <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
                    <p className="text-gray-500 text-sm mt-1">Sign in to SmartERP</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm mb-4">{error}</div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
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
                        Sign In
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-4">
                    Don't have an account? <Link to="/register" className="text-indigo-600 font-medium hover:underline">Register</Link>
                </p>
            </div>
        </div>
    )
}

export default Login