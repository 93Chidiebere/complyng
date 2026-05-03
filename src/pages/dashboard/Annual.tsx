import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, AlertTriangle, XCircle, ChevronDown, ChevronUp, X, Download, FileText } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";

type Status = "complete" | "review" | "not-started";

const statusBadge = (s: Status) => {
  if (s === "complete") return <span className="inline-flex items-center gap-1 text-success font-medium text-xs"><CheckCircle2 className="w-3.5 h-3.5" /> Complete</span>;
  if (s === "review") return <span className="inline-flex items-center gap-1 text-amber font-medium text-xs"><AlertTriangle className="w-3.5 h-3.5" /> Needs Review</span>;
  return <span className="inline-flex items-center gap-1 text-coral font-medium text-xs"><XCircle className="w-3.5 h-3.5" /> Not Started</span>;
};

const Annual = () => {
  usePageTitle("Annual NDPC Filing");
  const [open, setOpen] = useState<number | null>(1);
  const [trainingDate, setTrainingDate] = useState("");
  const [trainedCount, setTrainedCount] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const toggle = (i: number) => setOpen(open === i ? null : i);

  const sections: { id: number; title: string; status: Status; render: () => React.ReactNode }[] = [
    {
      id: 1,
      title: "Organization & DPO Details",
      status: "complete",
      render: () => (
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <KV label="Organization" value="Your Organization Ltd" />
          <KV label="Industry" value="Fintech" />
          <KV label="DPO name" value="Adaeze Okafor" />
          <KV label="DPO email" value="dpo@yourcompany.com" />
        </div>
      ),
    },
    {
      id: 2,
      title: "Data Processing Activities",
      status: "review",
      render: () => (
        <div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="py-2 font-semibold">Activity</th>
                <th className="py-2 font-semibold">Lawful Basis</th>
                <th className="py-2 font-semibold">DPIA Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border"><td className="py-2 text-navy font-medium">Instant Loan Pre-Approval</td><td className="py-2 text-muted-foreground">Contract</td><td className="py-2"><span className="pill bg-amber/10 text-amber border-amber/30">Conditions</span></td></tr>
              <tr><td className="py-2 text-navy font-medium">Marketing Analytics</td><td className="py-2 text-muted-foreground">Consent</td><td className="py-2"><span className="pill bg-success/10 text-success border-success/30">Approved</span></td></tr>
            </tbody>
          </table>
          <Link to="/dashboard/dpia" className="btn-teal-outline text-xs mt-4 inline-flex">Review Activities</Link>
        </div>
      ),
    },
    {
      id: 3,
      title: "Data Subject Requests Summary",
      status: "complete",
      render: () => (
        <div className="grid grid-cols-3 gap-3">
          <Mini label="Total received" value="10" />
          <Mini label="Responded on time" value="9" tone="success" />
          <Mini label="Overdue" value="1" tone="coral" />
        </div>
      ),
    },
    {
      id: 4,
      title: "Security Incidents",
      status: "complete",
      render: () => (
        <div className="grid grid-cols-2 gap-3">
          <Mini label="Incidents reported" value="1" />
          <Mini label="Resolved" value="1" tone="success" />
        </div>
      ),
    },
    {
      id: 5,
      title: "Vendor & Processor Register",
      status: "review",
      render: () => (
        <div>
          <div className="grid grid-cols-2 gap-3">
            <Mini label="Total vendors" value="6" />
            <Mini label="Missing DPAs" value="2" tone="coral" />
          </div>
          <Link to="/dashboard/vendor" className="btn-teal-outline text-xs mt-4 inline-flex">Go to Vendor Tracker</Link>
        </div>
      ),
    },
    {
      id: 6,
      title: "Training & Awareness",
      status: "not-started",
      render: () => (
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Date of last staff data protection training">
            <input type="date" value={trainingDate} onChange={(e) => setTrainingDate(e.target.value)} className="input-cn" />
          </Field>
          <Field label="Number of staff trained">
            <input type="number" value={trainedCount} onChange={(e) => setTrainedCount(e.target.value)} className="input-cn" placeholder="0" />
          </Field>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl text-navy">Annual NDPC Compliance Report</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Mandatory annual data protection audit for eligible data controllers — Section 48, NDPA 2023.
        </p>
      </div>

      {/* Training summary callout */}
      <section className="card-cn-active p-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wider text-teal font-semibold">Training Summary</p>
          <p className="text-navy font-semibold mt-1">Staff Training: 7/12 staff completed all modules</p>
          <p className="text-xs text-muted-foreground mt-0.5">Last updated April 16, 2026</p>
        </div>
        <Link to="/dashboard/training" className="btn-teal-outline text-xs">Go to Training →</Link>
      </section>

      {/* Status card */}
      <section className="card-cn-active p-6">
        <div className="grid md:grid-cols-3 gap-5 items-center">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Filing period</p>
            <p className="text-navy font-semibold mt-1">January 1 – December 31, 2026</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Status</p>
            <p className="mt-1"><span className="pill bg-amber/10 text-amber border-amber/30">In Progress</span></p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Estimated completion</p>
              <p className="text-sm text-navy font-bold">68%</p>
            </div>
            <div className="h-2 rounded-full bg-border overflow-hidden">
              <div className="h-full bg-teal" style={{ width: "68%" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Sections */}
      <div className="space-y-3">
        {sections.map((s) => (
          <div key={s.id} className="card-cn-active overflow-hidden">
            <button onClick={() => toggle(s.id)} className="w-full flex items-center justify-between p-5 hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-4 text-left">
                <span className="w-8 h-8 rounded-md bg-teal/10 text-teal flex items-center justify-center font-bold text-sm">{s.id}</span>
                <div>
                  <h3 className="text-navy font-semibold">{s.title}</h3>
                  <div className="mt-1">{statusBadge(s.status)}</div>
                </div>
              </div>
              {open === s.id ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
            </button>
            {open === s.id && (
              <div className="px-5 pb-5 pt-1 border-t border-border">{s.render()}</div>
            )}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button onClick={() => setShowPreview(true)} className="btn-teal flex-1">
          <FileText className="w-4 h-4" /> Generate Report Preview
        </button>
        <button className="btn-teal-outline flex-1">
          <Download className="w-4 h-4" /> Download Draft Report
        </button>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowPreview(false)}>
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-border px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-teal font-semibold">Report Preview</p>
                <h2 className="text-lg text-navy">NDPC Annual Compliance Report 2026</h2>
              </div>
              <button onClick={() => setShowPreview(false)} className="text-muted-foreground hover:text-navy"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-5 text-sm leading-relaxed">
              <PreviewSec n={1} title="Organization & DPO Details">
                Your Organization Ltd, a Fintech operator. DPO: Adaeze Okafor (dpo@yourcompany.com).
              </PreviewSec>
              <PreviewSec n={2} title="Data Processing Activities">
                2 active processing activities documented under DPIA. 1 approved (Marketing Analytics, consent basis), 1 proceeding with conditions (Instant Loan Pre-Approval, contract basis).
              </PreviewSec>
              <PreviewSec n={3} title="Data Subject Requests">
                10 requests received during the period. 9 responded within the statutory 30-day window; 1 overdue (currently in remediation).
              </PreviewSec>
              <PreviewSec n={4} title="Security Incidents">
                1 incident logged (BR-2026-001 — unauthorized access, 340 subjects). NDPC notified within 72 hours. Resolved.
              </PreviewSec>
              <PreviewSec n={5} title="Vendor & Processor Register">
                6 vendors on register. 4 with executed DPAs; 2 missing (Google Workspace, Intercom) — remediation in progress.
              </PreviewSec>
              <PreviewSec n={6} title="Training & Awareness">
                <em className="text-coral">Section incomplete. Please record last training date and number of staff trained.</em>
              </PreviewSec>
              <div className="p-4 rounded-md bg-amber/10 border border-amber/30 text-navy font-semibold">
                Overall status: 68% complete — finalize Section 6 and resolve Sections 2 &amp; 5 before submission.
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`.input-cn{width:100%;padding:.625rem .875rem;border:1px solid hsl(var(--border));border-radius:.375rem;background:white;font-size:.875rem;color:hsl(var(--navy));outline:none;transition:border-color .15s,box-shadow .15s}.input-cn:focus{border-color:hsl(var(--teal));box-shadow:0 0 0 3px hsl(var(--teal)/.15)}`}</style>
    </div>
  );
};

const KV = ({ label, value }: { label: string; value: string }) => (
  <div><p className="text-xs text-muted-foreground">{label}</p><p className="text-navy font-medium">{value}</p></div>
);

const Mini = ({ label, value, tone }: { label: string; value: string; tone?: "success" | "coral" }) => {
  const tc = tone === "success" ? "text-success" : tone === "coral" ? "text-coral" : "text-navy";
  return (
    <div className="card-cn p-4 text-center">
      <p className={`text-2xl font-bold ${tc}`}>{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
    </div>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div><label className="block text-sm font-semibold text-navy mb-1.5">{label}</label>{children}</div>
);

const PreviewSec = ({ n, title, children }: { n: number; title: string; children: React.ReactNode }) => (
  <div>
    <h3 className="text-sm font-bold text-navy mb-1"><span className="text-teal mr-2">{n}.</span>{title}</h3>
    <p className="text-muted-foreground">{children}</p>
  </div>
);

export default Annual;
