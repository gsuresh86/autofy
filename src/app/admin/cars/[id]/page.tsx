'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Edit, Trash2, Save, X, Upload } from 'lucide-react'
import { Car, supabase } from '@/lib/supabase'
import { getBrands, getFuelTypes, getTransmissions, getColors, getYearRange } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function AdminCarDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const carId = params.id as string

  const [car, setCar] = useState<Car | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [images, setImages] = useState<File[]>([])
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    price: '',
    mileage: '',
    fuel_type: '',
    transmission: '',
    color: '',
    description: '',
    location: '',
    contact_number: '',
    is_featured: false,
    status: 'available' as const,
  })

  const brands = getBrands()
  const fuelTypes = getFuelTypes()
  const transmissions = getTransmissions()
  const colors = getColors()
  const years = getYearRange()
  const locations = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata']

  const fetchCar = useCallback(async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('id', carId)
        .single()

      if (error) {
        throw error
      }

      if (!data) {
        toast.error('Car not found')
        router.push('/admin/cars')
        return
      }

      setCar(data)
      setFormData({
        title: data.title,
        brand: data.brand,
        model: data.model,
        year: data.year,
        price: data.price.toString(),
        mileage: data.mileage?.toString() || '',
        fuel_type: data.fuel_type || '',
        transmission: data.transmission || '',
        color: data.color || '',
        description: data.description || '',
        location: data.location || '',
        contact_number: data.contact_number || '',
        is_featured: data.is_featured,
        status: data.status,
      })
    } catch (err) {
      console.error('Error fetching car:', err)
      toast.error('Failed to load car details')
      router.push('/admin/cars')
    } finally {
      setLoading(false)
    }
  }, [carId, router])

  // Fetch car data
  useEffect(() => {
    if (carId) {
      fetchCar()
    }
  }, [carId, fetchCar])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setImages(prev => [...prev, ...files])
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSave = async () => {
    if (!car) return

    try {
      setIsSaving(true)

      // Validate required fields
      if (!formData.title || !formData.brand || !formData.model || !formData.price) {
        toast.error('Please fill in all required fields')
        return
      }

      // Prepare car data for database
      const carData = {
        title: formData.title,
        brand: formData.brand,
        model: formData.model,
        year: parseInt(formData.year.toString()),
        price: parseFloat(formData.price),
        mileage: formData.mileage ? parseInt(formData.mileage) : null,
        fuel_type: formData.fuel_type || null,
        transmission: formData.transmission || null,
        color: formData.color || null,
        description: formData.description || null,
        location: formData.location || null,
        contact_number: formData.contact_number || null,
        is_featured: formData.is_featured,
        status: formData.status,
      }

      // Update car in database
      const { data: updatedCar, error } = await supabase
        .from('cars')
        .update(carData)
        .eq('id', carId)
        .select()
        .single()

      if (error) {
        throw new Error(`Error updating car: ${error.message}`)
      }

      setCar(updatedCar)
      setIsEditing(false)
      toast.success('Car updated successfully!')

      // Handle image uploads if any
      if (images.length > 0) {
        console.log('Images to upload:', images)
        // TODO: Implement image upload to Supabase Storage
      }
    } catch (err) {
      console.error('Error updating car:', err)
      toast.error(err instanceof Error ? err.message : 'Failed to update car. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!car) return

    if (!confirm('Are you sure you want to delete this car? This action cannot be undone.')) {
      return
    }

    try {
      setIsDeleting(true)
      const { error } = await supabase
        .from('cars')
        .delete()
        .eq('id', carId)

      if (error) {
        throw error
      }

      toast.success('Car deleted successfully!')
      router.push('/admin/cars')
    } catch (err) {
      console.error('Error deleting car:', err)
      toast.error('Failed to delete car')
    } finally {
      setIsDeleting(false)
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading car details...</span>
      </div>
    )
  }

  if (!car) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Car not found</h3>
        <Link href="/admin/cars" className="text-blue-600 hover:text-blue-700">
          Back to Cars
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <Link
          href="/admin/cars"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Cars
        </Link>
        
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {isEditing ? 'Edit Car' : car.title}
            </h1>
            <p className="text-gray-600">
              {isEditing ? 'Update the car details below' : 'Car details and management'}
            </p>
          </div>
          
          <div className="flex space-x-2">
            {!isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center disabled:opacity-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center disabled:opacity-50"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Car Information */}
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Car Title *
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{car.title}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brand *
                  </label>
                  {isEditing ? (
                    <select
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Brand</option>
                      {brands.map((brand) => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-gray-900">{car.brand}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Model *
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="model"
                      value={formData.model}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{car.model}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year *
                  </label>
                  {isEditing ? (
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {years.map((year) => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-gray-900">{car.year}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (₹) *
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">₹{car.price.toLocaleString()}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mileage (km)
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      name="mileage"
                      value={formData.mileage}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{car.mileage ? `${car.mileage.toLocaleString()} km` : 'Not specified'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fuel Type
                  </label>
                  {isEditing ? (
                    <select
                      name="fuel_type"
                      value={formData.fuel_type}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Fuel Type</option>
                      {fuelTypes.map((fuelType) => (
                        <option key={fuelType} value={fuelType}>{fuelType}</option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-gray-900">{car.fuel_type || 'Not specified'}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Transmission
                  </label>
                  {isEditing ? (
                    <select
                      name="transmission"
                      value={formData.transmission}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Transmission</option>
                      {transmissions.map((transmission) => (
                        <option key={transmission} value={transmission}>{transmission}</option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-gray-900">{car.transmission || 'Not specified'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Color
                  </label>
                  {isEditing ? (
                    <select
                      name="color"
                      value={formData.color}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Color</option>
                      {colors.map((color) => (
                        <option key={color} value={color}>{color}</option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-gray-900">{car.color || 'Not specified'}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="space-y-6">
          {/* Location & Contact */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Location & Contact</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location *
                </label>
                {isEditing ? (
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Location</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                ) : (
                  <p className="text-gray-900">{car.location || 'Not specified'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Number *
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="contact_number"
                    value={formData.contact_number}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{car.contact_number || 'Not specified'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              {isEditing ? (
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 whitespace-pre-wrap">{car.description || 'No description provided'}</p>
              )}
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">Featured Car</label>
                  <p className="text-sm text-gray-500">Show this car in featured section</p>
                </div>
                {isEditing ? (
                  <input
                    type="checkbox"
                    name="is_featured"
                    checked={formData.is_featured}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                ) : (
                  <span className={car.is_featured ? "bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs" : "text-gray-400 text-xs"}>
                    {car.is_featured ? 'Featured' : 'Not Featured'}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status *
                </label>
                {isEditing ? (
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="available">Available</option>
                    <option value="reserved">Reserved</option>
                    <option value="sold">Sold</option>
                  </select>
                ) : (
                  <div>{getStatusBadge(car.status)}</div>
                )}
              </div>
            </div>
          </div>

          {/* Image Upload (when editing) */}
          {isEditing && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Images</h2>
              
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Upload car images</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    Choose Files
                  </label>
                </div>

                {images.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {images.map((image, index) => (
                      <div key={index} className="relative">
                        <Image
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${index + 1}`}
                          width={200}
                          height={96}
                          className="w-full h-24 object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Car Metadata */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Metadata</h2>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Car ID:</span>
                <span className="text-gray-900 font-mono">{car.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Created:</span>
                <span className="text-gray-900">{new Date(car.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Updated:</span>
                <span className="text-gray-900">{new Date(car.updated_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 