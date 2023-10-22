'use client'
import Modal from "../components/Modal"
//(logged)/layouts.tsx
// RecoilRoot needs to be used in client components. We add 'use client' to the layout so all the children, that have access to RecoilRoot, will be client served.

import Header from "../components/Header"
import { RecoilRoot } from "recoil"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RecoilRoot>
      <Header />
      {children}
      <Modal/>
    </RecoilRoot>
  )
}
