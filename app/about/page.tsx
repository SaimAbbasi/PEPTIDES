import { FlaskConical, Award, Shield, Users } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'

const milestones = [
  { icon: FlaskConical, title: 'In-House Testing', desc: 'Every product undergoes internal QC before shipment.' },
  { icon: Award, title: 'Third-Party Verified', desc: 'Independent lab certification for every batch.' },
  { icon: Shield, title: 'Research Standards', desc: 'Manufactured to research-grade quality specifications.' },
  { icon: Users, title: 'Expert Team', desc: 'Biochemists and research professionals guiding our catalog.' },
]

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <div className="max-w-3xl mb-24">
        <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-4">About PEPTICORE</p>
        <h1 className="text-5xl font-black text-text-primary leading-tight mb-6">
          Research-Grade Quality.<br />No Compromises.
        </h1>
        <p className="text-text-secondary text-xl leading-relaxed">
          PEPTICORE was founded by a team of biochemists and research professionals who were frustrated by the lack of verifiable quality in the peptide market. We set out to build the standard we wished existed.
        </p>
      </div>

      {/* Standards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
        {milestones.map((item) => (
          <div key={item.title} className="bg-surface border border-border-subtle rounded-xl p-6">
            <item.icon size={32} className="text-accent mb-4" />
            <h3 className="text-text-primary font-bold mb-2">{item.title}</h3>
            <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Testing methodology */}
      <div className="bg-surface border border-border-subtle rounded-2xl p-10 mb-16">
        <SectionHeading title="Our Testing Methodology" subtitle="Every peptide we sell goes through a rigorous verification process before it reaches you." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: '01', title: 'HPLC Analysis', desc: 'High-performance liquid chromatography verifies purity percentage for every batch.' },
            { step: '02', title: 'Mass Spectrometry', desc: 'MS confirms the exact molecular weight and identity of each compound.' },
            { step: '03', title: 'Third-Party Audit', desc: 'Independent laboratory reviews and certifies results before we issue a COA.' },
          ].map((item) => (
            <div key={item.step}>
              <p className="text-accent/40 text-5xl font-black mb-3">{item.step}</p>
              <h4 className="text-text-primary font-bold mb-2">{item.title}</h4>
              <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
