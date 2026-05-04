"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const PLANS = [
  {
    name: "Starter",
    monthly: 0,
    yearly: 0,
    desc: "Perfect for small teams just getting started with digital HR.",
    limit: "Up to 15 employees",
    cta: "Get Started Free",
    highlight: false,
    features: [
      "Employee directory & profiles",
      "Basic attendance tracking",
      "Leave management",
      "Holiday calendar",
      "1 admin user",
      "Email support",
    ],
  },
  {
    name: "Growth",
    monthly: 4999,
    yearly: 49999,
    desc: "Everything you need to run HR for a growing company.",
    limit: "Up to 100 employees",
    cta: "Start Free Trial",
    highlight: true,
    badge: "Most Popular",
    features: [
      "Everything in Starter",
      "Payroll processing",
      "Statutory compliance (PF, ESI, TDS)",
      "Geofencing attendance",
      "Custom leave policies",
      "Reimbursements",
      "Advanced reports & exports",
      "5 admin users",
      "Priority support",
    ],
  },
  {
    name: "Scale",
    monthly: 12999,
    yearly: 129999,
    desc: "For larger teams with complex HR and payroll needs.",
    limit: "Up to 500 employees",
    cta: "Start Free Trial",
    highlight: false,
    features: [
      "Everything in Growth",
      "Multiple payroll cycles",
      "Department-wise policies",
      "Role-based access control",
      "API access",
      "Biometric integration",
      "15 admin users",
      "Dedicated account manager",
      "SLA guarantee",
    ],
  },
];

const FAQS = [
  { q: "Can I switch plans anytime?", a: "Yes — upgrade or downgrade at any time. Changes take effect at the start of the next billing cycle." },
  { q: "Is there a free trial?", a: "Starter is always free. Growth and Scale plans include a 30-day free trial with full access — no credit card required." },
  { q: "How does employee counting work?", a: "Only active employees count toward your plan limit. Deactivated or archived employees are not counted." },
  { q: "Do you offer Enterprise pricing?", a: "Absolutely. For 500+ employees or custom requirements, contact us at contact@brello.co.in for a tailored plan." },
  { q: "What payment methods do you accept?", a: "All major credit/debit cards, UPI, net banking, and bank transfer. Invoicing is available on Scale and Enterprise plans." },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors gap-4"
      >
        <span className="font-semibold text-gray-900 text-sm">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-gray-400 text-xl shrink-0 leading-none"
        >
          +
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="px-6 pb-4 pt-2 text-sm text-gray-500 leading-relaxed border-t border-gray-50">{a}</p>
      </motion.div>
    </div>
  );
}

export default function PricingPage() {
  const [yearly, setYearly] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-[#faf9ff] to-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <FadeIn>
            <Badge variant="outline" className="border-[#7F56D9]/30 text-[#7F56D9] mb-5">
              Pricing
            </Badge>
            <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">
              Simple, transparent pricing
            </h1>
            <p className="text-xl text-gray-500 mb-10">
              Start free. Scale as you grow. No hidden fees, no surprises.
            </p>
            <div className="inline-flex items-center bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setYearly(false)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  !yearly ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setYearly(true)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  yearly ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
                }`}
              >
                Yearly{" "}
                <span className="text-green-600 font-bold">Save 17%</span>
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Plans */}
      <section className="pb-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 items-start">
            {PLANS.map((plan, i) => (
              <FadeIn key={plan.name} delay={i * 0.1}>
                <div
                  className={`relative rounded-3xl p-8 flex flex-col ${
                    plan.highlight
                      ? "bg-[#7F56D9] text-white shadow-2xl shadow-[#7F56D9]/30 md:scale-105"
                      : "border-2 border-gray-100 hover:border-[#7F56D9]/25 hover:shadow-xl transition-all"
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-white text-[#7F56D9] text-xs font-black px-4 py-1.5 rounded-full shadow-lg border border-[#EDE9F8]">
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  <h3 className={`font-black text-2xl mb-1 ${plan.highlight ? "text-white" : "text-gray-900"}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm mb-5 leading-relaxed ${plan.highlight ? "text-white/70" : "text-gray-500"}`}>
                    {plan.desc}
                  </p>

                  <div className="mb-2">
                    <span className={`text-5xl font-black ${plan.highlight ? "text-white" : "text-gray-900"}`}>
                      {plan.monthly === 0
                        ? "Free"
                        : `₹${(yearly ? plan.yearly : plan.monthly).toLocaleString("en-IN")}`}
                    </span>
                    {plan.monthly > 0 && (
                      <span className={`text-sm ml-1 ${plan.highlight ? "text-white/60" : "text-gray-400"}`}>
                        /{yearly ? "year" : "month"}
                      </span>
                    )}
                  </div>
                  <p className={`text-xs mb-6 ${plan.highlight ? "text-white/50" : "text-gray-400"}`}>
                    {plan.limit}
                  </p>

                  <Button
                    className={`w-full rounded-xl mb-7 font-semibold ${
                      plan.highlight
                        ? "bg-white text-[#7F56D9] hover:bg-gray-100"
                        : "bg-[#7F56D9] text-white hover:bg-[#6d47c4]"
                    }`}
                  >
                    {plan.cta}
                  </Button>

                  <ul className="space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <svg
                          className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlight ? "text-white/80" : "text-[#7F56D9]"}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className={`text-sm ${plan.highlight ? "text-white/80" : "text-gray-600"}`}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Enterprise row */}
          <FadeIn delay={0.3}>
            <div className="mt-8 rounded-2xl border-2 border-dashed border-gray-200 p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-[#7F56D9]/30 transition-colors">
              <div>
                <h3 className="font-black text-gray-900 text-xl mb-1">Enterprise</h3>
                <p className="text-gray-500 text-sm max-w-lg">
                  500+ employees, multi-entity structure, or custom compliance requirements?
                  We'll build a plan around you with dedicated support and SLA.
                </p>
              </div>
              <a
                href="mailto:contact@brello.co.in"
                className="shrink-0 inline-flex items-center border border-[#7F56D9] text-[#7F56D9] hover:bg-[#EDE9F8] rounded-xl font-semibold px-5 py-2.5 text-sm transition-colors"
              >
                Contact Sales →
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-3">Frequently Asked Questions</h2>
            <p className="text-gray-500">Everything you need to know about Brello pricing.</p>
          </FadeIn>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <FaqItem {...faq} />
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3} className="text-center mt-10">
            <p className="text-gray-500 text-sm">
              Still have questions?{" "}
              <a href="mailto:contact@brello.co.in" className="text-[#7F56D9] font-semibold hover:underline">
                contact@brello.co.in
              </a>
            </p>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
