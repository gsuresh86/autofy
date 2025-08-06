'use client'

import { getBrands, getFuelTypes, getTransmissions, getColors, getYearRange } from '@/lib/utils'

interface Filters {
  brand: string
  priceRange: [number, number]
  yearRange: [number, number]
  fuelType: string
  transmission: string
  location: string
}

interface CarFiltersProps {
  filters: Filters
  setFilters: (filters: Filters) => void
}

export default function CarFilters({ filters, setFilters }: CarFiltersProps) {
  const brands = getBrands()
  const fuelTypes = getFuelTypes()
  const transmissions = getTransmissions()
  const colors = getColors()
  const years = getYearRange()

  const locations = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata']

  const updateFilter = (key: keyof Filters, value: any) => {
    setFilters({ ...filters, [key]: value })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Brand Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Brand
        </label>
        <select
          value={filters.brand}
          onChange={(e) => updateFilter('brand', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range (₹)
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.priceRange[0]}
            onChange={(e) => updateFilter('priceRange', [parseInt(e.target.value) || 0, filters.priceRange[1]])}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <span className="flex items-center text-gray-500">-</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.priceRange[1]}
            onChange={(e) => updateFilter('priceRange', [filters.priceRange[0], parseInt(e.target.value) || 5000000])}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Year Range Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Year Range
        </label>
        <div className="flex gap-2">
          <select
            value={filters.yearRange[0]}
            onChange={(e) => updateFilter('yearRange', [parseInt(e.target.value), filters.yearRange[1]])}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <span className="flex items-center text-gray-500">-</span>
          <select
            value={filters.yearRange[1]}
            onChange={(e) => updateFilter('yearRange', [filters.yearRange[0], parseInt(e.target.value)])}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Fuel Type Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Fuel Type
        </label>
        <select
          value={filters.fuelType}
          onChange={(e) => updateFilter('fuelType', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Fuel Types</option>
          {fuelTypes.map((fuelType) => (
            <option key={fuelType} value={fuelType}>
              {fuelType}
            </option>
          ))}
        </select>
      </div>

      {/* Transmission Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Transmission
        </label>
        <select
          value={filters.transmission}
          onChange={(e) => updateFilter('transmission', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Transmissions</option>
          {transmissions.map((transmission) => (
            <option key={transmission} value={transmission}>
              {transmission}
            </option>
          ))}
        </select>
      </div>

      {/* Location Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location
        </label>
        <select
          value={filters.location}
          onChange={(e) => updateFilter('location', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Locations</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      {/* Clear Filters Button */}
      <div className="md:col-span-2 lg:col-span-3">
        <button
          onClick={() => setFilters({
            brand: '',
            priceRange: [0, 5000000],
            yearRange: [1990, 2024],
            fuelType: '',
            transmission: '',
            location: '',
          })}
          className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  )
} 