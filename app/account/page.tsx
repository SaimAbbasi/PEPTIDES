'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { User, Package, SignOut } from '@phosphor-icons/react'

type AuthMode = 'login' | 'register' | 'loggedIn'

export default function AccountPage() {
  const [mode, setMode] = useState<AuthMode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loggedInUser, setLoggedInUser] = useState<{ email: string; name: string } | null>(null)

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!email || !password) { setError('Please fill in all fields.'); return }
    if (!email.includes('@')) { setError('Please enter a valid email.'); return }
    setLoggedInUser({ email, name: email.split('@')[0] })
    setMode('loggedIn')
  }

  function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!name || !email || !password) { setError('Please fill in all fields.'); return }
    if (!email.includes('@')) { setError('Please enter a valid email.'); return }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
    setLoggedInUser({ email, name })
    setMode('loggedIn')
  }

  function handleSignOut() {
    setLoggedInUser(null)
    setEmail('')
    setPassword('')
    setName('')
    setError('')
    setMode('login')
  }

  if (mode === 'loggedIn' && loggedInUser) {
    return (
      <div className="max-w-lg mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <User size={48} className="text-accent mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-text-primary">My Account</h1>
          <p className="text-text-secondary mt-2">Welcome back, {loggedInUser.name}</p>
        </div>

        {/* Account Details */}
        <div className="bg-surface border border-border-subtle rounded-xl p-8 mb-6">
          <h2 className="text-text-primary font-bold mb-4">Account Details</h2>
          <div className="space-y-3">
            <div>
              <span className="text-text-muted text-sm">Name</span>
              <p className="text-text-primary text-sm mt-0.5">{loggedInUser.name}</p>
            </div>
            <div>
              <span className="text-text-muted text-sm">Email</span>
              <p className="text-text-primary text-sm mt-0.5">{loggedInUser.email}</p>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Package size={20} className="text-text-muted" />
            <h2 className="text-text-primary font-bold">My Orders</h2>
          </div>
          <div className="bg-surface border border-border-subtle rounded-xl p-8 text-center">
            <p className="text-text-muted text-sm mb-4">No orders yet. Start shopping!</p>
            <Link
              href="/products"
              className="inline-block text-accent text-sm font-semibold hover:underline"
            >
              Browse Products
            </Link>
          </div>
        </div>

        {/* Sign Out */}
        <Button
          size="lg"
          variant="secondary"
          className="w-full flex items-center justify-center gap-2"
          onClick={handleSignOut}
        >
          <SignOut size={18} />
          Sign Out
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-10">
        <User size={48} className="text-accent mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-text-primary">My Account</h1>
      </div>

      {/* Tabs */}
      <div className="flex bg-surface border border-border-subtle rounded-xl overflow-hidden mb-8">
        {(['login', 'register'] as const).map((t) => (
          <button
            key={t}
            onClick={() => { setMode(t); setError('') }}
            className={`flex-1 py-3 text-sm font-semibold transition-colors capitalize ${
              mode === t ? 'bg-accent text-black' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {t === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        ))}
      </div>

      {/* Form */}
      <div className="bg-surface border border-border-subtle rounded-xl p-8">
        <form onSubmit={mode === 'login' ? handleLogin : handleRegister} noValidate>
          <div className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-text-secondary text-sm mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-surface-elevated border border-border-subtle rounded-md px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            )}
            <div>
              <label className="block text-text-secondary text-sm mb-1">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-elevated border border-border-subtle rounded-md px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label className="block text-text-secondary text-sm mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-elevated border border-border-subtle rounded-md px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            {mode === 'register' && (
              <p className="text-text-muted text-xs">
                By creating an account you confirm you are 18+ and agree to purchase products for research purposes only.
              </p>
            )}
            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}
            <Button size="lg" variant="primary" className="w-full mt-2">
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </Button>
          </div>
        </form>
      </div>

      {/* Order history placeholder (pre-login) */}
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
