import { useState } from "react";
import { usePageTitle } from "@/hooks/usePageTitle";

const filters = ["All", "High Impact", "Medium", "Low", "Resolved"] as const;

type Impact = "HIGH" | "MEDIUM" | "LOW";

const alerts: {
  id: number;
  isNew?: boolean;
  title: string;
  date: string;
  summary: string;
  impact: Impact;
  affected?: string[];
  action?: string;
  cta: string;
}[] = [
  {
    id: 1,
    isNew: true,
    title: "NDPC Enforcement Notice — Consent Requirements for Fintech Operators",
    date: "April 10, 2026",
    summary:
      "The NDPC has issued an enforcement directive requiring all fintech operators to obtain explicit, freely-given consent before processing transaction data for analytics purposes. Operators have 60 days to comply.",
    impact: "HIGH",
    affected: ["Privacy Notice (Section 25)", "Consent Records (Section 27)"],
    action: "Review and update your consent collection mechanism",
    cta: "Generate Action Plan",
  },
  {
    id: 2,
    title: "NDPC Guidance — Data Retention Limits for HR Platforms",
    date: "March 28, 2026",
    summary:
      "New guidance specifies maximum retention periods for employee personal data: active employment records (duration of employment + 6 years), payroll records (7 years), application data (rejected candidates, 6 months).",
    impact: "MEDIUM",
    cta: "View Details",
  },
  {
    id: 3,
    title: "NDPA Amendment — Children's Data Protection Provisions",
    date: "February 14, 2026",
    summary:
      "Amended provisions clarify that any platform with users under 18 must implement age verification and obtain verifiable parental consent before processing children's personal data.",
    impact: "LOW",
    cta: "View Details",
  },
];

const impactStyle: Record<Impact, string> = {
  HIGH: "bg-coral/10 text-coral border-coral/30",
  MEDIUM: "bg-amber/10 text-amber border-amber/30",
  LOW: "bg-teal/10 text-teal border-teal/30",
};

const Regulatory = () => {
  usePageTitle("Regulatory Alerts");
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const filtered = alerts.filter((a) => {
    if (filter === "All") return true;
    if (filter === "High Impact") return a.impact === "HIGH";
    if (filter === "Medium") return a.impact === "MEDIUM";
    if (filter === "Low") return a.impact === "LOW";
    return false;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl text-navy">Regulatory Change Alerts</h1>
        <p className="text-muted-foreground text-sm mt-1">
          NDPC publications monitored automatically — your posture re-scored on every change.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium border transition-colors ${
              filter === f
                ? "bg-teal text-white border-teal"
                : "bg-white text-navy border-border hover:border-teal"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((a) => (
          <article
            key={a.id}
            className={`card-cn p-6 ${a.isNew ? "border-coral/40 border-l-4 border-l-coral" : ""}`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div className="flex flex-wrap items-center gap-2">
                {a.isNew && <span className="pill bg-coral text-white border-coral">NEW</span>}
                <span className={`pill ${impactStyle[a.impact]}`}>Impact: {a.impact}</span>
                <span className="text-xs text-muted-foreground">{a.date}</span>
              </div>
            </div>

            <h2 className="text-lg text-navy">{a.title}</h2>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{a.summary}</p>

            {a.affected && (
              <div className="mt-4 p-3 bg-muted/50 rounded-md text-sm">
                <p className="font-semibold text-navy mb-1">Affected obligations</p>
                <ul className="list-disc pl-5 text-muted-foreground space-y-0.5">
                  {a.affected.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            )}

            {a.action && (
              <p className="mt-3 text-sm">
                <span className="font-semibold text-navy">Action required: </span>
                <span className="text-muted-foreground">{a.action}</span>
              </p>
            )}

            <div className="mt-5">
              <button className="btn-teal text-sm">{a.cta}</button>
            </div>
          </article>
        ))}

        {filtered.length === 0 && (
          <div className="card-cn p-12 text-center text-muted-foreground">
            No alerts match this filter.
          </div>
        )}
      </div>
    </div>
  );
};

export default Regulatory;
