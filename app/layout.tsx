import type { ReactNode } from 'react'
import { Metadata } from 'next'

import './global.css'
import { siteConfig } from '../config/site'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': [
        { url: '/feed.xml', title: 'بلاگ آرش کدخدائی - RSS Feed' },
      ],
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fa_IR',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  robots: {
    index: true,
    follow: true,
  },
}
