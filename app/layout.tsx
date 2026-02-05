import type { ReactNode } from 'react'
import { Vazirmatn } from 'next/font/google'

import './global.css'
import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { ThemeProvider } from '../components/theme-provider'
import { siteConfig } from '../config/site'
import { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'

const vazir = Vazirmatn({
  subsets: ['arabic', 'latin'],
  display: 'swap',
  variable: '--font-vazir', // Define the CSS variable
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={vazir.variable}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200">
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
        <GoogleAnalytics gaId="G-DRHQ5G3W3V" />
      </body>
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
      'application/rss+xml': `${siteConfig.url}/feed.xml`,
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
