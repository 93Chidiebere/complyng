import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ChevronDown, ChevronUp, ArrowRight, CheckCircle2 } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useCompliance } from "@/state/ComplianceContext";

type Severity = "HIGH" | "MEDIUM" | "LOW";

const gaps: {
  severity: Severity;
  title: string;
  citation: string;
  description: string;
  fix: string;
}[] = [
  {
    severity: "HIGH",
    title: "No lawful basis stated for data processing",
    citation: "Section 25, NDPA 2023",
    description: "Your policy does not declare a lawful basis (consent, contract, legal obligation, etc.).",
    fix: "Add a clear section stating the lawful basis for each processing activity. For most Nigerian fintechs, this combines consent, contract performance, and legal obligation under NDPA Section 25.",
  },
  {
    severity: "HIGH",
    title: "Missing data subject rights notice",
    citation: "Sections 34–38, NDPA 2023",
    description: "Data subjects must be told about their rights to access, rectify, erase, restrict, and object.",
    fix: "Insert a 'Your Rights' section enumerating all six DSR rights with a contact email. Commit to responding within 30 days as required by NDPA Section 38.",
  },
  {
    severity: "HIGH",
    title: "No Data Protection Officer contact",
    citation: "Section 30, NDPA 2023",
    description: "DPO contact details are not published in your policy.",
    fix: "Appoint a DPO (or DPCO partner) and publish a dpo@yourcompany email. The NDPC requires accessible DPO contact for all data controllers of major importance.",
  },
  {
    severity: "MEDIUM",
    title: "Retention periods not specified",
    citation: "Section 26(f), NDPA 2023",
    description: "Your policy does not state how long personal data is stored.",
    fix: "Publish a retention schedule per data category (e.g. KYC records: 5 years post-relationship). Ensure deletion procedures align with the stated periods.",
  },
  {
    severity: "MEDIUM",
    title: "No breach notification procedure mentioned",
    citation: "Section 40, NDPA 2023",
    description: "Reference to your 72-hour breach response process is missing.",
    fix: "Document and disclose a breach response process committing to NDPC notification within 72 hours. Include data subject notification triggers for high-risk breaches.",
  },
  {
    severity: "MEDIUM",
    title: "Third-party processor agreements not referenced",
    citation: "Section 43, NDPA 2023",
    description: "Your policy doesn't confirm DPAs are in place with vendors.",
    fix: "Add language confirming all processors are bound by written Data Processing Agreements. Maintain a vendor register with executed DPAs for audit readiness.",
  },
  {
    severity: "LOW",
    title: "Cookie/tracking policy absent",
    citation: "NDPC Guidance 2024",
    description: "No cookie policy or tracking-tech disclosure is provided.",
    fix: "Publish a cookie policy listing categories (essential, analytics, marketing) and add a consent banner for non-essential trackers as per NDPC 2024 guidance.",
  },
  {
    severity: "LOW",
    title: "No data transfer safeguards stated",
    citation: "Section 44, NDPA 2023",
    description: "Cross-border transfers are not addressed.",
    fix: "Disclose all jurisdictions where data is transferred and the safeguards used (adequacy, SCCs, BCRs). NDPC requires explicit safeguards for transfers outside Nigeria.",
  },
];

const severityStyle: Record<Severity, string> = {
  HIGH: "bg-coral/10 text-coral border-coral/30",
  MEDIUM: "bg-amber/10 text-amber border-amber/30",
  LOW: "bg-teal/10 text-teal border-teal/30",
};

const Audit = () => {
  usePageTitle("Audit Results");
  const { score, resolvedGaps } = useCompliance();
  const scoreColor = score <= 40 ? "hsl(var(--coral))" : score <= 70 ? "hsl(var(--amber))" : "hsl(var(--success))";
  const totalGaps = gaps.length;
  const openGaps = gaps.filter((g) => !resolvedGaps.includes(g.title)).length;

  return (
    <Layout>
      <div className="container py-10">
        {/* Score */}
        <div className="card-cn-active p-8 flex flex-col md:flex-row items-center gap-8">
          <ScoreRing score={score} color={scoreColor} />
          <div className="text-center md:text-left">
            <p className="text-sm uppercase tracking-wider text-muted-foreground font-semibold">
              Compliance Score
            </p>
            <h1 className="text-3xl text-navy mt-1">NDPA 2023 Audit Complete</h1>
            <p className="mt-2 text-muted-foreground">
              <span className="font-semibold text-navy">{openGaps} open</span> of {totalGaps} gaps · {resolvedGaps.length} resolved
            </p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
              <span className="pill bg-coral/10 text-coral border-coral/30">3 High</span>
              <span className="pill bg-amber/10 text-amber border-amber/30">3 Medium</span>
              <span className="pill bg-teal/10 text-teal border-teal/30">2 Low</span>
            </div>
          </div>
        </div>

        {/* Two columns */}
        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          {/* Gaps */}
          <div className="lg:col-span-2 space-y-3">
            <h2 className="text-xl text-navy mb-2">Gaps Found</h2>
            {gaps.map((g, i) => (
              <GapCard key={i} {...g} resolved={resolvedGaps.includes(g.title)} />
            ))}
          </div>

          {/* Roadmap */}
          <aside className="space-y-4 lg:sticky lg:top-20 self-start">
            <h2 className="text-xl text-navy mb-2">30-Day Remediation Roadmap</h2>

            <RoadmapWeek
              week="Week 1"
              tag="Critical"
              tagClass="bg-coral/10 text-coral border-coral/30"
              items={["Add lawful basis statements", "Add DSR rights notice", "Appoint DPO"]}
            />
            <RoadmapWeek
              week="Week 2"
              tag="Important"
              tagClass="bg-amber/10 text-amber border-amber/30"
              items={["Add retention schedule", "Add breach procedure", "Reference DPAs"]}
            />
            <RoadmapWeek
              week="Week 3–4"
              tag="Recommended"
              tagClass="bg-teal/10 text-teal border-teal/30"
              items={["Cookie policy", "Transfer safeguards", "Full policy rewrite"]}
            />
          </aside>
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="bg-teal text-white mt-12">
        <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-lg font-medium text-center md:text-left">
            Your compliance dashboard is ready. Track all 6 modules in one place.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 bg-white text-teal font-semibold px-6 py-3 rounded-md hover:bg-white/90 transition-colors"
          >
            Go to Dashboard <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
};

const ScoreRing = ({ score, color }: { score: number; color: string }) => {
  const r = 70;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  return (
    <div className="relative w-44 h-44 shrink-0">
      <svg viewBox="0 0 160 160" className="-rotate-90 w-full h-full">
        <circle cx="80" cy="80" r={r} stroke="hsl(var(--border))" strokeWidth="12" fill="none" />
        <circle
          cx="80"
          cy="80"
          r={r}
          stroke={color}
          strokeWidth="12"
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-extrabold" style={{ color }}>
          {score}
        </span>
        <span className="text-xs text-muted-foreground font-medium">/ 100</span>
      </div>
    </div>
  );
};

const GapCard = ({
  severity,
  title,
  citation,
  description,
  fix,
  resolved,
}: {
  severity: Severity;
  title: string;
  citation: string;
  description: string;
  fix: string;
  resolved?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`card-cn p-5 transition-opacity ${resolved ? "opacity-70" : ""}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`pill ${severityStyle[severity]}`}>{severity}</span>
            <span className="text-xs text-muted-foreground">{citation}</span>
            {resolved && (
              <span className="pill bg-success/10 text-success border-success/30">
                <CheckCircle2 className="w-3 h-3 inline mr-0.5" /> Resolved
              </span>
            )}
          </div>
          <h3 className={`text-base mt-2 ${resolved ? "text-muted-foreground line-through" : "text-navy"}`}>{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
      <button
        onClick={() => setOpen(!open)}
        className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-teal hover:underline"
      >
        Fix Guidance {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {open && (
        <div className="mt-3 p-4 bg-teal/5 border-l-2 border-teal rounded-r text-sm text-navy leading-relaxed">
          {fix}
        </div>
      )}
    </div>
  );
};

const RoadmapWeek = ({
  week,
  tag,
  tagClass,
  items,
}: {
  week: string;
  tag: string;
  tagClass: string;
  items: string[];
}) => (
  <div className="card-cn-active p-5">
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-navy">{week}</h3>
      <span className={`pill ${tagClass}`}>{tag}</span>
    </div>
    <ul className="space-y-2">
      {items.map((it) => (
        <li key={it} className="flex items-start gap-2 text-sm text-navy">
          <span className="w-1.5 h-1.5 rounded-full bg-teal mt-1.5 shrink-0" />
          {it}
        </li>
      ))}
    </ul>
  </div>
);

export default Audit;
