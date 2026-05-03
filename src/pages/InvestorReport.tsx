import { Link } from "react-router-dom";
import { Download, Plus, ArrowLeft } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";

const gaps = [
  { sev: "HIGH", gap: "No DPO appointed", section: "Section 30", risk: "Direct NDPC investigation trigger" },
  { sev: "HIGH", gap: "No privacy notice published", section: "Section 25", risk: "Consent and transparency violation" },
  { sev: "HIGH", gap: "No data subject rights procedure", section: "Section 34–38", risk: "Active enforcement priority for NDPC" },
  { sev: "MEDIUM", gap: "No breach notification procedure", section: "Section 40", risk: "Liability in event of incident" },
  { sev: "MEDIUM", gap: "Third-party processors uncontracted", section: "Section 43", risk: "Vicarious liability exposure" },
  { sev: "LOW", gap: "Retention periods undefined", section: "Section 26(f)", risk: "Audit finding risk" },
];

const sevClass = (s: string) => {
  if (s === "HIGH") return "bg-coral text-white";
  if (s === "MEDIUM") return "bg-amber text-white";
  return "bg-muted text-muted-foreground";
};

const InvestorReport = () => {
  usePageTitle("Assessment Report — HealthBridge");
  return (
    <div className="space-y-6 max-w-5xl">
      <Link to="/investor/dashboard" className="inline-flex items-center gap-1 text-sm text-teal hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Portfolio
      </Link>

      <div className="card-cn border-t-4 border-t-teal p-6">
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <p className="text-xs uppercase font-bold text-muted-foreground">Company</p>
            <p className="text-xl font-bold text-navy">HealthBridge HMO</p>
          </div>
          <div>
            <p className="text-xs uppercase font-bold text-muted-foreground">Industry</p>
            <p className="text-sm font-semibold text-navy mt-0.5">Healthtech</p>
          </div>
          <div>
            <p className="text-xs uppercase font-bold text-muted-foreground">Assessment date</p>
            <p className="text-sm text-navy mt-0.5">April 18, 2026</p>
          </div>
          <div>
            <p className="text-xs uppercase font-bold text-muted-foreground">Assessed by</p>
            <p className="text-sm text-navy mt-0.5">Lagos Ventures Fund II <span className="text-muted-foreground">(via ComplyNG)</span></p>
          </div>
        </div>
      </div>

      {/* Risk summary */}
      <div className="bg-coral/10 border-2 border-coral rounded-lg p-8 text-center">
        <p className="text-xs uppercase font-bold text-coral tracking-wider">NDPA Compliance Score</p>
        <p className="text-6xl font-extrabold text-navy mt-2 tabular-nums">42 <span className="text-2xl text-muted-foreground font-bold">/100</span></p>
        <span className="inline-block bg-coral text-white text-xs font-bold px-3 py-1 rounded mt-3">RISK LEVEL: HIGH</span>
        <p className="text-sm text-navy mt-4 max-w-2xl mx-auto leading-relaxed">
          This organization presents significant NDPA compliance exposure. <strong>3 HIGH severity gaps identified</strong> — each carries
          potential NDPC enforcement risk.
        </p>
      </div>

      {/* Executive summary */}
      <div className="bg-card border border-border rounded-lg border-l-4 border-l-navy p-6">
        <h2 className="text-lg text-navy mb-3">Executive Summary</h2>
        <div className="space-y-3 text-sm text-navy leading-relaxed">
          <p>
            HealthBridge HMO processes special categories of personal data — health and medical records — which
            attract heightened obligations under the NDPA 2023. The organization has not published an NDPA-compliant
            privacy notice, has no documented data subject rights procedure, and lacks a Data Protection Officer
            appointment as required under Section 30.
          </p>
          <p>
            The Nigeria Data Protection Commission actively enforces against healthtech operators. The combination
            of sensitive data categories, absent DPO, and missing privacy notice creates material regulatory risk
            that should be addressed prior to or as a condition of investment.
          </p>
        </div>
      </div>

      {/* Gap breakdown */}
      <div className="card-cn-active p-6">
        <h2 className="text-lg text-navy mb-4">Gap Breakdown</h2>
        <div className="overflow-x-auto -mx-6">
          <table className="w-full text-sm min-w-[720px]">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="font-semibold py-3 px-6">Severity</th>
                <th className="font-semibold py-3 px-3">Gap</th>
                <th className="font-semibold py-3 px-3">NDPA Section</th>
                <th className="font-semibold py-3 px-6">Enforcement Risk</th>
              </tr>
            </thead>
            <tbody>
              {gaps.map((g) => (
                <tr key={g.gap} className="border-b border-border last:border-0">
                  <td className="py-3.5 px-6">
                    <span className={`inline-block text-[10px] font-bold px-2 py-1 rounded ${sevClass(g.sev)}`}>{g.sev}</span>
                  </td>
                  <td className="py-3.5 px-3 font-medium text-navy">{g.gap}</td>
                  <td className="py-3.5 px-3 text-muted-foreground">{g.section}</td>
                  <td className="py-3.5 px-6 text-muted-foreground">{g.risk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DD checklist */}
      <div className="card-cn p-6">
        <h2 className="text-lg text-navy mb-3">Investor Risk Checklist</h2>
        <p className="text-xs text-muted-foreground mb-4">Due Diligence Items — check before closing</p>
        <ul className="space-y-2 text-sm">
          {[
            "Request evidence of DPO appointment (Section 30 certificate or contract)",
            "Confirm privacy notice is published and NDPA-compliant",
            "Verify Data Processing Agreements with all health data processors",
            "Confirm no active NDPC investigation or enforcement notice",
            "Add NDPA compliance milestones to investment conditions precedent",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 p-2 hover:bg-muted/30 rounded">
              <input type="checkbox" className="mt-1" />
              <span className="text-navy">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Conditions Precedent */}
      <div className="bg-card border border-border rounded-lg border-l-4 border-l-amber p-6">
        <h2 className="text-lg text-navy mb-2">Recommended Conditions Precedent</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Consider including the following as conditions precedent to investment or as post-investment milestones with
          timeline requirements:
        </p>
        <ul className="space-y-2 text-sm text-navy">
          {[
            "Appointment of qualified DPO within 60 days of close",
            "Publication of NDPA-compliant privacy notice within 30 days",
            "ComplyNG subscription activation and initial audit completion",
            "Achievement of ComplyNG Verified badge within 6 months",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-amber font-bold">•</span> {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="text-xs text-muted-foreground italic text-center max-w-2xl mx-auto">
        This assessment was generated using ComplyNG's NDPA 2023 compliance engine. It does not constitute legal advice.
        Engage a qualified NDPC-licensed DPCO for formal audit purposes.
      </div>

      <div className="flex flex-wrap gap-3 justify-end">
        <button className="btn-teal-outline text-sm"><Download className="w-4 h-4" /> Download Report PDF</button>
        <Link to="/investor/dashboard" className="btn-teal text-sm"><Plus className="w-4 h-4" /> Add to Portfolio</Link>
      </div>
    </div>
  );
};

export default InvestorReport;
