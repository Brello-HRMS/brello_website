import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const TEAM = [
  {
    name: "Arjun Kapoor",
    role: "CEO & Co-founder",
    initials: "AK",
    bg: "from-purple-500 to-violet-600",
    bio: "Ex-founder who spent 6 years watching HR teams struggle with spreadsheets. Built Brello to fix the problem from the ground up.",
    location: "Bangalore",
    linkedin: "#",
  },
  {
    name: "Priya Sharma",
    role: "CTO & Co-founder",
    initials: "PS",
    bg: "from-blue-500 to-indigo-600",
    bio: "Previously engineering lead at two Series B startups. Obsessed with building software that's both powerful and delightfully simple.",
    location: "Bangalore",
    linkedin: "#",
  },
  {
    name: "Rohan Mehta",
    role: "Head of Product",
    initials: "RM",
    bg: "from-teal-500 to-emerald-600",
    bio: "5 years in product at HR-tech companies. Believes great software should be invisible — it just does what you need it to do.",
    location: "Mumbai",
    linkedin: "#",
  },
  {
    name: "Anjali Verma",
    role: "Head of Design",
    initials: "AV",
    bg: "from-pink-500 to-rose-600",
    bio: "Designed products used by millions. Joined Brello because she was tired of enterprise software that looks like it was built in 2005.",
    location: "Hyderabad",
    linkedin: "#",
  },
  {
    name: "Kiran Kumar",
    role: "Head of Engineering",
    initials: "KK",
    bg: "from-orange-500 to-amber-600",
    bio: "Full-stack engineer who has shipped payroll systems for 200k+ employees. Takes reliability and performance personally.",
    location: "Bangalore",
    linkedin: "#",
  },
  {
    name: "Sneha Iyer",
    role: "Head of Customer Success",
    initials: "SI",
    bg: "from-cyan-500 to-sky-600",
    bio: "Former HR manager who switched sides to help HR teams get the most out of Brello. Your first call when you have a question.",
    location: "Chennai",
    linkedin: "#",
  },
];

const VALUES_COMPACT = [
  { icon: "🚀", title: "Move fast", desc: "We ship weekly. If something can be better, we make it better quickly." },
  { icon: "🤝", title: "Own outcomes", desc: "Every person on the team owns a piece of the product and is accountable for it." },
  { icon: "💬", title: "Be direct", desc: "Clear, honest communication — with each other and with customers." },
  { icon: "🧠", title: "Keep learning", desc: "HR is always evolving. We stay curious and keep up." },
];

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-[#faf9ff] to-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <FadeIn>
            <Badge variant="outline" className="border-[#7F56D9]/30 text-[#7F56D9] mb-5">
              The Team
            </Badge>
            <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">
              Small team. Big mission.
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed">
              We're a group of engineers, designers, and product people who got tired of bad HR software
              and decided to build something better.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Team grid */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {TEAM.map((member, i) => (
              <FadeIn key={member.name} delay={i * 0.08} direction="up">
                <div className="group border border-gray-100 rounded-3xl p-7 hover:border-[#7F56D9]/25 hover:shadow-xl transition-all">
                  {/* Avatar */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.bg} flex items-center justify-center mb-5 shadow-lg`}>
                    <span className="text-white font-black text-xl">{member.initials}</span>
                  </div>

                  <h3 className="font-black text-gray-900 text-lg mb-0.5">{member.name}</h3>
                  <p className="text-sm font-semibold text-[#7F56D9] mb-3">{member.role}</p>
                  <p className="text-sm text-gray-500 leading-relaxed mb-5">{member.bio}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {member.location}
                    </div>
                    <a
                      href={member.linkedin}
                      className="text-xs text-gray-400 hover:text-[#7F56D9] transition-colors font-medium"
                    >
                      LinkedIn →
                    </a>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Culture / Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-3">How we work</h2>
            <p className="text-gray-500">The principles that guide how we build and collaborate.</p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES_COMPACT.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.08}>
                <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-[#7F56D9]/25 transition-colors">
                  <div className="text-2xl mb-3">{v.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-1.5 text-sm">{v.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{v.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring CTA */}
      <section className="py-24 bg-[#1a0d2e] relative overflow-hidden">
        <div className="absolute -top-20 right-0 w-80 h-80 bg-[#7F56D9]/15 rounded-full blur-[80px]" />
        <FadeIn className="relative z-10 max-w-2xl mx-auto px-4 text-center">
          <span className="inline-block bg-[#7F56D9]/20 text-[#c4a8ff] text-xs font-semibold px-4 py-2 rounded-full mb-5 border border-[#7F56D9]/30">
            We're hiring
          </span>
          <h2 className="text-4xl font-black text-white mb-4">Come build with us</h2>
          <p className="text-gray-300 mb-8 leading-relaxed">
            We're looking for engineers, designers, and customer success folks who care about building great software
            and helping HR teams do their best work.
          </p>
          <Link
            href="mailto:contact@brello.co.in?subject=I'd love to join Brello"
            className="inline-flex items-center gap-2 bg-[#7F56D9] hover:bg-[#6d47c4] text-white font-bold px-8 py-4 rounded-xl transition-colors shadow-lg shadow-[#7F56D9]/30"
          >
            View Open Roles →
          </Link>
        </FadeIn>
      </section>

      <Footer />
    </div>
  );
}
