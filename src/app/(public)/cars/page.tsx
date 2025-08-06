'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, Grid, List } from 'lucide-react'
import CarCard from '@/components/car-card'
import CarFilters from '@/components/car-filters'
import { Car, supabase } from '@/lib/supabase'

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([])
  const [filteredCars, setFilteredCars] = useState<Car[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    brand: '',
    priceRange: [0, 5000000] as [number, number],
    yearRange: [1990, 2024] as [number, number],
    fuelType: '',
    transmission: '',
    location: '',
  })

  // Fetch cars from database
  useEffect(() => {
    async function fetchCars() {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('cars')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) {
          throw error
        }

        setCars(data || [])
        setFilteredCars(data || [])
      } catch (err) {
        console.error('Error fetching cars:', err)
        setError('Failed to load cars. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [])

  // Filter cars based on search term and filters
  useEffect(() => {
    let filtered = cars.filter(car => {
      // Search term filter
      const searchMatch = car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.model.toLowerCase().includes(searchTerm.toLowerCase())

      // Brand filter
      const brandMatch = !filters.brand || car.brand === filters.brand

      // Price range filter
      const priceMatch = car.price >= filters.priceRange[0] && car.price <= filters.priceRange[1]

      // Year range filter
      const yearMatch = car.year >= filters.yearRange[0] && car.year <= filters.yearRange[1]

      // Fuel type filter
      const fuelMatch = !filters.fuelType || car.fuel_type === filters.fuelType

      // Transmission filter
      const transmissionMatch = !filters.transmission || car.transmission === filters.transmission

      // Location filter
      const locationMatch = !filters.location || car.location === filters.location

      return searchMatch && brandMatch && priceMatch && yearMatch && fuelMatch && transmissionMatch && locationMatch
    })

    setFilteredCars(filtered)
  }, [cars, searchTerm, filters])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading cars...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50">
        <div className="text-center py-12">
          <div className="text-red-400 mb-4">
            <Search className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading cars</h3>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Cars</h1>
        <p className="text-gray-600">Find your perfect car from our extensive collection</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for cars, brands, or models..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <Filter className="h-5 w-5" />
            Filters
          </button>

          {/* View Mode Toggle */}
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t">
            <CarFilters filters={filters} setFilters={setFilters} />
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredCars.length} of {cars.length} cars
        </p>
      </div>

      {/* Cars Grid/List */}
      {filteredCars.length > 0 ? (
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
          : 'space-y-4'
        }>
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No cars found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  )
} 