//(login)/layouts.tsx

import { Metadata } from "next";
export const metadata: Metadata = {
  title: {
    default: 'Login',
    template: 'Netflix PWA - %s',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
