import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing or using Brello ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Service. These Terms constitute a legally binding agreement between you and Brello Technologies Private Limited ("Brello", "we", "us", or "our").`,
  },
  {
    title: "2. Description of Service",
    content: `Brello provides a cloud-based Human Resource Management System (HRMS) that includes features for employee management, attendance tracking, payroll processing, leave management, and related HR functions. We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time with reasonable notice.`,
  },
  {
    title: "3. Account Registration and Security",
    content: `To use Brello, you must create an account with accurate, complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You must immediately notify us at contact@brello.co.in of any unauthorized use. We reserve the right to terminate accounts that violate these Terms.`,
  },
  {
    title: "4. Data and Privacy",
    content: `You retain ownership of all employee and company data you upload to Brello. By using the Service, you grant Brello a limited license to process this data solely to provide the Service. We will handle your data in accordance with our Privacy Policy. You are responsible for obtaining all necessary consents from your employees before entering their data into the Service.`,
  },
  {
    title: "5. Subscription and Payments",
    content: `Paid plans are billed in advance on a monthly or annual basis. All fees are in Indian Rupees (INR) and are non-refundable except as required by applicable law. We reserve the right to change pricing with 30 days' notice. Failure to pay may result in suspension or termination of your account. Tax applicable under Indian law will be added to all invoices.`,
  },
  {
    title: "6. Acceptable Use",
    content: `You agree not to use Brello to: (a) violate any applicable law or regulation; (b) transmit unlawful, harmful, or fraudulent content; (c) attempt to gain unauthorized access to our systems; (d) use the Service in a manner that could damage or overburden our infrastructure; (e) resell or sublicense the Service without our written consent; (f) upload malicious code, viruses, or other harmful content.`,
  },
  {
    title: "7. Intellectual Property",
    content: `All rights, title, and interest in and to the Brello platform, including all software, designs, trademarks, and content created by Brello, remain the exclusive property of Brello Technologies Private Limited. These Terms do not grant you any rights to use Brello's name, logos, or trademarks.`,
  },
  {
    title: "8. Service Availability",
    content: `We aim to provide 99.5% uptime but do not guarantee uninterrupted access. Scheduled maintenance will be communicated in advance. We are not liable for downtime caused by circumstances beyond our reasonable control, including force majeure events, third-party service failures, or infrastructure issues.`,
  },
  {
    title: "9. Limitation of Liability",
    content: `To the maximum extent permitted by applicable law, Brello's total liability to you for any claims arising from these Terms or the Service shall not exceed the fees paid by you to Brello in the 12 months preceding the claim. In no event shall Brello be liable for indirect, incidental, special, or consequential damages, loss of profits, or loss of data.`,
  },
  {
    title: "10. Termination",
    content: `Either party may terminate the agreement at any time. Upon termination, your right to access the Service ceases immediately. You may export your data before termination. We will retain your data for 30 days after termination, after which it will be permanently deleted. We reserve the right to retain certain data as required by law.`,
  },
  {
    title: "11. Governing Law",
    content: `These Terms are governed by the laws of India. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka, India. If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.`,
  },
  {
    title: "12. Changes to Terms",
    content: `We may update these Terms from time to time. We will notify you of material changes via email or through the Service at least 14 days before they take effect. Continued use of the Service after changes constitutes acceptance of the updated Terms.`,
  },
  {
    title: "13. Contact",
    content: `For questions about these Terms, contact us at: contact@brello.co.in`,
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-28 pb-10 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-sm font-semibold text-[#7F56D9] uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-4xl font-black text-gray-900 mb-3">Terms of Service</h1>
          <p className="text-gray-500 text-sm">Last updated: January 1, 2026</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-gray-600 leading-relaxed mb-12 text-base">
            Please read these Terms of Service carefully before using the Brello platform. These terms govern your use of our services and outline your rights and responsibilities as a user.
          </p>
          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.title} className="border-b border-gray-100 pb-10 last:border-0">
                <h2 className="text-lg font-bold text-gray-900 mb-3">{section.title}</h2>
                <p className="text-gray-600 leading-relaxed text-sm">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
