'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Home,
  Users,
  Shield,
  BarChart,
  Building,
  User,
  Key,
  MessageCircle,
  DollarSign,
  Zap,
  Sun,
  Moon,
  Menu,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { motion, AnimatePresence } from 'framer-motion';

type UserRole = 'tenant' | 'landlord';

interface NavigationHeaderProps {
  userRole: UserRole;
  setUserRole: React.Dispatch<React.SetStateAction<UserRole>>;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const DotBackground: React.FC = () => (
  <div className='absolute inset-0 dark:bg-dot-white/[0.2] bg-dot-black/[0.2]'>
    <div className='absolute pointer-events-none inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_50%,black)]'></div>
  </div>
);

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
  <Card className='group hover:shadow-xl transition-all duration-300 border border-gray-300 dark:border-gray-700 bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:-translate-y-1 hover:scale-105'>
    <CardHeader>
      <Icon className='h-10 w-10 mb-4 text-primary group-hover:text-primary-hover transition-colors duration-300 transform group-hover:scale-110 group-hover:rotate-3' />
      <h3 className='text-xl font-semibold text-primary'>{title}</h3>
    </CardHeader>
    <CardContent>
      <p className='text-muted-foreground'>{description}</p>
    </CardContent>
  </Card>
);

const UserRoleToggle: React.FC<{ userRole: UserRole; setUserRole: React.Dispatch<React.SetStateAction<UserRole>> }> = ({
  userRole,
  setUserRole,
}) => (
  <div className='relative bg-muted rounded-full p-0.5 transition-all duration-300 ease-in-out'>
    <div
      className='absolute inset-y-0.5 w-1/2 bg-background rounded-full transition-all duration-300 ease-in-out shadow-sm'
      style={{
        transform: userRole === 'tenant' ? 'translateX(0)' : 'translateX(100%)',
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

const NavigationHeader: React.FC<NavigationHeaderProps> = ({ userRole, setUserRole, darkMode, toggleDarkMode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-colors duration-300'>
      <div className='container px-4 mx-auto flex h-16 items-center justify-between'>
        <Link href='/' className='flex items-center space-x-2'>
          <Home className='h-6 w-6 text-primary' />
          <span className='font-bold text-xl text-primary'>Rooomies</span>
        </Link>
        <div className='hidden md:flex items-center justify-center flex-1'>
          <UserRoleToggle userRole={userRole} setUserRole={setUserRole} />
        </div>
        <div className='flex items-center space-x-4'>
          <div className='hidden md:flex items-center space-x-4'>
            <Button variant='outline' size='sm'>
              {userRole === 'landlord' ? 'Add Property' : 'Find Home'}
            </Button>
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
          <Button variant='ghost' size='icon' onClick={toggleDarkMode}>
            {darkMode ? <Sun className='h-5 w-5' /> : <Moon className='h-5 w-5' />}
          </Button>
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
                <UserRoleToggle userRole={userRole} setUserRole={setUserRole} />
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

export default function LandingPage() {
  const [userRole, setUserRole] = useState<UserRole>('tenant');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-background-secondary to-background-tertiary transition-colors duration-300'>
      <NavigationHeader
        userRole={userRole}
        setUserRole={setUserRole}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <main className='container mx-auto px-4'>
        <section className='py-24 md:py-32 lg:py-40 text-center relative overflow-hidden mt-12'>
          <DotBackground />
          <div className='relative z-10'>
            <h1 className='text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
              {userRole === 'tenant' ? 'Find Your Dream Home' : 'Connect with Perfect Tenants'}
            </h1>
            <p className='text-xl text-muted-foreground mb-10 max-w-2xl mx-auto'>
              {userRole === 'tenant'
                ? 'Discover your ideal living space with Rooomies. We make house-hunting a breeze!'
                : 'List your property and find reliable tenants effortlessly. Let Rooomies simplify your rental process!'}
            </p>
            <div className='flex justify-center space-x-4'>
              <Button size='lg' className='bg-primary hover:bg-primary-hover'>
                Get Started
              </Button>
              <Button size='lg' variant='outline' className='text-primary border-primary hover:bg-primary-hover/10'>
                Learn More
              </Button>
            </div>
          </div>
        </section>

        <section className='py-24 md:py-32'>
          <h2 className='text-3xl font-bold mb-12 text-center text-primary'>Key Features</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {[
              {
                icon: Home,
                title: 'Smart Listings',
                description:
                  userRole === 'tenant'
                    ? 'Find properties tailored to your needs'
                    : 'Showcase your property to the right audience',
              },
              {
                icon: Users,
                title: 'Perfect Matches',
                description:
                  userRole === 'tenant'
                    ? 'Connect with compatible roommates'
                    : 'Find reliable tenants that fit your criteria',
              },
              {
                icon: Shield,
                title: 'Secure Platform',
                description: 'Your data and transactions are always protected',
              },
              {
                icon: BarChart,
                title: 'Market Insights',
                description:
                  userRole === 'tenant'
                    ? 'Make informed decisions with real-time market data'
                    : 'Set competitive prices with our market analysis',
              },
            ].map((feature, index) => (
              <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} />
            ))}
          </div>
        </section>

        <section className='py-24 md:py-32 bg-primary text-primary-foreground rounded-3xl my-24 transform hover:scale-[1.02] transition-transform duration-300'>
          <div className='max-w-4xl mx-auto text-center'>
            <h2 className='text-3xl font-bold mb-8'>How It Works</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
              {[
                {
                  title: 'Create Your Profile',
                  description:
                    userRole === 'tenant'
                      ? 'Set your preferences and budget'
                      : 'List your property details and requirements',
                },
                {
                  title: userRole === 'tenant' ? 'Browse Listings' : 'Receive Applications',
                  description:
                    userRole === 'tenant'
                      ? 'Find properties that match your criteria'
                      : "Review potential tenants' profiles",
                },
                {
                  title: 'Connect and Finalize',
                  description:
                    userRole === 'tenant'
                      ? 'Schedule viewings and apply for your favorite homes'
                      : 'Choose your ideal tenant and complete the agreement',
                },
              ].map((step, index) => (
                <div key={index} className='flex flex-col items-center group'>
                  <div className='w-20 h-20 rounded-full bg-primary-foreground/20 flex items-center justify-center mb-6 shadow-lg group-hover:bg-primary-foreground/30 transition-colors duration-300 transform group-hover:scale-110'>
                    <span className='text-3xl font-bold text-primary-foreground transition-colors duration-300'>
                      {index + 1}
                    </span>
                  </div>
                  <h3 className='text-2xl font-semibold mb-4'>{step.title}</h3>
                  <p className='text-primary-foreground/80'>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className='py-24 md:py-32'>
          <h2 className='text-3xl font-bold mb-12 text-center text-primary'>Why Choose Rooomies?</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {[
              {
                icon: Zap,
                title: 'Lightning Fast',
                description:
                  userRole === 'tenant'
                    ? 'Find your ideal home in record time'
                    : 'List your property and get responses quickly',
              },
              {
                icon: Shield,
                title: 'Verified Users',
                description: 'All users go through a thorough verification process',
              },
              {
                icon: MessageCircle,
                title: 'Seamless Communication',
                description: 'Chat instantly with potential matches',
              },
              {
                icon: DollarSign,
                title: 'Transparent Pricing',
                description:
                  userRole === 'tenant' ? 'No hidden fees or surprises' : 'Set fair prices with our market insights',
              },
              { icon: Users, title: 'Community-Driven', description: 'Join a network of like-minded individuals' },
              { icon: Key, title: 'Secure Transactions', description: 'Your payments and data are always protected' },
            ].map((reason, index) => (
              <FeatureCard key={index} icon={reason.icon} title={reason.title} description={reason.description} />
            ))}
          </div>
        </section>

        <section className='py-24 md:py-32 text-center'>
          <h2 className='text-4xl font-bold mb-6 text-primary'>
            Ready to Transform Your {userRole === 'tenant' ? 'Living Experience' : 'Rental Business'}?
          </h2>
          <p className='text-xl text-muted-foreground mb-10 max-w-2xl mx-auto'>
            {userRole === 'tenant'
              ? "Join Rooomies today and discover a new way of finding your perfect home. It's time to make your housing journey smooth and enjoyable."
              : "List your property on Rooomies and connect with reliable tenants effortlessly. Simplify your rental process and maximize your property's potential."}
          </p>
          <Button size='lg' className='bg-primary hover:bg-primary-hover text-lg px-8 py-6'>
            Get Started Now
          </Button>
        </section>
      </main>

      <footer className='bg-primary text-primary-foreground py-12'>
        <div className='container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div>
            <h3 className='text-xl font-semibold mb-4'>Rooomies</h3>
            <p>
              Connecting {userRole === 'tenant' ? 'tenants with their dream homes' : 'landlords with ideal tenants'} for
              a better renting experience.
            </p>
          </div>
          <div>
            <h3 className='text-xl font-semibold mb-4'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <Link href='#' className='hover:text-primary-foreground/80 transition-colors'>
                  About Us
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-primary-foreground/80 transition-colors'>
                  FAQs
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-primary-foreground/80 transition-colors'>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='text-xl font-semibold mb-4'>Follow Us</h3>
            <div className='flex space-x-4'>
              <Link href='#' className='hover:text-primary-foreground/80 transition-colors'>
                <span className='sr-only'>Facebook</span>
                <svg className='h-6 w-6' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                  <path
                    fillRule='evenodd'
                    d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
                    clipRule='evenodd'
                  />
                </svg>
              </Link>
              <Link href='#' className='hover:text-primary-foreground/80 transition-colors'>
                <span className='sr-only'>Instagram</span>
                <svg className='h-6 w-6' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                  <path
                    fillRule='evenodd'
                    d='M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z'
                    clipRule='evenodd'
                  />
                </svg>
              </Link>
              <Link href='#' className='hover:text-primary-foreground/80 transition-colors'>
                <span className='sr-only'>Twitter</span>
                <svg className='h-6 w-6' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                  <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <div className='container mx-auto px-4 mt-8 pt-8 border-t border-primary-foreground/20 text-center'>
          <p>&copy; 2024 Rooomies. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
