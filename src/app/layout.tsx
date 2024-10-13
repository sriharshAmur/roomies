import Footer from '@/components/Footer';
import NavigationHeader from '@/components/Header';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { UserStoreProvider } from '@/components/providers/user-store-provider';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Rooomies - Connect Tenants and Landlords',
  description: 'Find your perfect home or ideal tenant with Rooomies',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
            <UserStoreProvider>
              <NavigationHeader />
              <main>{children}</main>
              <Footer />
            </UserStoreProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
