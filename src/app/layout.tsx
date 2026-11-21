import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { TopStrip } from '@/components/layout/TopStrip';
import { Header } from '@/components/layout/Header';
import { MobileNav } from '@/components/layout/MobileNav';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { ToastProvider } from '@/components/common/Toast';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'BLOSSOM LUXE | Unfolding the Art of Luxury | Indo-Western, Corsets & Festive Wear',
  description: 'Shop luxury Indo-Western sets, boned corsets, and royal festive wear. Modern Indian silhouettes designed for the celebration of a lifetime.',
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col bg-ivory text-burgundy selection:bg-rose selection:text-burgundy">
        <ToastProvider>
          {/* Top Announcement Strip */}
          <TopStrip />

          {/* Sticky Header with Navigation and Search */}
          <Header />

          {/* Main Page Content with bottom padding for mobile bottom nav */}
          <main className="flex-1 pb-16 md:pb-0">{children}</main>

          {/* Footer */}
          <Footer />

          {/* Mobile Bottom Navigation (sticky on mobile) */}
          <MobileNav />

          {/* Global Cart Slide-over Drawer */}
          <CartDrawer />
        </ToastProvider>
      </body>
    </html>
  );
}

