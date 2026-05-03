import { useState } from "react";
import { toast } from "sonner";
import { ChevronDown, ChevronUp, CheckCircle2, AlertTriangle, XCircle, Download, X, Package } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";

type Status = "complete" | "partial" | "missing";

const statusBadge = (s: Status) => {
  if (s === "complete") return <span className="pill bg-success/10 text-success border-success/30"><CheckCircle2 className="w-3 h-3" /> Complete</span>;
  if (s === "partial") return <span className="pill bg-amber/10 text-amber border-amber/30"><AlertTriangle className="w-3 h-3" /> Needs Completion</span>;
  return <span className="pill bg-coral/10 text-coral border-coral/30"><XCircle className="w-3 h-3" /> Not Started</span>;
};

const Insurance = () => {
  usePageTitle("Breach Insurance Readiness");
  const [open, setOpen] = useState<number | null>(3);
  const [showPackage, setShowPackage] = useState(false);
  const score = 71;

  // Section 3 form state
  const [containment, setContainment] = useState("");
  const [systems, setSystems] = useState("");
  const [staffNotified, setStaffNotified] = useState<"Yes" | "No" | "">("");
  const [staffDate, setStaffDate] = useState("");
  const [forensics, setForensics] = useState<"Yes" | "No" | "">("");
  const [forensicsFirm, setForensicsFirm] = useState("");
  const [forensicsDate, setForensicsDate] = useState("");
  const [cost, setCost] = useState("");

  // Section 4 form state
  const [encryption, setEncryption] = useState<"Yes" | "No" | "">("");
  const [accessControls, setAccessControls] = useState<"Yes" | "No" | "">("");
  const [pentest, setPentest] = useState<"Yes" | "No" | "">("");
  const [pentestDate, setPentestDate] = useState("");
  const [pentestProvider, setPentestProvider] = useState("");

  const toggle = (i: number) => setOpen(open === i ? null : i);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl text-navy">Breach Insurance Readiness</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Pre-build the evidence documentation insurers require when filing a cyber insurance claim after a data breach.
        </p>
      </div>

      {/* Top score */}
      <section className="rounded-lg bg-teal text-white p-8 text-center shadow-md">
        <p className="text-xs uppercase tracking-widest font-bold opacity-80">Insurance Readiness Score</p>
        <p className="text-5xl font-bold mt-2 tabular-nums">{score} <span className="text-2xl opacity-70">/ 100</span></p>
        <p className="text-sm mt-3 opacity-90 max-w-xl mx-auto">
          Your documentation is partially ready. Complete 3 more sections to reach claim-ready status.
        </p>
        <div className="h-2 rounded-full bg-white/20 overflow-hidden mt-5 max-w-xl mx-auto">
          <div className="h-full bg-white transition-all" style={{ width: `${score}%` }} />
        </div>
      </section>

      <div className="space-y-3">
        {/* Section 1 */}
        <div className="card-cn-active overflow-hidden">
          <button onClick={() => toggle(1)} className="w-full flex items-center justify-between p-5 hover:bg-muted/30">
            <div className="flex items-center gap-4 text-left">
              <span className="w-8 h-8 rounded-md bg-success/10 text-success flex items-center justify-center font-bold text-sm">1</span>
              <div>
                <h3 className="text-navy font-semibold">Incident Documentation</h3>
                <div className="mt-1">{statusBadge("complete")}</div>
              </div>
            </div>
            {open === 1 ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
          </button>
          {open === 1 && (
            <div className="px-5 pb-5 pt-1 border-t border-border space-y-3">
              <p className="text-sm text-navy">1 incident recorded · <strong>BR-2026-001</strong> · Jan 15, 2026 · 340 affected subjects · Resolved</p>
              <div className="card-cn p-3 bg-teal/5 border-teal/30 text-xs text-navy leading-relaxed">
                <strong>Insurer requirement:</strong> incident timeline, discovery date, containment date, affected record count.
              </div>
              <p className="text-xs text-success font-semibold">✓ All fields present</p>
            </div>
          )}
        </div>

        {/* Section 2 */}
        <div className="card-cn-active overflow-hidden">
          <button onClick={() => toggle(2)} className="w-full flex items-center justify-between p-5 hover:bg-muted/30">
            <div className="flex items-center gap-4 text-left">
              <span className="w-8 h-8 rounded-md bg-success/10 text-success flex items-center justify-center font-bold text-sm">2</span>
              <div>
                <h3 className="text-navy font-semibold">Notification Proof</h3>
                <div className="mt-1">{statusBadge("complete")}</div>
              </div>
            </div>
            {open === 2 ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
          </button>
          {open === 2 && (
            <div className="px-5 pb-5 pt-1 border-t border-border space-y-3">
              <div className="text-sm text-navy space-y-1">
                <p>NDPC notification submitted: <strong>Jan 16, 2026</strong> (within 72-hour window)</p>
                <p>Affected data subjects notified: <strong>Jan 18, 2026</strong></p>
              </div>
              <div className="card-cn p-3 bg-teal/5 border-teal/30 text-xs text-navy leading-relaxed">
                <strong>Insurer requirement:</strong> proof of regulatory notification within statutory window.
              </div>
              <p className="text-xs text-success font-semibold">✓ Notification on record</p>
              <button className="btn-teal-outline text-xs">View Notification Record</button>
            </div>
          )}
        </div>

        {/* Section 3 */}
        <div className="card-cn-active overflow-hidden">
          <button onClick={() => toggle(3)} className="w-full flex items-center justify-between p-5 hover:bg-muted/30">
            <div className="flex items-center gap-4 text-left">
              <span className="w-8 h-8 rounded-md bg-amber/10 text-amber flex items-center justify-center font-bold text-sm">3</span>
              <div>
                <h3 className="text-navy font-semibold">Mitigation Actions</h3>
                <div className="mt-1">{statusBadge("partial")}</div>
              </div>
            </div>
            {open === 3 ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
          </button>
          {open === 3 && (
            <div className="px-5 pb-5 pt-1 border-t border-border space-y-4">
              <div className="card-cn p-3 bg-amber/5 border-amber/30 text-xs text-navy leading-relaxed">
                <strong>Insurer requirement:</strong> document specific technical and organizational measures taken after the breach.
              </div>
              <Field label="Immediate containment steps taken">
                <textarea rows={2} className="input-cn resize-none" value={containment} onChange={(e) => setContainment(e.target.value)} placeholder="e.g. Revoked API keys, isolated affected server…" />
              </Field>
              <Field label="Systems patched or secured">
                <textarea rows={2} className="input-cn resize-none" value={systems} onChange={(e) => setSystems(e.target.value)} placeholder="e.g. Patched CVE-2026-XXX on auth service…" />
              </Field>
              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Staff notified and retrained?">
                  <YesNo value={staffNotified} set={setStaffNotified} />
                  {staffNotified === "Yes" && <input type="date" className="input-cn mt-2" value={staffDate} onChange={(e) => setStaffDate(e.target.value)} />}
                </Field>
                <Field label="Third-party forensics engaged?">
                  <YesNo value={forensics} set={setForensics} />
                </Field>
              </div>
              {forensics === "Yes" && (
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field label="Firm name"><input className="input-cn" value={forensicsFirm} onChange={(e) => setForensicsFirm(e.target.value)} /></Field>
                  <Field label="Report date"><input type="date" className="input-cn" value={forensicsDate} onChange={(e) => setForensicsDate(e.target.value)} /></Field>
                </div>
              )}
              <Field label="Estimated cost of remediation (optional)">
                <input type="number" className="input-cn" value={cost} onChange={(e) => setCost(e.target.value)} placeholder="₦" />
              </Field>
              <button onClick={() => toast.success("Mitigation record saved")} className="btn-teal">Save Mitigation Record</button>
            </div>
          )}
        </div>

        {/* Section 4 */}
        <div className="card-cn-active overflow-hidden">
          <button onClick={() => toggle(4)} className="w-full flex items-center justify-between p-5 hover:bg-muted/30">
            <div className="flex items-center gap-4 text-left">
              <span className="w-8 h-8 rounded-md bg-coral/10 text-coral flex items-center justify-center font-bold text-sm">4</span>
              <div>
                <h3 className="text-navy font-semibold">Security Posture Evidence</h3>
                <div className="mt-1">{statusBadge("missing")}</div>
              </div>
            </div>
            {open === 4 ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
          </button>
          {open === 4 && (
            <div className="px-5 pb-5 pt-1 border-t border-border space-y-4">
              <div className="card-cn p-3 bg-coral/5 border-coral/30 text-xs text-navy leading-relaxed">
                <strong>Insurer requirement:</strong> evidence of pre-breach security measures — insurers use this to assess whether the organization met reasonable security standards.
              </div>
              <Field label="Encryption policy in place?"><YesNo value={encryption} set={setEncryption} /></Field>
              <Field label="Staff data protection training completed?">
                <div className="card-cn p-3 bg-success/5 border-success/30 text-sm text-navy">
                  ✓ <strong>Yes</strong> — auto-filled: 7/12 staff, last updated Apr 16
                </div>
              </Field>
              <Field label="Access controls documented?"><YesNo value={accessControls} set={setAccessControls} /></Field>
              <Field label="Penetration test or security audit in last 12 months?">
                <YesNo value={pentest} set={setPentest} />
                {pentest === "Yes" && (
                  <div className="grid sm:grid-cols-2 gap-3 mt-2">
                    <input type="date" className="input-cn" value={pentestDate} onChange={(e) => setPentestDate(e.target.value)} />
                    <input className="input-cn" placeholder="Provider" value={pentestProvider} onChange={(e) => setPentestProvider(e.target.value)} />
                  </div>
                )}
              </Field>
              <Field label="Privacy policy published?">
                <div className="card-cn p-3 bg-success/5 border-success/30 text-sm text-navy">
                  ✓ <strong>Yes</strong> — auto-filled: v2.1, Apr 2026
                </div>
              </Field>
              <button onClick={() => toast.success("Security posture saved")} className="btn-teal">Save Security Posture</button>
            </div>
          )}
        </div>
      </div>

      {/* Claim Package */}
      <section className="rounded-lg bg-teal text-white p-6 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold">Claim Package Generator</h3>
            <p className="text-sm opacity-90 mt-1">When you need to file a claim, generate a complete evidence package in one click.</p>
          </div>
          <button onClick={() => setShowPackage(true)} className="bg-white text-teal font-semibold px-5 py-2.5 rounded-md hover:bg-white/90 transition-colors inline-flex items-center gap-2">
            <Package className="w-4 h-4" /> Generate Claim Package
          </button>
        </div>
      </section>

      {showPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowPackage(false)}>
          <div className="bg-white rounded-lg w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-lg text-navy">Claim Package Contents</h2>
              <button onClick={() => setShowPackage(false)} className="text-muted-foreground hover:text-navy"><X className="w-5 h-5" /></button>
            </div>
            <ul className="space-y-2 text-sm">
              {[
                "Incident timeline (from Breach Response module)",
                "NDPC notification proof (from Breach Response module)",
                "Affected records count and categories",
                "Mitigation actions documentation",
                "Staff training certificates (from Training module)",
                "Published privacy policy (from Policy Generator)",
              ].map((i) => (
                <li key={i} className="flex items-start gap-2 text-navy">
                  <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" /> {i}
                </li>
              ))}
              <li className="flex items-start gap-2 text-coral font-semibold">
                <XCircle className="w-4 h-4 shrink-0 mt-0.5" /> Security posture evidence — INCOMPLETE
              </li>
            </ul>
            <button disabled className="mt-5 w-full px-5 py-2.5 rounded-md bg-muted text-muted-foreground font-semibold text-sm cursor-not-allowed inline-flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> Download Package
            </button>
            <p className="text-xs text-muted-foreground mt-2 text-center">Complete Section 4 to enable full package download</p>
          </div>
        </div>
      )}

      <FormStyles />
    </div>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div><label className="block text-sm font-semibold text-navy mb-1.5">{label}</label>{children}</div>
);

const YesNo = ({ value, set }: { value: "Yes" | "No" | ""; set: (v: "Yes" | "No") => void }) => (
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

export default Insurance;
