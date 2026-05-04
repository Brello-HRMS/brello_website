"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const TOPICS = [
  "General Inquiry",
  "Sales / Pricing",
  "Technical Support",
  "Feature Request",
  "Partnership",
  "Press / Media",
];

const INFO = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email us",
    value: "contact@brello.co.in",
    href: "mailto:contact@brello.co.in",
    sub: "We reply within 24 hours on business days",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Business hours",
    value: "Mon – Fri, 9 AM – 7 PM IST",
    sub: "Excluding public holidays",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Based in",
    value: "Bangalore, Karnataka, India",
    sub: "Building for teams worldwide",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", topic: "General Inquiry", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1400));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-14 bg-gradient-to-b from-[#faf9ff] to-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <FadeIn>
            <Badge variant="outline" className="border-[#7F56D9]/30 text-[#7F56D9] mb-5">
              Contact
            </Badge>
            <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">Get in touch</h1>
            <p className="text-xl text-gray-500 leading-relaxed">
              Have a question, need a demo, or just want to say hi?
              We'd love to hear from you.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Main */}
      <section className="pb-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Info */}
            <div className="lg:col-span-2 space-y-6">
              <FadeIn direction="left">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h2>
                {INFO.map((item) => (
                  <div key={item.label} className="flex gap-4 p-5 rounded-2xl border border-gray-100 hover:border-[#7F56D9]/25 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-[#EDE9F8] flex items-center justify-center text-[#7F56D9] shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="font-semibold text-gray-900 hover:text-[#7F56D9] transition-colors text-sm">
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-semibold text-gray-900 text-sm">{item.value}</p>
                      )}
                      <p className="text-xs text-gray-400 mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </FadeIn>

              <FadeIn direction="left" delay={0.15}>
                <div className="bg-[#1a0d2e] rounded-2xl p-6">
                  <p className="text-white font-bold mb-2">Want a live demo?</p>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    Book a 30-minute demo with our team and see Brello set up for your company in real time.
                  </p>
                  <a
                    href="mailto:contact@brello.co.in?subject=Demo Request"
                    className="inline-flex items-center gap-2 bg-[#7F56D9] hover:bg-[#6d47c4] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
                  >
                    Book a Demo →
                  </a>
                </div>
              </FadeIn>
            </div>

            {/* Form */}
            <FadeIn direction="right" className="lg:col-span-3">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-20 px-8 border-2 border-green-100 bg-green-50/50 rounded-3xl h-full"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mb-5 shadow-lg shadow-green-500/30">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">Message sent!</h3>
                  <p className="text-gray-500 mb-6">Thanks for reaching out. We'll get back to you within 24 hours.</p>
                  <Button
                    variant="outline"
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", topic: "General Inquiry", message: "" }); }}
                  >
                    Send another message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Send us a message</h2>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Priya Sharma"
                        className="w-full h-11 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#7F56D9] focus:ring-2 focus:ring-[#7F56D9]/10 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5">Work Email *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="priya@company.com"
                        className="w-full h-11 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#7F56D9] focus:ring-2 focus:ring-[#7F56D9]/10 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Topic</label>
                    <select
                      value={form.topic}
                      onChange={(e) => setForm({ ...form, topic: e.target.value })}
                      className="w-full h-11 px-4 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-[#7F56D9] focus:ring-2 focus:ring-[#7F56D9]/10 transition-colors"
                    >
                      {TOPICS.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us how we can help..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#7F56D9] focus:ring-2 focus:ring-[#7F56D9]/10 transition-colors resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-12 bg-[#7F56D9] hover:bg-[#6d47c4] text-white rounded-xl font-semibold shadow-lg shadow-[#7F56D9]/25 transition-all"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "Send Message →"
                    )}
                  </Button>

                  <p className="text-xs text-center text-gray-400">
                    We reply within 24 hours on business days.
                  </p>
                </form>
              )}
            </FadeIn>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
