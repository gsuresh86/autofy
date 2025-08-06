import Link from 'next/link'
import { Car, MapPin, Calendar, Zap } from 'lucide-react'
import { formatPrice, formatMileage } from '@/lib/utils'
import { Car as CarType } from '@/lib/supabase'

interface CarCardProps {
  car: CarType
}

export default function CarCard({ car }: CarCardProps) {
  return (
    <Link href={`/cars/${car.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100">
        {/* Car Image Placeholder */}
        <div className="aspect-video bg-gray-200 flex items-center justify-center">
          <Car className="h-12 w-12 text-gray-400" />
        </div>

        {/* Car Details */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {car.title}
            </h3>
            {car.is_featured && (
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                Featured
              </span>
            )}
          </div>

          <div className="text-2xl font-bold text-blue-600 mb-3">
            {formatPrice(car.price)}
          </div>

          {/* Car Specifications */}
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{car.year}</span>
            </div>
            
            {car.mileage && (
              <div className="flex items-center">
                <Zap className="h-4 w-4 mr-2" />
                <span>{formatMileage(car.mileage)}</span>
              </div>
            )}

            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{car.location}</span>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {car.fuel_type && (
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                  {car.fuel_type}
                </span>
              )}
              {car.transmission && (
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                  {car.transmission}
                </span>
              )}
              {car.color && (
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                  {car.color}
                </span>
              )}
            </div>
          </div>

          {/* Status Badge */}
          <div className="mt-4">
            {car.status === 'available' && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                Available
              </span>
            )}
            {car.status === 'sold' && (
              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                Sold
              </span>
            )}
            {car.status === 'reserved' && (
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                Reserved
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
} 