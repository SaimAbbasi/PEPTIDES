'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { User, Package } from '@phosphor-icons/react'

type AccountTab = 'login' | 'register'

export default function AccountPage() {
  const [tab, setTab] = useState<AccountTab>('login')

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-10">
        <User size={48} className="text-accent mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-text-primary">My Account</h1>
      </div>

      {/* Tabs */}
      <div className="flex bg-surface border border-border-subtle rounded-xl overflow-hidden mb-8">
        {(['login', 'register'] as AccountTab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-3 text-sm font-semibold transition-colors capitalize ${
              tab === t ? 'bg-accent text-black' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {t === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        ))}
      </div>

      {/* Form */}
      <div className="bg-surface border border-border-subtle rounded-xl p-8">
        <div className="space-y-4">
          {tab === 'register' && (
            <div>
              <label className="block text-text-secondary text-sm mb-1">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full bg-surface-elevated border border-border-subtle rounded-md px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          )}
          <div>
            <label className="block text-text-secondary text-sm mb-1">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full bg-surface-elevated border border-border-subtle rounded-md px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <div>
            <label className="block text-text-secondary text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-surface-elevated border border-border-subtle rounded-md px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          {tab === 'register' && (
            <p className="text-text-muted text-xs">
              By creating an account you confirm you are 18+ and agree to purchase products for research purposes only.
            </p>
          )}
          <Button size="lg" variant="primary" className="w-full mt-2">
            {tab === 'login' ? 'Sign In' : 'Create Account'}
          </Button>
        </div>
      </div>

      {/* Order history placeholder */}
      <div className="mt-12">
        <div className="flex items-center gap-2 mb-4">
          <Package size={20} className="text-text-muted" />
          <h2 className="text-text-primary font-bold">Order History</h2>
        </div>
        <div className="bg-surface border border-border-subtle rounded-xl p-8 text-center">
          <p className="text-text-muted text-sm">Sign in to view your order history.</p>
        </div>
      </div>
    </div>
  )
}
