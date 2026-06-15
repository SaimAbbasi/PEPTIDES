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

function formatCardNumber(val: string) {
  return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
}

function formatExpiry(val: string) {
  const v = val.replace(/\D/g, '').slice(0, 4)
  return v.length >= 2 ? v.slice(0, 2) + '/' + v.slice(2) : v
}

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<Step>('contact')
  const { totalPrice, items, clearCart } = useCart()

  // Form state
  const [contact, setContact] = useState({ email: '', firstName: '', lastName: '', phone: '' })
  const [shippingAddr, setShippingAddr] = useState({ address: '', city: '', state: '', postcode: '', country: 'US' })
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express' | 'overnight'>('standard')
  const [payment, setPayment] = useState({ cardName: '', cardNumber: '', expiry: '', cvv: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Shipping cost
  const shippingCosts = { standard: 9.99, express: 19.99, overnight: 39.99 }
  const subtotal = totalPrice
  const shippingCost = subtotal > 150 ? 0 : shippingCosts[shippingMethod]

  function validateStep(): boolean {
    const newErrors: Record<string, string> = {}
    if (currentStep === 'contact') {
      if (!contact.email.includes('@')) newErrors.email = 'Valid email required'
      if (!contact.firstName.trim()) newErrors.firstName = 'First name required'
      if (!contact.lastName.trim()) newErrors.lastName = 'Last name required'
    }
    if (currentStep === 'shipping') {
      if (!shippingAddr.address.trim()) newErrors.address = 'Address required'
      if (!shippingAddr.city.trim()) newErrors.city = 'City required'
      if (!shippingAddr.postcode.trim()) newErrors.postcode = 'Postcode required'
    }
    if (currentStep === 'payment') {
      if (!payment.cardName.trim()) newErrors.cardName = 'Name on card required'
      if (payment.cardNumber.replace(/\s/g, '').length < 16) newErrors.cardNumber = 'Valid card number required'
      if (!/^\d{2}\/\d{2}$/.test(payment.expiry)) newErrors.expiry = 'Format: MM/YY'
      if (payment.cvv.length < 3) newErrors.cvv = 'Invalid CVV'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function nextStep() {
    if (!validateStep()) return
    const idx = stepOrder.indexOf(currentStep)
    if (idx < stepOrder.length - 1) {
      const next = stepOrder[idx + 1]
      if (next === 'complete') {
        clearCart()
      }
      setCurrentStep(next)
    }
  }

  if (currentStep === 'complete') {
    return (
      <div className="max-w-lg mx-auto px-4 py-32 text-center">
        <CheckCircle size={64} weight="fill" className="text-green-400 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-text-primary mb-3">Order Placed!</h1>
        <p className="text-text-secondary">
          Thank you for your order. You&apos;ll receive a confirmation email shortly.
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
              <h2 className="text-xl font-bold text-text-primary mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-text-secondary text-sm mb-1">First Name</label>
                    <input
                      type="text"
                      placeholder="First Name"
                      value={contact.firstName}
                      onChange={e => setContact({ ...contact, firstName: e.target.value })}
                      className="w-full bg-surface-elevated border border-border-subtle rounded-md px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                    />
                    {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-text-secondary text-sm mb-1">Last Name</label>
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={contact.lastName}
                      onChange={e => setContact({ ...contact, lastName: e.target.value })}
                      className="w-full bg-surface-elevated border border-border-subtle rounded-md px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                    />
                    {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-text-secondary text-sm mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={contact.email}
                    onChange={e => setContact({ ...contact, email: e.target.value })}
                    className="w-full bg-surface-elevated border border-border-subtle rounded-md px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-text-secondary text-sm mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={contact.phone}
                    onChange={e => setContact({ ...contact, phone: e.target.value })}
                    className="w-full bg-surface-elevated border border-border-subtle rounded-md px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 'shipping' && (
            <div>
              <h2 className="text-xl font-bold text-text-primary mb-6">Shipping Address & Method</h2>
              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-text-secondary text-sm mb-1">Street Address</label>
                  <input
                    type="text"
                    placeholder="Street Address"
                    value={shippingAddr.address}
                    onChange={e => setShippingAddr({ ...shippingAddr, address: e.target.value })}
                    className="w-full bg-surface-elevated border border-border-subtle rounded-md px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                  />
                  {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-text-secondary text-sm mb-1">City</label>
                    <input
                      type="text"
                      placeholder="City"
                      value={shippingAddr.city}
                      onChange={e => setShippingAddr({ ...shippingAddr, city: e.target.value })}
                      className="w-full bg-surface-elevated border border-border-subtle rounded-md px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                    />
                    {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-text-secondary text-sm mb-1">State / Province</label>
                    <input
                      type="text"
                      placeholder="State"
                      value={shippingAddr.state}
                      onChange={e => setShippingAddr({ ...shippingAddr, state: e.target.value })}
                      className="w-full bg-surface-elevated border border-border-subtle rounded-md px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-text-secondary text-sm mb-1">Postcode / ZIP</label>
                    <input
                      type="text"
                      placeholder="Postcode / ZIP"
                      value={shippingAddr.postcode}
                      onChange={e => setShippingAddr({ ...shippingAddr, postcode: e.target.value })}
                      className="w-full bg-surface-elevated border border-border-subtle rounded-md px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                    />
                    {errors.postcode && <p className="text-red-400 text-xs mt-1">{errors.postcode}</p>}
                  </div>
                  <div>
                    <label className="block text-text-secondary text-sm mb-1">Country</label>
                    <input
                      type="text"
                      placeholder="Country"
                      value={shippingAddr.country}
                      onChange={e => setShippingAddr({ ...shippingAddr, country: e.target.value })}
                      className="w-full bg-surface-elevated border border-border-subtle rounded-md px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-text-primary mb-4">Shipping Method</h3>
              <div className="space-y-3">
                {([
                  { id: 'standard' as const, label: 'Standard Shipping', eta: '5–7 business days', price: '$9.99' },
                  { id: 'express' as const, label: 'Express Shipping', eta: '2–3 business days', price: '$19.99' },
                  { id: 'overnight' as const, label: 'Overnight Shipping', eta: 'Next business day', price: '$39.99' },
                ]).map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${
                      shippingMethod === option.id ? 'border-accent' : 'border-border-subtle hover:border-accent/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="shipping"
                      value={option.id}
                      checked={shippingMethod === option.id}
                      onChange={() => setShippingMethod(option.id)}
                      className="accent-accent"
                    />
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
                <div>
                  <label className="block text-text-secondary text-sm mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    placeholder="Cardholder Name"
                    value={payment.cardName}
                    onChange={e => setPayment({ ...payment, cardName: e.target.value })}
                    className="w-full bg-surface-elevated border border-border-subtle rounded-md px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                  />
                  {errors.cardName && <p className="text-red-400 text-xs mt-1">{errors.cardName}</p>}
                </div>
                <div>
                  <label className="block text-text-secondary text-sm mb-1">Card Number</label>
                  <input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    value={payment.cardNumber}
                    onChange={e => setPayment({ ...payment, cardNumber: formatCardNumber(e.target.value) })}
                    className="w-full bg-surface-elevated border border-border-subtle rounded-md px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                  />
                  {errors.cardNumber && <p className="text-red-400 text-xs mt-1">{errors.cardNumber}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-text-secondary text-sm mb-1">Expiry Date (MM/YY)</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={payment.expiry}
                      onChange={e => setPayment({ ...payment, expiry: formatExpiry(e.target.value) })}
                      className="w-full bg-surface-elevated border border-border-subtle rounded-md px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                    />
                    {errors.expiry && <p className="text-red-400 text-xs mt-1">{errors.expiry}</p>}
                  </div>
                  <div>
                    <label className="block text-text-secondary text-sm mb-1">CVV</label>
                    <input
                      type="text"
                      placeholder="CVV"
                      value={payment.cvv}
                      onChange={e => setPayment({ ...payment, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                      className="w-full bg-surface-elevated border border-border-subtle rounded-md px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                    />
                    {errors.cvv && <p className="text-red-400 text-xs mt-1">{errors.cvv}</p>}
                  </div>
                </div>
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
              <div className="mt-6 pt-4 border-t border-border-subtle space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Contact</span>
                  <span className="text-text-primary">{contact.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Ship to</span>
                  <span className="text-text-primary">{shippingAddr.address}, {shippingAddr.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Shipping method</span>
                  <span className="text-text-primary capitalize">{shippingMethod}</span>
                </div>
              </div>
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
              <span className="text-text-primary">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Shipping</span>
              <span className="text-text-primary">{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
            </div>
            <div className="border-t border-border-subtle pt-2 flex justify-between font-bold">
              <span>Total</span>
              <span className="text-accent">${(subtotal + shippingCost).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
