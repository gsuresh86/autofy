import Link from 'next/link'
import { Search, Car, Shield, Clock, Star } from 'lucide-react'
import CarCard from '@/components/car-card'

// Mock data for featured cars
const featuredCars = [
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
    status: 'available' as const,
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
    is_featured: true,
    status: 'available' as const,
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
    status: 'available' as const,
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
    is_featured: true,
    status: 'available' as const,
    created_at: '2024-01-12',
    updated_at: '2024-01-12',
  },
]

const stats = [
  { label: 'Cars Available', value: '2,500+', icon: Car },
  { label: 'Happy Customers', value: '10,000+', icon: Star },
  { label: 'Years Experience', value: '5+', icon: Clock },
  { label: 'Verified Cars', value: '100%', icon: Shield },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Perfect Car
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Browse thousands of verified cars with detailed specifications and competitive prices
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-lg p-2 flex items-center shadow-lg">
                <Search className="h-6 w-6 text-gray-400 ml-3" />
                <input
                  type="text"
                  placeholder="Search for cars, brands, or models..."
                  className="flex-1 px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none"
                />
                <Link
                  href="/cars"
                  className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Search
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <stat.icon className="h-12 w-12 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Cars
            </h2>
            <p className="text-lg text-gray-600">
              Handpicked cars with the best value for money
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/cars"
              className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors inline-block"
            >
              View All Cars
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Autofy?
            </h2>
            <p className="text-lg text-gray-600">
              We make car buying simple, transparent, and trustworthy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Cars</h3>
              <p className="text-gray-600">
                Every car goes through a 140-point quality check to ensure you get the best
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Process</h3>
              <p className="text-gray-600">
                From browsing to buying, complete your car purchase in just a few hours
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
              <p className="text-gray-600">
                Get the best deals with our competitive pricing and no hidden charges
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 