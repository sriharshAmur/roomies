'use client';

import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Home, User, Search, Building, Key, BarChart, Shield } from 'lucide-react';
import Link from 'next/link';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function LandingPage() {
  const [userType, setUserType] = useState<'tenant' | 'landlord'>('tenant');

  const toggleUserType = (type: 'tenant' | 'landlord') => {
    setUserType(type);
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-geist-sans ${userType === 'tenant' ? 'bg-tenant' : 'bg-landlord'}`}
    >
      <header className='border-b border-white/10 bg-white/10 backdrop-blur-md'>
        <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
          <Link href='/' className='text-3xl font-bold text-white'>
            Ro<span className='text-[hsl(var(--accent-yellow))]'>ooo</span>mies
          </Link>
          <div className='flex items-center space-x-4'>
            <button
              onClick={() => toggleUserType('tenant')}
              className={`text-sm flex items-center ${
                userType === 'tenant' ? 'text-white font-medium' : 'text-white/70'
              }`}
            >
              <Home className='mr-1 h-4 w-4' />
              Tenants
            </button>
            <Switch
              checked={userType === 'landlord'}
              onCheckedChange={(checked) => toggleUserType(checked ? 'landlord' : 'tenant')}
              className={`${userType === 'tenant' ? 'bg-[hsl(var(--tenant-to))]' : 'bg-[hsl(var(--landlord-to))]'}`}
            />
            <button
              onClick={() => toggleUserType('landlord')}
              className={`text-sm flex items-center ${
                userType === 'landlord' ? 'text-white font-medium' : 'text-white/70'
              }`}
            >
              <User className='mr-1 h-4 w-4' />
              Landlords
            </button>
          </div>
          <nav className='flex items-center space-x-4'>
            <Link
              href='/properties'
              className='text-sm text-white hover:text-[hsl(var(--accent-yellow))] transition-colors'
            >
              Properties
            </Link>
            <SignedOut>
              <SignInButton>
                <button className='text-sm text-white border border-white px-3 py-1 rounded-md transition-colors hover:bg-white hover:text-[hsl(var(--tenant-from))]'>
                  Login
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <div className='text-white'>
                <UserButton
                  showName
                  appearance={{
                    elements: {
                      userButtonOuterIdentifier: 'text-white',
                    },
                  }}
                />
              </div>
            </SignedIn>
          </nav>
        </div>
      </header>

      <main className='flex-grow container mx-auto px-4 py-12'>
        <div className='max-w-4xl mx-auto text-center mb-16'>
          <h1 className='text-5xl font-bold mb-6 text-white leading-tight'>
            {userType === 'tenant' ? 'Find Your Perfect Home' : "Maximize Your Property's Potential"}
          </h1>
          <p className='text-xl text-white/90 mb-8'>
            {userType === 'tenant'
              ? 'Discover your ideal living space with ease and confidence.'
              : 'Streamline your property management and boost your rental income.'}
          </p>

          <div className='max-w-md mx-auto'>
            <div className='relative'>
              <Select>
                <SelectTrigger className='w-full bg-white/20 border-white/30 text-white placeholder-white/70'>
                  <SelectValue placeholder='Choose a City' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='new-york'>New York</SelectItem>
                  <SelectItem value='los-angeles'>Los Angeles</SelectItem>
                  <SelectItem value='chicago'>Chicago</SelectItem>
                  <SelectItem value='houston'>Houston</SelectItem>
                </SelectContent>
              </Select>
              <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                <Search className='h-5 w-5 text-white/70' />
              </div>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {userType === 'tenant' ? (
            <>
              <InfoCard
                icon={<Building className='h-8 w-8 mb-4 text-[hsl(var(--accent-yellow))]' />}
                title='Extensive Listings'
                description='Browse through a curated selection of properties that match your unique preferences and budget.'
              />
              <InfoCard
                icon={<Key className='h-8 w-8 mb-4 text-[hsl(var(--accent-yellow))]' />}
                title='Virtual Tours'
                description='Experience immersive 3D tours of properties from the comfort of your home, saving you time and effort.'
              />
              <InfoCard
                icon={<Shield className='h-8 w-8 mb-4 text-[hsl(var(--accent-yellow))]' />}
                title='Secure Applications'
                description='Apply to multiple properties with a single, secure profile. Your data is always protected and easily manageable.'
              />
            </>
          ) : (
            <>
              <InfoCard
                icon={<Building className='h-8 w-8 mb-4 text-[hsl(var(--accent-yellow))]' />}
                title='Smart Listing Management'
                description='Easily create and manage property listings with our intuitive tools. Reach thousands of potential tenants effortlessly.'
              />
              <InfoCard
                icon={<User className='h-8 w-8 mb-4 text-[hsl(var(--accent-yellow))]' />}
                title='Advanced Tenant Screening'
                description='Make informed decisions with our comprehensive tenant screening reports, including credit checks and rental history.'
              />
              <InfoCard
                icon={<BarChart className='h-8 w-8 mb-4 text-[hsl(var(--accent-yellow))]' />}
                title='Financial Insights'
                description="Gain valuable insights into your property's performance with detailed financial reports and analytics."
              />
            </>
          )}
        </div>
      </main>

      <footer className='bg-black/20 py-8 mt-16'>
        <div className='container mx-auto px-4 text-center text-white/80'>
          <p>&copy; 2024 Rooomies. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function InfoCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className='bg-white/10 backdrop-blur-md rounded-lg p-6 transition-all duration-300 hover:bg-white/20 hover:shadow-lg hover:scale-105 relative overflow-hidden group'>
      <div className='relative z-10'>
        {icon}
        <h2 className='text-xl font-semibold mb-2 text-white'>{title}</h2>
        <p className='text-white/80'>{description}</p>
      </div>
      <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000' />
    </div>
  );
}
