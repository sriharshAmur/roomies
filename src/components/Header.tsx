'use client';

import { Button } from '@/components/ui/button';
import { useUserStore } from '@/components/providers/user-store-provider';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { AnimatePresence, motion } from 'framer-motion';
import { Building, Home, Menu, User, X } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import ToggleTheme from './toggleTheme';

const NavigationHeader: React.FC = () => {
  const userRole = useUserStore((state) => state.userRole);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-colors duration-300'>
      <div className='container px-4 mx-auto flex h-16 items-center justify-between'>
        <Link href='/' className='flex items-center space-x-2'>
          <Home className='h-6 w-6 text-primary' />
          <span className='font-bold text-xl text-primary'>Rooomies</span>
        </Link>
        <div className='hidden md:flex items-center justify-center flex-1'>
          <UserRoleToggle />
        </div>
        <div className='flex items-center space-x-4'>
          <div className='hidden md:flex items-center space-x-4'>
            <Link href='/properties'>
              <Button variant='outline' size='sm'>
                {userRole === 'landlord' ? 'Add Property' : 'Find Home'}
              </Button>
            </Link>
            <SignedOut>
              <SignInButton>
                <Button variant='default' size='sm' className='bg-primary hover:bg-primary-hover'>
                  Login
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <div className='text-primary'>
                <UserButton
                  showName
                  appearance={{
                    elements: {
                      userButtonOuterIdentifier: 'text-primary',
                    },
                  }}
                />
              </div>
            </SignedIn>
          </div>
          <ToggleTheme />
          <Button variant='ghost' size='icon' className='md:hidden' onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className='md:hidden bg-background border-t'
          >
            <div className='container mx-auto py-4 space-y-4'>
              <div className='flex justify-center'>
                <UserRoleToggle />
              </div>
              <Button variant='outline' size='sm' className='w-full'>
                {userRole === 'landlord' ? 'Add Property' : 'Find Home'}
              </Button>
              <SignedOut>
                <SignInButton>
                  <Button variant='default' size='sm' className='w-full bg-primary hover:bg-primary-hover'>
                    Login
                  </Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <div className='text-primary flex justify-center'>
                  <UserButton
                    showName
                    appearance={{
                      elements: {
                        userButtonOuterIdentifier: 'text-primary',
                      },
                    }}
                  />
                </div>
              </SignedIn>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const UserRoleToggle = () => {
  const userRole = useUserStore((state) => state.userRole);
  const setUserRole = useUserStore((state) => state.setUserRole);
  return (
    <div className='relative bg-muted rounded-full p-0.5 transition-all duration-300 ease-in-out'>
      <div
        className='absolute inset-y-0.5 w-1/2 bg-background rounded-full transition-all duration-300 ease-in-out shadow-sm'
        style={{
          transform: userRole === 'tenant' ? 'translateX(0)' : 'translateX(calc(100% - 0.2rem))',
        }}
      ></div>
      <div className='relative flex'>
        <button
          onClick={() => setUserRole('tenant')}
          className={`z-10 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ease-in-out flex items-center justify-center w-24 ${
            userRole === 'tenant' ? 'text-primary' : 'text-muted-foreground hover:text-primary'
          }`}
        >
          <User className='h-3.5 w-3.5 mr-1.5' />
          Tenant
        </button>
        <button
          onClick={() => setUserRole('landlord')}
          className={`z-10 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ease-in-out flex items-center justify-center w-26 ${
            userRole === 'landlord' ? 'text-primary' : 'text-muted-foreground hover:text-primary'
          }`}
        >
          <Building className='w-3.5 h-3.5 mr-1.5' />
          Landlord
        </button>
      </div>
    </div>
  );
};

export default NavigationHeader;
