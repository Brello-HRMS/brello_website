"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "How to Use", href: "/how-to-use" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = isHome && !scrolled;
  const isActive = (href: string) => pathname === href;

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        transparent
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#7F56D9] rounded-xl flex items-center justify-center shadow-sm shadow-[#7F56D9]/40">
              <span className="text-white font-black text-sm">B</span>
            </div>
            <span
              className={`font-black text-lg tracking-tight transition-colors ${
                transparent ? "text-white" : "text-gray-900"
              }`}
            >
              Brello
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm rounded-xl transition-colors ${
                  isActive(link.href)
                    ? "text-[#7F56D9] bg-[#EDE9F8] font-semibold"
                    : transparent
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/playground"
              className={`px-3 py-2 text-sm rounded-xl transition-colors font-semibold flex items-center gap-1.5 ${
                isActive("/playground")
                  ? "text-[#7F56D9] bg-[#EDE9F8]"
                  : transparent
                  ? "text-[#c4a8ff] hover:text-white"
                  : "text-[#7F56D9] hover:bg-[#EDE9F8]"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#7F56D9] animate-pulse" />
              Playground
            </Link>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2">
            <a href="http://brello-webapp.s3-website.ap-south-1.amazonaws.com">
              <Button
                variant="ghost"
                size="sm"
                className={transparent ? "text-gray-300 hover:text-white hover:bg-white/10" : "text-gray-600"}
              >
                Log in
              </Button>
            </a>
            <a href="http://brello-webapp.s3-website.ap-south-1.amazonaws.com">
              <Button
                size="sm"
                className="bg-[#7F56D9] hover:bg-[#6d47c4] text-white rounded-xl shadow-sm shadow-[#7F56D9]/25"
              >
                Get Started Free
              </Button>
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className={`lg:hidden p-2 rounded-xl transition-colors ${
              transparent ? "text-white hover:bg-white/10" : "hover:bg-gray-100"
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {[...NAV_LINKS, { label: "Playground", href: "/playground" }].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center py-2.5 px-3 rounded-xl text-sm transition-colors ${
                    isActive(link.href)
                      ? "text-[#7F56D9] bg-[#EDE9F8] font-semibold"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 flex flex-col gap-2">
                <a href="http://brello-webapp.s3-website.ap-south-1.amazonaws.com">
                  <Button variant="outline" className="w-full rounded-xl">
                    Log in
                  </Button>
                </a>
                <a href="http://brello-webapp.s3-website.ap-south-1.amazonaws.com">
                  <Button className="w-full bg-[#7F56D9] hover:bg-[#6d47c4] text-white rounded-xl">
                    Get Started Free
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
