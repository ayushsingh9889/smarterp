import { Link, useLocation } from 'react-router-dom'

function Sidebar({ closeSidebar }) {
  const location = useLocation()

  const menuItems = [
    { path: '/', name: 'Dashboard' },
    { path: '/customers', name: 'Customers' },
    { path: '/suppliers', name: 'Suppliers' },
    { path: '/items', name: 'Items' },
    { path: '/sales', name: 'Sales' },
    { path: '/purchase', name: 'Purchase' },
    { path: '/contra', name: 'Contra' },
    { path: '/payment', name: 'Payment' },
    { path: '/receipt', name: 'Receipt' },
    { path: '/journal', name: 'Journal' },
    { path: '/creditnote', name: 'Credit Note' },
    { path: '/debitnote', name: 'Debit Note' },
    { path: '/groups', name: 'Groups' },
    { path: '/stockgroups', name: 'Stock Groups' },
    { path: '/inventory', name: 'Inventory' },
    { path: '/stockreport', name: 'Stock Report' },
  ]

  return (
    <div className="h-full flex flex-col" style={{ background: '#4c728b' }}>
      <div className="p-5 border-b border-white/10 flex items-center justify-between">
        <h1 className="text-base font-bold text-white">SmartERP</h1>
        <button onClick={closeSidebar} className="text-white md:hidden text-lg">✕</button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <p className="text-[10px] font-semibold text-white/50 uppercase tracking-wider mb-2 px-3">Main Menu</p>
        <ul className="space-y-0.5">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <li key={item.path}>
                <Link to={item.path} onClick={closeSidebar}
                  className={`block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${isActive ? 'bg-white/20 text-white border-l-2 border-white' : 'text-white/70 hover:bg-white/10 hover:text-white border-l-2 border-transparent'
                    }`}>
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-xs font-medium text-white">A</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Admin</p>
            <p className="text-[10px] text-white/50 truncate">admin@smarterp.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar