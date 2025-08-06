import { Car, Users, TrendingUp, Eye } from 'lucide-react'
import Link from 'next/link'

// Mock statistics
const stats = [
  {
    label: 'Total Cars',
    value: '2,547',
    change: '+12%',
    changeType: 'positive' as const,
    icon: Car,
  },
  {
    label: 'Active Users',
    value: '1,234',
    change: '+8%',
    changeType: 'positive' as const,
    icon: Users,
  },
  {
    label: 'Monthly Views',
    value: '45,678',
    change: '+23%',
    changeType: 'positive' as const,
    icon: Eye,
  },
  {
    label: 'Revenue',
    value: '₹12.5L',
    change: '+15%',
    changeType: 'positive' as const,
    icon: TrendingUp,
  },
]

// Mock recent cars
const recentCars = [
  {
    id: '1',
    title: 'Honda City VX',
    price: 850000,
    status: 'available',
    addedDate: '2024-01-15',
  },
  {
    id: '2',
    title: 'Maruti Swift VXI',
    price: 650000,
    status: 'sold',
    addedDate: '2024-01-14',
  },
  {
    id: '3',
    title: 'Hyundai i20 Sportz',
    price: 750000,
    status: 'available',
    addedDate: '2024-01-13',
  },
  {
    id: '4',
    title: 'Tata Nexon XM',
    price: 1200000,
    status: 'reserved',
    addedDate: '2024-01-12',
  },
]

export default function AdminDashboard() {
  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here&apos;s what&apos;s happening with your car inventory.</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <stat.icon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className={`text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-600 ml-1">from last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Cars */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Cars</h2>
              <Link
                href="/admin/cars"
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentCars.map((car) => (
                <div key={car.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div>
                    <h3 className="font-medium text-gray-900">{car.title}</h3>
                    <p className="text-sm text-gray-600">₹{car.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      car.status === 'available' ? 'bg-green-100 text-green-800' :
                      car.status === 'sold' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {car.status}
                    </span>
                    <span className="text-sm text-gray-500">{car.addedDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <Link
                href="/admin/cars/add"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="p-2 bg-blue-50 rounded-lg mr-4">
                  <Car className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Add New Car</h3>
                  <p className="text-sm text-gray-600">Upload car details and images</p>
                </div>
              </Link>

              <Link
                href="/admin/cars"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="p-2 bg-green-50 rounded-lg mr-4">
                  <Car className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Manage Inventory</h3>
                  <p className="text-sm text-gray-600">Edit or remove existing cars</p>
                </div>
              </Link>

              <Link
                href="/admin/users"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="p-2 bg-purple-50 rounded-lg mr-4">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">User Management</h3>
                  <p className="text-sm text-gray-600">Manage admin users and permissions</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 