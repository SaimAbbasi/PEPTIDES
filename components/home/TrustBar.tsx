import { FlaskConical, FileCheck, Zap, ShieldCheck } from 'lucide-react'

const trustItems = [
  { icon: FlaskConical, title: '3rd Party Lab Tested', desc: 'Every batch verified by independent labs' },
  { icon: FileCheck, title: 'Certificate of Analysis', desc: 'Full COA available for every product' },
  { icon: Zap, title: 'Fast Dispatch', desc: 'Orders processed within 24 hours' },
  { icon: ShieldCheck, title: 'Secure Checkout', desc: 'SSL encrypted, multiple payment options' },
]

export function TrustBar() {
  return (
    <section className="bg-surface border-y border-border-subtle py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {trustItems.map((item) => (
            <div key={item.title} className="flex items-start gap-4">
              <div className="bg-accent/10 rounded-lg p-2.5 flex-shrink-0">
                <item.icon size={20} className="text-accent" />
              </div>
              <div>
                <h4 className="text-text-primary font-semibold text-sm">{item.title}</h4>
                <p className="text-text-muted text-xs mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
