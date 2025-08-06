import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatMileage(mileage: number): string {
  return `${mileage.toLocaleString()} km`
}

export function getYearRange(): number[] {
  const currentYear = new Date().getFullYear()
  const years = []
  for (let year = currentYear; year >= 1990; year--) {
    years.push(year)
  }
  return years
}

export function getBrands(): string[] {
  return [
    'Maruti Suzuki', 'Hyundai', 'Honda', 'Tata', 'Mahindra', 'Toyota',
    'Ford', 'Volkswagen', 'BMW', 'Mercedes-Benz', 'Audi', 'Skoda',
    'Renault', 'Nissan', 'Kia', 'MG', 'Jeep', 'Volvo', 'Jaguar',
    'Land Rover', 'Lexus', 'Porsche', 'Ferrari', 'Lamborghini'
  ]
}

export function getFuelTypes(): string[] {
  return ['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid']
}

export function getTransmissions(): string[] {
  return ['Manual', 'Automatic', 'CVT', 'AMT']
}

export function getColors(): string[] {
  return [
    'White', 'Black', 'Silver', 'Grey', 'Red', 'Blue', 'Green',
    'Yellow', 'Orange', 'Purple', 'Brown', 'Beige', 'Gold'
  ]
} 