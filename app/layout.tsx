import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Providers } from '@/components/layout/Providers'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { ToastContainer } from '@/components/ui/Toast'
import { CookieBanner } from '@/components/ui/CookieBanner'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'PEPTICORE | Research-grade. Results-driven.',
    template: '%s | PEPTICORE',
  },
  description: 'Premium research peptides. Third-party lab tested with Certificate of Analysis. BPC-157, TB-500, Ipamorelin, and more.',
  keywords: ['research peptides', 'BPC-157', 'TB-500', 'Ipamorelin', 'peptide research', 'lab tested peptides'],
  openGraph: {
    type: 'website',
    siteName: 'PEPTICORE',
    title: 'PEPTICORE | Research-grade. Results-driven.',
    description: 'Premium research peptides. Third-party lab tested with Certificate of Analysis.',
    url: 'https://pepticore.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PEPTICORE | Research-grade. Results-driven.',
    description: 'Premium research peptides. Third-party lab tested with Certificate of Analysis.',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-background text-text-primary min-h-screen flex flex-col font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-black focus:font-semibold focus:rounded-lg"
        >
          Skip to main content
        </a>
        <Providers>
          <Navbar />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <ToastContainer />
          <CookieBanner />
        </Providers>
      </body>
    </html>
  )
}
