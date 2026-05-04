"use client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

type Status = "done" | "building" | "upcoming" | "planned";

const STATUS_CONFIG: Record<Status, { label: string; bg: string; dot: string }> = {
  done: { label: "Shipped", bg: "bg-green-100 text-green-700", dot: "bg-green-500" },
  building: { label: "In Development", bg: "bg-[#7F56D9] text-white", dot: "bg-white" },
  upcoming: { label: "Coming Soon", bg: "bg-blue-100 text-blue-700", dot: "bg-blue-500" },
  planned: { label: "Planned", bg: "bg-gray-100 text-gray-600", dot: "bg-gray-400" },
};

const QUARTERS: Array<{
  quarter: string;
  label: string;
  items: Array<{ title: string; desc: string; status: Status }>;
}> = [
  {
    quarter: "Q1 2026",
    label: "Foundation",
    items: [
      { title: "Employee Management", desc: "Full employee directory with profiles, org chart, and document management.", status: "done" },
      { title: "Attendance Tracking", desc: "Real-time attendance with geofencing, shift management, and daily reports.", status: "done" },
      { title: "Leave Management", desc: "Custom leave types, policies, approval workflows, and balance tracking.", status: "done" },
      { title: "Payroll Processing", desc: "Automated payroll with PF, ESI, TDS compliance, dry-run preview, and payslips.", status: "done" },
      { title: "Role-Based Access Control", desc: "Fine-grained permissions with module-level and action-level control.", status: "done" },
      { title: "Holiday Calendar", desc: "National and regional holiday management integrated with leave policies.", status: "done" },
    ],
  },
  {
    quarter: "Q2 2026",
    label: "Intelligence",
    items: [
      { title: "Offer Letter Management", desc: "Create, customize, and send digital offer letters with e-signature support.", status: "building" },
      { title: "Advanced Analytics Dashboard", desc: "Workforce trends, attendance heatmaps, payroll insights, and custom reports.", status: "building" },
      { title: "Performance Reviews", desc: "Set goals, conduct reviews, and track employee performance over time.", status: "upcoming" },
      { title: "Expense Reimbursements V2", desc: "Policy-based reimbursements with receipt uploads and approval workflows.", status: "upcoming" },
    ],
  },
  {
    quarter: "Q3 2026",
    label: "Connected",
    items: [
      { title: "Mobile App (iOS & Android)", desc: "Full-featured app for employees — check-in, apply leave, view payslips, and more.", status: "upcoming" },
      { title: "Slack & Teams Integration", desc: "Approve leaves, get payroll alerts, and manage HR directly in your chat tool.", status: "upcoming" },
      { title: "Biometric Device Integration", desc: "Connect fingerprint and face-recognition devices seamlessly with attendance.", status: "planned" },
      { title: "Google Workspace Sync", desc: "Sync employee directory with Google Workspace and auto-provision accounts.", status: "planned" },
    ],
  },
  {
    quarter: "Q4 2026 & Beyond",
    label: "Future",
    items: [
      { title: "AI HR Assistant", desc: "Ask questions, generate reports, get insights, and automate routine HR tasks with AI.", status: "planned" },
      { title: "Recruitment Module", desc: "End-to-end hiring — job postings, applications, interviews, and offers.", status: "planned" },
      { title: "Global Payroll", desc: "Multi-currency payroll for international teams with compliance per country.", status: "planned" },
      { title: "Custom Workflow Builder", desc: "Drag-and-drop workflow automation for any HR process, no code required.", status: "planned" },
    ],
  },
];

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-[#1a0d2e] to-[#2d1b4e] relative overflow-hidden">
        <div className="absolute -top-20 right-0 w-96 h-96 bg-[#7F56D9]/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#8300ff]/15 rounded-full blur-[80px]" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <FadeIn>
            <Badge className="bg-[#7F56D9]/20 text-[#c4a8ff] border-[#7F56D9]/30 mb-5">
              Public Roadmap
            </Badge>
            <h1 className="text-5xl font-black text-white mb-4 tracking-tight">
              We're just getting started
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Track what we've shipped, what we're building, and what's next.
              Your feedback shapes this roadmap.
            </p>
          </FadeIn>

          {/* Legend */}
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
              {Object.entries(STATUS_CONFIG).map(([key, val]) => (
                <div key={key} className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${val.dot === "bg-white" ? "bg-white" : val.dot}`} />
                  <span className="text-xs text-gray-400">{val.label}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {QUARTERS.map((quarter, qi) => (
            <div key={quarter.quarter} className="mb-20 last:mb-0">
              <FadeIn>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-[#7F56D9] flex items-center justify-center shadow-lg shadow-[#7F56D9]/30 shrink-0">
                    <span className="text-white font-black text-lg">{qi + 1}</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#7F56D9] uppercase tracking-widest">{quarter.quarter}</p>
                    <h2 className="text-2xl font-black text-gray-900">{quarter.label}</h2>
                  </div>
                </div>
              </FadeIn>

              <div className="grid sm:grid-cols-2 gap-4 ml-0 sm:ml-16">
                {quarter.items.map((item, i) => {
                  const cfg = STATUS_CONFIG[item.status];
                  return (
                    <FadeIn key={item.title} delay={i * 0.07} direction="up">
                      <motion.div
                        whileHover={{ y: -3 }}
                        className="border border-gray-100 rounded-2xl p-5 hover:border-[#7F56D9]/25 hover:shadow-lg transition-all"
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h3 className="font-bold text-gray-900 text-sm">{item.title}</h3>
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${cfg.bg}`}>
                            {cfg.label}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                      </motion.div>
                    </FadeIn>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Suggest a feature */}
      <section className="py-20 bg-[#faf9ff] border-t border-gray-100">
        <FadeIn className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-3">Have a feature in mind?</h2>
          <p className="text-gray-500 mb-8">
            We prioritize features based on customer feedback. Tell us what you need and we might just build it next.
          </p>
          <a
            href="mailto:contact@brello.co.in?subject=Feature Request"
            className="inline-flex items-center gap-2 bg-[#7F56D9] hover:bg-[#6d47c4] text-white font-semibold px-8 py-4 rounded-xl transition-colors shadow-lg shadow-[#7F56D9]/25"
          >
            Suggest a Feature →
          </a>
        </FadeIn>
      </section>

      <Footer />
    </div>
  );
}
