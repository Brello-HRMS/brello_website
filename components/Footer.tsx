import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const LINKS = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Playground", href: "/playground" },
    { label: "Roadmap", href: "/roadmap" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Team", href: "/team" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "#" },
  ],
  Resources: [
    { label: "How to Use", href: "/how-to-use" },
    { label: "Help Center", href: "#" },
    { label: "API Docs", href: "#" },
    { label: "Status", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#0d0520] border-t border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-[#7F56D9] rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-sm">B</span>
              </div>
              <span className="font-black text-lg text-white">Brello</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4 max-w-xs">
              The modern HRMS platform built for growing teams. Simple, powerful, and actually enjoyable to use.
            </p>
            <a
              href="mailto:contact@brello.co.in"
              className="text-sm text-[#c4a8ff] hover:text-white transition-colors"
            >
              contact@brello.co.in
            </a>
            <p className="text-xs text-gray-600 mt-3">Made with ❤️ in India</p>
          </div>

          {Object.entries(LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-semibold text-white text-sm mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="bg-white/10 mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© 2026 Brello. All rights reserved.</p>
          <div className="flex items-center gap-5 text-xs text-gray-600">
            <Link href="/privacy" className="hover:text-gray-400 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-gray-400 transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-gray-400 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
