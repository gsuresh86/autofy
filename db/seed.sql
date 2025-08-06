-- Seed data for cars table
INSERT INTO cars (id, title, brand, model, year, price, mileage, fuel_type, transmission, color, location, is_featured, status, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Honda City VX', 'Honda', 'City', 2022, 850000, 15000, 'Petrol', 'Manual', 'White', 'Mumbai', true, 'available', '2024-01-15 10:00:00+00', '2024-01-15 10:00:00+00'),
('550e8400-e29b-41d4-a716-446655440002', 'Maruti Swift VXI', 'Maruti Suzuki', 'Swift', 2021, 650000, 25000, 'Petrol', 'Manual', 'Red', 'Delhi', false, 'available', '2024-01-14 10:00:00+00', '2024-01-14 10:00:00+00'),
('550e8400-e29b-41d4-a716-446655440003', 'Hyundai i20 Sportz', 'Hyundai', 'i20', 2023, 750000, 8000, 'Petrol', 'Manual', 'Blue', 'Bangalore', true, 'available', '2024-01-13 10:00:00+00', '2024-01-13 10:00:00+00'),
('550e8400-e29b-41d4-a716-446655440004', 'Tata Nexon XM', 'Tata', 'Nexon', 2022, 1200000, 12000, 'Electric', 'Automatic', 'White', 'Chennai', false, 'available', '2024-01-12 10:00:00+00', '2024-01-12 10:00:00+00'),
('550e8400-e29b-41d4-a716-446655440005', 'Toyota Innova Crysta', 'Toyota', 'Innova', 2021, 1800000, 35000, 'Diesel', 'Manual', 'Silver', 'Mumbai', false, 'available', '2024-01-11 10:00:00+00', '2024-01-11 10:00:00+00'),
('550e8400-e29b-41d4-a716-446655440006', 'BMW 3 Series', 'BMW', '3 Series', 2023, 4500000, 5000, 'Petrol', 'Automatic', 'Black', 'Delhi', true, 'available', '2024-01-10 10:00:00+00', '2024-01-10 10:00:00+00'),
('550e8400-e29b-41d4-a716-446655440007', 'Mercedes-Benz C-Class', 'Mercedes-Benz', 'C-Class', 2022, 5200000, 18000, 'Petrol', 'Automatic', 'Silver', 'Mumbai', true, 'available', '2024-01-09 10:00:00+00', '2024-01-09 10:00:00+00'),
('550e8400-e29b-41d4-a716-446655440008', 'Audi A4', 'Audi', 'A4', 2023, 4800000, 12000, 'Petrol', 'Automatic', 'White', 'Bangalore', false, 'available', '2024-01-08 10:00:00+00', '2024-01-08 10:00:00+00'),
('550e8400-e29b-41d4-a716-446655440009', 'Kia Seltos HTK', 'Kia', 'Seltos', 2021, 950000, 22000, 'Petrol', 'Manual', 'Red', 'Chennai', false, 'available', '2024-01-07 10:00:00+00', '2024-01-07 10:00:00+00'),
('550e8400-e29b-41d4-a716-446655440010', 'MG Hector Plus', 'MG', 'Hector', 2022, 1400000, 15000, 'Petrol', 'Manual', 'Blue', 'Delhi', false, 'available', '2024-01-06 10:00:00+00', '2024-01-06 10:00:00+00'),
('550e8400-e29b-41d4-a716-446655440011', 'Mahindra XUV700', 'Mahindra', 'XUV700', 2023, 1600000, 8000, 'Diesel', 'Automatic', 'Black', 'Mumbai', true, 'available', '2024-01-05 10:00:00+00', '2024-01-05 10:00:00+00'),
('550e8400-e29b-41d4-a716-446655440012', 'Skoda Octavia', 'Skoda', 'Octavia', 2021, 2200000, 28000, 'Petrol', 'Automatic', 'White', 'Bangalore', false, 'available', '2024-01-04 10:00:00+00', '2024-01-04 10:00:00+00');

-- Seed data for car_images table (sample images for some cars)
INSERT INTO car_images (id, car_id, image_url, is_primary, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440101', '550e8400-e29b-41d4-a716-446655440001', 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop', true, NOW()),
('550e8400-e29b-41d4-a716-446655440102', '550e8400-e29b-41d4-a716-446655440002', 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop', true, NOW()),
('550e8400-e29b-41d4-a716-446655440103', '550e8400-e29b-41d4-a716-446655440003', 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop', true, NOW()),
('550e8400-e29b-41d4-a716-446655440104', '550e8400-e29b-41d4-a716-446655440004', 'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=800&h=600&fit=crop', true, NOW()),
('550e8400-e29b-41d4-a716-446655440105', '550e8400-e29b-41d4-a716-446655440005', 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop', true, NOW()),
('550e8400-e29b-41d4-a716-446655440106', '550e8400-e29b-41d4-a716-446655440006', 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop', true, NOW());

-- Seed data for admin_users table
INSERT INTO admin_users (id, email, name, role, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440201', 'admin@autofy.com', 'Admin User', 'admin', NOW()),
('550e8400-e29b-41d4-a716-446655440202', 'manager@autofy.com', 'Manager User', 'manager', NOW()); 