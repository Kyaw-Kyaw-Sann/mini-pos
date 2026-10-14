import {
  History,
  LayoutDashboard,
  Package,
  ShoppingCart,
} from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

const navigationItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'POS', path: '/pos', icon: ShoppingCart },
  { name: 'Products', path: '/products', icon: Package },
  { name: 'Sales', path: '/sales', icon: History },
]

function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-64 bg-sidebar p-5 text-sidebar-text md:block">
      <Link to="/" className="mb-8 flex items-center gap-3">
        <img
          src="/SaleKit.svg"
          alt=""
          className="h-11 w-11 rounded-xl"
        />
        <div>
          <p className="text-xl font-bold leading-tight">SaleKit</p>
          <p className="text-xs text-sidebar-muted">Mini POS</p>
        </div>
      </Link>

      <nav aria-label="Main navigation" className="space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                  isActive
                    ? 'bg-primary text-on-primary'
                    : 'text-sidebar-muted hover:bg-sidebar-hover hover:text-sidebar-text'
                }`
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
