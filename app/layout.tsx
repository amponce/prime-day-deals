import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { DarkModeProvider } from '@/components/DarkModeContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PrimeDealHub - Prime Day TV Deals 2025 | Verified Deals & Expert Reviews',
  description: 'Save up to 70% on premium TVs during Prime Day. Hand-picked OLED, QLED, and Mini-LED deals verified by experts. Updated hourly with real-time pricing.',
  keywords: 'Prime Day TV deals, OLED TV deals, QLED TV sales, Mini-LED TVs, TV buying guide, Amazon Prime Day 2025',
  openGraph: {
    title: 'PrimeDealHub - Save Up to 70% on Premium TVs',
    description: 'Hand-picked Prime Day TV deals verified by experts. Real-time pricing on OLED, QLED, and Mini-LED TVs.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=1200&h=630',
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="pinterest-rich-pin" content="true" />
      </head>
      <body className={`${inter.className} bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text transition-colors duration-300`}>
        <DarkModeProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </DarkModeProvider>
      </body>
    </html>
  )
}