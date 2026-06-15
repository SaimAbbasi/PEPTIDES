import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'PEPTICORE Privacy Policy — how we collect, use, and protect your information.',
}

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-black text-text-primary mb-2">Privacy Policy</h1>
      <p className="text-text-muted text-sm mb-12">Last updated: June 2026</p>

      <div className="space-y-10">
        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">1. Introduction</h2>
          <p className="text-text-secondary leading-relaxed">
            PEPTICORE ("we", "us", or "our") operates the pepticore.com website. This Privacy Policy explains what personal information we collect when you visit or make a purchase from our store, how we use that information, and the rights you have regarding your data. By using our site, you agree to the collection and use of information in accordance with this policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">2. Information We Collect</h2>
          <p className="text-text-secondary leading-relaxed">
            When you place an order, we collect your name, email address, shipping address, and billing address. Payment card information is collected at checkout but is processed securely by our third-party payment processor — we do not store your full card details on our servers. We also collect standard browsing data such as IP address, browser type, pages visited, and referral source through server logs and analytics tools. This helps us understand how visitors use the site and improve the experience.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">3. How We Use Your Information</h2>
          <p className="text-text-secondary leading-relaxed">
            We use the information we collect to fulfill your orders, including processing payments and arranging shipment. We send transactional emails such as order confirmations and shipping notifications. Browsing and usage data is used to improve site performance, diagnose technical issues, and understand which products and content are most useful to visitors. We may also use your information to comply with legal obligations, resolve disputes, and enforce our agreements.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">4. Cookies</h2>
          <p className="text-text-secondary leading-relaxed">
            We use session cookies to maintain your shopping cart and keep you logged in during a browsing session. These cookies are strictly functional and expire when you close your browser. We do not currently use third-party tracking cookies or behavioral advertising cookies. If this changes, we will update this policy and provide appropriate notice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">5. Data Sharing</h2>
          <p className="text-text-secondary leading-relaxed">
            We do not sell, trade, or rent your personal information to third parties. We share your data only with the service providers necessary to operate our business: our payment processor (to handle card transactions securely) and our shipping carriers (to deliver your order). These providers are permitted to use your information only to perform services on our behalf and are bound by confidentiality obligations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">6. Your Rights</h2>
          <p className="text-text-secondary leading-relaxed">
            You have the right to request access to the personal data we hold about you, to request corrections of inaccurate data, and to request deletion of your data where we are not legally required to retain it. To exercise any of these rights, please contact us by email. We will respond to verified requests within 30 days.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">7. Contact</h2>
          <p className="text-text-secondary leading-relaxed">
            For privacy-related questions or requests, please contact us at{' '}
            <a href="mailto:privacy@pepticore.com" className="text-accent hover:underline">
              privacy@pepticore.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  )
}
