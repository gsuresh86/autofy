# 🚗 Autofy - Car Buying Platform

A modern car buying platform built with Next.js 14, TypeScript, Tailwind CSS, and Supabase. Similar to Cars24 or Spinny, Autofy provides a comprehensive solution for browsing and managing car inventory.

## ✨ Features

### Public Pages
- **Homepage** with hero section, featured cars, and statistics
- **Cars Listing** with advanced search and filtering
- **Car Details** with image gallery and specifications
- **Responsive Design** optimized for all devices

### Admin Panel
- **Dashboard** with statistics and quick actions
- **Car Management** - Add, edit, and delete cars
- **Image Upload** with preview functionality
- **Status Management** (Available, Reserved, Sold)

### Search & Filters
- Search by car title, brand, or model
- Filter by price range, year, fuel type, transmission
- Location-based filtering
- Grid and list view options

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Supabase (Database, Authentication, Storage)
- **UI Components**: Lucide React Icons
- **Forms**: React Hook Form with Zod validation
- **Notifications**: React Hot Toast
- **Animations**: Framer Motion

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd autofy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   
   # Database URL (for direct connections if needed)
   DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.piegulqhxpgvkqrhrvdk.supabase.co:5432/postgres
   ```

4. **Set up Supabase Database**
   
   Run the following SQL in your Supabase SQL editor:

   ```sql
   -- Cars table
   CREATE TABLE cars (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     title TEXT NOT NULL,
     brand TEXT NOT NULL,
     model TEXT NOT NULL,
     year INTEGER NOT NULL,
     price DECIMAL NOT NULL,
     mileage INTEGER,
     fuel_type TEXT,
     transmission TEXT,
     color TEXT,
     description TEXT,
     location TEXT,
     contact_number TEXT,
     is_featured BOOLEAN DEFAULT false,
     status TEXT DEFAULT 'available' CHECK (status IN ('available', 'sold', 'reserved')),
     created_at TIMESTAMP DEFAULT now(),
     updated_at TIMESTAMP DEFAULT now()
   );

   -- Car images table
   CREATE TABLE car_images (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     car_id UUID REFERENCES cars(id) ON DELETE CASCADE,
     image_url TEXT NOT NULL,
     is_primary BOOLEAN DEFAULT false,
     created_at TIMESTAMP DEFAULT now()
   );

   -- Admin users table
   CREATE TABLE admin_users (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     email TEXT UNIQUE NOT NULL,
     name TEXT NOT NULL,
     role TEXT DEFAULT 'admin',
     created_at TIMESTAMP DEFAULT now()
   );

   -- Enable Row Level Security
   ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
   ALTER TABLE car_images ENABLE ROW LEVEL SECURITY;
   ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

   -- Create policies (adjust as needed)
   CREATE POLICY "Public cars are viewable by everyone" ON cars
     FOR SELECT USING (true);

   CREATE POLICY "Admin users can insert cars" ON cars
     FOR INSERT WITH CHECK (true);

   CREATE POLICY "Admin users can update cars" ON cars
     FOR UPDATE USING (true);

   CREATE POLICY "Admin users can delete cars" ON cars
     FOR DELETE USING (true);
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
autofy/
├── src/
│   ├── app/
│   │   ├── (public)/           # Public pages
│   │   │   ├── page.tsx        # Homepage
│   │   │   ├── cars/           # Cars listing
│   │   │   └── layout.tsx      # Public layout
│   │   ├── admin/              # Admin pages
│   │   │   ├── page.tsx        # Admin dashboard
│   │   │   ├── cars/           # Car management
│   │   │   └── layout.tsx      # Admin layout
│   │   └── layout.tsx          # Root layout
│   ├── components/             # Reusable components
│   │   ├── car-card.tsx        # Car listing card
│   │   ├── car-filters.tsx     # Search & filter component
│   │   └── header.tsx          # Navigation header
│   └── lib/                    # Utilities and config
│       ├── supabase.ts         # Supabase client
│       └── utils.ts            # Helper functions
├── public/                     # Static assets
└── package.json
```

## 🎯 Key Features Implementation

### Car Management
- **Add Cars**: Complete form with image upload
- **Edit Cars**: Update existing car details
- **Delete Cars**: Remove cars from inventory
- **Status Management**: Track car availability

### Search & Filtering
- **Real-time Search**: Search by title, brand, model
- **Advanced Filters**: Price, year, fuel type, transmission
- **Location Filtering**: Filter by city/location
- **Sorting Options**: Sort by price, year, mileage

### Image Management
- **Multiple Image Upload**: Upload multiple car images
- **Image Preview**: Preview uploaded images
- **Primary Image**: Set main display image
- **Image Gallery**: Display images in car details

## 🔧 Configuration

### Supabase Setup
1. Create a new Supabase project
2. Get your project URL and anon key
3. Set up the database schema (see SQL above)
4. Configure storage buckets for car images
5. Set up authentication if needed

### Environment Variables
Make sure to set all required environment variables in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
DATABASE_URL=your_database_url
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔒 Security

- Row Level Security (RLS) enabled on all tables
- Environment variables for sensitive data
- Input validation and sanitization
- CSRF protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/your-repo/autofy/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🎉 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Supabase](https://supabase.com/) for the backend services
- [Tailwind CSS](https://tailwindcss.com/) for the styling
- [Lucide React](https://lucide.dev/) for the icons

---

**Happy coding! 🚗✨**
