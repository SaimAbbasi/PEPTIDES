import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-accent text-sm font-mono tracking-widest uppercase mb-4">404</p>
      <h1 className="text-4xl font-bold text-text-primary mb-4">Page Not Found</h1>
      <p className="text-text-secondary mb-8 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-accent text-black font-semibold px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  )
}
