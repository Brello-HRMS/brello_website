import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const VALUES = [
  {
    icon: "⚡",
    title: "Simplicity First",
    desc: "Every feature ships with the simplest possible interface. If it's hard to use, we keep redesigning until it isn't.",
  },
  {
    icon: "🔍",
    title: "Radical Transparency",
    desc: "Clear pricing, honest roadmaps, and no hidden fees — ever. We build the kind of product we'd want to use ourselves.",
  },
  {
    icon: "🌱",
    title: "Built to Scale",
    desc: "Whether you have 10 employees or 10,000, Brello should feel just as fast, simple, and reliable.",
  },
  {
    icon: "❤️",
    title: "People Over Processes",
    desc: "HR software exists to help people, not to create bureaucracy. We design every feature with that in mind.",
  },
];

const STATS = [
  { value: "200+", label: "Companies" },
  { value: "50,000+", label: "Employees managed" },
  { value: "1M+", label: "Attendance records" },
  { value: "₹100Cr+", label: "Payroll processed" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-20 bg-gradient-to-b from-[#faf9ff] to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <FadeIn>
            <Badge variant="outline" className="border-[#7F56D9]/30 text-[#7F56D9] mb-5">
              About Brello
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
              Built with one mission:{" "}
              <span className="text-[#7F56D9]">make HR human again.</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
              We got tired of watching great companies struggle with spreadsheets, clunky enterprise software,
              and 12-step payroll processes. So we built something better.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#1a0d2e]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.1}>
                <p className="text-3xl font-black text-[#c4a8ff] mb-1">{s.value}</p>
                <p className="text-sm text-gray-400">{s.label}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <h2 className="text-3xl font-black text-gray-900 mb-6">Our story</h2>
            <div className="prose prose-gray max-w-none space-y-5 text-gray-600 text-lg leading-relaxed">
              <p>
                Brello started in 2025 when our founders — having worked in fast-growing startups — realized that
                every company was solving the same HR problems in the same painful ways: Google Sheets for attendance,
                Excel for payroll, WhatsApp for leave approvals.
              </p>
              <p>
                The existing HRMS options were either too expensive for smaller companies, too complicated to set up,
                or built with interfaces that looked like they hadn't been touched since 2008. HR teams were spending
                their days on data entry instead of the work that actually matters.
              </p>
              <p>
                We set out to build the product we wished existed — one that a non-technical HR manager could get
                up and running in an afternoon, one that employees would actually want to use, and one that just
                works without a 3-day onboarding call.
              </p>
              <p>
                Today, Brello is trusted by 200+ companies across India. We're just getting started.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <h2 className="text-3xl font-black text-gray-900 mb-3">What we believe in</h2>
            <p className="text-gray-500">The principles that guide every decision at Brello.</p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-6">
            {VALUES.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.1}>
                <div className="bg-white border border-gray-100 rounded-2xl p-7 hover:border-[#7F56D9]/25 hover:shadow-lg transition-all">
                  <div className="text-3xl mb-4">{v.icon}</div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Meet the team behind Brello</h2>
            <p className="text-gray-500 mb-8">
              We're a small, passionate team of engineers, designers, and HR obsessives building the future of HR software.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/team"
                className="inline-flex items-center justify-center gap-2 bg-[#7F56D9] hover:bg-[#6d47c4] text-white font-semibold px-8 py-4 rounded-xl transition-colors shadow-lg shadow-[#7F56D9]/25"
              >
                Meet the Team →
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-gray-200 hover:border-[#7F56D9]/30 text-gray-700 hover:text-[#7F56D9] font-semibold px-8 py-4 rounded-xl transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
