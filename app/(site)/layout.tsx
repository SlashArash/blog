import type { ReactNode } from 'react'
import { Vazirmatn } from 'next/font/google'

import { Header } from '../../components/header'
import { Footer } from '../../components/footer'
import { ThemeProvider } from '../../components/theme-provider'
import { GoogleAnalytics } from '@next/third-parties/google'

const vazir = Vazirmatn({
  subsets: ['arabic', 'latin'],
  display: 'swap',
  variable: '--font-vazir',
})

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div
      dir="rtl"
      className={`${vazir.variable} font-sans antialiased bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 min-h-screen`}
    >
      <ThemeProvider>
        <main className="max-w-2xl mx-auto px-4 flex flex-col gap-5">
          <Header />
          {children}
          <Footer />
        </main>
      </ThemeProvider>
      <GoogleAnalytics gaId="G-DRHQ5G3W3V" />
    </div>
  )
}
