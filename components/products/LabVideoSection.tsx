const LAB_VIDEO_URL = 'https://assets.mixkit.co/videos/23618/23618-720.mp4'

export function LabVideoSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Lab-Verified Process</h2>
        <p className="text-text-secondary">
          Every batch undergoes rigorous HPLC and mass spectrometry analysis before dispatch.
        </p>
      </div>
      <div className="aspect-video rounded-2xl overflow-hidden border border-border-subtle shadow-lg shadow-accent/5">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={LAB_VIDEO_URL} type="video/mp4" />
        </video>
      </div>
    </div>
  )
}
