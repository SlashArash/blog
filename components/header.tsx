import Link from 'next/link'
import Image from 'next/image'

import { ThemeToggle } from './theme-toggle'
import { MobileMenu } from './mobile-menu'
import { menuItems } from '../consts/menu-items'

export function Header() {
  return (
    <nav className="transition-colors px-2 h-16 mb-4 flex items-center justify-between">
      {/* Logo / Name */}
      <Link href="/" className="flex items-center gap-3 group">
        <Image
          src="/images/arash.svg"
          alt="لوگوی آرش کدخدایی"
          priority
          className="object-contain"
          width={42}
          height={42}
        />
      </Link>

      {/* Links & Actions */}
      <div className="flex items-center gap-4 md:gap-6">
        <div className="hidden md:flex items-center gap-4 md:gap-6 text-sm font-medium">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              className="hover:text-primary transition-colors"
            >
              {item.title}
            </Link>
          ))}
        </div>
        <MobileMenu />
        <ThemeToggle />
      </div>
    </nav>
  )
}
