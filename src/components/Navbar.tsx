import {
  History,
  LayoutDashboard,
  Package,
  ShoppingCart,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navigationItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'POS', path: '/pos', icon: ShoppingCart },
  { name: 'Products', path: '/products', icon: Package },
  { name: 'Sales', path: '/sales', icon: History },
]

function Navbar() {
  return (
    <header className="bg-sidebar text-sidebar-text md:hidden">
      <div className="px-4 py-3 text-xl font-bold">Mini POS</div>

      <nav
        aria-label="Mobile navigation"
        className="flex overflow-x-auto border-t border-sidebar-border px-2 py-2"
      >
        {navigationItems.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex min-w-20 flex-1 flex-col items-center gap-1 rounded-md px-2 py-2 text-xs ${
                  isActive
                    ? 'bg-primary text-on-primary'
                    : 'text-sidebar-muted'
                }`
              }
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </NavLink>
          )
        })}
      </nav>
    </header>
  )
}

export default Navbar
