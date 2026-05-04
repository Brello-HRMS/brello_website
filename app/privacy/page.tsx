import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const sections = [
  {
    title: "1. Information We Collect",
    content: `We collect information you provide directly: company and administrator details during registration; employee data you input (names, contact information, employment details, salary information, attendance records, leave history); payment and billing information; and support communications. We also automatically collect usage data, device information, IP addresses, and log files to operate and improve the Service.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use the information collected to: provide, operate, and maintain the Brello platform; process payroll and generate reports; send transactional emails (payslips, leave approvals, notifications); improve and develop new features; provide customer support; comply with legal obligations; and prevent fraud and ensure security. We do not use your employee data for advertising or sell it to third parties.`,
  },
  {
    title: "3. Data Storage and Security",
    content: `All data is stored on servers located in India (Amazon Web Services — Mumbai region). We implement industry-standard security measures including: AES-256 encryption at rest; TLS 1.3 encryption in transit; multi-factor authentication for admin accounts; regular security audits; and role-based access controls. Despite these measures, no system is completely secure, and we cannot guarantee absolute security.`,
  },
  {
    title: "4. Data Retention",
    content: `We retain your data for as long as your account is active or as needed to provide the Service. Upon account termination, we retain data for 30 days before permanent deletion, unless longer retention is required by applicable law (such as financial records required under Indian tax law). You may request export of your data at any time before deletion.`,
  },
  {
    title: "5. Employee Data and Consent",
    content: `As an employer using Brello, you are the data controller for your employees' personal information. You are responsible for: obtaining necessary consent from employees for data collection; informing employees about how their data is used; complying with applicable data protection laws including India's Digital Personal Data Protection Act; and managing employee data access rights. Brello acts as a data processor on your behalf.`,
  },
  {
    title: "6. Sharing of Information",
    content: `We do not sell, trade, or rent personal information to third parties. We may share data with: service providers (cloud hosting, payment processors, email delivery) under strict data processing agreements; legal authorities when required by law or court order; business successors in the event of a merger or acquisition (with prior notice). All third-party processors are contractually bound to maintain equivalent data protection standards.`,
  },
  {
    title: "7. Cookies and Tracking",
    content: `We use essential cookies for authentication and session management. We use analytics cookies (with your consent) to understand how the Service is used. You may control cookie preferences through your browser settings. Disabling essential cookies may affect your ability to use the Service.`,
  },
  {
    title: "8. Your Rights",
    content: `You have the right to: access all personal data we hold about you; correct inaccurate data; request deletion of your data (subject to legal requirements); export your data in a machine-readable format; object to or restrict certain processing; withdraw consent where processing is based on consent. To exercise these rights, contact us at contact@brello.co.in. We will respond within 30 days.`,
  },
  {
    title: "9. Children's Privacy",
    content: `Brello is a business platform intended for use by adults in a professional context. We do not knowingly collect personal information from anyone under the age of 18. If you believe we have collected information from a minor, contact us immediately at contact@brello.co.in.`,
  },
  {
    title: "10. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. We will notify account administrators via email of material changes at least 14 days before they take effect. Continued use of the Service after changes constitutes acceptance of the updated policy. We recommend reviewing this policy periodically.`,
  },
  {
    title: "11. Contact Us",
    content: `For privacy-related questions, data requests, or concerns, contact our Data Protection Officer at: contact@brello.co.in\n\nBrello Technologies Private Limited\nBangalore, Karnataka, India`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-28 pb-10 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-sm font-semibold text-[#7F56D9] uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-4xl font-black text-gray-900 mb-3">Privacy Policy</h1>
          <p className="text-gray-500 text-sm">Last updated: January 1, 2026</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-gray-600 leading-relaxed mb-12 text-base">
            At Brello, protecting your data and your employees' data is not just a legal obligation — it's a core responsibility we take seriously. This policy explains how we collect, use, store, and protect information when you use our platform.
          </p>
          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.title} className="border-b border-gray-100 pb-10 last:border-0">
                <h2 className="text-lg font-bold text-gray-900 mb-3">{section.title}</h2>
                <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-line">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
