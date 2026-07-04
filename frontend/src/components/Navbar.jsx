import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar({ toggleSidebar }) {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (!search) return
    const term = search.toLowerCase()
    if (term.includes('customer')) navigate('/customers')
    else if (term.includes('supplier')) navigate('/suppliers')
    else if (term.includes('item')) navigate('/items')
    else if (term.includes('sale')) navigate('/sales')
    else if (term.includes('purchase')) navigate('/purchase')
    else if (term.includes('payment')) navigate('/payment')
    else if (term.includes('receipt')) navigate('/receipt')
    else if (term.includes('dashboard')) navigate('/')
    setSearch('')
  }

  return (
    <nav className="bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <button onClick={toggleSidebar} className="p-2 hover:bg-gray-100 rounded-lg text-xl">☰</button>
        <h1 className="text-lg font-bold text-gray-900 hidden sm:block">SmartERP</h1>
      </div>
      <div className="flex items-center gap-3">
        <form onSubmit={handleSearch}>
          <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-8 pr-3 py-1.5 text-sm bg-gray-100 border-0 rounded-lg w-32 md:w-48" />
        </form>
      </div>
    </nav>
  )
}

export default Navbar