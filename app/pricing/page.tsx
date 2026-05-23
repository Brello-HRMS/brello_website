"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const PLANS = [
  {
    name: "Free",
    monthly: 0,
    desc: "Perfect for exploring Brello and managing basic HR needs.",
    limit: "Unlimited active employees",
    cta: "Start 30-Day Trial",
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
    name: "Standard",
    monthly: 99,
    desc: "Everything you need to run HR for a growing company.",
    limit: "Per active employee / month",
    cta: "Start 30-Day Trial",
    highlight: true,
    badge: "Most Popular",
    features: [
      "Everything in Free",
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
    name: "Premium",
    monthly: 149,
    desc: "For larger teams with complex HR and payroll needs.",
    limit: "Per active employee / month",
    cta: "Start 30-Day Trial",
    highlight: false,
    features: [
      "Everything in Standard",
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
  {
    q: "How does the free trial work?",
    a: "Every organization receives a 30-day free trial, regardless of the plan selected. You get full access to all features during the trial without providing payment details upfront.",
  },
  {
    q: "How is billing calculated?",
    a: "Billing is based on active employees. We take a snapshot of your active employee count at the time of invoice generation. Inactive or deleted employees are not billed.",
  },
  {
    q: "What happens after the subscription expires?",
    a: "You get a 3-day grace period where admin access remains, but warnings are displayed. After day 3, admin access to modules like Payroll and Settings is blocked. However, employees can still log attendance continuously.",
  },
  {
    q: "Are taxes included in the pricing?",
    a: "No, pricing is exclusive of 18% GST. GST will be added to your final invoice.",
  },
  {
    q: "Do you offer yearly billing?",
    a: "Currently, we only support monthly billing cycles. Yearly billing with exciting discounts is coming in the future!",
  },
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
        <p className="px-6 pb-4 pt-2 text-sm text-gray-500 leading-relaxed border-t border-gray-50">
          {a}
        </p>
      </motion.div>
    </div>
  );
}

export default function PricingPage() {
  const { data: plans = PLANS as any[], isLoading: loading } = useQuery({
    queryKey: ["plans"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:8000/api/v1/plans");
      const data = response.data;
      const fetchedPlans = Array.isArray(data) ? data : data.data || [];
      const formattedPlans = fetchedPlans.map((p: any) => ({
        id: p.id,
        name: p.name,
        monthly: Number(p.price),
        desc: p.description || "",
        limit:
          p.name === "Free"
            ? "Unlimited active employees"
            : "Per active employee / month",
        cta: "Start 30-Day Trial",
        highlight: p.name === "Standard",
        badge: p.name === "Standard" ? "Most Popular" : undefined,
        features: p.feature || [],
      }));
      // Sort to ensure Free -> Standard -> Premium based on price
      formattedPlans.sort((a: any, b: any) => a.monthly - b.monthly);
      return formattedPlans.length > 0 ? formattedPlans : PLANS;
    },
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-[#faf9ff] to-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <FadeIn>
            <Badge
              variant="outline"
              className="border-[#7F56D9]/30 text-[#7F56D9] mb-5"
            >
              Pricing
            </Badge>
            <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">
              Simple, transparent pricing
            </h1>
            <p className="text-xl text-gray-500 mb-10">
              Start free. Scale as you grow. No hidden fees, no surprises.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Plans */}
      <section className="pb-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 items-start">
            {loading ? (
              <div className="col-span-3 text-center py-20 text-gray-500">
                Loading plans...
              </div>
            ) : (
              plans.map((plan: any, i: number) => (
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

                    <h3
                      className={`font-black text-2xl mb-1 ${plan.highlight ? "text-white" : "text-gray-900"}`}
                    >
                      {plan.name}
                    </h3>
                    <p
                      className={`text-sm mb-5 leading-relaxed ${plan.highlight ? "text-white/70" : "text-gray-500"}`}
                    >
                      {plan.desc}
                    </p>

                    <div className="mb-2">
                      <span
                        className={`text-5xl font-black ${plan.highlight ? "text-white" : "text-gray-900"}`}
                      >
                        {plan.monthly === 0 ? "₹0" : `₹${plan.monthly}`}
                      </span>
                    </div>
                    <p
                      className={`text-xs mb-6 ${plan.highlight ? "text-white/50" : "text-gray-400"}`}
                    >
                      {plan.limit}
                    </p>

                    <a
                      href={`http://localhost:5173/auth/register?plan_id=${plan.id || plan.name.toLowerCase()}`}
                      className="w-full"
                    >
                      <Button
                        className={`w-full rounded-xl mb-7 font-semibold ${
                          plan.highlight
                            ? "bg-white text-[#7F56D9] hover:bg-gray-100"
                            : "bg-[#7F56D9] text-white hover:bg-[#6d47c4]"
                        }`}
                      >
                        {plan.cta}
                      </Button>
                    </a>

                    <ul className="space-y-3">
                      {plan.features.map((f: string) => (
                        <li key={f} className="flex items-start gap-3">
                          <svg
                            className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlight ? "text-white/80" : "text-[#7F56D9]"}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span
                            className={`text-sm ${plan.highlight ? "text-white/80" : "text-gray-600"}`}
                          >
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              ))
            )}
          </div>

          {/* Enterprise row */}
          <FadeIn delay={0.3}>
            <div className="mt-8 rounded-2xl border-2 border-dashed border-gray-200 p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-[#7F56D9]/30 transition-colors">
              <div>
                <h3 className="font-black text-gray-900 text-xl mb-1">
                  Enterprise
                </h3>
                <p className="text-gray-500 text-sm max-w-lg">
                  500+ employees, multi-entity structure, or custom compliance
                  requirements? We'll build a plan around you with dedicated
                  support and SLA.
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
            <h2 className="text-3xl font-black text-gray-900 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500">
              Everything you need to know about Brello pricing.
            </p>
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
              <a
                href="mailto:contact@brello.co.in"
                className="text-[#7F56D9] font-semibold hover:underline"
              >
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
