import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { InvestorTopNav } from "@/components/InvestorLayout";
import { Plus, X, ArrowRight, ShieldCheck } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";

type Risk = "Low" | "Medium" | "High";
type Company = {
  name: string;
  industry: string;
  score: number;
  risk: Risk;
  lastAssessed: string;
  badge: boolean;
};

const portfolio: Company[] = [
  { name: "TechPay Nigeria", industry: "Fintech", score: 71, risk: "Low", lastAssessed: "Apr 2026", badge: true },
  { name: "StudyAI Platform", industry: "Edtech", score: 58, risk: "Medium", lastAssessed: "Mar 2026", badge: false },
  { name: "HealthBridge", industry: "Healthtech", score: 42, risk: "High", lastAssessed: "Mar 2026", badge: false },
  { name: "QuickHR", industry: "HR Platform", score: 35, risk: "High", lastAssessed: "Feb 2026", badge: false },
  { name: "FarmData", industry: "AgriTech", score: 67, risk: "Medium", lastAssessed: "Apr 2026", badge: false },
  { name: "RetailFirst", industry: "E-commerce", score: 55, risk: "Medium", lastAssessed: "Jan 2026", badge: false },
];

const riskBadge = (r: Risk) => {
  if (r === "High") return "bg-coral/15 text-coral";
  if (r === "Medium") return "bg-amber/15 text-amber";
  return "bg-success/15 text-success";
};

const riskDot = (r: Risk) => {
  if (r === "High") return "🔴";
  if (r === "Medium") return "🟡";
  return "🟢";
};

const InvestorDashboardLayout = () => {
  const { pathname } = useLocation();
  const isIndex = pathname === "/investor/dashboard" || pathname === "/investor/dashboard/";
  return (
    <div className="min-h-screen bg-background">
      <InvestorTopNav variant="app" />
      <main className="container py-8">
        {isIndex && <PortfolioOverview />}
        <Outlet />
      </main>
    </div>
  );
};

const PortfolioOverview = () => {
  usePageTitle("Investor Portfolio");
  const [open, setOpen] = useState(false);
  const stats = {
    total: portfolio.length,
    high: portfolio.filter((p) => p.risk === "High").length,
    medium: portfolio.filter((p) => p.risk === "Medium").length,
    low: portfolio.filter((p) => p.risk === "Low").length,
  };
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl text-navy">Investment Portfolio — NDPA Risk Overview</h1>
          <p className="text-muted-foreground text-sm mt-1">Lagos Ventures Fund II</p>
        </div>
        <button onClick={() => setOpen(true)} className="btn-teal text-sm">
          <Plus className="w-4 h-4" /> Add Company to Portfolio
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <Stat label="Portfolio Companies" value={stats.total} tone="navy" />
        <Stat label="High Risk" value={stats.high} tone="coral" />
        <Stat label="Medium Risk" value={stats.medium} tone="amber" />
        <Stat label="Low Risk" value={stats.low} tone="success" />
        <Stat label="Assessments This Month" value={4} tone="teal" />
      </div>

      <div className="card-cn-active overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border bg-muted/40">
                <th className="font-semibold py-3 px-5">Company</th>
                <th className="font-semibold py-3 px-3">Industry</th>
                <th className="font-semibold py-3 px-3">NDPA Score</th>
                <th className="font-semibold py-3 px-3">Risk</th>
                <th className="font-semibold py-3 px-3">Last Assessed</th>
                <th className="font-semibold py-3 px-3">Badge</th>
                <th className="font-semibold py-3 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.map((c) => (
                <tr key={c.name} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="py-3.5 px-5 font-semibold text-navy">{c.name}</td>
                  <td className="py-3.5 px-3 text-muted-foreground">{c.industry}</td>
                  <td className="py-3.5 px-3 font-bold text-navy tabular-nums">{c.score}/100</td>
                  <td className="py-3.5 px-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold ${riskBadge(c.risk)}`}>
                      {riskDot(c.risk)} {c.risk}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-muted-foreground">{c.lastAssessed}</td>
                  <td className="py-3.5 px-3">
                    {c.badge ? (
                      <span className="inline-flex items-center gap-1 text-success text-xs font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5" /> Verified
                      </span>
                    ) : (
                      <span className="text-muted-foreground text-xs">— None</span>
                    )}
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <Link
                      to="/investor/dashboard/report"
                      className="text-xs font-semibold text-teal hover:underline inline-flex items-center gap-1"
                    >
                      {c.risk === "High" ? "Run New Assessment" : "View Report"} <ArrowRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {open && <AddCompanyModal onClose={() => setOpen(false)} />}
    </div>
  );
};

const Stat = ({ label, value, tone }: { label: string; value: number; tone: "navy" | "coral" | "amber" | "success" | "teal" }) => {
  const t = {
    navy: "text-navy",
    coral: "text-coral",
    amber: "text-amber",
    success: "text-success",
    teal: "text-teal",
  }[tone];
  return (
    <div className="card-cn p-4">
      <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{label}</p>
      <p className={`text-3xl font-extrabold mt-1 tabular-nums ${t}`}>{value}</p>
    </div>
  );
};

const AddCompanyModal = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={onClose}>
    <div className="bg-card rounded-lg shadow-xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
      <div className="flex items-start justify-between p-6 border-b border-border">
        <h3 className="text-lg text-navy">Add Company to Portfolio</h3>
        <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground hover:text-navy" /></button>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); onClose(); }} className="p-6 space-y-4">
        <Field label="Company name" />
        <div>
          <label className="text-xs font-semibold text-navy">Industry</label>
          <select className="w-full mt-1.5 border border-border rounded-md px-3 py-2 text-sm bg-card">
            <option>Fintech</option>
            <option>Healthtech</option>
            <option>Edtech</option>
            <option>HR Platform</option>
            <option>E-commerce</option>
            <option>AgriTech</option>
          </select>
        </div>
        <Field label="Contact email (optional)" type="email" />
        <div>
          <label className="text-xs font-semibold text-navy">Notes</label>
          <textarea rows={3} className="w-full mt-1.5 border border-border rounded-md px-3 py-2 text-sm" />
        </div>
        <button className="btn-teal w-full">Add & Run Assessment</button>
      </form>
    </div>
  </div>
);

const Field = ({ label, type = "text" }: { label: string; type?: string }) => (
  <div>
    <label className="text-xs font-semibold text-navy">{label}</label>
    <input type={type} className="w-full mt-1.5 border border-border rounded-md px-3 py-2 text-sm" />
  </div>
);

export default InvestorDashboardLayout;
