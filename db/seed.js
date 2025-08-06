const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // You'll need to add this to your .env

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Car data from the original mock data
const carsData = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
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
    created_at: '2024-01-15T10:00:00.000Z',
    updated_at: '2024-01-15T10:00:00.000Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
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
    status: 'available',
    created_at: '2024-01-14T10:00:00.000Z',
    updated_at: '2024-01-14T10:00:00.000Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
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
    created_at: '2024-01-13T10:00:00.000Z',
    updated_at: '2024-01-13T10:00:00.000Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
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
    status: 'available',
    created_at: '2024-01-12T10:00:00.000Z',
    updated_at: '2024-01-12T10:00:00.000Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440005',
    title: 'Toyota Innova Crysta',
    brand: 'Toyota',
    model: 'Innova',
    year: 2021,
    price: 1800000,
    mileage: 35000,
    fuel_type: 'Diesel',
    transmission: 'Manual',
    color: 'Silver',
    location: 'Mumbai',
    is_featured: false,
    status: 'available',
    created_at: '2024-01-11T10:00:00.000Z',
    updated_at: '2024-01-11T10:00:00.000Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440006',
    title: 'BMW 3 Series',
    brand: 'BMW',
    model: '3 Series',
    year: 2023,
    price: 4500000,
    mileage: 5000,
    fuel_type: 'Petrol',
    transmission: 'Automatic',
    color: 'Black',
    location: 'Delhi',
    is_featured: true,
    status: 'available',
    created_at: '2024-01-10T10:00:00.000Z',
    updated_at: '2024-01-10T10:00:00.000Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440007',
    title: 'Mercedes-Benz C-Class',
    brand: 'Mercedes-Benz',
    model: 'C-Class',
    year: 2022,
    price: 5200000,
    mileage: 18000,
    fuel_type: 'Petrol',
    transmission: 'Automatic',
    color: 'Silver',
    location: 'Mumbai',
    is_featured: true,
    status: 'available',
    created_at: '2024-01-09T10:00:00.000Z',
    updated_at: '2024-01-09T10:00:00.000Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440008',
    title: 'Audi A4',
    brand: 'Audi',
    model: 'A4',
    year: 2023,
    price: 4800000,
    mileage: 12000,
    fuel_type: 'Petrol',
    transmission: 'Automatic',
    color: 'White',
    location: 'Bangalore',
    is_featured: false,
    status: 'available',
    created_at: '2024-01-08T10:00:00.000Z',
    updated_at: '2024-01-08T10:00:00.000Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440009',
    title: 'Kia Seltos HTK',
    brand: 'Kia',
    model: 'Seltos',
    year: 2021,
    price: 950000,
    mileage: 22000,
    fuel_type: 'Petrol',
    transmission: 'Manual',
    color: 'Red',
    location: 'Chennai',
    is_featured: false,
    status: 'available',
    created_at: '2024-01-07T10:00:00.000Z',
    updated_at: '2024-01-07T10:00:00.000Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440010',
    title: 'MG Hector Plus',
    brand: 'MG',
    model: 'Hector',
    year: 2022,
    price: 1400000,
    mileage: 15000,
    fuel_type: 'Petrol',
    transmission: 'Manual',
    color: 'Blue',
    location: 'Delhi',
    is_featured: false,
    status: 'available',
    created_at: '2024-01-06T10:00:00.000Z',
    updated_at: '2024-01-06T10:00:00.000Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440011',
    title: 'Mahindra XUV700',
    brand: 'Mahindra',
    model: 'XUV700',
    year: 2023,
    price: 1600000,
    mileage: 8000,
    fuel_type: 'Diesel',
    transmission: 'Automatic',
    color: 'Black',
    location: 'Mumbai',
    is_featured: true,
    status: 'available',
    created_at: '2024-01-05T10:00:00.000Z',
    updated_at: '2024-01-05T10:00:00.000Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440012',
    title: 'Skoda Octavia',
    brand: 'Skoda',
    model: 'Octavia',
    year: 2021,
    price: 2200000,
    mileage: 28000,
    fuel_type: 'Petrol',
    transmission: 'Automatic',
    color: 'White',
    location: 'Bangalore',
    is_featured: false,
    status: 'available',
    created_at: '2024-01-04T10:00:00.000Z',
    updated_at: '2024-01-04T10:00:00.000Z',
  },
];

// Car images data
const carImagesData = [
  {
    id: '550e8400-e29b-41d4-a716-446655440101',
    car_id: '550e8400-e29b-41d4-a716-446655440001',
    image_url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop',
    is_primary: true,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440102',
    car_id: '550e8400-e29b-41d4-a716-446655440002',
    image_url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop',
    is_primary: true,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440103',
    car_id: '550e8400-e29b-41d4-a716-446655440003',
    image_url: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
    is_primary: true,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440104',
    car_id: '550e8400-e29b-41d4-a716-446655440004',
    image_url: 'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=800&h=600&fit=crop',
    is_primary: true,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440105',
    car_id: '550e8400-e29b-41d4-a716-446655440005',
    image_url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop',
    is_primary: true,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440106',
    car_id: '550e8400-e29b-41d4-a716-446655440006',
    image_url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop',
    is_primary: true,
  },
];

// Admin users data
const adminUsersData = [
  {
    id: '550e8400-e29b-41d4-a716-446655440201',
    email: 'admin@autofy.com',
    name: 'Admin User',
    role: 'admin',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440202',
    email: 'manager@autofy.com',
    name: 'Manager User',
    role: 'manager',
  },
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('🗑️  Clearing existing data...');
    await supabase.from('car_images').delete().neq('id', '');
    await supabase.from('cars').delete().neq('id', '');
    await supabase.from('admin_users').delete().neq('id', '');

    // Insert cars
    console.log('🚗 Inserting cars...');
    const { data: carsResult, error: carsError } = await supabase
      .from('cars')
      .insert(carsData)
      .select();

    if (carsError) {
      throw new Error(`Error inserting cars: ${carsError.message}`);
    }
    console.log(`✅ Inserted ${carsResult.length} cars`);

    // Insert car images
    console.log('🖼️  Inserting car images...');
    const { data: imagesResult, error: imagesError } = await supabase
      .from('car_images')
      .insert(carImagesData)
      .select();

    if (imagesError) {
      throw new Error(`Error inserting car images: ${imagesError.message}`);
    }
    console.log(`✅ Inserted ${imagesResult.length} car images`);

    // Insert admin users
    console.log('👥 Inserting admin users...');
    const { data: usersResult, error: usersError } = await supabase
      .from('admin_users')
      .insert(adminUsersData)
      .select();

    if (usersError) {
      throw new Error(`Error inserting admin users: ${usersError.message}`);
    }
    console.log(`✅ Inserted ${usersResult.length} admin users`);

    console.log('🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
}

// Run the seeding function
seedDatabase(); 