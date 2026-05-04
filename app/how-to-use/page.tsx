import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const STEPS = [
  {
    number: "01",
    title: "Create Your Company Account",
    time: "~2 minutes",
    desc: "Sign up with your work email and fill in your company details — name, industry, company size, and location. Verify your email and you're in.",
    points: [
      "No credit card required to get started",
      "Supports all company sizes and industries",
      "Instant access to the full platform on sign-up",
    ],
    mockup: "signup",
  },
  {
    number: "02",
    title: "Set Up Your Structure",
    time: "~10 minutes",
    desc: "Add your departments (Engineering, Sales, HR, etc.) and job designations. Configure your company's working hours, weekly off days, and time zone.",
    points: [
      "Unlimited departments and designations",
      "Custom working hour configurations per department",
      "Multiple time zones supported",
    ],
    mockup: "structure",
  },
  {
    number: "03",
    title: "Configure HR Policies",
    time: "~15 minutes",
    desc: "Define your leave policies — types, accrual rules, carry-forward limits. Set up attendance rules, geofencing zones (if applicable), and shift schedules.",
    points: [
      "Custom leave types: annual, sick, casual, paternity, and more",
      "Geofencing for field teams or on-site employees",
      "Multiple shift configurations for rotational teams",
    ],
    mockup: "policies",
  },
  {
    number: "04",
    title: "Add Your Team",
    time: "~20 minutes",
    desc: "Import all employees at once via an Excel template, or add them one by one. Assign departments, designations, managers, and salary structures.",
    points: [
      "Bulk import via Excel template (download included)",
      "Assign salary components per employee or via templates",
      "Automatic email invites sent to all employees",
    ],
    mockup: "employees",
  },
  {
    number: "05",
    title: "Set Up Payroll",
    time: "~10 minutes",
    desc: "Configure salary components — basic, HRA, special allowance, PF, ESI, TDS. Use templates to assign structures to employee groups. Run a dry-run before the first payroll.",
    points: [
      "Pre-configured Indian statutory components (PF, ESI, PT)",
      "Salary templates for groups of employees",
      "Dry-run preview before committing to payroll",
    ],
    mockup: "payroll",
  },
  {
    number: "06",
    title: "Go Live 🎉",
    time: "You're done!",
    desc: "Employees get their login invites, download the mobile app (coming soon), and start using Brello for attendance, leaves, and payslips. You're now running your HR on Brello.",
    points: [
      "Employee self-service portal is live immediately",
      "Real-time attendance dashboard from day one",
      "Payroll ready to run at the end of the month",
    ],
    mockup: "live",
  },
];

function StepMockup({ type }: { type: string }) {
  const mockups: Record<string, React.ReactNode> = {
    signup: (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 space-y-4">
        <div className="text-center mb-2">
          <div className="w-10 h-10 bg-[#7F56D9] rounded-xl mx-auto mb-3 flex items-center justify-center">
            <span className="text-white font-black text-sm">B</span>
          </div>
          <p className="font-bold text-gray-900">Create your account</p>
        </div>
        {[
          { label: "Company Name", value: "Acme Technologies" },
          { label: "Work Email", value: "hr@acme.com" },
          { label: "Team Size", value: "51–200 employees" },
        ].map((f) => (
          <div key={f.label}>
            <p className="text-xs text-gray-500 mb-1">{f.label}</p>
            <div className="h-9 bg-gray-50 border border-gray-200 rounded-lg px-3 flex items-center">
              <span className="text-sm text-gray-700">{f.value}</span>
            </div>
          </div>
        ))}
        <button className="w-full h-10 bg-[#7F56D9] text-white text-sm font-semibold rounded-lg">
          Create Account →
        </button>
      </div>
    ),
    structure: (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-3 border-b bg-gray-50">
          <p className="text-sm font-semibold text-gray-800">Departments</p>
        </div>
        <div className="p-4 space-y-2">
          {["Engineering", "Product", "Design", "Marketing", "Sales", "HR & Admin"].map((d, i) => (
            <div key={d} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-2.5">
              <span className="text-sm text-gray-700 font-medium">{d}</span>
              <span className="text-xs text-gray-400">{[18, 5, 4, 6, 12, 3][i]} members</span>
            </div>
          ))}
        </div>
      </div>
    ),
    policies: (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-3 border-b bg-gray-50">
          <p className="text-sm font-semibold text-gray-800">Leave Policies</p>
        </div>
        <div className="p-4 space-y-2">
          {[
            { type: "Annual Leave", days: "18 days/year", accrual: "Monthly" },
            { type: "Sick Leave", days: "10 days/year", accrual: "Upfront" },
            { type: "Casual Leave", days: "6 days/year", accrual: "Upfront" },
            { type: "Maternity Leave", days: "180 days", accrual: "On request" },
          ].map((p) => (
            <div key={p.type} className="bg-gray-50 rounded-xl px-4 py-2.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{p.type}</span>
                <span className="text-xs text-[#7F56D9] font-semibold">{p.days}</span>
              </div>
              <span className="text-xs text-gray-400">Accrual: {p.accrual}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    employees: (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-3 border-b bg-gray-50 flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-800">Add Employees</p>
          <span className="text-xs bg-[#EDE9F8] text-[#7F56D9] px-3 py-1 rounded-full font-medium">
            Import Excel
          </span>
        </div>
        <div className="p-4 space-y-2">
          {[
            { name: "Priya Sharma", dept: "Engineering", initials: "PS" },
            { name: "Rahul Mehta", dept: "Product", initials: "RM" },
            { name: "Ananya Patel", dept: "Design", initials: "AP" },
            { name: "Kiran Kumar", dept: "Engineering", initials: "KK" },
          ].map((e) => (
            <div key={e.name} className="flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-2">
              <div className="w-7 h-7 rounded-full bg-[#EDE9F8] flex items-center justify-center shrink-0">
                <span className="text-xs text-[#7F56D9] font-bold">{e.initials}</span>
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-700">{e.name}</p>
                <p className="text-xs text-gray-400">{e.dept}</p>
              </div>
              <span className="text-xs text-green-600">✓ Added</span>
            </div>
          ))}
        </div>
      </div>
    ),
    payroll: (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-3 border-b bg-gray-50 flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-800">Payroll — May 2026</p>
          <span className="text-xs bg-[#EDE9F8] text-[#7F56D9] px-3 py-1 rounded-full font-medium">Dry Run</span>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[
              { l: "Gross", v: "₹42.8L", c: "text-gray-800" },
              { l: "Deductions", v: "₹8.2L", c: "text-red-600" },
              { l: "Net Pay", v: "₹34.6L", c: "text-green-700" },
            ].map((s) => (
              <div key={s.l} className="bg-gray-50 rounded-xl p-2 text-center">
                <p className="text-[10px] text-gray-400">{s.l}</p>
                <p className={`text-sm font-black ${s.c}`}>{s.v}</p>
              </div>
            ))}
          </div>
          <button className="w-full py-2.5 bg-[#7F56D9] text-white text-xs font-semibold rounded-xl">
            Process Payroll →
          </button>
        </div>
      </div>
    ),
    live: (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-green-50 border-b border-green-100 px-5 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-green-800">You're live on Brello! 🎉</p>
            <p className="text-xs text-green-600">48 employees have been invited</p>
          </div>
        </div>
        <div className="p-4 space-y-2 text-xs">
          {[
            { icon: "✓", text: "Employee portal active", color: "text-green-600" },
            { icon: "✓", text: "Attendance tracking live", color: "text-green-600" },
            { icon: "✓", text: "Leave policies configured", color: "text-green-600" },
            { icon: "✓", text: "Payroll ready to run", color: "text-green-600" },
          ].map((i) => (
            <div key={i.text} className="flex items-center gap-2">
              <span className={`font-bold ${i.color}`}>{i.icon}</span>
              <span className="text-gray-600">{i.text}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  };
  return <div className="max-w-xs mx-auto">{mockups[type]}</div>;
}

export default function HowToUsePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-[#faf9ff] to-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <FadeIn>
            <Badge variant="outline" className="border-[#7F56D9]/30 text-[#7F56D9] mb-5">
              Getting Started
            </Badge>
            <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">
              Up and running in under an hour
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed">
              No consultants. No 3-day onboarding calls. Just follow these steps and your team will be live on Brello today.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 pb-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className={`grid lg:grid-cols-2 gap-12 items-center mb-28 last:mb-0 ${
                i % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
            >
              <FadeIn direction={i % 2 === 0 ? "left" : "right"} className={i % 2 === 1 ? "lg:col-start-2" : ""}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#7F56D9] text-white font-black text-xl flex items-center justify-center shadow-lg shadow-[#7F56D9]/30 shrink-0">
                    {step.number}
                  </div>
                  <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full">
                    {step.time}
                  </span>
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-4">{step.title}</h2>
                <p className="text-gray-500 leading-relaxed mb-6">{step.desc}</p>
                <ul className="space-y-2.5">
                  {step.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-[#7F56D9] flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-600">{pt}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>

              <FadeIn
                direction={i % 2 === 0 ? "right" : "left"}
                delay={0.15}
                className={i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}
              >
                <StepMockup type={step.mockup} />
              </FadeIn>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#1a0d2e] to-[#392a46]">
        <FadeIn className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Ready to get started?</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Join 200+ companies already running their HR on Brello. Free to start — no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#7F56D9] font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-xl"
            >
              Start Free →
            </Link>
            <Link
              href="/playground"
              className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-medium px-8 py-4 rounded-xl hover:bg-white/15 transition-colors"
            >
              Try the Playground
            </Link>
          </div>
        </FadeIn>
      </section>

      <Footer />
    </div>
  );
}
