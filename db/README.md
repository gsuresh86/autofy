# Database Setup and Seeding

This folder contains the database schema, seed data, and seeding scripts for the Autofy application.

## Files

- `schema.sql` - Database schema with tables, indexes, and triggers
- `seed.sql` - SQL seed data for manual database seeding
- `seed.js` - Node.js seeding script for automated database seeding
- `README.md` - This file with setup instructions

## Setup Instructions

### 1. Environment Variables

Add the following environment variables to your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 2. Database Schema Setup

#### Option A: Using Supabase Dashboard (Recommended)
1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `schema.sql`
4. Execute the SQL to create the tables, indexes, and triggers

#### Option B: Using Supabase CLI
```bash
supabase db reset
```

### 3. Database Seeding

#### Option A: Using Node.js Script (Recommended)
1. Install dotenv if not already installed:
   ```bash
   npm install dotenv
   ```

2. Run the seeding script:
   ```bash
   node db/seed.js
   ```

#### Option B: Using SQL File
1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `seed.sql`
4. Execute the SQL to insert the seed data

## Database Schema

### Tables

1. **cars** - Main car listings table
   - Primary key: `id` (UUID)
   - Fields: title, brand, model, year, price, mileage, fuel_type, transmission, color, description, location, contact_number, is_featured, status, created_at, updated_at

2. **car_images** - Car images table
   - Primary key: `id` (UUID)
   - Foreign key: `car_id` references `cars.id`
   - Fields: image_url, is_primary, created_at

3. **admin_users** - Admin users table
   - Primary key: `id` (UUID)
   - Fields: email, name, role, created_at

### Indexes

Performance indexes are created on:
- `cars.brand`
- `cars.model`
- `cars.year`
- `cars.price`
- `cars.status`
- `cars.is_featured`
- `car_images.car_id`
- `car_images.is_primary`

### Triggers

- `update_cars_updated_at` - Automatically updates the `updated_at` timestamp when a car record is modified

## Seed Data

The seed data includes:
- 12 sample cars with various brands, models, and specifications
- 6 sample car images (one primary image per car for the first 6 cars)
- 2 sample admin users

## Troubleshooting

### Common Issues

1. **Missing Environment Variables**
   - Ensure all required environment variables are set in your `.env.local` file
   - The `SUPABASE_SERVICE_ROLE_KEY` is required for the seeding script

2. **Permission Errors**
   - Make sure your Supabase service role key has the necessary permissions
   - Check that Row Level Security (RLS) policies allow the operations

3. **Duplicate Key Errors**
   - The seeding script clears existing data before inserting new data
   - If you want to keep existing data, comment out the delete statements in `seed.js`

### Getting Supabase Service Role Key

1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy the "service_role" key (not the anon key)
4. Add it to your `.env.local` file as `SUPABASE_SERVICE_ROLE_KEY`

## Development Workflow

1. Set up the database schema using `schema.sql`
2. Run the seeding script to populate with sample data
3. Update the cars page to fetch data from the database instead of using mock data
4. Test the application functionality

## Notes

- The seeding script uses the service role key to bypass RLS policies
- All timestamps are in UTC
- Car prices are stored as decimal values for precision
- The schema includes proper foreign key constraints and cascading deletes 