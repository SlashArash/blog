import { notFound } from 'next/navigation'

import KeystaticApp from './keystatic'
import { showAdminUI } from '../../keystatic.config'

export default function KeystaticLayout() {
  if (showAdminUI === false) {
    notFound()
  }
  return (
    <div dir="ltr" className="min-h-screen bg-white text-zinc-900">
      <KeystaticApp />
    </div>
  )
}
