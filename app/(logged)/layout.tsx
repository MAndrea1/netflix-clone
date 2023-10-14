//layouts.tsx

import "../globals.css"
import type { Metadata } from "next";
import { Inter } from "next/font/google"
import Header from "../components/Header"

const inter = Inter({ subsets: ['latin'] })

const APP_NAME = "Netflix PWA";
const APP_DEFAULT_TITLE = "A Netflix PWA App";
const APP_TITLE_TEMPLATE = "%s - Netflix PWA";
const APP_DESCRIPTION = "An installable PWA Netflix clone";

export const metadata: Metadata = {
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  icons: {
    icon: 'https://assets.nflxext.com/ffe/siteui/common/icons/nficon2016.ico',
  },    
  applicationName: APP_NAME,
  manifest: "/manifest.json",
  themeColor: "#d10404",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        {/* lightbox */}
      </body>
    </html>
  )
}
