import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function KeyboardShortcuts() {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(true)

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') {
                return
            }

            if (e.ctrlKey && e.key === 'h') {
                e.preventDefault()
                navigate('/')
                return
            }

            switch (e.key) {
                case 'F1': e.preventDefault(); navigate('/'); break
                case 'F2': e.preventDefault(); navigate('/customers'); break
                case 'F3': e.preventDefault(); navigate('/suppliers'); break
                case 'F4': e.preventDefault(); navigate('/items'); break
                case 'F5': e.preventDefault(); navigate('/sales'); break
                case 'F6': e.preventDefault(); navigate('/purchase'); break
                case 'F7': e.preventDefault(); navigate('/payment'); break
                case 'F8': e.preventDefault(); navigate('/receipt'); break
                case 'F9': e.preventDefault(); navigate('/inventory'); break
                case 'F10': e.preventDefault(); navigate('/stockreport'); break
                case 'Escape': e.preventDefault(); navigate(-1); break
                case 'F12': e.preventDefault(); setIsOpen(!isOpen); break
                default: break
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [navigate, isOpen])

    const shortcuts = [
        { key: 'F1', page: 'Dashboard' },
        { key: 'F2', page: 'Customers' },
        { key: 'F3', page: 'Suppliers' },
        { key: 'F4', page: 'Items' },
        { key: 'F5', page: 'Sales' },
        { key: 'F6', page: 'Purchase' },
        { key: 'F7', page: 'Payment' },
        { key: 'F8', page: 'Receipt' },
        { key: 'F9', page: 'Inventory' },
        { key: 'F10', page: 'Stock Report' },
        { key: 'Esc', page: 'Go Back' },
        { key: 'Ctrl+H', page: 'Home' },
        { key: 'F12', page: 'Hide/Show Help' },
    ]

    if (!isOpen) return null

    return (
        <div className="w-52 bg-white border-l border-gray-200 h-screen overflow-y-auto flex-shrink-0">
            <div className="p-4 border-b border-gray-200">
                <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <span>⌨️</span> Shortcuts
                </h3>
                <p className="text-[10px] text-gray-400 mt-1">Press F12 to toggle</p>
            </div>
            <div className="p-2">
                {shortcuts.map((s, i) => (
                    <div key={i} className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 rounded-md">
                        <span className="text-xs text-gray-600">{s.page}</span>
                        <kbd className="bg-indigo-50 px-2 py-0.5 rounded text-[10px] font-bold text-indigo-600 border border-indigo-200">
                            {s.key}
                        </kbd>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default KeyboardShortcuts