import Link from 'next/link'
import { Flask, Globe, ChatCircle, YoutubeLogo } from '@phosphor-icons/react'

const footerLinks = {
  Shop: [
    { href: '/products?category=research', label: 'Research Peptides' },
    { href: '/products?category=cosmetic', label: 'Cosmetic Peptides' },
    { href: '/products?category=performance', label: 'Performance Peptides' },
    { href: '/products?category=bundle', label: 'Bundles' },
  ],
  Company: [
    { href: '/about', label: 'About Us' },
    { href: '/blog', label: 'Research Blog' },
    { href: '/compliance', label: 'Compliance' },
  ],
  Support: [
    { href: '/account', label: 'My Account' },
    { href: '/cart', label: 'Cart' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border-subtle mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Flask className="text-accent" size={20} />
              <span className="text-lg font-black tracking-wider">PEPTICORE</span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              Research-grade peptides with verified purity. Every batch is third-party tested and comes with a full Certificate of Analysis.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-text-muted hover:text-text-primary transition-colors"><Globe size={18} /></a>
              <a href="#" className="text-text-muted hover:text-text-primary transition-colors"><ChatCircle size={18} /></a>
              <a href="#" className="text-text-muted hover:text-text-primary transition-colors"><YoutubeLogo size={18} /></a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-text-primary font-semibold text-sm uppercase tracking-widest mb-4">{group}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-text-secondary hover:text-text-primary text-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border-subtle mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-xs">
            &copy; {new Date().getFullYear()} PEPTICORE. All rights reserved.
          </p>
          <p className="text-text-muted text-xs text-center max-w-lg">
            All products are for research purposes only. Not for human consumption. Not intended to diagnose, treat, cure, or prevent any disease. Must be 18+ to purchase.
          </p>
        </div>
      </div>
    </footer>
  )
}
