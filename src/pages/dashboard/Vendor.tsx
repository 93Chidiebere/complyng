import { useState } from "react";
import { Link } from "react-router-dom";
import { X, Plus, CheckCircle2, AlertTriangle, XCircle, Check } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";

type DPA = "ok" | "expiring" | "missing";
type Risk = "Low" | "Medium" | "High";

const vendors: {
  name: string;
  category: string;
  dpa: DPA;
  reviewed: string;
  risk: Risk;
  transferAssessed: "Yes" | "No" | "Pending";
}[] = [
  { name: "Paystack", category: "Payment Processing", dpa: "ok", reviewed: "Jan 2026", risk: "Low", transferAssessed: "Yes" },
  { name: "Termii", category: "SMS/Communications", dpa: "expiring", reviewed: "Dec 2025", risk: "Medium", transferAssessed: "Yes" },
  { name: "Google Workspace", category: "Productivity/Email", dpa: "missing", reviewed: "Never", risk: "High", transferAssessed: "Yes" },
  { name: "AWS (Amazon)", category: "Cloud Infrastructure", dpa: "ok", reviewed: "Mar 2026", risk: "Low", transferAssessed: "Yes" },
  { name: "Intercom", category: "Customer Support", dpa: "missing", reviewed: "Never", risk: "High", transferAssessed: "Yes" },
  { name: "Zoho CRM", category: "CRM Platform", dpa: "ok", reviewed: "Feb 2026", risk: "Low", transferAssessed: "Yes" },
];

const transferBadge = (t: "Yes" | "No" | "Pending") => {
  if (t === "Yes") return <span className="pill bg-success/10 text-success border-success/30">Yes</span>;
  if (t === "Pending") return <span className="pill bg-amber/10 text-amber border-amber/30">Pending</span>;
  return <span className="pill bg-coral/10 text-coral border-coral/30">No</span>;
};

const dpaBadge = (d: DPA) => {
  if (d === "ok") return <span className="inline-flex items-center gap-1 text-success font-medium text-xs"><CheckCircle2 className="w-3.5 h-3.5" /> DPA in Place</span>;
  if (d === "expiring") return <span className="inline-flex items-center gap-1 text-amber font-medium text-xs"><AlertTriangle className="w-3.5 h-3.5" /> DPA Expiring</span>;
  return <span className="inline-flex items-center gap-1 text-coral font-medium text-xs"><XCircle className="w-3.5 h-3.5" /> No DPA</span>;
};

const riskBadge = (r: Risk) => {
  const styles = { Low: "bg-success/10 text-success border-success/30", Medium: "bg-amber/10 text-amber border-amber/30", High: "bg-coral/10 text-coral border-coral/30" };
  return <span className={`pill ${styles[r]}`}>{r}</span>;
};

const dpaChecklist = [
  "Subject matter and duration of processing",
  "Nature and purpose of processing",
  "Type of personal data and categories of data subjects",
  "Obligations and rights of the data controller",
  "Data security measures (Section 39)",
  "Sub-processor restrictions",
  "Data return or deletion upon termination",
];

const Vendor = () => {
  usePageTitle("Vendor Tracker");
  const [showAdd, setShowAdd] = useState(false);
  const [dpaVendor, setDpaVendor] = useState<string | null>(null);
  const [checked, setChecked] = useState<string[]>([]);

  const toggle = (item: string) => setChecked((c) => c.includes(item) ? c.filter((x) => x !== item) : [...c, item]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl text-navy">Vendor Compliance Tracker</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Third-party data processors must have valid DPAs and adequate NDPA safeguards.
          </p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn-teal text-sm">
          <Plus className="w-4 h-4" /> Add Vendor
        </button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Stat label="Total Vendors" value="6" tone="teal" />
        <Stat label="DPA Missing" value="2" tone="coral" />
        <Stat label="Review Due" value="1" tone="amber" />
      </div>

      <section className="card-cn-active p-6">
        <div className="overflow-x-auto -mx-6">
          <table className="w-full text-sm min-w-[860px]">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="font-semibold py-3 px-6">Vendor</th>
                <th className="font-semibold py-3 px-3">Category</th>
                <th className="font-semibold py-3 px-3">DPA Status</th>
                <th className="font-semibold py-3 px-3">Last Reviewed</th>
                <th className="font-semibold py-3 px-3">Risk</th>
                <th className="font-semibold py-3 px-3">Transfer Assessed</th>
                <th className="font-semibold py-3 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((v) => (
                <tr key={v.name} className="border-b border-border last:border-0 hover:bg-muted/40">
                  <td className="py-3.5 px-6 font-semibold text-navy">{v.name}</td>
                  <td className="py-3.5 px-3 text-muted-foreground">{v.category}</td>
                  <td className="py-3.5 px-3">{dpaBadge(v.dpa)}</td>
                  <td className="py-3.5 px-3 text-muted-foreground">{v.reviewed}</td>
                  <td className="py-3.5 px-3">{riskBadge(v.risk)}</td>
                  <td className="py-3.5 px-3">
                    <Link to="/dashboard/transfers" className="inline-flex items-center gap-1 hover:opacity-80">
                      {transferBadge(v.transferAssessed)}
                    </Link>
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <button
                      onClick={() => v.dpa === "missing" ? (setDpaVendor(v.name), setChecked([])) : v.dpa === "expiring" ? setDpaVendor(v.name) : null}
                      className={`text-xs font-semibold ${v.dpa === "ok" ? "text-muted-foreground hover:text-navy" : "text-teal hover:underline"}`}
                    >
                      {v.dpa === "missing" ? "Add DPA" : v.dpa === "expiring" ? "Renew DPA" : "View"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Add Vendor Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowAdd(false)}>
          <div className="bg-white rounded-lg w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-lg text-navy">Add New Vendor</h2>
              <button onClick={() => setShowAdd(false)} className="text-muted-foreground hover:text-navy"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setShowAdd(false); }} className="space-y-4">
              <Field label="Vendor name"><input className="input-cn" placeholder="e.g. Mailgun" /></Field>
              <Field label="Category">
                <select className="input-cn">
                  {["Payment", "Cloud", "Communications", "Analytics", "CRM", "HR", "Other"].map((c) => <option key={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="DPA in place?">
                <div className="flex gap-3">
                  {["Yes", "No"].map((v) => <button key={v} type="button" className="px-5 py-2 rounded-md border border-border text-sm font-medium hover:border-teal">{v}</button>)}
                </div>
              </Field>
              <Field label="Date of last review"><input type="date" className="input-cn" /></Field>
              <Field label="Notes"><textarea rows={3} className="input-cn resize-none" placeholder="Optional notes…" /></Field>
              <button type="submit" className="btn-teal w-full">Add Vendor</button>
            </form>
          </div>
        </div>
      )}

      {/* DPA Slide-over */}
      {dpaVendor && (
        <div className="fixed inset-0 z-50 flex" onClick={() => setDpaVendor(null)}>
          <div className="flex-1 bg-black/50" />
          <div className="w-full max-w-xl bg-white h-full overflow-y-auto p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-teal font-semibold">DPA Setup</p>
                <h2 className="text-lg text-navy">{dpaVendor}</h2>
              </div>
              <button onClick={() => setDpaVendor(null)} className="text-muted-foreground hover:text-navy"><X className="w-5 h-5" /></button>
            </div>

            <div className="card-cn p-4 bg-teal/5 border-teal/30 text-sm leading-relaxed text-navy">
              <p className="font-semibold mb-1">What is a Data Processing Agreement?</p>
              <p className="text-muted-foreground">
                Under <strong className="text-navy">NDPA Section 43</strong>, every relationship with a third-party processor
                must be governed by a written agreement. The DPA defines what the processor may do with personal data, sets
                security obligations, and ensures the controller remains accountable. Without one, you carry the full liability
                for any mishandling by the vendor.
              </p>
            </div>

            <div className="mt-6">
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">DPA Checklist</p>
              <ul className="space-y-2">
                {dpaChecklist.map((item) => {
                  const isChecked = checked.includes(item);
                  return (
                    <li key={item}>
                      <button onClick={() => toggle(item)} className={`w-full flex items-start gap-3 p-3 rounded-md border text-left transition-colors ${isChecked ? "border-teal bg-teal/5" : "border-border hover:border-teal"}`}>
                        <span className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 ${isChecked ? "bg-teal border-teal" : "border-border"}`}>
                          {isChecked && <Check className="w-3.5 h-3.5 text-white" />}
                        </span>
                        <span className="text-sm text-navy">{item}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <p className="text-xs text-muted-foreground mt-3">{checked.length} of {dpaChecklist.length} clauses confirmed</p>
            </div>

            <button onClick={() => setDpaVendor(null)} className="btn-teal w-full mt-6">Mark DPA as Complete</button>
          </div>
        </div>
      )}

      <FormStyles />
    </div>
  );
};

const Stat = ({ label, value, tone }: { label: string; value: string; tone: "teal" | "coral" | "amber" }) => {
  const tc = { teal: "bg-teal text-white", coral: "bg-coral text-white", amber: "bg-amber text-white" }[tone];
  return (
    <div className="card-cn-active p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-md flex items-center justify-center font-bold text-lg ${tc}`}>{value}</div>
      <p className="text-sm font-semibold text-navy">{label}</p>
    </div>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div><label className="block text-sm font-semibold text-navy mb-1.5">{label}</label>{children}</div>
);

const FormStyles = () => (
  <style>{`.input-cn{width:100%;padding:.625rem .875rem;border:1px solid hsl(var(--border));border-radius:.375rem;background:white;font-size:.875rem;color:hsl(var(--navy));outline:none;transition:border-color .15s,box-shadow .15s}.input-cn:focus{border-color:hsl(var(--teal));box-shadow:0 0 0 3px hsl(var(--teal)/.15)}`}</style>
);

export default Vendor;
