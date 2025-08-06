import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Car {
  id: string
  title: string
  brand: string
  model: string
  year: number
  price: number
  mileage?: number
  fuel_type?: string
  transmission?: string
  color?: string
  description?: string
  location?: string
  contact_number?: string
  is_featured: boolean
  status: 'available' | 'sold' | 'reserved'
  created_at: string
  updated_at: string
}

export interface CarImage {
  id: string
  car_id: string
  image_url: string
  is_primary: boolean
  created_at: string
}

export interface AdminUser {
  id: string
  email: string
  name: string
  role: string
  created_at: string
} 