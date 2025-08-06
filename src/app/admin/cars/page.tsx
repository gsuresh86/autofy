'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react'
import { Car } from '@/lib/supabase'

// Mock cars data
const mockCars: Car[] = [
  {
    id: '1',
    title: 'Honda City VX',
    brand: 'Honda',
    model: 'City',
    year: 2022,
    price: 850000,
    mileage: 15000,
    fuel_type: 'Petrol',
    transmission: 'Manual',
    color: 'White',
    location: 'Mumbai',
    is_featured: true,
    status: 'available',
    created_at: '2024-01-15',
    updated_at: '2024-01-15',
  },
  {
    id: '2',
    title: 'Maruti Swift VXI',
    brand: 'Maruti Suzuki',
    model: 'Swift',
    year: 2021,
    price: 650000,
    mileage: 25000,
    fuel_type: 'Petrol',
    transmission: 'Manual',
    color: 'Red',
    location: 'Delhi',
    is_featured: false,
    status: 'sold',
    created_at: '2024-01-14',
    updated_at: '2024-01-14',
  },
  {
    id: '3',
    title: 'Hyundai i20 Sportz',
    brand: 'Hyundai',
    model: 'i20',
    year: 2023,
    price: 750000,
    mileage: 8000,
    fuel_type: 'Petrol',
    transmission: 'Manual',
    color: 'Blue',
    location: 'Bangalore',
    is_featured: true,
    status: 'available',
    created_at: '2024-01-13',
    updated_at: '2024-01-13',
  },
  {
    id: '4',
    title: 'Tata Nexon XM',
    brand: 'Tata',
    model: 'Nexon',
    year: 2022,
    price: 1200000,
    mileage: 12000,
    fuel_type: 'Electric',
    transmission: 'Automatic',
    color: 'White',
    location: 'Chennai',
    is_featured: false,
    status: 'reserved',
    created_at: '2024-01-12',
    updated_at: '2024-01-12',
  },
]

export default function AdminCarsPage() {
  const [cars, setCars] = useState<Car[]>(mockCars)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.brand.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || car.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleDeleteCar = (id: string) => {
    if (confirm('Are you sure you want to delete this car?')) {
      setCars(cars.filter(car => car.id !== id))
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Available</span>
      case 'sold':
        return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">Sold</span>
      case 'reserved':
        return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Reserved</span>
      default:
        return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">{status}</span>
    }
  }

  return (
    <div>
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Cars</h1>
          <p className="text-gray-600">Add, edit, and manage your car inventory</p>
        </div>
        <Link
          href="/admin/cars/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Car
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search cars by title or brand..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="sold">Sold</option>
            <option value="reserved">Reserved</option>
          </select>
        </div>
      </div>

      {/* Cars Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Car
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Featured
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCars.map((car) => (
                <tr key={car.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{car.title}</div>
                      <div className="text-sm text-gray-500">{car.brand} • {car.year}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ₹{car.price.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(car.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {car.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {car.is_featured ? (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                        Featured
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">No</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link
                        href={`/cars/${car.id}`}
                        className="text-blue-600 hover:text-blue-900"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/admin/cars/${car.id}`}
                        className="text-green-600 hover:text-green-900"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDeleteCar(car.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No cars found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  )
} 