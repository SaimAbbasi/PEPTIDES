import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'PEPTICORE Terms of Service — terms and conditions for purchasing research peptides.',
}

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-black text-text-primary mb-2">Terms of Service</h1>
      <p className="text-text-muted text-sm mb-12">Last updated: June 2026</p>

      <div className="space-y-10">
        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">1. Acceptance of Terms</h2>
          <p className="text-text-secondary leading-relaxed">
            By accessing the PEPTICORE website or placing an order, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our site or purchase our products. PEPTICORE reserves the right to update these terms at any time, and continued use of the site constitutes acceptance of the revised terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">2. Research Use Only</h2>
          <p className="text-text-secondary leading-relaxed">
            All products sold by PEPTICORE are strictly intended for in-vitro laboratory research and scientific study. They are not approved for human or veterinary consumption, are not dietary supplements, and are not intended to diagnose, treat, cure, or prevent any disease or medical condition. By purchasing, you confirm that you are a qualified researcher or are obtaining these products for lawful scientific research purposes. You must be 18 years of age or older to purchase from PEPTICORE. It is your sole responsibility to ensure the legality of purchasing and using these products in your jurisdiction.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">3. Order and Payment</h2>
          <p className="text-text-secondary leading-relaxed">
            All prices listed on the site are in USD and are subject to change without notice. An order is not confirmed until you receive a written order confirmation email from PEPTICORE. We reserve the right to cancel or refuse any order at our discretion, including where we have reason to believe the order violates these terms, applicable law, or our compliance policies. In the event an order is cancelled after payment, a full refund will be issued promptly.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">4. Shipping and Delivery</h2>
          <p className="text-text-secondary leading-relaxed">
            Shipping timelines are estimates only and are not guaranteed. Risk of loss and title for products pass to the buyer upon dispatch to the carrier. We currently ship to US domestic addresses only. PEPTICORE is not responsible for delays caused by the carrier, incorrect addresses provided by the buyer, or circumstances beyond our control. If a package is lost in transit, please contact us and we will work with the carrier to investigate.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">5. Returns and Refunds</h2>
          <p className="text-text-secondary leading-relaxed">
            Due to the nature of research chemicals and product integrity requirements, we do not accept general returns or exchanges. We will offer a replacement or refund only for items that arrive damaged or are incorrect (wrong item shipped). To be eligible, you must contact us at support@pepticore.com within 7 days of receipt and provide photographic evidence of the issue. Replacement or refund decisions are made at PEPTICORE's sole discretion.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">6. Intellectual Property</h2>
          <p className="text-text-secondary leading-relaxed">
            All content on this site — including the PEPTICORE name, logo, product descriptions, imagery, blog articles, and design elements — is the intellectual property of PEPTICORE and is protected by applicable copyright and trademark laws. You may not reproduce, distribute, or create derivative works from any site content without our express written permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">7. Limitation of Liability</h2>
          <p className="text-text-secondary leading-relaxed">
            To the fullest extent permitted by law, PEPTICORE shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our products or website. We are not responsible for any harm resulting from misuse, improper handling, or use of our research products outside of a controlled laboratory environment. Our total liability for any claim shall not exceed the amount paid by you for the product giving rise to the claim.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">8. Governing Law</h2>
          <p className="text-text-secondary leading-relaxed">
            These Terms of Service shall be governed by and construed in accordance with the laws of the applicable jurisdiction in which PEPTICORE operates, without regard to its conflict of law provisions. Any disputes arising under these terms shall be resolved in the courts of that jurisdiction.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">9. Contact</h2>
          <p className="text-text-secondary leading-relaxed">
            For legal inquiries or questions about these Terms of Service, please contact us at{' '}
            <a href="mailto:legal@pepticore.com" className="text-accent hover:underline">
              legal@pepticore.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  )
}
