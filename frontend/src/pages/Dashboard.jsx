import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Dashboard() {
    const [counts, setCounts] = useState({ customers: 0, suppliers: 0, items: 0, sales: 0 })
    const [recentSales, setRecentSales] = useState([])
    const [lowStockItems, setLowStockItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [greeting, setGreeting] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        loadAllData()
        setGreeting(getGreeting())
    }, [])

    const getGreeting = () => {
        const hour = new Date().getHours()
        if (hour < 12) return 'Good Morning'
        if (hour < 17) return 'Good Afternoon'
        return 'Good Evening'
    }

    const loadAllData = async () => {
        try {
            const [cust, supp, item, sale] = await Promise.all([
                axios.get('http://localhost:5000/api/customers'),
                axios.get('http://localhost:5000/api/suppliers'),
                axios.get('http://localhost:5000/api/items'),
                axios.get('http://localhost:5000/api/sales')
            ])
            setCounts({
                customers: cust.data.length,
                suppliers: supp.data.length,
                items: item.data.length,
                sales: sale.data.length
            })
            setRecentSales(sale.data.slice(0, 5))
            setLowStockItems(item.data.filter(i => i.stock < 10))
        } catch (error) {
            console.log('Error:', error.message)
        } finally {
            setLoading(false)
        }
    }

    const totalRevenue = recentSales.reduce((sum, s) => sum + parseFloat(s.total_amount || 0), 0)
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

    return (
        <div className="animate-fade-in">
            {/* Header */}
            <div className="mb-8">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">
                            {greeting}, <span className="gradient-text">Admin</span> 👋
                        </h1>
                        <p className="text-slate-500 mt-1">{today}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-slate-400">Total Revenue</p>
                        <p className="text-2xl font-bold text-green-600">₹{totalRevenue.toLocaleString()}</p>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
                {[
                    { title: 'Customers', count: counts.customers, icon: '👥', color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50', path: '/customers' },
                    { title: 'Suppliers', count: counts.suppliers, icon: '🏭', color: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-50', path: '/suppliers' },
                    { title: 'Items', count: counts.items, icon: '📦', color: 'from-violet-500 to-violet-600', bg: 'bg-violet-50', path: '/items' },
                    { title: 'Sales', count: counts.sales, icon: '💰', color: 'from-amber-500 to-amber-600', bg: 'bg-amber-50', path: '/sales' },
                ].map((stat, i) => (
                    <div
                        key={i}
                        onClick={() => navigate(stat.path)}
                        className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all cursor-pointer border border-gray-100 hover:border-gray-200 group"
                        style={{ animationDelay: `${i * 0.1}s` }}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl shadow-lg`}>
                                {stat.icon}
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold text-slate-800">{loading ? '...' : stat.count}</p>
                                <p className="text-xs text-slate-500">{stat.title}</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                            <span className="text-xs text-slate-400">View details</span>
                            <span className="text-indigo-500 group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Recent Sales - 2 columns */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-slate-800">📋 Recent Sales</h3>
                        <button onClick={() => navigate('/sales')} className="text-xs text-indigo-600 hover:underline">View All →</button>
                    </div>
                    {recentSales.length === 0 ? (
                        <div className="text-center py-10">
                            <div className="text-4xl mb-3">📭</div>
                            <p className="text-slate-500 font-medium">No sales yet</p>
                            <p className="text-slate-400 text-sm mt-1">Create your first sale to see it here</p>
                            <button onClick={() => navigate('/sales')} className="mt-3 btn btn-primary text-sm">+ New Sale</button>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {recentSales.map((sale) => (
                                <div key={sale.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                    <div>
                                        <p className="text-sm font-medium text-slate-700">👤 {sale.customer_name}</p>
                                        <p className="text-xs text-slate-400">{new Date(sale.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-green-600">₹{parseFloat(sale.total_amount).toLocaleString()}</p>
                                        <p className="text-xs text-slate-400">#{sale.id}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Stock Alerts - 1 column */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-slate-800">⚠️ Stock Alerts</h3>
                        <button onClick={() => navigate('/inventory')} className="text-xs text-indigo-600 hover:underline">View All →</button>
                    </div>
                    {lowStockItems.length === 0 ? (
                        <div className="text-center py-10">
                            <div className="text-4xl mb-3">✅</div>
                            <p className="text-green-600 font-medium">All stocked!</p>
                            <p className="text-slate-400 text-sm mt-1">No low stock items</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {lowStockItems.map(item => (
                                <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-red-50 hover:bg-red-100 transition-colors cursor-pointer" onClick={() => navigate('/items')}>
                                    <div>
                                        <p className="text-sm font-medium text-slate-700">{item.item_name}</p>
                                        <p className="text-xs text-slate-500">SKU: {item.sku || 'N/A'}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.stock === 0 ? 'bg-red-200 text-red-800' :
                                            item.stock <= 5 ? 'bg-orange-200 text-orange-800' : 'bg-yellow-200 text-yellow-800'
                                        }`}>
                                        {item.stock === 0 ? '🚨 OUT' : `⚠️ ${item.stock}`}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
                <button onClick={() => navigate('/sales')} className="btn bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 shadow-lg shadow-indigo-200">
                    💰 New Sale
                </button>
                <button onClick={() => navigate('/purchase')} className="btn bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 shadow-lg shadow-emerald-200">
                    🛒 New Purchase
                </button>
                <button onClick={() => navigate('/customers')} className="btn bg-white border border-gray-200 hover:bg-gray-50">
                    👥 Add Customer
                </button>
                <button onClick={() => navigate('/items')} className="btn bg-white border border-gray-200 hover:bg-gray-50">
                    📦 Add Item
                </button>
            </div>
        </div>
    )
}

export default Dashboard