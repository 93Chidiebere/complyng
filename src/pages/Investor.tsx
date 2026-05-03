import { Link } from "react-router-dom";
import { InvestorTopNav } from "@/components/InvestorLayout";
import { Zap, ShieldAlert, LineChart, CheckCircle2 } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";

const Investor = () => {
  usePageTitle("For Investors");
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <InvestorTopNav variant="marketing" />

      {/* Hero */}
      <section className="bg-navy text-white">
        <div className="container py-20 md:py-28 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight max-w-4xl mx-auto">
            NDPA Compliance Intelligence for Nigerian Investors
          </h1>
          <p className="mt-5 text-lg text-white/80 max-w-2xl mx-auto">
            Run a structured data protection risk assessment on any Nigerian company before you invest —
            in minutes, not weeks.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/investor/onboard" className="btn-teal text-base px-7 py-3">
              Request Assessment
            </Link>
            <Link to="/investor/dashboard" className="border-2 border-white text-white font-semibold px-7 py-3 rounded-md hover:bg-white hover:text-navy transition-colors text-base">
              View Sample Report
            </Link>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section id="how" className="container py-20">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Zap, title: "Due Diligence in Minutes", text: "Upload a company's privacy policy or enter their data profile. Receive a structured NDPA compliance risk report instantly." },
            { icon: ShieldAlert, title: "Regulatory Risk Quantified", text: "Understand NDPC enforcement exposure before it becomes a portfolio problem. Identify HIGH severity gaps that create legal and reputational liability." },
            { icon: LineChart, title: "Portfolio Monitoring", text: "Subscribe to monitor your entire portfolio. Get alerted when any company's compliance posture changes — regulatory alerts, enforcement actions, or badge lapses." },
          ].map((v) => {
            const Icon = v.icon;
            return (
              <div key={v.title} className="card-cn-active p-6">
                <div className="w-10 h-10 rounded-md bg-teal/10 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-teal" />
                </div>
                <h3 className="text-lg text-navy">{v.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{v.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Who this is for */}
      <section className="bg-muted/40 py-20">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl text-navy">Who This Is For</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { title: "Nigerian VC Funds", text: "Add NDPA risk to your Series A and B due diligence checklist. Make compliance posture a closing condition." },
              { title: "Impact Investors & DFIs", text: "Quantify regulatory risk for portfolio companies handling sensitive data — health, finance, education." },
              { title: "Private Equity & M&A Teams", text: "Identify NDPA liabilities that could devalue acquisitions or trigger post-close enforcement actions." },
            ].map((c) => (
              <div key={c.title} className="bg-card border border-border rounded-lg p-6 text-center">
                <h3 className="text-base text-navy">{c.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="container py-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl text-navy">Pricing</h2>
          <p className="text-muted-foreground mt-2">Pay per assessment or subscribe for unlimited access.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="bg-card border border-border rounded-lg p-7 border-t-4 border-t-teal">
            <p className="text-xs uppercase font-bold text-muted-foreground tracking-wider">Pay-per-Assessment</p>
            <p className="text-3xl font-extrabold text-navy mt-2">₦75,000</p>
            <p className="text-xs text-muted-foreground">per report</p>
            <ul className="space-y-2 mt-5 text-sm text-navy">
              {["Single company assessment", "Full NDPA gap report", "Risk score + severity breakdown", "PDF report download"].map((f) => (
                <li key={f} className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" /> {f}</li>
              ))}
            </ul>
            <Link to="/investor/dashboard/new-assessment" className="btn-teal-outline text-sm w-full mt-6">Buy Assessment</Link>
          </div>
          <div className="relative bg-card border border-border rounded-lg p-7 border-t-4 border-t-teal shadow-lg shadow-teal/15">
            <span className="absolute -top-3 left-6 bg-teal text-white text-[10px] font-bold px-3 py-1 rounded">MOST POPULAR</span>
            <p className="text-xs uppercase font-bold text-muted-foreground tracking-wider">Fund Subscription</p>
            <p className="text-3xl font-extrabold text-navy mt-2">₦500,000</p>
            <p className="text-xs text-muted-foreground">per year</p>
            <ul className="space-y-2 mt-5 text-sm text-navy">
              {["Unlimited assessments", "Portfolio monitoring dashboard", "Email alerts on compliance changes", "Priority support"].map((f) => (
                <li key={f} className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" /> {f}</li>
              ))}
            </ul>
            <Link to="/investor/dashboard" className="btn-teal text-sm w-full mt-6">Subscribe Now</Link>
          </div>
        </div>
      </section>

      <footer className="bg-navy text-white/70 py-8 mt-auto">
        <div className="container text-center text-sm">
          <Link to="/" className="hover:text-white">← Back to ComplyNG</Link>
        </div>
      </footer>
    </div>
  );
};

export default Investor;
