'use client'

import { useState } from 'react'
import { CaretDown, CaretUp } from '@phosphor-icons/react'

const faqs = [
  {
    question: 'What are research peptides?',
    answer:
      'Research peptides are synthetic chains of amino acids studied for their biological activity in controlled laboratory settings. Scientists use them to investigate cellular signaling, protein interactions, and other biochemical processes. All PEPTICORE peptides are supplied for in-vitro research only and are not approved for human use.',
  },
  {
    question: 'Are your products safe for human consumption?',
    answer:
      'No. All PEPTICORE products are strictly for research use only and are not intended for human consumption, self-administration, or veterinary use. They have not been evaluated by the FDA or any equivalent regulatory authority for safety or efficacy in humans. Misuse of these products is the sole responsibility of the purchaser.',
  },
  {
    question: 'How do I know your products are pure?',
    answer:
      'Every batch produced by PEPTICORE is independently tested by a third-party laboratory. Testing includes HPLC purity analysis, mass spectrometry identity confirmation, and microbial screening. You can request a Certificate of Analysis (COA) for any product by emailing us at coa@pepticore.com.',
  },
  {
    question: 'What is a Certificate of Analysis (COA)?',
    answer:
      'A Certificate of Analysis is a formal lab report issued by an independent testing laboratory. It documents the purity percentage of the peptide, confirms molecular identity via mass spectrometry, and includes results of microbial contamination testing. PEPTICORE provides a COA for every batch. Email coa@pepticore.com to request one for your order.',
  },
  {
    question: 'How do I place an order?',
    answer:
      'Browse our product catalog, add the items you need to your cart, and proceed to checkout. You will be prompted to enter your shipping details and payment information. Payment is processed securely. Once your order is confirmed, you will receive a confirmation email. Orders are typically packed and dispatched within 1–2 business days.',
  },
  {
    question: 'What are your shipping options?',
    answer:
      'We offer three shipping tiers: Standard (5–7 business days, $9.99), Express (2–3 business days, $19.99), and Overnight ($39.99). Orders over $150 qualify for free standard shipping. Shipping timelines are estimates and may vary based on carrier conditions.',
  },
  {
    question: 'Do you ship internationally?',
    answer:
      'Currently, PEPTICORE ships to US domestic addresses only. We are working on expanding our shipping capabilities and plan to offer international delivery in the near future. Sign up for our newsletter to be notified when international shipping launches.',
  },
  {
    question: 'What is your return policy?',
    answer:
      'Due to the nature of research chemicals and product integrity requirements, we do not accept general returns. We do accept claims for items that arrive damaged or are incorrectly shipped. To initiate a claim, email support@pepticore.com within 7 days of receiving your order. Please include your order number and photos of the issue.',
  },
  {
    question: 'How should peptides be stored?',
    answer:
      'Lyophilized (freeze-dried) peptides should be stored in a cool, dry place away from direct light and moisture. For long-term storage, a freezer at -20°C is recommended. Once reconstituted, peptides should be aliquoted, refrigerated at 4°C, and used within 30 days. Avoid repeated freeze-thaw cycles, as this can degrade peptide integrity.',
  },
  {
    question: 'I need a bulk or wholesale order. Who do I contact?',
    answer:
      'We work with research institutions, universities, and qualified labs on bulk and wholesale orders. For custom quantities, institutional pricing, or repeat supply agreements, please email wholesale@pepticore.com with your institution name, the peptides you require, and the quantities needed. Our team will respond within 1 business day.',
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-black text-text-primary mb-2">Frequently Asked Questions</h1>
      <p className="text-text-muted text-sm mb-12">
        Can&apos;t find what you&apos;re looking for? Email us at{' '}
        <a href="mailto:support@pepticore.com" className="text-accent hover:underline">
          support@pepticore.com
        </a>
      </p>

      <div className="divide-y divide-border-subtle">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index
          return (
            <div key={index}>
              <button
                className="w-full flex items-center justify-between gap-4 py-5 text-left"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
              >
                <span className="text-text-primary font-medium">{faq.question}</span>
                {isOpen ? (
                  <CaretUp size={18} className="text-accent flex-shrink-0" />
                ) : (
                  <CaretDown size={18} className="text-text-muted flex-shrink-0" />
                )}
              </button>
              {isOpen && (
                <p className="text-text-secondary text-sm leading-relaxed pb-5">{faq.answer}</p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
