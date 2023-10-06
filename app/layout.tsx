//layouts.tsx

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from './components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'A Netflix Clone',
  description: 'A Netflix clone description',
  icons: {
    icon: 'https://assets.nflxext.com/ffe/siteui/common/icons/nficon2016.ico',
  },  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header/>
        {children}
        {/* lightbox */}
      </body>
    </html>
  )
}
