import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Shield,
  Lock,
  ClipboardCheck,
  AlertTriangle,
  CreditCard,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Copy,
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useCompliance } from "@/state/ComplianceContext";

const VerifiedBadge = () => {
  usePageTitle("Verified Badge");
  const { score } = useCompliance();
  const [unlocked, setUnlocked] = useState(false);
  const [embedOpen, setEmbedOpen] = useState(false);
  const [tab, setTab] = useState<"html" | "react">("html");
  const [copied, setCopied] = useState(false);

  const target = 85;
  const pct = Math.min(100, (score / target) * 100);

  const htmlSnippet = `<a href="https://complyng.io/verify/org_xxxxxxxx" target="_blank">
  <img
    src="https://cdn.complyng.io/badges/verified-2026.svg"
    alt="ComplyNG Verified — NDPA Compliant"
    width="200"
  />
</a>`;

  const reactSnippet = `import { ComplyNGBadge } from '@complyng/react-badge';

<ComplyNGBadge
  orgId="org_xxxxxxxx"
  theme="light"
  size="medium"
/>`;

  const copy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl text-navy">ComplyNG Verified — NDPA Compliant Badge</h1>
          <p className="text-muted-foreground text-sm mt-1 max-w-2xl">
            Earn the trust signal that tells your customers, partners, and regulators that your data
            protection is verified and current.
          </p>
        </div>
        <button
          onClick={() => setUnlocked((u) => !u)}
          className="text-xs font-semibold border border-border rounded-md px-3 py-2 hover:border-teal hover:text-teal transition-colors"
        >
          {unlocked ? "Show Locked State" : "Preview Unlocked State"}
        </button>
      </div>

      {/* STATUS CARD */}
      {unlocked ? <UnlockedCard /> : <LockedCard score={score} target={target} pct={pct} />}

      {/* Requirements */}
      <section>
        <h2 className="text-sm uppercase tracking-wider font-bold text-muted-foreground mb-3">
          Requirements
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <RequirementCard
            icon={ClipboardCheck}
            status="complete"
            title="Initial Audit Completed"
            description="Your organization has completed the ComplyNG NDPA 2023 compliance audit and received a compliance baseline score."
            detail="Audit completed March 2026 · Score: 62/100"
          />
          <RequirementCard
            icon={AlertTriangle}
            status="incomplete"
            title="All HIGH Severity Gaps Resolved"
            description="All gaps rated HIGH severity must be closed before the badge is issued. Medium and Low gaps do not block badge issuance."
          >
            <div className="space-y-2 mt-3">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground font-medium">HIGH gaps resolved</span>
                  <span className="font-bold text-navy tabular-nums">1 of 4 · 3 remaining</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-coral" style={{ width: "25%" }} />
                </div>
              </div>
              <ul className="text-xs space-y-1 mt-3">
                {[
                  "No lawful basis stated for data processing — Section 25",
                  "Missing data subject rights notice — Sections 34–38",
                  "No Data Protection Officer contact — Section 30",
                ].map((g) => (
                  <li key={g} className="border-l-2 border-coral bg-coral/5 px-2 py-1.5 rounded-r text-navy">
                    {g}
                  </li>
                ))}
              </ul>
            </div>
            <Link
              to="/audit"
              className="mt-4 text-xs font-semibold text-teal inline-flex items-center gap-1 hover:underline"
            >
              Go to Audit → Fix Remaining Gaps <ArrowRight className="w-3 h-3" />
            </Link>
          </RequirementCard>
          <RequirementCard
            icon={CreditCard}
            status="pending"
            title="Active ComplyNG Subscription"
            description="A valid paid subscription must be maintained for the badge to remain active. Badge is automatically revoked if subscription lapses."
            detail="Current plan: Free Trial · 14 days remaining"
          >
            <button className="mt-4 btn-teal text-xs px-4 py-2">Upgrade to Activate</button>
          </RequirementCard>
        </div>
      </section>

      {/* Badge Preview */}
      <section className="card-cn-active p-6">
        <div className="mb-5">
          <h2 className="text-lg text-navy">Your Badge — Preview</h2>
          <p className="text-sm text-muted-foreground mt-1">
            This is how your badge will appear once earned. Display it on your website, app, and marketing materials.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
          {/* Format 1 */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Full Badge</p>
            <div className="bg-white border-2 border-teal rounded-lg p-4 flex items-center gap-3 max-w-[280px]">
              <ShieldCheck className="w-10 h-10 text-teal shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-navy text-sm">ComplyNG Verified</p>
                <p className="text-muted-foreground">NDPA Compliant · 2026</p>
                <p className="text-teal font-mono text-[10px] mt-0.5">complyng.io/verify/org_xxxxxxxx</p>
              </div>
            </div>
          </div>

          {/* Format 2 */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Compact</p>
            <div className="bg-white border-2 border-teal rounded-lg w-[120px] h-[120px] flex flex-col items-center justify-center text-center">
              <ShieldCheck className="w-8 h-8 text-teal" />
              <p className="font-bold text-navy text-xs mt-1.5">VERIFIED</p>
              <p className="text-[10px] text-muted-foreground font-semibold">NDPA 2026</p>
            </div>
          </div>

          {/* Format 3 */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Dark Theme</p>
            <div className="bg-navy border-2 border-teal rounded-lg p-4 flex items-center gap-3 max-w-[280px]">
              <ShieldCheck className="w-10 h-10 text-teal shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-white text-sm">ComplyNG Verified</p>
                <p className="text-white/70">NDPA Compliant · 2026</p>
                <p className="text-teal font-mono text-[10px] mt-0.5">complyng.io/verify/org_xxxxxxxx</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-5">
          All badge formats include a unique verification URL. Anyone can visit{" "}
          <span className="font-mono text-teal">complyng.io/verify/[your-org-id]</span> to confirm your badge is current and active.
        </p>
      </section>

      {/* Embed Code */}
      <section className="card-cn p-6">
        <button
          onClick={() => setEmbedOpen((o) => !o)}
          className="w-full flex items-center justify-between text-left"
        >
          <div>
            <h2 className="text-lg text-navy">Embed on Your Website</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Copy embed code for your site or React app.
            </p>
          </div>
          {embedOpen ? <ChevronUp className="text-muted-foreground" /> : <ChevronDown className="text-muted-foreground" />}
        </button>

        {embedOpen && (
          <div className="mt-5 space-y-3">
            <div className="flex gap-1 border-b border-border">
              {(["html", "react"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${
                    tab === t ? "border-teal text-teal" : "border-transparent text-muted-foreground hover:text-navy"
                  }`}
                >
                  {t === "html" ? "HTML Embed" : "React Component"}
                </button>
              ))}
            </div>

            <div className="relative">
              <pre className="bg-navy text-white/90 rounded-md p-4 text-xs overflow-x-auto font-mono leading-relaxed">
                {tab === "html" ? htmlSnippet : reactSnippet}
              </pre>
              <button
                onClick={() => copy(tab === "html" ? htmlSnippet : reactSnippet)}
                className="absolute top-3 right-3 inline-flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white text-xs px-2 py-1 rounded"
              >
                <Copy className="w-3 h-3" />
                {copied ? "Copied!" : "Copy Code"}
              </button>
            </div>

            <p className="text-xs text-muted-foreground italic">Code is non-functional in prototype — for display only.</p>
          </div>
        )}
      </section>

      {/* Renewal */}
      <section className="bg-card border border-border rounded-lg border-l-4 border-l-amber p-6">
        <h2 className="text-lg text-navy">Badge Renewal</h2>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          Your ComplyNG Verified badge renews annually on the date of first issuance. Renewal requires:
          maintained active subscription, compliance score above 85/100, and no unresolved HIGH severity
          gaps older than 90 days.
        </p>
        <p className="text-sm text-navy font-semibold mt-3">
          Annual renewal: ₦50,000 <span className="text-muted-foreground font-normal">(included in Growth and Enterprise plans)</span>
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
          {["Earn Badge", "Active (Year 1)", "30-day renewal reminder", "Renewal assessment", "Badge renewed"].map((step, i, arr) => (
            <div key={step} className="flex items-center gap-2">
              <span className="bg-teal/10 text-teal font-semibold px-3 py-1.5 rounded-md border border-teal/30">{step}</span>
              {i < arr.length - 1 && <ArrowRight className="w-3 h-3 text-muted-foreground" />}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const LockedCard = ({ score, target, pct }: { score: number; target: number; pct: number }) => (
  <div className="rounded-lg border-2 border-dashed border-teal bg-navy/5 p-10 text-center">
    <div className="relative inline-block">
      <Shield className="w-16 h-16 text-teal mx-auto" strokeWidth={1.5} />
      <Lock className="w-7 h-7 text-teal absolute -bottom-1 -right-2 bg-background rounded-full p-1" />
    </div>
    <h2 className="text-2xl text-navy mt-4">Badge Not Yet Earned</h2>
    <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
      Complete all three requirements below to unlock your verified badge.
    </p>
    <div className="max-w-md mx-auto mt-6">
      <div className="flex items-center justify-between text-xs font-semibold mb-2">
        <span className="text-navy">Current Score: {score}/100</span>
        <span className="text-teal">Target: {target}/100</span>
      </div>
      <div className="relative h-3 bg-muted rounded-full overflow-hidden">
        <div className="absolute inset-y-0 left-0 bg-teal transition-all" style={{ width: `${pct}%` }} />
        <div
          className="absolute inset-y-0 w-0.5 bg-navy"
          style={{ left: `${target}%` }}
          title="Target"
        />
      </div>
    </div>
  </div>
);

const UnlockedCard = () => (
  <div className="rounded-lg border-2 border-teal bg-teal/[0.08] p-10 text-center">
    <ShieldCheck className="w-16 h-16 text-teal mx-auto animate-pulse" strokeWidth={1.75} />
    <h2 className="text-2xl text-teal font-extrabold mt-4">ComplyNG Verified — NDPA Compliant</h2>
    <p className="text-sm text-muted-foreground mt-2">Your badge is active and publicly verifiable.</p>
    <div className="flex flex-wrap justify-center gap-x-8 gap-y-1 text-xs text-navy mt-4">
      <p><span className="font-semibold">Issued:</span> April 18, 2026</p>
      <p><span className="font-semibold">Renews:</span> April 18, 2027</p>
    </div>
    <div className="flex flex-wrap justify-center gap-3 mt-6">
      <button className="btn-teal text-sm">Download Badge Assets</button>
      <button className="btn-teal-outline text-sm">Get Embed Code</button>
    </div>
  </div>
);

const RequirementCard = ({
  icon: Icon,
  status,
  title,
  description,
  detail,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  status: "complete" | "incomplete" | "pending";
  title: string;
  description: string;
  detail?: string;
  children?: React.ReactNode;
}) => {
  const cfg = {
    complete: { badge: "bg-success text-white", iconWrap: "bg-success/10 text-success", Badge: CheckCircle2, label: "Complete" },
    incomplete: { badge: "bg-coral text-white", iconWrap: "bg-coral/10 text-coral", Badge: XCircle, label: "Incomplete" },
    pending: { badge: "bg-amber text-white", iconWrap: "bg-amber/10 text-amber", Badge: AlertCircle, label: "Pending" },
  }[status];
  return (
    <div className="card-cn p-5 flex flex-col">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className={`w-10 h-10 rounded-md flex items-center justify-center ${cfg.iconWrap}`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded ${cfg.badge}`}>
          <cfg.Badge className="w-3 h-3" /> {cfg.label}
        </span>
      </div>
      <h3 className="text-sm text-navy">{title}</h3>
      <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{description}</p>
      {detail && <p className="text-xs text-navy font-medium mt-3 pt-3 border-t border-border">{detail}</p>}
      {children}
    </div>
  );
};

export default VerifiedBadge;
