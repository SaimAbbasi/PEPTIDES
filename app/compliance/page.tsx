import { Warning, Scales, Globe, UserCheck } from '@phosphor-icons/react'

export default function CompliancePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Warning banner */}
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 mb-12 flex items-start gap-4">
        <Warning size={24} className="text-yellow-500 flex-shrink-0 mt-0.5" />
        <div>
          <h2 className="text-yellow-400 font-bold text-lg mb-1">Research Use Only</h2>
          <p className="text-text-secondary text-sm leading-relaxed">
            All products sold by PEPTICORE are intended solely for laboratory research and scientific study. They are NOT approved for human consumption, therapeutic use, or veterinary applications. Purchasers must be 18 years or older.
          </p>
        </div>
      </div>

      <h1 className="text-4xl font-black text-text-primary mb-8">Compliance & Legal</h1>

      {[
        {
          icon: Warning,
          title: 'Research Use Only Policy',
          content: `All PEPTICORE products are sold for research purposes only. By purchasing from our store, you confirm that you are a qualified researcher or are obtaining these products for lawful scientific research. These products have not been evaluated by the FDA or equivalent regulatory bodies. They are not intended to diagnose, treat, cure, or prevent any disease or condition.`,
        },
        {
          icon: UserCheck,
          title: 'Age Verification',
          content: `You must be 18 years of age or older to purchase from PEPTICORE. By completing a purchase, you confirm you are of legal age in your jurisdiction.`,
        },
        {
          icon: Globe,
          title: 'Jurisdictional Restrictions',
          content: `It is your responsibility to understand the laws governing peptide research compounds in your jurisdiction. PEPTICORE does not ship to countries or regions where these products are prohibited. We reserve the right to cancel orders to restricted regions.`,
        },
        {
          icon: Scales,
          title: 'Terms of Sale',
          content: `By purchasing from PEPTICORE, you agree that products are for research purposes only. You agree to use products in compliance with all applicable laws. PEPTICORE assumes no liability for misuse of products. All sales are final for opened peptide vials due to the nature of the product.`,
        },
      ].map((section) => (
        <div key={section.title} className="bg-surface border border-border-subtle rounded-xl p-8 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <section.icon size={20} className="text-accent" />
            <h3 className="text-text-primary font-bold text-lg">{section.title}</h3>
          </div>
          <p className="text-text-secondary leading-relaxed">{section.content}</p>
        </div>
      ))}
    </div>
  )
}
