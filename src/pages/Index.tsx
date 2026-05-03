import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ShieldCheck, Sparkles, LayoutDashboard, FileSearch, Activity, Boxes, ArrowRight } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";

const Index = () => {
  usePageTitle("Nigeria's NDPA 2023 Compliance Platform");
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-navy text-white">
        <div className="container py-24 md:py-32 text-center">
          <h1 className="text-5xl md:text-[64px] font-extrabold leading-none tracking-tight">
            ComplyNG
          </h1>
          <p className="mt-6 text-xl md:text-2xl font-medium text-white/90 max-w-3xl mx-auto">
            Nigeria's AI-Powered NDPA 2023 Compliance Platform
          </p>
          <p className="mt-3 italic text-white/70 max-w-2xl mx-auto">
            From one-time audit to continuous compliance operations
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-teal text-base px-7 py-3">
              Start Free Audit
            </Link>
            <a href="#how" className="btn-teal-outline text-base px-7 py-3 border-teal text-teal hover:bg-teal hover:text-white">
              See How It Works
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            <span className="pill bg-white/5 border-white/15 text-white/90">
              <ShieldCheck className="w-3.5 h-3.5 text-teal" /> NDPA 2023 Ready
            </span>
            <span className="pill bg-white/5 border-white/15 text-white/90">
              <Sparkles className="w-3.5 h-3.5 text-teal" /> Claude AI Powered
            </span>
            <span className="pill bg-white/5 border-white/15 text-white/90">
              <LayoutDashboard className="w-3.5 h-3.5 text-teal" /> 6 Compliance Modules
            </span>
          </div>
        </div>
      </section>

      {/* Three columns */}
      <section id="how" className="container py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl text-navy">The platform promise</h2>
          <p className="mt-3 text-muted-foreground">
            Everything Nigerian organizations need to operationalise NDPA 2023.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: FileSearch,
              title: "Initial Audit",
              text: "Upload your privacy policy, get an instant gap analysis against NDPA 2023.",
            },
            {
              icon: Activity,
              title: "Living Dashboard",
              text: "Track your compliance posture in real time with always-on monitoring.",
            },
            {
              icon: Boxes,
              title: "6 Active Modules",
              text: "DSR, DPIA, Vendor, Breach, Regulatory, Annual Filing — all in one place.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="card-cn-active p-6">
              <div className="w-10 h-10 rounded-md bg-teal/10 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-teal" />
              </div>
              <h3 className="text-lg text-navy">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Managed Service teaser */}
      <section className="bg-muted/40 py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-teal">Compliance-as-a-Service</p>
              <h2 className="text-3xl text-navy mt-2">Not ready to do it yourself?</h2>
              <p className="mt-3 text-muted-foreground">
                ComplyNG Managed assigns a verified NDPC consultant to handle your compliance entirely — from
                audit to annual filing.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-navy">
                <li className="flex gap-2"><span className="text-teal">✓</span> Dedicated NDPC-licensed DPCO consultant</li>
                <li className="flex gap-2"><span className="text-teal">✓</span> All 10 modules managed on your behalf</li>
                <li className="flex gap-2"><span className="text-teal">✓</span> Monthly reports + annual NDPC filing handled</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-7 border-l-4 border-l-teal">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Starting from</p>
              <p className="text-3xl font-extrabold text-navy mt-1">₦85,000<span className="text-sm text-muted-foreground font-medium">/month</span></p>
              <Link to="/dashboard/managed-service" className="btn-teal text-sm mt-5">
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-white/70 py-8 mt-10">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <p>Built for Nigerian organizations. Aligned to NDPA 2023 and NDPC guidance.</p>
          <div className="flex items-center gap-5">
            <Link to="/practitioner" className="text-teal hover:underline font-semibold">For Compliance Consultants →</Link>
            <Link to="/investor" className="text-teal hover:underline font-semibold">For Investors →</Link>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default Index;
