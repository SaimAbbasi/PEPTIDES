'use client'

import { useState } from 'react'
import { Envelope } from '@phosphor-icons/react'

const contactCards = [
  {
    title: 'General Support',
    email: 'support@pepticore.com',
    description: 'Order questions, tracking, returns',
  },
  {
    title: 'COA Requests',
    email: 'coa@pepticore.com',
    description: 'Request your Certificate of Analysis',
  },
  {
    title: 'Wholesale',
    email: 'wholesale@pepticore.com',
    description: 'Bulk orders and institutional pricing',
  },
]

const subjectOptions = ['General', 'COA Request', 'Wholesale', 'Other']

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'General',
    message: '',
  })
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({})
  const [submitted, setSubmitted] = useState(false)

  function validate() {
    const newErrors: typeof errors = {}
    if (!form.name.trim()) newErrors.name = 'Name is required.'
    if (!form.email.trim()) {
      newErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address.'
    }
    if (!form.message.trim()) newErrors.message = 'Message is required.'
    return newErrors
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const validation = validate()
    if (Object.keys(validation).length > 0) {
      setErrors(validation)
      return
    }
    setErrors({})
    setSubmitted(true)
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }))
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-black text-text-primary mb-2">Get in Touch</h1>
      <p className="text-text-secondary leading-relaxed mb-12">
        We respond to all inquiries within 1 business day.
      </p>

      {/* Contact cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
        {contactCards.map((card) => (
          <div
            key={card.email}
            className="bg-surface border border-border-subtle rounded-xl p-6 flex flex-col gap-3"
          >
            <div className="flex items-center gap-2 text-accent">
              <Envelope size={18} />
              <span className="text-text-primary font-semibold text-sm">{card.title}</span>
            </div>
            <a
              href={`mailto:${card.email}`}
              className="text-accent text-sm hover:underline break-all"
            >
              {card.email}
            </a>
            <p className="text-text-muted text-xs">{card.description}</p>
          </div>
        ))}
      </div>

      {/* Contact form */}
      {submitted ? (
        <div className="bg-surface border border-border-subtle rounded-xl p-8 text-center">
          <p className="text-text-primary font-semibold text-lg mb-2">Message sent!</p>
          <p className="text-text-secondary text-sm">
            We&apos;ll be in touch within 1 business day.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-text-primary text-sm font-medium mb-2">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full bg-surface border border-border-subtle rounded-lg px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-text-primary text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-surface border border-border-subtle rounded-lg px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block text-text-primary text-sm font-medium mb-2">
              Subject
            </label>
            <select
              id="subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full bg-surface border border-border-subtle rounded-lg px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-accent transition-colors"
            >
              {subjectOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-text-primary text-sm font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              value={form.message}
              onChange={handleChange}
              placeholder="How can we help?"
              className="w-full bg-surface border border-border-subtle rounded-lg px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors resize-none"
            />
            {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
          </div>

          <button
            type="submit"
            className="bg-accent text-black font-semibold text-sm px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  )
}
