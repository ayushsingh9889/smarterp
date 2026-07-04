import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'
import Customers from './pages/Customers'
import Suppliers from './pages/Suppliers'
import Items from './pages/Items'
import Sales from './pages/Sales'
import Purchase from './pages/Purchase'
import Contra from './pages/Contra'
import Payment from './pages/Payment'
import Receipt from './pages/Receipt'
import Journal from './pages/Journal'
import CreditNote from './pages/CreditNote'
import DebitNote from './pages/DebitNote'
import Groups from './pages/Groups'
import StockGroups from './pages/StockGroups'
import Inventory from './pages/Inventory'
import StockReport from './pages/StockReport'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const closeSidebar = () => setSidebarOpen(false)

  return (
    <Router>
      <div className="flex h-screen bg-[#f1f5f9]">
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={closeSidebar} />
        )}

        <div className={`${sidebarOpen ? 'fixed left-0 z-50 w-60' : 'hidden'} md:relative md:flex md:flex-shrink-0 md:w-60 h-screen`}>
          <Sidebar closeSidebar={closeSidebar} />
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1 overflow-auto p-4 md:p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route path="/items" element={<Items />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/purchase" element={<Purchase />} />
              <Route path="/contra" element={<Contra />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/receipt" element={<Receipt />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/creditnote" element={<CreditNote />} />
              <Route path="/debitnote" element={<DebitNote />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/stockgroups" element={<StockGroups />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/stockreport" element={<StockReport />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  )
}

export default App