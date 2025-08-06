import Link from 'next/link'
import { Car, Settings, Users, BarChart3, LogOut } from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center px-6 py-4 border-b">
            <Car className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">Autofy Admin</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/admin"
                  className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <BarChart3 className="h-5 w-5 mr-3" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/cars"
                  className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <Car className="h-5 w-5 mr-3" />
                  Manage Cars
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/users"
                  className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <Users className="h-5 w-5 mr-3" />
                  Users
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/settings"
                  className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <Settings className="h-5 w-5 mr-3" />
                  Settings
                </Link>
              </li>
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t">
            <button className="flex items-center w-full px-3 py-2 text-gray-700 rounded-md hover:bg-red-50 hover:text-red-600 transition-colors">
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  )
} 