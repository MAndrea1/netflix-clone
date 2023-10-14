//layouts.tsx

import "../../globals.css"
import type { Metadata } from "next";
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ['latin'] })

const APP_NAME = "Netflix PWA";
const APP_DEFAULT_TITLE = "Login";
const APP_TITLE_TEMPLATE = "%s - Login";

export const metadata: Metadata = {
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  icons: {
    icon: 'https://assets.nflxext.com/ffe/siteui/common/icons/nficon2016.ico',
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
        {children}
      </body>
    </html>
  )
}
