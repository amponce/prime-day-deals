import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Best TV Deals & Room Inspiration | Shop Smart Home Setups',
  description: 'Find the best TV deals on OLED, QLED, and Mini-LED TVs. Create your dream living room with shoppable room designs. Prime Day deals and beyond!',
  keywords: 'TV deals, OLED TV, QLED TV, living room ideas, room design, Prime Day deals, home decor',
  openGraph: {
    title: 'Best TV Deals & Dream Room Designs',
    description: 'Shop curated TV deals and complete room setups. Save up to 60% on top brands.',
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
    <html lang="en">
      <head>
        <meta name="pinterest-rich-pin" content="true" />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}