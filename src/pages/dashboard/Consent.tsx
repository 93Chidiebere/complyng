import { useState } from "react";
import { toast } from "sonner";
import { X, Search, Code, Copy, CheckCircle2, AlertTriangle } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";

type ConsentStatus = "Active" | "Withdrawn" | "Pending";
type ConsentRow = {
  id: string;
  email: string;
  purpose: string;
  date: string;
  version: string;
  status: ConsentStatus;
};

const records: ConsentRow[] = [
  { id: "CST-0847", email: "adaeze.n@gmail.com", purpose: "Marketing communications", date: "Apr 10, 2026", version: "v2.1", status: "Active" },
  { id: "CST-0846", email: "babatunde.o@yahoo.com", purpose: "Service delivery", date: "Apr 9, 2026", version: "v2.1", status: "Active" },
  { id: "CST-0845", email: "chioma.e@outlook.com", purpose: "Analytics", date: "Apr 8, 2026", version: "v2.1", status: "Withdrawn" },
  { id: "CST-0844", email: "damilola.a@gmail.com", purpose: "Service delivery", date: "Apr 7, 2026", version: "v2.0", status: "Active" },
  { id: "CST-0843", email: "emeka.u@gmail.com", purpose: "Marketing + Analytics", date: "Apr 6, 2026", version: "v2.1", status: "Active" },
];

const auditLog = [
  { ts: "Apr 16, 2026 14:32", event: "Consent Given", subject: "a***@gmail.com", details: "Accepted: Service delivery, Marketing" },
  { ts: "Apr 16, 2026 11:15", event: "Consent Withdrawn", subject: "c***@outlook.com", details: "Withdrawn: Analytics" },
  { ts: "Apr 15, 2026 09:44", event: "Consent Updated", subject: "b***@yahoo.com", details: "Added: SMS notifications" },
  { ts: "Apr 14, 2026 16:20", event: "Consent Given", subject: "d***@gmail.com", details: "Accepted: Service delivery only" },
  { ts: "Apr 13, 2026 10:05", event: "Widget Impression", subject: "—", details: "234 banner impressions, 89 interactions" },
];

const purposes = ["Service delivery", "Marketing emails", "SMS notifications", "Analytics tracking", "Sharing with partners", "Automated decision-making"];

const mask = (e: string) => e.replace(/^(.).*?(@.*)$/, "$1***$2");

const statusBadge = (s: ConsentStatus) => {
  if (s === "Active") return <span className="pill bg-success/10 text-success border-success/30">✓ Active</span>;
  if (s === "Withdrawn") return <span className="pill bg-amber/10 text-amber border-amber/30">⚠ Withdrawn</span>;
  return <span className="pill bg-muted text-muted-foreground border-border">Pending</span>;
};

const Consent = () => {
  usePageTitle("Consent Manager");
  const [tab, setTab] = useState<"records" | "widgets" | "audit">("records");
  const [filter, setFilter] = useState<"All" | "Active" | "Withdrawn" | "Pending">("All");
  const [search, setSearch] = useState("");
  const [view, setView] = useState<ConsentRow | null>(null);
  const [showEmbed, setShowEmbed] = useState(false);

  // Widget builder state
  const [orgName] = useState("Your Organization Ltd");
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>(["Service delivery"]);
  const [policyUrl, setPolicyUrl] = useState("https://yoursite.com/privacy");
  const [dpoEmail] = useState("dpo@yourcompany.com");
  const [language, setLanguage] = useState("English");
  const [style, setStyle] = useState<"Banner" | "Modal" | "Inline checkbox">("Banner");

  const togglePurpose = (p: string) =>
    setSelectedPurposes((s) => s.includes(p) ? s.filter((x) => x !== p) : [...s, p]);

  const filtered = records.filter((r) => {
    if (filter !== "All" && r.status !== filter) return false;
    if (search && !`${r.email} ${r.id} ${r.purpose}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const embedCode = `<script src="https://cdn.complyng.io/widget.js"
  data-org="your-org-id"
  data-purposes="${selectedPurposes.map((p) => p.toLowerCase().split(" ")[0]).join(",")}"
  data-policy="${policyUrl}"
  data-style="${style.toLowerCase()}">
</script>`;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl text-navy">Consent Management</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Capture, store, and manage data subject consent under NDPA Sections 26–27 — the most actively enforced provision by the NDPC.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Total Consents Captured" value="4,847" tone="navy" />
        <Stat label="Active Consents" value="4,203" tone="success" />
        <Stat label="Withdrawn" value="644" tone="amber" />
        <Stat label="Updated Today" value="12" tone="teal" />
      </div>

      {/* Tabs */}
      <div className="border-b border-border flex gap-1">
        {([
          { k: "records", label: "Consent Records" },
          { k: "widgets", label: "Consent Widgets" },
          { k: "audit", label: "Audit Log" },
        ] as const).map((t) => (
          <button
            key={t.k}
            onClick={() => setTab(t.k)}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors ${
              tab === t.k ? "border-teal text-teal" : "border-transparent text-muted-foreground hover:text-navy"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "records" && (
        <section className="card-cn-active p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="relative flex-1 min-w-[240px] max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email, or consent ID"
                className="w-full pl-10 pr-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
              />
            </div>
            <div className="flex gap-1">
              {(["All", "Active", "Withdrawn", "Pending"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors ${
                    filter === f ? "bg-teal text-white border-teal" : "bg-white text-navy border-border hover:border-teal"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto -mx-5">
            <table className="w-full text-sm min-w-[820px]">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                  <th className="font-semibold py-2 px-5">Consent ID</th>
                  <th className="font-semibold py-2 px-2">Data Subject</th>
                  <th className="font-semibold py-2 px-2">Purpose</th>
                  <th className="font-semibold py-2 px-2">Date Given</th>
                  <th className="font-semibold py-2 px-2">Notice</th>
                  <th className="font-semibold py-2 px-2">Status</th>
                  <th className="font-semibold py-2 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-b border-border last:border-0 hover:bg-muted/40">
                    <td className="py-3 px-5 font-mono text-xs text-navy">{r.id}</td>
                    <td className="py-3 px-2 text-navy">{mask(r.email)}</td>
                    <td className="py-3 px-2 text-muted-foreground text-xs">{r.purpose}</td>
                    <td className="py-3 px-2 text-muted-foreground text-xs">{r.date}</td>
                    <td className="py-3 px-2 text-muted-foreground text-xs">{r.version}</td>
                    <td className="py-3 px-2">{statusBadge(r.status)}</td>
                    <td className="py-3 px-5 text-right">
                      <button onClick={() => setView(r)} className="text-xs font-semibold text-teal hover:underline">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {tab === "widgets" && (
        <section className="grid lg:grid-cols-2 gap-6">
          <div className="card-cn-active p-5 space-y-4">
            <div>
              <h3 className="text-navy font-semibold">Embed Consent Collection on Your Platform</h3>
              <p className="text-xs text-muted-foreground mt-1">Generate an NDPA-compliant consent widget for your website or app.</p>
            </div>
            <Field label="Organization name"><input className="input-cn" defaultValue={orgName} /></Field>
            <Field label="Consent purposes">
              <div className="space-y-1.5">
                {purposes.map((p) => (
                  <label key={p} className="flex items-center gap-2 text-sm text-navy cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedPurposes.includes(p)}
                      onChange={() => togglePurpose(p)}
                      className="rounded border-border text-teal focus:ring-teal"
                    />
                    {p}
                  </label>
                ))}
              </div>
            </Field>
            <Field label="Privacy policy URL">
              <input className="input-cn" value={policyUrl} onChange={(e) => setPolicyUrl(e.target.value)} />
            </Field>
            <Field label="DPO contact email"><input className="input-cn" defaultValue={dpoEmail} /></Field>
            <Field label="Language">
              <select className="input-cn" value={language} onChange={(e) => setLanguage(e.target.value)}>
                {["English", "Yoruba", "Igbo", "Hausa"].map((l) => <option key={l}>{l}</option>)}
              </select>
            </Field>
            <Field label="Widget style">
              <div className="flex gap-2">
                {(["Banner", "Modal", "Inline checkbox"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStyle(s)}
                    className={`px-3 py-2 text-xs font-semibold rounded-md border transition-colors ${
                      style === s ? "bg-teal text-white border-teal" : "bg-white text-navy border-border hover:border-teal"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </Field>
          </div>

          <div className="space-y-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Live Preview</p>
            <div className="card-cn-active p-5 bg-card">
              <p className="font-bold text-navy">🔒 Your Privacy Matters</p>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                <span className="font-semibold text-navy">{orgName}</span> collects and processes your personal data for:
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {purposes.map((p) => (
                  <span key={p} className={`pill ${selectedPurposes.includes(p) ? "bg-teal/10 text-teal border-teal/30" : "bg-muted text-muted-foreground border-border"}`}>
                    {selectedPurposes.includes(p) ? "☑" : "☐"} {p}
                  </span>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                By continuing, you agree to our <a href={policyUrl} className="text-teal underline">Privacy Policy</a>. You may withdraw consent at any time. Style: <strong className="text-navy">{style}</strong> · Language: <strong className="text-navy">{language}</strong>
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <button className="btn-teal text-xs">Accept Selected</button>
                <button className="btn-teal-outline text-xs">Accept All</button>
                <button className="text-xs px-4 py-2 rounded-md border border-border text-navy font-semibold hover:bg-muted">Reject All</button>
              </div>
            </div>
            <button onClick={() => setShowEmbed(true)} className="btn-teal w-full">
              <Code className="w-4 h-4" /> Embed Code
            </button>
          </div>
        </section>
      )}

      {tab === "audit" && (
        <section className="card-cn-active p-5">
          <div className="overflow-x-auto -mx-5">
            <table className="w-full text-sm min-w-[720px]">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                  <th className="font-semibold py-2 px-5">Timestamp</th>
                  <th className="font-semibold py-2 px-2">Event</th>
                  <th className="font-semibold py-2 px-2">Data Subject</th>
                  <th className="font-semibold py-2 px-5">Details</th>
                </tr>
              </thead>
              <tbody>
                {auditLog.map((l, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/40">
                    <td className="py-3 px-5 text-muted-foreground text-xs whitespace-nowrap">{l.ts}</td>
                    <td className="py-3 px-2"><span className="pill bg-teal/10 text-teal border-teal/30">{l.event}</span></td>
                    <td className="py-3 px-2 text-navy text-xs">{l.subject}</td>
                    <td className="py-3 px-5 text-muted-foreground text-xs">{l.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Record slide-over */}
      {view && (
        <div className="fixed inset-0 z-50 flex" onClick={() => setView(null)}>
          <div className="flex-1 bg-black/50" />
          <div className="w-full max-w-xl bg-white h-full overflow-y-auto p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-teal font-semibold">Consent Record</p>
                <h2 className="text-lg text-navy font-mono">{view.id}</h2>
              </div>
              <button onClick={() => setView(null)} className="text-muted-foreground hover:text-navy"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4 text-sm">
              <KV label="Data Subject" value={mask(view.email)} />
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">Consent text presented</p>
                <p className="card-cn p-3 text-navy text-sm leading-relaxed">
                  "I agree that {orgName} may process my personal data for the following purpose(s): <strong>{view.purpose}</strong>. I understand I may withdraw this consent at any time by contacting the DPO at {dpoEmail}."
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <KV label="Timestamp" value={view.date} />
                <KV label="IP Address" value="102.88.xxx.xxx" />
                <KV label="Notice Version" value={view.version} />
                <KV label="Status" value={view.status} />
              </div>
              <KV label="Purposes consented" value={view.purpose} />
              {view.status === "Withdrawn" && (
                <div className="card-cn p-3 bg-amber/5 border-amber/30">
                  <p className="text-xs uppercase tracking-wider text-amber font-semibold mb-1">Withdrawal History</p>
                  <p className="text-sm text-navy">Withdrawn on Apr 16, 2026 via email request.</p>
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => { toast("Withdrawal recorded"); setView(null); }} className="flex-1 px-4 py-2.5 rounded-md border-2 border-coral text-coral font-semibold text-sm hover:bg-coral hover:text-white transition-colors">
                Record Withdrawal
              </button>
              <button onClick={() => toast.success("Record exported")} className="btn-teal flex-1">Export Record</button>
            </div>
          </div>
        </div>
      )}

      {/* Embed code modal */}
      {showEmbed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowEmbed(false)}>
          <div className="bg-white rounded-lg w-full max-w-xl p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-lg text-navy">Embed Code</h2>
              <button onClick={() => setShowEmbed(false)} className="text-muted-foreground hover:text-navy"><X className="w-5 h-5" /></button>
            </div>
            <pre className="bg-navy text-white text-xs p-4 rounded-md overflow-x-auto leading-relaxed font-mono">{embedCode}</pre>
            <button
              onClick={() => { navigator.clipboard?.writeText(embedCode); toast.success("Embed code copied"); }}
              className="btn-teal w-full mt-4"
            >
              <Copy className="w-4 h-4" /> Copy Embed Code
            </button>
          </div>
        </div>
      )}

      <FormStyles />
    </div>
  );
};

const Stat = ({ label, value, tone }: { label: string; value: string; tone: "navy" | "success" | "amber" | "teal" }) => {
  const tc = { navy: "bg-navy text-white", success: "bg-success text-white", amber: "bg-amber text-white", teal: "bg-teal text-white" }[tone];
  return (
    <div className="card-cn-active p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-md flex items-center justify-center font-bold text-sm ${tc}`}>{value.length > 4 ? <span className="text-xs">{value}</span> : value}</div>
      <p className="text-sm font-semibold text-navy">{label}</p>
    </div>
  );
};

const KV = ({ label, value }: { label: string; value: string }) => (
  <div><p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{label}</p><p className="text-navy font-medium mt-0.5">{value}</p></div>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div><label className="block text-sm font-semibold text-navy mb-1.5">{label}</label>{children}</div>
);

const FormStyles = () => (
  <style>{`.input-cn{width:100%;padding:.625rem .875rem;border:1px solid hsl(var(--border));border-radius:.375rem;background:white;font-size:.875rem;color:hsl(var(--navy));outline:none;transition:border-color .15s,box-shadow .15s}.input-cn:focus{border-color:hsl(var(--teal));box-shadow:0 0 0 3px hsl(var(--teal)/.15)}`}</style>
);

export default Consent;
