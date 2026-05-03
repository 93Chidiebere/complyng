import { useState } from "react";
import { toast } from "sonner";
import { X, Plus, Check, Globe, Download } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";

type Risk = "None" | "Low" | "Medium" | "High";
type Row = {
  vendor: string;
  data: string;
  country: string;
  adequate: boolean | null; // null = domestic
  safeguard: string | null;
  risk: Risk;
};

const adequateCountries = ["United Kingdom", "European Union / EEA", "South Africa", "Rwanda", "Mauritius", "Senegal", "Nigeria"];

const initialRows: Row[] = [
  { vendor: "Paystack", data: "Payment data, transaction records", country: "Nigeria (domestic)", adequate: null, safeguard: null, risk: "None" },
  { vendor: "AWS (Amazon)", data: "All platform data (cloud hosting)", country: "United States", adequate: false, safeguard: "Standard Contractual Clauses", risk: "Medium" },
  { vendor: "Google Workspace", data: "Email, documents, contacts", country: "United States", adequate: false, safeguard: null, risk: "High" },
  { vendor: "Termii", data: "Phone numbers, SMS logs", country: "Nigeria (domestic)", adequate: null, safeguard: null, risk: "None" },
  { vendor: "Intercom", data: "Support tickets, user profiles", country: "United States", adequate: false, safeguard: null, risk: "High" },
  { vendor: "Zoho CRM", data: "Customer names, emails, interactions", country: "India", adequate: false, safeguard: "Standard Contractual Clauses", risk: "Medium" },
];

const adequacyBadge = (adequate: boolean | null) => {
  if (adequate === null) return <span className="text-xs text-muted-foreground">N/A — domestic</span>;
  if (adequate) return <span className="pill bg-success/10 text-success border-success/30">✓ Adequate</span>;
  return <span className="pill bg-coral/10 text-coral border-coral/30">✗ Not adequate</span>;
};

const safeguardBadge = (s: string | null) => {
  if (s === null) return <span className="text-xs text-muted-foreground">N/A</span>;
  if (s === "") return <span className="pill bg-coral/10 text-coral border-coral/30">✗ No safeguard</span>;
  return <span className="text-xs text-navy">{s}</span>;
};

const riskBadge = (r: Risk) => {
  if (r === "None") return <span className="pill bg-success/10 text-success border-success/30">✓ None</span>;
  if (r === "Low") return <span className="pill bg-success/10 text-success border-success/30">Low</span>;
  if (r === "Medium") return <span className="pill bg-amber/10 text-amber border-amber/30">🟡 Medium</span>;
  return <span className="pill bg-coral/10 text-coral border-coral/30">🔴 High</span>;
};

const safeguards = [
  {
    key: "scc",
    title: "Standard Contractual Clauses (SCCs)",
    desc: "Pre-approved contractual terms that bind the recipient to NDPA-equivalent data protection standards. Recommended for most commercial vendors.",
    btn: "Download SCC Template",
    icon: Download,
    steps: [
      "Download the NDPC-aligned SCC template",
      "Send to vendor for counter-signature",
      "Attach signed copy to vendor record in Vendor Tracker",
      "Set annual review reminder",
    ],
  },
  {
    key: "bcr",
    title: "Binding Corporate Rules (BCRs)",
    desc: "Applies where the vendor is part of the same corporate group. Requires NDPC approval. Suitable for intra-group transfers only.",
    btn: "Learn More",
    icon: Globe,
    steps: [
      "Confirm vendor is part of same corporate group",
      "Draft BCR document covering all group entities",
      "Submit to NDPC for approval (3–6 months)",
      "Publish approved BCRs internally",
    ],
  },
  {
    key: "consent",
    title: "Explicit Consent",
    desc: "Where the data subject has been explicitly informed that their data will be transferred to the destination country and has consented. Only viable for small-scale, non-systematic transfers.",
    btn: "Record Consent Basis",
    icon: Check,
    steps: [
      "Update privacy notice to disclose destination country",
      "Add explicit transfer-consent checkbox to capture flow",
      "Log each consent record with timestamp & version",
      "Provide easy withdrawal mechanism",
    ],
  },
];

const Transfers = () => {
  usePageTitle("Data Transfer Assessor");
  const [rows, setRows] = useState<Row[]>(initialRows);
  const [showAdd, setShowAdd] = useState(false);
  const [safeguardFor, setSafeguardFor] = useState<string | null>(null);
  const [picked, setPicked] = useState<string | null>(null);

  // add form state
  const [vName, setVName] = useState("");
  const [vCountry, setVCountry] = useState("United States");
  const [vScc, setVScc] = useState<"Yes" | "No">("No");
  const [vDpa, setVDpa] = useState<"Yes" | "No">("No");
  const [vData, setVData] = useState("Customer profiles");

  const submitAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const isDomestic = vCountry.toLowerCase().includes("nigeria");
    const isAdequate = adequateCountries.some((c) => c.toLowerCase() === vCountry.toLowerCase());
    let risk: Risk = "Low";
    let safeguard: string | null = null;
    if (isDomestic) { risk = "None"; safeguard = null; }
    else if (isAdequate) { risk = "Low"; safeguard = "Adequacy"; }
    else if (vScc === "Yes") { risk = "Medium"; safeguard = "Standard Contractual Clauses"; }
    else { risk = "High"; safeguard = ""; }

    setRows((r) => [...r, {
      vendor: vName,
      data: vData,
      country: isDomestic ? "Nigeria (domestic)" : vCountry,
      adequate: isDomestic ? null : isAdequate,
      safeguard,
      risk,
    }]);
    setShowAdd(false);
    setVName("");
    toast.success(`${vName} assessed: ${risk} risk`);
  };

  const applySafeguard = () => {
    if (!safeguardFor || !picked) return;
    const label = safeguards.find((s) => s.key === picked)!.title;
    setRows((rs) => rs.map((r) => r.vendor === safeguardFor ? { ...r, safeguard: label, risk: "Medium" as Risk } : r));
    toast.success(`Safeguard implemented for ${safeguardFor}`);
    setSafeguardFor(null);
    setPicked(null);
  };

  const totals = {
    total: rows.length,
    permitted: rows.filter((r) => r.risk === "None" || r.risk === "Low").length,
    needs: rows.filter((r) => r.risk === "Medium").length,
    nonCompliant: rows.filter((r) => r.risk === "High").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl text-navy">Cross-Border Data Transfer Assessor</h1>
          <p className="text-muted-foreground text-sm mt-1">
            NDPA Section 44 restricts transfers of personal data outside Nigeria — assess every vendor and tool you use.
          </p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn-teal text-sm">
          <Plus className="w-4 h-4" /> Add Vendor for Assessment
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Total Vendors Assessed" value={String(totals.total)} tone="navy" />
        <Stat label="Transfers Permitted" value={String(totals.permitted)} tone="success" />
        <Stat label="Requires Safeguards" value={String(totals.needs)} tone="amber" />
        <Stat label="Non-Compliant" value={String(totals.nonCompliant)} tone="coral" />
      </div>

      {/* Adequacy banner */}
      <section className="card-cn p-5 bg-navy/5 border-navy/20">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <p className="text-sm font-bold text-navy">NDPC Adequacy List</p>
          <p className="text-xs text-muted-foreground">Last updated: March 2026</p>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Countries with adequate data protection laws (transfers permitted without additional safeguards):
        </p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {["United Kingdom", "European Union / EEA", "South Africa", "Rwanda", "Mauritius", "Senegal"].map((c) => (
            <span key={c} className="pill bg-teal/10 text-teal border-teal/30">{c}</span>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          All other countries require appropriate safeguards before personal data can be transferred.
          {" "}<a href="#" className="text-teal font-semibold hover:underline">View Full NDPC Guidance →</a>
        </p>
      </section>

      {/* Table */}
      <section className="card-cn-active p-5">
        <div className="overflow-x-auto -mx-5">
          <table className="w-full text-sm min-w-[960px]">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="font-semibold py-3 px-5">Vendor</th>
                <th className="font-semibold py-3 px-2">Data Transferred</th>
                <th className="font-semibold py-3 px-2">Destination</th>
                <th className="font-semibold py-3 px-2">Adequacy</th>
                <th className="font-semibold py-3 px-2">Safeguard</th>
                <th className="font-semibold py-3 px-2">Risk</th>
                <th className="font-semibold py-3 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.vendor} className="border-b border-border last:border-0 hover:bg-muted/40">
                  <td className="py-3 px-5 font-semibold text-navy">{r.vendor}</td>
                  <td className="py-3 px-2 text-muted-foreground text-xs">{r.data}</td>
                  <td className="py-3 px-2 text-navy text-xs">{r.country}</td>
                  <td className="py-3 px-2">{adequacyBadge(r.adequate)}</td>
                  <td className="py-3 px-2">{safeguardBadge(r.safeguard)}</td>
                  <td className="py-3 px-2">{riskBadge(r.risk)}</td>
                  <td className="py-3 px-5 text-right">
                    {r.risk === "High" ? (
                      <button onClick={() => { setSafeguardFor(r.vendor); setPicked(null); }} className="text-xs font-semibold text-coral hover:underline">
                        Add Safeguard
                      </button>
                    ) : (
                      <button onClick={() => toast(`Viewing ${r.vendor}`)} className="text-xs font-semibold text-teal hover:underline">
                        View
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Add vendor modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowAdd(false)}>
          <div className="bg-white rounded-lg w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-lg text-navy">Assess New Vendor Transfer</h2>
              <button onClick={() => setShowAdd(false)} className="text-muted-foreground hover:text-navy"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={submitAdd} className="space-y-3">
              <Field label="Vendor name"><input className="input-cn" required value={vName} onChange={(e) => setVName(e.target.value)} placeholder="e.g. Mailgun" /></Field>
              <Field label="What personal data is transferred?">
                <select className="input-cn" value={vData} onChange={(e) => setVData(e.target.value)}>
                  {["Customer profiles", "Email addresses", "Phone numbers", "Payment data", "Health data", "Location data"].map((d) => <option key={d}>{d}</option>)}
                </select>
              </Field>
              <Field label="Destination country">
                <select className="input-cn" value={vCountry} onChange={(e) => setVCountry(e.target.value)}>
                  {[...adequateCountries, "United States", "India", "China", "Brazil", "Canada", "Australia", "Japan", "Germany", "France", "Other"].map((c) => <option key={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Standard Contractual Clause agreement?">
                <YesNo value={vScc} set={setVScc} />
              </Field>
              <Field label="Data Processing Agreement in place?">
                <YesNo value={vDpa} set={setVDpa} />
              </Field>
              <button type="submit" className="btn-teal w-full">Assess Transfer</button>
            </form>
          </div>
        </div>
      )}

      {/* Safeguard slide-over */}
      {safeguardFor && (
        <div className="fixed inset-0 z-50 flex" onClick={() => { setSafeguardFor(null); setPicked(null); }}>
          <div className="flex-1 bg-black/50" />
          <div className="w-full max-w-xl bg-white h-full overflow-y-auto p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-teal font-semibold">Required Safeguard</p>
                <h2 className="text-lg text-navy">{safeguardFor}</h2>
              </div>
              <button onClick={() => { setSafeguardFor(null); setPicked(null); }} className="text-muted-foreground hover:text-navy"><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-3">
              {safeguards.map((s) => {
                const Icon = s.icon;
                const isPicked = picked === s.key;
                return (
                  <button
                    key={s.key}
                    onClick={() => setPicked(s.key)}
                    className={`w-full text-left card-cn p-4 transition-all ${isPicked ? "border-teal ring-2 ring-teal/30" : "hover:border-teal"}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`w-9 h-9 rounded-md flex items-center justify-center shrink-0 ${isPicked ? "bg-teal text-white" : "bg-teal/10 text-teal"}`}>
                        <Icon className="w-4 h-4" />
                      </span>
                      <div className="flex-1">
                        <h3 className="text-navy font-semibold text-sm">{s.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{s.desc}</p>
                        <span className="text-xs font-semibold text-teal mt-2 inline-block">{s.btn}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {picked && (
              <div className="mt-5 card-cn-active p-4">
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">Implementation Steps</p>
                <ul className="space-y-2">
                  {safeguards.find((s) => s.key === picked)!.steps.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm text-navy">
                      <span className="w-5 h-5 rounded-full bg-teal/10 text-teal flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={applySafeguard} className="btn-teal w-full mt-4">Mark Safeguard as Implemented</button>
              </div>
            )}
          </div>
        </div>
      )}

      <FormStyles />
    </div>
  );
};

const Stat = ({ label, value, tone }: { label: string; value: string; tone: "navy" | "success" | "amber" | "coral" }) => {
  const tc = { navy: "bg-navy text-white", success: "bg-success text-white", amber: "bg-amber text-white", coral: "bg-coral text-white" }[tone];
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

const YesNo = ({ value, set }: { value: "Yes" | "No"; set: (v: "Yes" | "No") => void }) => (
  <div className="flex gap-2">
    {(["Yes", "No"] as const).map((v) => (
      <button
        key={v}
        type="button"
        onClick={() => set(v)}
        className={`px-4 py-2 text-xs font-semibold rounded-md border transition-colors ${
          value === v ? "bg-teal text-white border-teal" : "bg-white text-navy border-border hover:border-teal"
        }`}
      >
        {v}
      </button>
    ))}
  </div>
);

const FormStyles = () => (
  <style>{`.input-cn{width:100%;padding:.625rem .875rem;border:1px solid hsl(var(--border));border-radius:.375rem;background:white;font-size:.875rem;color:hsl(var(--navy));outline:none;transition:border-color .15s,box-shadow .15s}.input-cn:focus{border-color:hsl(var(--teal));box-shadow:0 0 0 3px hsl(var(--teal)/.15)}`}</style>
);

export default Transfers;
