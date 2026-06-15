import { Warning } from '@phosphor-icons/react/ssr'

export function ComplianceBanner() {
  return (
    <div className="bg-surface border border-border-subtle py-2 px-4 text-center">
      <p className="text-text-muted text-xs flex items-center justify-center gap-2">
        <Warning size={12} className="text-yellow-500 flex-shrink-0" />
        For research use only. Not for human consumption. Must be 18+ to purchase.
      </p>
    </div>
  )
}
