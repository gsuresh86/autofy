import CarDetailsClient from '@/components/car-details-client'
import { Car as CarType } from '@/lib/supabase'

// Mock car data - in a real app, this would come from the database
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
  description: 'Well-maintained Honda City VX with excellent fuel efficiency and comfortable interior. Perfect for daily commuting and family trips.',
  location: 'Mumbai',
  contact_number: '+91 98765 43210',
  is_featured: true,
  status: 'available',
  created_at: '2024-01-15',
  updated_at: '2024-01-15',
}

export default async function CarDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  // In a real app, you would fetch the car data based on id
  // For now, we'll use mock data but log the ID for future implementation
  console.log('Car ID:', id)
  const car = mockCar

  return <CarDetailsClient car={car} />
} 