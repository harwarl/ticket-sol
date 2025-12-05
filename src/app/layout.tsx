import type { Metadata } from 'next'
import './globals.css'
import { AppProviders } from '@/components/app-providers'
import { AppLayout } from '@/components/app-layout'
import { Source_Code_Pro } from 'next/font/google'
import React from 'react'

const sourcePro = Source_Code_Pro({
  variable: '--font-source-pro',
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Dina Tickets',
  description: 'Manage your event tickets with ease',
}

const links: { label: string; path: string }[] = [{ label: 'My Events', path: '/events/dashboard' }]

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased ${sourcePro.className}`}>
        <AppProviders>
          <AppLayout links={links}>{children}</AppLayout>
        </AppProviders>
      </body>
    </html>
  )
}

declare global {
  interface BigInt {
    toJSON(): string
  }
}

BigInt.prototype.toJSON = function () {
  return this.toString()
}
