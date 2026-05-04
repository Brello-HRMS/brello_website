"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// ─── Fade-in wrapper ──────────────────────────────────────────────────────────
function FadeIn({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const offsets = { up: [0, 32], down: [0, -32], left: [32, 0], right: [-32, 0], none: [0, 0] };
  const [x, y] = offsets[direction];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x, y }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Inline SVG icons ─────────────────────────────────────────────────────────
const CheckIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);
const ArrowRight = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);
const SparklesIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

// ─── Dashboard mockup ─────────────────────────────────────────────────────────
function DashboardMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: "1200px" }}
      className="w-full"
    >
      <div className="bg-white rounded-2xl shadow-2xl shadow-black/30 overflow-hidden border border-white/10">
        {/* Browser chrome */}
        <div className="bg-[#1e1e2e] px-4 py-2.5 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 bg-[#2a2a3e] rounded-md text-xs text-gray-500 px-3 py-1 mx-4 text-center">
            app.brello.in
          </div>
        </div>

        {/* App shell */}
        <div className="flex" style={{ height: 360 }}>
          {/* Sidebar */}
          <div className="w-44 bg-[#1a0d2e] p-3 flex flex-col shrink-0">
            <div className="flex items-center gap-2 px-2 py-2 mb-3">
              <div className="w-7 h-7 bg-[#7F56D9] rounded-lg flex items-center justify-center shadow-md shadow-[#7F56D9]/40">
                <span className="text-white font-black text-xs">B</span>
              </div>
              <span className="text-white font-semibold text-sm tracking-tight">Brello</span>
            </div>
            {[
              { name: "Dashboard", active: true },
              { name: "Employees", active: false },
              { name: "Attendance", active: false },
              { name: "Payroll", active: false },
              { name: "Leaves", active: false },
              { name: "Policies", active: false },
            ].map((item) => (
              <div
                key={item.name}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs mb-0.5 transition-colors ${
                  item.active
                    ? "bg-[#7F56D9] text-white font-medium"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${item.active ? "bg-white" : "bg-gray-600"}`} />
                {item.name}
              </div>
            ))}
          </div>

          {/* Main */}
          <div className="flex-1 bg-[#f9fafb] p-4 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs font-semibold text-gray-800">Good morning, Sarah 👋</p>
                <p className="text-xs text-gray-400">Friday, May 2, 2026</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#7F56D9] flex items-center justify-center shadow-sm">
                <span className="text-white text-xs font-semibold">SA</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-4">
              {[
                { label: "Total", value: "248", bg: "bg-[#EDE9F8]", text: "text-[#7F56D9]" },
                { label: "Present", value: "231", bg: "bg-green-50", text: "text-green-700" },
                { label: "On Leave", value: "12", bg: "bg-yellow-50", text: "text-yellow-700" },
                { label: "Pending", value: "5", bg: "bg-red-50", text: "text-red-600" },
              ].map((s) => (
                <div key={s.label} className={`${s.bg} rounded-xl p-2.5`}>
                  <p className="text-[10px] text-gray-500 mb-0.5">{s.label}</p>
                  <p className={`text-lg font-black ${s.text}`}>{s.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="flex items-center justify-between px-3 py-2 border-b border-gray-50">
                <span className="text-xs font-semibold text-gray-700">Employee Directory</span>
                <span className="text-xs text-[#7F56D9] cursor-pointer hover:underline">View all →</span>
              </div>
              {[
                { name: "Alice Johnson", dept: "Engineering", status: "Present", initials: "AJ" },
                { name: "Bob Martinez", dept: "Product", status: "Present", initials: "BM" },
                { name: "Carol Wang", dept: "Design", status: "On Leave", initials: "CW" },
                { name: "David Lee", dept: "Marketing", status: "Present", initials: "DL" },
              ].map((emp) => (
                <div
                  key={emp.name}
                  className="flex items-center gap-3 px-3 py-2 border-b border-gray-50 last:border-0 hover:bg-gray-50/80 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-[#EDE9F8] flex items-center justify-center shrink-0">
                    <span className="text-[10px] text-[#7F56D9] font-bold">{emp.initials}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-700 truncate">{emp.name}</p>
                    <p className="text-[10px] text-gray-400">{emp.dept}</p>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full shrink-0 font-medium ${
                      emp.status === "Present"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {emp.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Attendance mockup ────────────────────────────────────────────────────────
function AttendanceMockup() {
  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/80 overflow-hidden border border-gray-100">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-800">Today's Attendance</span>
        <span className="flex items-center gap-1.5 text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Live
        </span>
      </div>

      {/* Geofence map */}
      <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 h-36 mx-4 mt-4 mb-3 rounded-xl overflow-hidden border border-blue-100">
        <div className="absolute inset-0 opacity-20">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="absolute w-full border-t border-blue-300" style={{ top: `${i * 25}%` }} />
          ))}
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="absolute h-full border-l border-blue-300" style={{ left: `${i * 25}%` }} />
          ))}
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-24 h-24 rounded-full border-2 border-[#7F56D9]/60 bg-[#7F56D9]/10 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-[#7F56D9] shadow-lg shadow-[#7F56D9]/50" />
          </div>
        </div>
        {[
          { top: "30%", left: "40%" },
          { top: "55%", left: "52%" },
          { top: "42%", left: "44%" },
        ].map((pos, i) => (
          <div key={i} className="absolute" style={pos}>
            <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-white shadow-md" />
          </div>
        ))}
        <div className="absolute bottom-2 right-3 bg-white/90 backdrop-blur rounded-lg px-2.5 py-1 shadow-sm">
          <span className="text-xs text-gray-600 font-medium">Geofenced Zone</span>
        </div>
      </div>

      <div className="px-4 pb-4 space-y-2">
        {[
          { name: "Alice J.", in: "9:02 AM", status: "In Office" },
          { name: "Bob M.", in: "8:47 AM", status: "In Office" },
          { name: "Carol W.", in: "—", status: "On Leave" },
        ].map((r) => (
          <div key={r.name} className="flex items-center justify-between text-xs bg-gray-50 rounded-xl px-3 py-2.5">
            <span className="font-medium text-gray-700 w-16">{r.name}</span>
            <span className="text-gray-500">In: {r.in}</span>
            <span
              className={`px-2.5 py-1 rounded-full font-medium ${
                r.status === "In Office" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {r.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Payroll mockup ───────────────────────────────────────────────────────────
function PayrollMockup() {
  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/80 overflow-hidden border border-gray-100">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-800">Payroll Run — May 2026</p>
          <p className="text-xs text-gray-500 mt-0.5">248 employees · ₹42,80,000 total</p>
        </div>
        <span className="text-xs px-3 py-1.5 bg-[#EDE9F8] text-[#7F56D9] rounded-full font-medium">Dry Run</span>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: "Gross Pay", value: "₹42.8L", color: "text-gray-800" },
            { label: "Deductions", value: "₹8.2L", color: "text-red-600" },
            { label: "Net Pay", value: "₹34.6L", color: "text-green-700" },
          ].map((s) => (
            <div key={s.label} className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
              <p className="text-[10px] text-gray-500 mb-1">{s.label}</p>
              <p className={`text-sm font-black ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          {[
            { name: "Alice Johnson", gross: "₹85,000", net: "₹72,000", status: "Ready" },
            { name: "Bob Martinez", gross: "₹1,20,000", net: "₹1,01,500", status: "Ready" },
            { name: "Carol Wang", gross: "₹65,000", net: "₹55,200", status: "On Hold" },
          ].map((emp) => (
            <div key={emp.name} className="flex items-center text-xs bg-gray-50 rounded-xl px-3 py-2.5 gap-2">
              <span className="font-medium text-gray-700 flex-1 truncate">{emp.name}</span>
              <span className="text-gray-500 shrink-0">{emp.gross}</span>
              <span className="text-gray-800 font-semibold shrink-0">{emp.net}</span>
              <span
                className={`px-2 py-0.5 rounded-full shrink-0 font-medium ${
                  emp.status === "Ready" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {emp.status}
              </span>
            </div>
          ))}
        </div>

        <button className="mt-4 w-full py-2.5 bg-[#7F56D9] hover:bg-[#6d47c4] text-white text-xs font-semibold rounded-xl transition-colors shadow-sm shadow-[#7F56D9]/30">
          Process Payroll →
        </button>
      </div>
    </div>
  );
}

// ─── Leave mockup ─────────────────────────────────────────────────────────────
function LeaveMockup() {
  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/80 overflow-hidden border border-gray-100">
      <div className="p-4 border-b border-gray-100">
        <p className="text-sm font-semibold text-gray-800">Leave Management</p>
      </div>

      <div className="p-4">
        <p className="text-xs font-medium text-gray-500 mb-3">Leave Balance — Alice Johnson</p>
        <div className="space-y-3 mb-5">
          {[
            { type: "Annual Leave", used: 5, total: 18, color: "bg-[#7F56D9]" },
            { type: "Sick Leave", used: 2, total: 10, color: "bg-blue-500" },
            { type: "Casual Leave", used: 1, total: 6, color: "bg-emerald-500" },
          ].map((leave) => (
            <div key={leave.type}>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-gray-600 font-medium">{leave.type}</span>
                <span className="text-gray-400">
                  {leave.used}/{leave.total} days
                </span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${leave.color} transition-all`}
                  style={{ width: `${(leave.used / leave.total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs font-medium text-gray-500 mb-2">Pending Approvals</p>
        <div className="space-y-2">
          {[
            { name: "Bob M.", type: "Annual", dates: "May 8–10", days: 3 },
            { name: "David L.", type: "Sick", dates: "May 6", days: 1 },
          ].map((req) => (
            <div key={req.name} className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2.5">
              <div>
                <p className="text-xs font-semibold text-gray-700">
                  {req.name} · {req.type}
                </p>
                <p className="text-[10px] text-gray-400">
                  {req.dates} ({req.days}d)
                </p>
              </div>
              <div className="flex gap-1.5">
                <button className="text-xs px-2.5 py-1 bg-green-100 text-green-700 rounded-lg font-medium hover:bg-green-200 transition-colors">
                  ✓
                </button>
                <button className="text-xs px-2.5 py-1 bg-red-100 text-red-600 rounded-lg font-medium hover:bg-red-200 transition-colors">
                  ✗
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const features = [
  {
    icon: "👥",
    title: "Employee Management",
    description: "Centralized directory with profiles, org chart, documents, and self-service portal.",
    bg: "bg-purple-50",
  },
  {
    icon: "⏱️",
    title: "Attendance Tracking",
    description: "Real-time attendance with geofencing, shift management, and mobile check-in.",
    bg: "bg-blue-50",
  },
  {
    icon: "💰",
    title: "Payroll Processing",
    description: "Automated payroll with statutory compliance, dry-run previews, and salary templates.",
    bg: "bg-green-50",
  },
  {
    icon: "🏖️",
    title: "Leave Management",
    description: "Custom leave policies, balance tracking, and automated approval workflows.",
    bg: "bg-orange-50",
  },
  {
    icon: "🏢",
    title: "Departments & Designations",
    description: "Organize your company structure with clear hierarchies and designation mappings.",
    bg: "bg-pink-50",
  },
  {
    icon: "🔒",
    title: "Role-Based Access",
    description: "Fine-grained permissions — give everyone exactly the access they need, nothing more.",
    bg: "bg-indigo-50",
  },
  {
    icon: "💼",
    title: "Reimbursements",
    description: "Track and approve employee expense claims seamlessly within the platform.",
    bg: "bg-teal-50",
  },
  {
    icon: "📅",
    title: "Holiday Calendar",
    description: "Manage company and regional holidays, integrated directly with leave calculations.",
    bg: "bg-yellow-50",
  },
];

const comparisons = [
  { old: "Weeks of setup and expensive onboarding", brello: "Get started in under an hour" },
  { old: "Spreadsheets and constant manual data entry", brello: "Automated workflows and smart defaults" },
  { old: "5 different tools for HR, payroll, attendance", brello: "One unified platform for everything" },
  { old: "Bloated per-seat enterprise pricing", brello: "Transparent, affordable pricing" },
  { old: "Poor or nonexistent mobile experience", brello: "Mobile-first, field-ready features" },
  { old: "Outdated, cluttered, slow interfaces", brello: "Modern design that teams actually love" },
];

const roadmap = [
  {
    title: "Offer Letter Management",
    desc: "Create, send, and track offer letters with digital signatures and templates.",
    status: "In Development",
    statusColor: "bg-[#7F56D9] text-white",
  },
  {
    title: "Advanced Analytics",
    desc: "HR insights, workforce trends, and a custom report builder — all at a glance.",
    status: "In Development",
    statusColor: "bg-[#7F56D9] text-white",
  },
  {
    title: "Mobile App (iOS & Android)",
    desc: "Full-featured app for employees — check-in, leave requests, payslips on the go.",
    status: "Coming Q3 2026",
    statusColor: "bg-blue-100 text-blue-700",
  },
  {
    title: "Slack & Teams Integration",
    desc: "Approve leaves, get payroll alerts, and manage HR directly in your chat tool.",
    status: "Coming Q3 2026",
    statusColor: "bg-blue-100 text-blue-700",
  },
  {
    title: "Biometric Integration",
    desc: "Connect fingerprint and face-recognition devices to Brello attendance seamlessly.",
    status: "Planned",
    statusColor: "bg-gray-100 text-gray-600",
  },
  {
    title: "AI HR Assistant",
    desc: "Ask questions, generate reports, and automate routine HR tasks with AI.",
    status: "Planned",
    statusColor: "bg-gray-100 text-gray-600",
  },
];

const steps = [
  {
    number: "01",
    title: "Sign Up & Configure",
    desc: "Create your company account, add departments, designations, and policies in minutes.",
  },
  {
    number: "02",
    title: "Add Your Team",
    desc: "Import employees via Excel or add them manually. Set salary structures, leave policies, and attendance rules.",
  },
  {
    number: "03",
    title: "Go Live",
    desc: "Employees get their accounts and the platform is live. Run payroll, approve leaves, track attendance — all in one place.",
  },
];

// ─── Main page ────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-16 min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#0d0520] via-[#1a0d3e] to-[#2d1b4e]">
        {/* Ambient blobs */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#7F56D9]/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -left-20 w-[500px] h-[500px] bg-[#8300ff]/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-[#7F56D9]/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-[#7F56D9]/20 border border-[#7F56D9]/30 text-[#c4a8ff] text-xs font-medium px-4 py-2 rounded-full mb-8"
              >
                <SparklesIcon />
                Modern HRMS for growing teams
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl lg:text-6xl font-black text-white leading-tight mb-6 tracking-tight"
              >
                HR, done right.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c4a8ff] to-[#7F56D9]">
                  Finally.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-gray-300 leading-relaxed mb-10 max-w-lg"
              >
                One platform for attendance, payroll, leaves, and everything HR —
                without the complexity, without the clutter, without the frustration.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 mb-12"
              >
                <Button
                  size="lg"
                  className="bg-[#7F56D9] hover:bg-[#6d47c4] text-white rounded-xl shadow-lg shadow-[#7F56D9]/40 text-base font-semibold gap-2"
                >
                  Start Free Trial <ArrowRight className="w-4 h-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-xl border-white/20 bg-white/10 text-white hover:bg-white/15 hover:text-white text-base backdrop-blur-sm"
                >
                  Book a Demo
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex items-center gap-5"
              >
                <div className="flex -space-x-2">
                  {["S", "A", "R", "M"].map((l, i) => (
                    <div
                      key={l}
                      className="w-8 h-8 rounded-full border-2 border-[#1a0d2e] flex items-center justify-center text-white text-xs font-bold"
                      style={{
                        background: `hsl(${260 + i * 20}, 70%, ${50 + i * 5}%)`,
                      }}
                    >
                      {l}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 mb-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-400 text-xs">Loved by 200+ companies</p>
                </div>
              </motion.div>
            </div>

            {/* Right: dashboard mockup */}
            <div className="hidden lg:block">
              <DashboardMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-gray-50 border-y border-gray-200 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "200+", label: "Companies Using Brello" },
              { value: "50,000+", label: "Employees Managed" },
              { value: "1M+", label: "Attendance Records" },
              { value: "₹100Cr+", label: "Payroll Processed" },
            ].map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1}>
                <p className="text-3xl font-black text-[#7F56D9] mb-1">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features grid ── */}
      <section id="features" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <Badge variant="outline" className="border-[#7F56D9]/30 text-[#7F56D9] mb-4">
              Everything you need
            </Badge>
            <h2 className="text-4xl font-black text-gray-900 mb-4">All your HR tools in one place</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              No more switching between 5 different tools. Brello brings everything together — beautifully.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((feature, i) => (
              <FadeIn key={feature.title} delay={i * 0.05} direction="up">
                <motion.div
                  whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(127,86,217,0.12)" }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="border border-gray-100 hover:border-[#7F56D9]/30 transition-colors cursor-pointer h-full">
                    <CardContent className="p-6">
                      <div className={`${feature.bg} w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4`}>
                        {feature.icon}
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Attendance spotlight ── */}
      <section className="py-28 bg-[#faf9ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left">
              <Badge variant="outline" className="border-[#7F56D9]/30 text-[#7F56D9] mb-5">
                Attendance
              </Badge>
              <h2 className="text-4xl font-black text-gray-900 mb-5 leading-tight">
                Know exactly who's in, <br />where, and when.
              </h2>
              <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                From geofenced locations to mobile check-in — real-time visibility
                into your team's attendance without the micromanagement.
              </p>
              <div className="space-y-4">
                {[
                  { title: "Geofencing", desc: "Define office perimeters — employees can only check in when physically present." },
                  { title: "Mobile Check-In", desc: "One-tap attendance on mobile for field teams and remote employees." },
                  { title: "Shift Management", desc: "Multiple shifts, rotational schedules, and overtime tracking." },
                  { title: "Instant Reports", desc: "Daily, weekly, and monthly reports with one-click Excel export." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#7F56D9] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckIcon className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn direction="right" delay={0.15}>
              <AttendanceMockup />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Payroll spotlight ── */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left" delay={0.15} className="order-2 lg:order-1">
              <PayrollMockup />
            </FadeIn>
            <FadeIn direction="right" className="order-1 lg:order-2">
              <Badge variant="outline" className="border-[#7F56D9]/30 text-[#7F56D9] mb-5">
                Payroll
              </Badge>
              <h2 className="text-4xl font-black text-gray-900 mb-5 leading-tight">
                Payroll that just <br />works. Every time.
              </h2>
              <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                From salary templates to statutory deductions — fully automated
                payroll with a dry-run preview before you commit.
              </p>
              <div className="space-y-4">
                {[
                  { title: "Dry-Run Preview", desc: "Preview every paystub before processing — catch errors before they happen." },
                  { title: "Statutory Compliance", desc: "PF, ESI, TDS, and PT handled automatically per current regulations." },
                  { title: "Salary Templates", desc: "Create reusable structures with earnings, deductions, and bonuses." },
                  { title: "One-Click Payslips", desc: "Generate and distribute payslips to all employees instantly." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#7F56D9] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckIcon className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Leave spotlight ── */}
      <section className="py-28 bg-[#faf9ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left">
              <Badge variant="outline" className="border-[#7F56D9]/30 text-[#7F56D9] mb-5">
                Leave Management
              </Badge>
              <h2 className="text-4xl font-black text-gray-900 mb-5 leading-tight">
                Leave policies that <br />scale with your team.
              </h2>
              <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                Define custom leave types, set policies per department, and let
                employees manage their own leaves with built-in approval workflows.
              </p>
              <div className="space-y-4">
                {[
                  { title: "Custom Leave Types", desc: "Annual, sick, maternity, paternity — create any type with custom rules." },
                  { title: "Self-Service Portal", desc: "Employees apply and track balances without HR intervention." },
                  { title: "Approval Workflows", desc: "Multi-level approval chains with email and in-app notifications." },
                  { title: "Holiday Integration", desc: "Regional and national holidays integrated with leave calculations." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#7F56D9] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckIcon className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn direction="right" delay={0.15}>
              <LeaveMockup />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Why Brello ── */}
      <section className="py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <Badge variant="outline" className="border-[#7F56D9]/30 text-[#7F56D9] mb-4">
              Why Brello
            </Badge>
            <h2 className="text-4xl font-black text-gray-900 mb-4">Built for how teams actually work</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Traditional HRMS was built in the 2000s — and it shows. Brello is built for today.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            <FadeIn direction="left" delay={0.1}>
              <Card className="border-2 border-red-100 bg-red-50/40 h-full">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center text-lg">⚠️</div>
                    <h3 className="font-bold text-red-700 text-lg">Legacy HRMS</h3>
                  </div>
                  <div className="space-y-3.5">
                    {comparisons.map((c) => (
                      <div key={c.old} className="flex items-start gap-2.5">
                        <span className="text-red-400 mt-0.5 shrink-0 font-bold">✗</span>
                        <p className="text-sm text-red-700">{c.old}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn direction="right" delay={0.2}>
              <Card className="border-2 border-[#7F56D9]/25 bg-[#faf9ff] h-full">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 rounded-xl bg-[#7F56D9] flex items-center justify-center shadow-sm shadow-[#7F56D9]/40">
                      <span className="text-white font-black text-sm">B</span>
                    </div>
                    <h3 className="font-bold text-[#7F56D9] text-lg">Brello</h3>
                  </div>
                  <div className="space-y-3.5">
                    {comparisons.map((c) => (
                      <div key={c.brello} className="flex items-start gap-2.5">
                        <span className="text-[#7F56D9] mt-0.5 shrink-0 font-bold">✓</span>
                        <p className="text-sm text-gray-800 font-medium">{c.brello}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Roadmap ── */}
      <section id="roadmap" className="py-28 bg-[#1a0d2e] relative overflow-hidden">
        <div className="absolute -top-40 right-0 w-96 h-96 bg-[#7F56D9]/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#8300ff]/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <Badge className="bg-[#7F56D9]/20 text-[#c4a8ff] border-[#7F56D9]/30 mb-4">
              What's coming
            </Badge>
            <h2 className="text-4xl font-black text-white mb-4">We're just getting started</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Our roadmap is ambitious. Here's what we're building next.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {roadmap.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08} direction="up">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-colors h-full"
                >
                  <Badge className={`${item.statusColor} mb-4 border-0`}>{item.status}</Badge>
                  <h3 className="font-bold text-white text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <Badge variant="outline" className="border-[#7F56D9]/30 text-[#7F56D9] mb-4">
              Quick start
            </Badge>
            <h2 className="text-4xl font-black text-gray-900 mb-4">Up and running in under an hour</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Designed to be simple to set up. No consultants. No weeks of training. No surprises.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-12 left-[calc(16.67%+32px)] right-[calc(16.67%+32px)] h-px bg-gradient-to-r from-[#7F56D9]/20 via-[#7F56D9] to-[#7F56D9]/20" />

            {steps.map((step, i) => (
              <FadeIn key={step.number} delay={i * 0.15} direction="up">
                <div className="text-center relative">
                  <div className="w-16 h-16 rounded-2xl bg-[#7F56D9] text-white font-black text-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#7F56D9]/30 relative z-10">
                    {step.number}
                  </div>
                  <h3 className="font-bold text-gray-900 text-xl mb-3">{step.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 bg-gradient-to-br from-[#0d0520] via-[#2d1b4e] to-[#392a46] relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#7F56D9]/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#8300ff]/15 rounded-full blur-[100px] pointer-events-none" />

        <FadeIn direction="none" className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-black text-white mb-6 leading-tight">
            Ready to modernize <br />your HR operations?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join 200+ companies already using Brello. Start free — no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-[#7F56D9] hover:bg-gray-100 font-bold rounded-xl shadow-xl text-base gap-2"
            >
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#7F56D9]/40 bg-[#7F56D9]/20 text-white hover:bg-[#7F56D9]/30 hover:text-white rounded-xl text-base"
            >
              Book a Demo
            </Button>
          </div>
          <p className="text-gray-500 text-sm mt-6">No credit card required · 30-day free trial · Cancel anytime</p>
        </FadeIn>
      </section>

      <Footer />
    </div>
  );
}
