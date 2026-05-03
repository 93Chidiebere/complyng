import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  UserCheck,
  ArrowLeftRight,
  ClipboardList,
  Users,
  Rocket,
  RefreshCw,
  Star,
  CheckCircle2,
  MessageSquare,
  Calendar,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  X,
  Headphones,
} from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";

type Tier = "Starter" | "Growth" | "Enterprise";

const tiers: {
  id: Tier;
  price: string;
  tag: string;
  popular?: boolean;
  features: string[];
  sla: string;
  cta: string;
  borderTop: string;
}[] = [
  {
    id: "Starter",
    price: "₦85,000/month",
    tag: "Best for early-stage startups",
    borderTop: "border-t-4 border-t-teal",
    features: [
      "Dedicated DPCO consultant (shared — up to 5 clients)",
      "Initial audit + gap remediation plan",
      "Monthly compliance status report",
      "DSR management (up to 10 per month)",
      "Annual NDPC filing preparation",
      "Unlimited platform access (all 10 modules)",
    ],
    sla: "Response SLA: 48 hours",
    cta: "Apply for Starter Managed",
  },
  {
    id: "Growth",
    price: "₦185,000/month",
    tag: "Most Popular",
    popular: true,
    borderTop: "border-t-4 border-t-teal shadow-lg shadow-teal/20",
    features: [
      "Dedicated DPCO consultant (exclusive — 1 client focus)",
      "Breach incident response support (72-hour coverage)",
      "Quarterly board-ready compliance reports",
      "Staff training delivery (up to 20 staff)",
      "Vendor DPA drafting and review",
      "Priority response SLA: 4 hours",
      "ComplyNG Verified Badge fast-track (target 90 days)",
    ],
    sla: "Includes everything in Starter",
    cta: "Apply for Growth Managed",
  },
  {
    id: "Enterprise",
    price: "Custom pricing",
    tag: "For multi-entity & large orgs",
    borderTop: "border-t-4 border-t-navy",
    features: [
      "Multi-entity compliance management",
      "Dedicated DPCO team (lead + associate)",
      "Regulatory liaison with NDPC on your behalf",
      "Custom compliance framework development",
      "Investor-ready compliance documentation",
      "24/7 breach response hotline",
      "SLA: 1 hour response",
    ],
    sla: "Includes everything in Growth",
    cta: "Contact Us",
  },
];

const consultants = [
  { name: "Adaeze C.", role: "Lead Consultant", license: "NDPC/DPCO/2023/0412", spec: "Fintech & Digital Payments", exp: "8 years — former CBN compliance officer", clients: 14, rating: 5, slots: "1 slot available", initials: "AC" },
  { name: "Chidiebere C.", role: "Senior Consultant", license: "NDPC/DPCO/2024/0187", spec: "Healthtech & Pharmaceuticals", exp: "6 years — NHIS data governance background", clients: 9, rating: 5, slots: "2 slots available", initials: "CC" },
  { name: "Fatima A.", role: "Consultant", license: "NDPC/DPCO/2024/0631", spec: "Edtech & Consumer Platforms", exp: "4 years — data rights advocacy background", clients: 11, rating: 4, slots: "3 slots available", initials: "FA" },
  { name: "Bello I.", role: "Senior Consultant", license: "NDPC/DPCO/2023/0289", spec: "HR Platforms & Employers", exp: "7 years — PenCom and FIRS compliance background", clients: 7, rating: 5, slots: "2 slots available", initials: "BI" },
];

const ManagedService = () => {
  usePageTitle("Managed Service");
  const [active, setActive] = useState(false);
  const [applyTier, setApplyTier] = useState<Tier | null>(null);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl text-navy">Compliance-as-a-Service</h1>
          <p className="text-muted-foreground text-sm mt-1 max-w-2xl">
            A dedicated NDPC-licensed consultant manages your NDPA compliance end-to-end — you focus on your
            product, they handle the rest.
          </p>
        </div>
        <button
          onClick={() => setActive((a) => !a)}
          className="text-xs font-semibold border border-border rounded-md px-3 py-2 hover:border-teal hover:text-teal transition-colors"
        >
          {active ? "Show Marketing View" : "Preview Active Service"}
        </button>
      </div>

      {active ? <ActiveServiceView /> : <MarketingView onApply={setApplyTier} />}

      {applyTier && <ApplyModal tier={applyTier} onClose={() => setApplyTier(null)} />}
    </div>
  );
};

const MarketingView = ({ onApply }: { onApply: (tier: Tier) => void }) => (
  <>
    {/* Top explainer */}
    <section className="bg-navy text-white rounded-lg p-8">
      <div className="grid md:grid-cols-3 gap-6 items-center">
        <div>
          <div className="w-12 h-12 rounded-md bg-white/10 flex items-center justify-center mb-3">
            <Building2 className="w-6 h-6 text-teal" />
          </div>
          <p className="font-bold mb-2">You</p>
          <ul className="space-y-1 text-sm text-white/80">
            <li>Pay a fixed monthly retainer</li>
            <li>Access your compliance dashboard</li>
            <li>Receive monthly compliance updates</li>
            <li>Zero legal overhead</li>
          </ul>
        </div>
        <div className="flex flex-col items-center justify-center text-center">
          <ArrowLeftRight className="w-8 h-8 text-teal mb-2" />
          <span className="bg-teal text-white text-xs font-bold rounded-full px-4 py-1.5">ComplyNG</span>
        </div>
        <div>
          <div className="w-12 h-12 rounded-md bg-white/10 flex items-center justify-center mb-3">
            <UserCheck className="w-6 h-6 text-teal" />
          </div>
          <p className="font-bold mb-2">Your Consultant</p>
          <ul className="space-y-1 text-sm text-white/80">
            <li>Manages all 10 compliance modules</li>
            <li>Responds to DSRs on your behalf</li>
            <li>Conducts quarterly compliance reviews</li>
            <li>Files your annual NDPC report</li>
          </ul>
        </div>
      </div>
      <p className="mt-6 pt-5 border-t border-white/10 text-sm text-white/70 leading-relaxed">
        ComplyNG coordinates the engagement, maintains the platform, and takes a platform margin. Your consultant
        — drawn from our verified DPCO network — handles day-to-day compliance operations.
      </p>
    </section>

    {/* Pricing */}
    <section>
      <h2 className="text-sm uppercase tracking-wider font-bold text-muted-foreground mb-4">Pricing Tiers</h2>
      <div className="grid lg:grid-cols-3 gap-5">
        {tiers.map((t) => (
          <div key={t.id} className={`relative bg-card border border-border rounded-lg p-6 flex flex-col ${t.borderTop}`}>
            {t.popular && (
              <span className="absolute -top-3 left-6 bg-teal text-white text-[10px] font-bold px-3 py-1 rounded">
                MOST POPULAR
              </span>
            )}
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t.id} Managed</p>
            <p className="text-2xl font-extrabold text-navy mt-1">{t.price}</p>
            <p className="text-xs text-muted-foreground mt-1 italic">{t.tag}</p>
            <ul className="space-y-2 mt-5 mb-5 flex-1">
              {t.features.map((f) => (
                <li key={f} className="flex gap-2 text-xs text-navy">
                  <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs font-semibold text-teal mb-4">{t.sla}</p>
            <button
              onClick={() => onApply(t.id)}
              className={t.popular ? "btn-teal text-sm w-full" : t.id === "Enterprise" ? "border-2 border-navy text-navy font-semibold rounded-md px-5 py-2 text-sm w-full hover:bg-navy hover:text-white transition-colors" : "btn-teal-outline text-sm w-full"}
            >
              {t.cta}
            </button>
          </div>
        ))}
      </div>
    </section>

    {/* How it works */}
    <section className="card-cn-active p-6">
      <h2 className="text-lg text-navy mb-5">How It Works</h2>
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { icon: ClipboardList, title: "Apply", text: "Complete a short application describing your organization's size, industry, and compliance needs. Takes 5 minutes." },
          { icon: Users, title: "Match", text: "ComplyNG matches you with a verified DPCO consultant from our network with experience in your sector." },
          { icon: Rocket, title: "Onboard", text: "Your consultant conducts a full audit using ComplyNG, builds your remediation roadmap, and takes over module management." },
          { icon: RefreshCw, title: "Ongoing", text: "Monthly status reports, proactive gap closure, and a direct line to your consultant whenever you need them." },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={s.title} className="border border-border rounded-md p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-teal text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
                <Icon className="w-4 h-4 text-teal" />
              </div>
              <p className="text-sm font-bold text-navy">{s.title}</p>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{s.text}</p>
            </div>
          );
        })}
      </div>
    </section>

    {/* Consultants */}
    <section>
      <div className="mb-4 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-lg text-navy">Our Verified DPCO Network</h2>
          <p className="text-sm text-muted-foreground mt-1">
            All consultants are NDPC-licensed Data Protection Compliance Organisations with sector-specific experience.
          </p>
        </div>
        <Link to="/consultant/onboard" className="btn-teal text-sm whitespace-nowrap">Join the Network →</Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {consultants.map((c) => (
          <div key={c.name} className="card-cn p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-teal text-white font-bold flex items-center justify-center">
                {c.initials}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-navy truncate">{c.name}</p>
                <p className="text-[11px] text-muted-foreground">{c.role}</p>
              </div>
            </div>
            <p className="text-[10px] font-mono text-teal mt-3">{c.license}</p>
            <p className="text-xs font-semibold text-navy mt-2">{c.spec}</p>
            <p className="text-xs text-muted-foreground mt-1 leading-snug">{c.exp}</p>
            <div className="flex items-center gap-1 mt-3 text-amber">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3.5 h-3.5 ${i < c.rating ? "fill-amber" : "opacity-30"}`} />
              ))}
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border text-xs">
              <span className="text-muted-foreground">{c.clients} clients</span>
              <span className="text-teal font-semibold">{c.slots}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground italic mt-4">
        Consultant profiles are shown for illustration. Final matching is based on sector fit, availability, and engagement size.
      </p>
    </section>
  </>
);

const ActiveServiceView = () => {
  const [reportOpen, setReportOpen] = useState(false);
  return (
    <>
      <div className="bg-card border border-border rounded-lg border-l-4 border-l-teal p-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wider font-bold text-teal">Service Status</p>
          <p className="text-sm font-bold text-navy mt-0.5">Service Active · Growth Managed · Renews May 18, 2026</p>
        </div>
        <span className="inline-flex items-center gap-2 text-xs font-semibold text-success">
          <span className="w-2 h-2 rounded-full bg-success" /> Active
        </span>
      </div>

      {/* Consultant card */}
      <div className="card-cn p-6 border-2 border-teal">
        <p className="text-xs uppercase tracking-wider font-bold text-muted-foreground mb-4">Your Dedicated Consultant</p>
        <div className="flex flex-wrap items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-teal text-white font-bold text-xl flex items-center justify-center shrink-0">
            AC
          </div>
          <div className="flex-1 min-w-[200px]">
            <p className="text-lg font-bold text-navy">Adaeze C.</p>
            <p className="text-xs font-mono text-teal">NDPC/DPCO/2023/0412</p>
            <p className="text-sm text-navy mt-1">Specialization: Fintech & Digital Payments</p>
            <p className="text-xs text-muted-foreground mt-0.5">Response SLA: 4 hours</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="btn-teal text-sm"><MessageSquare className="w-4 h-4" /> Message Consultant</button>
            <button className="btn-teal-outline text-sm"><Calendar className="w-4 h-4" /> Schedule Review Call</button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border">
          Last activity: <span className="text-navy font-medium">Updated your vendor tracker — 2 hours ago</span>
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Activity feed */}
        <div className="card-cn-active p-6">
          <h2 className="text-lg text-navy mb-4">Consultant Activity (Last 7 Days)</h2>
          <ul className="space-y-3 text-sm">
            {[
              { icon: "📋", time: "Today 09:15", text: "Adaeze C. responded to DSR-2026-011 on your behalf" },
              { icon: "✅", time: "Yesterday 14:30", text: "Adaeze C. closed Gap: \"No lawful basis stated\" — Section 25" },
              { icon: "📄", time: "Apr 16 11:00", text: "Adaeze C. updated your vendor DPA tracker — 1 agreement renewed" },
              { icon: "🔔", time: "Apr 15 16:45", text: "Adaeze C. reviewed new NDPC regulatory alert — no action required" },
              { icon: "📊", time: "Apr 14 10:00", text: "Monthly compliance report delivered — Score improved: 62 → 71" },
            ].map((a, i) => (
              <li key={i} className="flex gap-3 pb-3 border-b border-border last:border-0">
                <span className="text-lg shrink-0">{a.icon}</span>
                <div>
                  <p className="text-navy text-sm leading-snug">{a.text}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Score improvement */}
        <div className="card-cn-active p-6">
          <h2 className="text-lg text-navy mb-1">Score Since Engagement</h2>
          <p className="text-xs text-muted-foreground mb-4">Tracking your improvement under managed service</p>
          <div className="flex items-end gap-6 mb-4">
            <div>
              <p className="text-xs text-muted-foreground">Before</p>
              <p className="text-2xl font-bold text-navy">62<span className="text-sm text-muted-foreground">/100</span></p>
              <p className="text-[10px] text-muted-foreground">Mar 2026</p>
            </div>
            <TrendingUp className="w-6 h-6 text-success mb-3" />
            <div>
              <p className="text-xs text-muted-foreground">Current</p>
              <p className="text-2xl font-bold text-teal">71<span className="text-sm text-muted-foreground">/100</span></p>
              <p className="text-[10px] text-muted-foreground">Apr 2026</p>
            </div>
            <p className="ml-auto text-sm font-bold text-success">+9 pts in 6 weeks</p>
          </div>
          <svg viewBox="0 0 200 60" className="w-full h-16">
            <polyline points="0,50 40,45 80,38 120,30 160,22 200,12" fill="none" stroke="hsl(var(--teal))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="0,50 40,45 80,38 120,30 160,22 200,12" fill="url(#g1)" opacity="0.15" />
            <defs>
              <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--teal))" />
                <stop offset="100%" stopColor="hsl(var(--teal))" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
          <p className="text-xs text-navy mt-3 font-semibold">Projected badge eligibility: <span className="text-teal">July 2026</span></p>
        </div>
      </div>

      {/* Monthly report */}
      <div className="card-cn p-6">
        <button onClick={() => setReportOpen((o) => !o)} className="w-full flex items-center justify-between text-left">
          <div>
            <h2 className="text-lg text-navy">April 2026 Compliance Report</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Prepared by Adaeze C.</p>
          </div>
          {reportOpen ? <ChevronUp className="text-muted-foreground" /> : <ChevronDown className="text-muted-foreground" />}
        </button>
        {reportOpen && (
          <div className="mt-5 pt-5 border-t border-border space-y-2 text-sm text-navy leading-relaxed">
            <p>1. Compliance score improved from 62 to 71 (+9) following resolution of two HIGH severity gaps.</p>
            <p>2. Three DSRs handled within SLA; deletion request DSR-2026-011 resolved on behalf of organization.</p>
            <p>3. Vendor DPA renewals: Google Workspace and Intercom agreements updated with NDPA Section 43 clauses.</p>
            <p>4. Staff training completion now at 78% — target 90% by end of Q2.</p>
            <p>5. No regulatory enforcement risk identified this period; one NDPC alert reviewed and dismissed.</p>
            <button className="btn-teal-outline text-sm mt-4">Download Full Report</button>
          </div>
        )}
      </div>
    </>
  );
};

const ApplyModal = ({ tier, onClose }: { tier: Tier; onClose: () => void }) => {
  const [submitted, setSubmitted] = useState(false);
  const [challenge, setChallenge] = useState("");
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-card rounded-lg shadow-xl max-w-lg w-full my-8" onClick={(e) => e.stopPropagation()}>
        {submitted ? (
          <div className="p-8 text-center">
            <CheckCircle2 className="w-14 h-14 text-success mx-auto" />
            <h3 className="text-xl text-navy mt-4">Application Received</h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              Our team will review your application and match you with a suitable consultant within 2 business days.
              You will receive a confirmation at your registered email.
            </p>
            <button onClick={onClose} className="btn-teal text-sm mt-6">Return to Dashboard</button>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between p-6 border-b border-border">
              <div>
                <h3 className="text-lg text-navy">Apply for Managed Compliance Service</h3>
                <p className="text-xs text-muted-foreground mt-1">{tier} Managed Tier</p>
              </div>
              <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground hover:text-navy" /></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="p-6 space-y-4">
              <Field label="Organization name" defaultValue="Acme Fintech Ltd" />
              <Field label="Industry" defaultValue="Fintech" />
              <div>
                <label className="text-xs font-semibold text-navy">Primary compliance challenge</label>
                <select value={challenge} onChange={(e) => setChallenge(e.target.value)} className="w-full mt-1.5 border border-border rounded-md px-3 py-2 text-sm bg-card" required>
                  <option value="">Select…</option>
                  <option>We have no compliance system at all</option>
                  <option>We started but can't maintain it</option>
                  <option>We need a consultant for regulatory filings</option>
                  <option>We have an investor requiring compliance evidence</option>
                  <option>Other</option>
                </select>
                {challenge === "Other" && (
                  <input className="w-full mt-2 border border-border rounded-md px-3 py-2 text-sm" placeholder="Please describe…" />
                )}
              </div>
              <div>
                <label className="text-xs font-semibold text-navy">How soon do you need a consultant?</label>
                <select className="w-full mt-1.5 border border-border rounded-md px-3 py-2 text-sm bg-card">
                  <option>Immediately</option>
                  <option>Within 30 days</option>
                  <option>Within 90 days</option>
                  <option>Planning ahead</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-navy">Do you have an existing privacy policy?</label>
                <div className="flex gap-4 mt-2 text-sm">
                  {["Yes", "No", "In progress"].map((v) => (
                    <label key={v} className="flex items-center gap-1.5"><input type="radio" name="pp" /> {v}</label>
                  ))}
                </div>
              </div>
              <label className="flex items-start gap-2 text-xs text-navy">
                <input type="checkbox" required className="mt-0.5" />
                <span>I confirm I understand the monthly retainer cost for {tier} Managed.</span>
              </label>
              <div>
                <label className="text-xs font-semibold text-navy">Additional context (optional)</label>
                <textarea className="w-full mt-1.5 border border-border rounded-md px-3 py-2 text-sm" rows={3} />
              </div>
              <button className="btn-teal w-full">Submit Application</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

const Field = ({ label, defaultValue }: { label: string; defaultValue: string }) => (
  <div>
    <label className="text-xs font-semibold text-navy">{label}</label>
    <input defaultValue={defaultValue} className="w-full mt-1.5 border border-border rounded-md px-3 py-2 text-sm bg-muted/30" />
  </div>
);

export default ManagedService;
