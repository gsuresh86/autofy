'use client'

import { useState } from 'react'
import { ArrowLeft, Phone, MapPin, Calendar, Zap, Car, Share2, Heart } from 'lucide-react'
import Link from 'next/link'
import { formatPrice, formatMileage } from '@/lib/utils'
import { Car as CarType } from '@/lib/supabase'

// Mock car data
const mockCar: CarType = {
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
  description: 'This is a well-maintained Honda City VX with excellent fuel efficiency and comfortable driving experience. The car comes with all original features and has been serviced regularly. Perfect for daily commuting and long drives.',
  location: 'Mumbai',
  contact_number: '+91 98765 43210',
  is_featured: true,
  status: 'available',
  created_at: '2024-01-15',
  updated_at: '2024-01-15',
}

// Mock images
const mockImages = [
  '/api/placeholder/800/600',
  '/api/placeholder/800/600',
  '/api/placeholder/800/600',
  '/api/placeholder/800/600',
]

export default function CarDetailsPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  // In a real app, you would fetch the car data based on params.id
  // For now, we'll use mock data but log the ID for future implementation
  console.log('Car ID:', params.id)
  const car = mockCar

  const specifications = [
    { label: 'Brand', value: car.brand },
    { label: 'Model', value: car.model },
    { label: 'Year', value: car.year },
    { label: 'Mileage', value: car.mileage ? formatMileage(car.mileage) : 'N/A' },
    { label: 'Fuel Type', value: car.fuel_type || 'N/A' },
    { label: 'Transmission', value: car.transmission || 'N/A' },
    { label: 'Color', value: car.color || 'N/A' },
    { label: 'Location', value: car.location },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link
        href="/cars"
        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Cars
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
            <Car className="h-16 w-16 text-gray-400" />
          </div>
          
          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-2">
            {mockImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-video bg-gray-200 rounded-md flex items-center justify-center ${
                  selectedImage === index ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <Car className="h-8 w-8 text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Car Details */}
        <div>
          {/* Header */}
          <div className="mb-6">
            <div className="flex justify-between items-start mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{car.title}</h1>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-2 rounded-full ${
                    isFavorite ? 'text-red-500' : 'text-gray-400'
                  } hover:bg-gray-100`}
                >
                  <Heart className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-full text-gray-400 hover:bg-gray-100">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="text-3xl font-bold text-blue-600 mb-4">
              {formatPrice(car.price)}
            </div>

            {car.is_featured && (
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                Featured Car
              </span>
            )}
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <Calendar className="h-5 w-5 mr-2" />
              <span>{car.year}</span>
            </div>
            {car.mileage && (
              <div className="flex items-center text-gray-600">
                <Zap className="h-5 w-5 mr-2" />
                <span>{formatMileage(car.mileage)}</span>
              </div>
            )}
            <div className="flex items-center text-gray-600">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{car.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Car className="h-5 w-5 mr-2" />
              <span>{car.fuel_type} • {car.transmission}</span>
            </div>
          </div>

          {/* Contact Button */}
          <div className="mb-6">
            <a
              href={`tel:${car.contact_number}`}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call {car.contact_number}
            </a>
          </div>

          {/* Description */}
          {car.description && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{car.description}</p>
            </div>
          )}
        </div>
      </div>

      {/* Specifications */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h2>
        <div className="bg-white rounded-lg border p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specifications.map((spec, index) => (
              <div key={index} className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600 font-medium">{spec.label}</span>
                <span className="text-gray-900">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Similar Cars */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Cars</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Similar cars would be rendered here */}
          <div className="text-center py-8 text-gray-500">
            <Car className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Similar cars will appear here</p>
          </div>
        </div>
      </div>
    </div>
  )
} 