import { useState } from 'react'

function Footer() {
    const [email, setEmail] = useState('')
    const [subscribed, setSubscribed] = useState(false)

    const handleSubscribe = (e) => {
        e.preventDefault()
        if (email) {
            setSubscribed(true)
            setEmail('')
            setTimeout(() => setSubscribed(false), 3000)
        }
    }

    return (
        <footer className="bg-gradient-to-r from-slate-800 to-slate-900 text-white no-print">
            <div className="px-6 py-3 flex flex-col md:flex-row justify-between items-center gap-3">

                {/* Brand */}
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-indigo-500 rounded-lg flex items-center justify-center text-xs font-bold">S</div>
                    <span className="text-sm font-semibold">SmartERP</span>
                    <span className="text-slate-500 text-xs">© 2026</span>
                </div>

                {/* Links */}
                <div className="flex gap-4 text-xs">
                    <a href="/customers" className="text-slate-400 hover:text-white transition-colors">Customers</a>
                    <a href="/suppliers" className="text-slate-400 hover:text-white transition-colors">Suppliers</a>
                    <a href="/items" className="text-slate-400 hover:text-white transition-colors">Items</a>
                    <a href="/sales" className="text-slate-400 hover:text-white transition-colors">Sales</a>
                    <a href="/inventory" className="text-slate-400 hover:text-white transition-colors">Inventory</a>
                </div>

                {/* Contact & Social */}
                <div className="flex items-center gap-3 text-xs text-slate-400">
                    <a href="mailto:ayush.singh121510@gmail.com" className="hover:text-white transition-colors">📧 ayush.singh121510@gmail.com</a>
                    <a href="https://github.com/ayushsingh" target="_blank" className="hover:text-white transition-colors">🔗 GitHub</a>
                    <a href="https://linkedin.com/in/ayushsingh" target="_blank" className="hover:text-white transition-colors">💼 LinkedIn</a>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-700 px-6 py-1.5 text-center text-[10px] text-slate-600">
                Built with ❤️ by Ayush Singh | SmartERP v1.0
            </div>
        </footer>
    )
}

export default Footer