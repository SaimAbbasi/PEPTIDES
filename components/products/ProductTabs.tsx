'use client'

import { useState } from 'react'
import { Product } from '@/lib/types'
import { ExternalLink } from 'lucide-react'

interface ProductTabsProps {
  product: Product
}

type Tab = 'description' | 'research' | 'coa'

export function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>('description')

  const tabs: { id: Tab; label: string }[] = [
    { id: 'description', label: 'Description' },
    { id: 'research', label: 'Research Notes' },
    { id: 'coa', label: 'Certificate of Analysis' },
  ]

  return (
    <div>
      {/* Tab headers */}
      <div className="flex border-b border-border-subtle">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === tab.id
                ? 'border-accent text-accent'
                : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="py-8">
        {activeTab === 'description' && (
          <p className="text-text-secondary leading-relaxed">{product.description}</p>
        )}
        {activeTab === 'research' && (
          <div>
            <p className="text-text-secondary leading-relaxed mb-4">{product.researchNotes}</p>
            <p className="text-text-muted text-sm bg-surface-elevated border border-border-subtle rounded-lg p-4">
              Note: All research notes are for informational purposes only. These statements have not been evaluated by any regulatory authority. For research use only.
            </p>
          </div>
        )}
        {activeTab === 'coa' && (
          <div>
            <p className="text-text-secondary mb-6">
              Every PEPTICORE product is independently tested by a third-party laboratory. Download the Certificate of Analysis for this batch below.
            </p>
            <a
              href={product.coaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent/10 hover:bg-accent/20 text-accent border border-accent/20 rounded-lg px-6 py-3 text-sm font-medium transition-colors"
            >
              <ExternalLink size={16} />
              Download COA (PDF)
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
