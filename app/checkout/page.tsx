'use client'

import { useState } from 'react'
import { useCart } from '@/lib/context/CartContext'
import { Button } from '@/components/ui/Button'
import { CheckCircle } from '@phosphor-icons/react'

type Step = 'contact' | 'shipping' | 'payment' | 'review' | 'complete'

const steps: { id: Step; label: string }[] = [
  { id: 'contact', label: 'Contact' },
  { id: 'shipping', label: 'Shipping' },
  { id: 'payment', label: 'Payment' },
  { id: 'review', label: 'Review' },
]

const stepOrder: Step[] = ['contact', 'shipping', 'payment', 'review', 'complete']

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<Step>('contact')
  const { totalPrice, items } = useCart()
  const shipping = totalPrice > 150 ? 0 : 9.99

  function nextStep() {
    const idx = stepOrder.indexOf(currentStep)
    if (idx < stepOrder.length - 1) {
      setCurrentStep(stepOrder[idx + 1])
    }
  }

  if (currentStep === 'complete') {
    return (
      <div className="max-w-lg mx-auto px-4 py-32 text-center">
        <CheckCircle size={64} weight="fill" className="text-green-400 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-text-primary mb-3">Order Placed!</h1>
        <p className="text-text-secondary">
          Thank you for your order. You'll receive a confirmation email shortly.
        </p>
      </div>
    )
  }

  const currentIdx = steps.findIndex((s) => s.id === currentStep)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-text-primary mb-10">Checkout</h1>

      {/* Progress bar */}
      <div className="flex items-center mb-12">
        {steps.map((step, idx) => (
          <div key={step.id} className="flex items-center flex-1 last:flex-none">
            <div className={`flex items-center gap-2 ${idx <= currentIdx ? 'text-accent' : 'text-text-muted'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                idx < currentIdx ? 'bg-accent border-accent text-black' :
                idx === currentIdx ? 'border-accent text-accent' :
                'border-border-subtle text-text-muted'
              }`}>
                {idx < currentIdx ? '✓' : idx + 1}
              </div>
              <span className="text-sm font-medium hidden sm:block">{step.label}</span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`flex-1 h-px mx-4 ${idx < currentIdx ? 'bg-accent' : 'bg-border-subtle'}`} />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Form */}
        <div className="lg:col-span-2 bg-surface border border-border-subtle rounded-xl p-8">
          {currentStep === 'contact' && (
            <div>
              <h2 className="text-xl font-bold text-text-primary mb-6">Contact & Shipping</h2>
              <div className="space-y-4">
                {['Full Name', 'Email Address', 'Phone Number', 'Street Address', 'City', 'Postcode / ZIP', 'Country'].map((field) => (
                  <div key={field}>
                    <label className="block text-text-secondary text-sm mb-1">{field}</label>
                    <input
                      type="text"
                      placeholder={field}
                      className="w-full bg-surface-elevated border border-border-subtle rounded-md px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 'shipping' && (
            <div>
              <h2 className="text-xl font-bold text-text-primary mb-6">Shipping Method</h2>
              <div className="space-y-3">
                {[
                  { id: 'standard', label: 'Standard Shipping', eta: '5–7 business days', price: '$9.99' },
                  { id: 'express', label: 'Express Shipping', eta: '2–3 business days', price: '$19.99' },
                  { id: 'overnight', label: 'Overnight Shipping', eta: 'Next business day', price: '$39.99' },
                ].map((option) => (
                  <label key={option.id} className="flex items-center gap-4 p-4 border border-border-subtle rounded-lg cursor-pointer hover:border-accent/50 transition-colors">
                    <input type="radio" name="shipping" value={option.id} className="accent-accent" />
                    <div className="flex-1">
                      <p className="text-text-primary font-medium text-sm">{option.label}</p>
                      <p className="text-text-muted text-xs">{option.eta}</p>
                    </div>
                    <span className="text-accent font-bold text-sm">{option.price}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {currentStep === 'payment' && (
            <div>
              <h2 className="text-xl font-bold text-text-primary mb-6">Payment Details</h2>
              <div className="space-y-4">
                {['Cardholder Name', 'Card Number', 'Expiry Date (MM/YY)', 'CVV'].map((field) => (
                  <div key={field}>
                    <label className="block text-text-secondary text-sm mb-1">{field}</label>
                    <input
                      type="text"
                      placeholder={field}
                      className="w-full bg-surface-elevated border border-border-subtle rounded-md px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 'review' && (
            <div>
              <h2 className="text-xl font-bold text-text-primary mb-6">Review Order</h2>
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-4 py-3 border-b border-border-subtle">
                  <img src={item.product.image} alt={item.product.name} className="w-14 h-14 object-cover rounded-lg opacity-80" />
                  <div className="flex-1">
                    <p className="text-text-primary text-sm font-medium">{item.product.name}</p>
                    <p className="text-text-muted text-xs">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-text-primary font-bold">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          )}

          <Button size="lg" variant="primary" onClick={nextStep} className="w-full mt-8">
            {currentStep === 'review' ? 'Place Order' : 'Continue'}
          </Button>
        </div>

        {/* Order summary sidebar */}
        <div className="bg-surface border border-border-subtle rounded-xl p-6 h-fit">
          <h3 className="text-text-primary font-bold mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Subtotal</span>
              <span className="text-text-primary">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Shipping</span>
              <span className="text-text-primary">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="border-t border-border-subtle pt-2 flex justify-between font-bold">
              <span>Total</span>
              <span className="text-accent">${(totalPrice + shipping).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
