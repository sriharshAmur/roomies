'use client';

import Footer from '@/components/Footer';
import NavigationHeader from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useUserStore } from '@/components/providers/user-store-provider';
import { BarChart, DollarSign, Home, Key, MessageCircle, Shield, Users, Zap } from 'lucide-react';
import React from 'react';

export default function LandingPage() {
  const userRole = useUserStore((state) => state.userRole);

  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-background-secondary to-background-tertiary transition-colors duration-300'>
      <NavigationHeader />

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

      <Footer />
    </div>
  );
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
