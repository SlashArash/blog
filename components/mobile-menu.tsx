'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

import { menuItems } from '../consts/menu-items'
import Button from './button'

const navContainer = {
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      x: { velocity: 100 },
      duration: 0.3,
    },
  },
  hidden: {
    x: -250,
    opacity: 0,
    transition: {
      x: { velocity: 100 },
      duration: 0.3,
    },
  },
}
const navList = {
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.07,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
}

const navItem = {
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  hidden: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
}

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <Button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:ring-2 transition-all"
        aria-label="Toggle Menu"
      >
        <Menu size={20} />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-20"
            />

            {/* Menu Panel */}
            <motion.div
              initial="hidden"
              animate={isOpen ? 'visible' : 'hidden'}
              exit="hidden"
              variants={navContainer}
              className="fixed end-0 top-0 h-full w-[220px] bg-zinc-100 dark:bg-zinc-900 z-30 p-6 shadow-2xl"
            >
              <Button onClick={() => setIsOpen(false)} className="mb-10">
                <X size={20} />
              </Button>

              <motion.nav
                className="flex flex-col gap-5 text-lg"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={navList}
              >
                {menuItems.map((item) => (
                  <motion.a
                    className="nav-item"
                    variants={navItem}
                    key={item.title}
                    href={item.url}
                    onClick={() => setIsOpen(false)}
                    {...item.options}
                  >
                    <p>{item.title}</p>
                  </motion.a>
                ))}
              </motion.nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
