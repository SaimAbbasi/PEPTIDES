'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem('pepticore-cookies')
    if (!accepted) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem('pepticore-cookies', 'accepted')
    setVisible(false)
  }

  function decline() {
    localStorage.setItem('pepticore-cookies', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-2xl mx-auto bg-surface border border-border-subtle rounded-xl p-4 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-text-secondary text-sm flex-1">
          We use essential cookies to keep your cart and session. No tracking or advertising cookies.{' '}
          <Link href="/privacy" className="text-accent hover:underline">Learn more</Link>
        </p>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary border border-border-subtle rounded-lg transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-sm bg-accent text-black font-semibold rounded-lg hover:bg-accent/90 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
