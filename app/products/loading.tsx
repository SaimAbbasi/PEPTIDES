export default function ProductsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex gap-8">
        {/* Sidebar skeleton */}
        <div className="hidden md:block w-56 flex-shrink-0">
          <div className="bg-surface border border-border-subtle rounded-xl p-6 animate-pulse">
            <div className="h-4 bg-surface-elevated rounded w-24 mb-4" />
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-8 bg-surface-elevated rounded" />
              ))}
            </div>
          </div>
        </div>
        {/* Grid skeleton */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-surface border border-border-subtle rounded-xl overflow-hidden animate-pulse">
              <div className="aspect-square bg-surface-elevated" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-surface-elevated rounded w-3/4" />
                <div className="h-3 bg-surface-elevated rounded w-full" />
                <div className="h-3 bg-surface-elevated rounded w-2/3" />
                <div className="h-8 bg-surface-elevated rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
