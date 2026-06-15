'use client'

import Link from 'next/link'
import { ShoppingCart, User, MagnifyingGlass, List, X, Flask } from '@phosphor-icons/react'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/lib/context/CartContext'
import { useCartDrawer } from '@/lib/context/CartDrawerContext'
import { ComplianceBanner } from '@/components/ui/ComplianceBanner'

const navLinks = [
  { href: '/products?category=research', label: 'Research' },
  { href: '/products?category=cosmetic', label: 'Cosmetic' },
  { href: '/products?category=performance', label: 'Performance' },
  { href: '/products?category=bundle', label: 'Bundles' },
  { href: '/peptides', label: 'Library' },
  { href: '/blog', label: 'Research Blog' },
]

export function Navbar() {
  const { totalItems } = useCart()
  const { openDrawer } = useCartDrawer()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus()
  }, [searchOpen])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setSearchOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <>
      <ComplianceBanner />
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-background/95 backdrop-blur border-b border-border-subtle shadow-lg'
            : 'bg-background/80 backdrop-blur'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <Flask className="text-accent" size={22} />
              <span className="text-xl font-black tracking-wider text-text-primary group-hover:text-accent transition-colors">
                PEPTICORE
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-text-secondary hover:text-text-primary text-sm font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                aria-label="Search products"
                className="text-text-secondary hover:text-text-primary transition-colors"
                onClick={() => setSearchOpen(true)}
              >
                <MagnifyingGlass size={20} />
              </button>
              <Link href="/account" className="text-text-secondary hover:text-text-primary transition-colors">
                <User size={20} />
              </Link>
              <button
                aria-label="Open cart"
                onClick={openDrawer}
                className="relative text-text-secondary hover:text-text-primary transition-colors"
              >
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              <button
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                className="md:hidden text-text-secondary hover:text-text-primary transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X size={20} /> : <List size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div className="md:hidden pb-4 border-t border-border-subtle mt-2 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-2 text-text-secondary hover:text-text-primary text-sm font-medium transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </nav>
      </header>

      {/* Search overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-surface border border-border-subtle rounded-xl p-6 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <form onSubmit={handleSearch} className="flex items-center gap-3">
              <MagnifyingGlass size={20} className="text-text-muted flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search peptides…"
                className="flex-1 bg-transparent text-text-primary placeholder-text-muted text-lg outline-none"
              />
              <button
                type="button"
                aria-label="Close search"
                onClick={() => setSearchOpen(false)}
                className="text-text-muted hover:text-text-primary transition-colors"
              >
                <X size={20} />
              </button>
            </form>
            <p className="text-text-muted text-xs mt-4">Press Enter to search · Esc to close</p>
          </div>
        </div>
      )}
    </>
  )
}
