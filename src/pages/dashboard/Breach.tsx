import { useEffect, useState } from "react";
import { AlertTriangle, Copy, CheckCircle2, ChevronRight } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";

const incidentTypes = [
  "Unauthorized access to personal data",
  "Accidental disclosure to wrong recipient",
  "Ransomware / system compromise",
  "Lost or stolen device containing personal data",
  "Third-party processor breach",
  "Other",
];

const dataCategories = [
  "Names & contact details",
  "Financial data",
  "Health/medical data",
  "Biometric data",
  "Children's data (under 18)",
  "Location data",
  "Employment records",
];

const Breach = () => {
  usePageTitle("Breach Response");
  const [active, setActive] = useState(false);
  const [step, setStep] = useState(1);
  const [discoveredAt, setDiscoveredAt] = useState<Date | null>(null);
  const [now, setNow] = useState(Date.now());

  // Step 1
  const [type, setType] = useState("");
  const [discoveredInput, setDiscoveredInput] = useState("");
  const [description, setDescription] = useState("");

  // Step 2
  const [affected, setAffected] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [hasChildren, setHasChildren] = useState<"yes" | "no" | "">("");
  const [hasFinHealth, setHasFinHealth] = useState<"yes" | "no" | "">("");
  const [contained, setContained] = useState<"yes" | "no" | "">("");

  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [measures1, setMeasures1] = useState("");
  const [measures2, setMeasures2] = useState("");

  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [active]);

  const startBreach = () => {
    const d = new Date();
    setDiscoveredAt(d);
    setDiscoveredInput(d.toISOString().slice(0, 16));
    setActive(true);
    setStep(1);
    setSubmitted(false);
  };

  const remaining = () => {
    if (!discoveredAt) return { h: 0, m: 0, s: 0, over: false };
    const elapsed = now - discoveredAt.getTime();
    const total = 72 * 3600 * 1000 - elapsed;
    if (total <= 0) return { h: 0, m: 0, s: 0, over: true };
    const h = Math.floor(total / 3600000);
    const m = Math.floor((total % 3600000) / 60000);
    const s = Math.floor((total % 60000) / 1000);
    return { h, m, s, over: false };
  };
  const r = remaining();
  const pad = (n: number) => String(n).padStart(2, "0");

  const highRisk = (hasFinHealth === "yes" || hasChildren === "yes") && contained !== "yes";
  const riskLabel = highRisk
    ? "HIGH RISK — Immediate NDPC notification required"
    : "MEDIUM RISK — NDPC notification required within 72 hours";

  const toggleCat = (c: string) => setCategories((p) => p.includes(c) ? p.filter((x) => x !== c) : [...p, c]);

  const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const draftText = `NDPC DATA BREACH NOTIFICATION

Submitted by: [Organization Name]
Date of notification: ${today}
Date breach discovered: ${discoveredAt ? discoveredAt.toLocaleString("en-GB") : "—"}
Nature of breach: ${type || "—"}
Personal data categories affected: ${categories.length ? categories.join(", ") : "—"}
Estimated number of data subjects: ${affected || "—"}
Risk level: ${highRisk ? "HIGH" : "MEDIUM"}

Measures taken to address the breach: ${measures1 || "[to be completed]"}
Measures taken to mitigate effects: ${measures2 || "[to be completed]"}

DPO contact: dpo@[company].com`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(draftText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl text-navy">Breach Incident Response</h1>
        <p className="text-muted-foreground text-sm mt-1">
          NDPA Section 40 — notify NDPC within 72 hours of becoming aware of a breach.
        </p>
      </div>

      {/* Timer */}
      <section className={`card-cn-active p-6 ${active ? (r.over ? "bg-coral/5" : "bg-amber/5") : ""}`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="text-center md:text-left">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              {active ? (r.over ? "Notification window EXPIRED" : "Time remaining to notify NDPC") : "No active breach"}
            </p>
            <div className={`font-mono font-extrabold tracking-tight text-5xl md:text-6xl mt-2 ${active ? (r.over ? "text-coral" : "text-amber") : "text-navy/40"}`}>
              {active ? `${pad(r.h)}:${pad(r.m)}:${pad(r.s)}` : "00:00:00"}
            </div>
            {active && discoveredAt && (
              <p className="text-xs text-muted-foreground mt-2">Discovered {discoveredAt.toLocaleString("en-GB")}</p>
            )}
          </div>
          {!active && (
            <button onClick={startBreach} className="inline-flex items-center justify-center gap-2 bg-coral text-white font-semibold px-6 py-3 rounded-md hover:bg-coral/90 transition-colors">
              <AlertTriangle className="w-5 h-5" /> Report a Breach
            </button>
          )}
          {active && submitted && (
            <span className="pill bg-success/10 text-success border-success/30">Submitted to NDPC</span>
          )}
        </div>
      </section>

      {/* Workflow */}
      {active && !submitted && (
        <section className="card-cn-active p-6">
          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${i <= step ? "bg-teal text-white" : "bg-muted text-muted-foreground"}`}>{i}</div>
                {i < 3 && <div className={`w-12 h-0.5 ${i < step ? "bg-teal" : "bg-border"}`} />}
              </div>
            ))}
            <span className="ml-3 text-sm text-muted-foreground">
              {step === 1 ? "Incident Classification" : step === 2 ? "Impact Assessment" : "NDPC Notification Draft"}
            </span>
          </div>

          {step === 1 && (
            <div className="space-y-5">
              <Field label="What happened?">
                <div className="space-y-2">
                  {incidentTypes.map((t) => (
                    <label key={t} className={`flex items-center gap-3 p-3 rounded-md border cursor-pointer text-sm transition-colors ${type === t ? "border-teal bg-teal/5" : "border-border hover:border-teal"}`}>
                      <input type="radio" name="type" checked={type === t} onChange={() => setType(t)} className="accent-teal" />
                      <span className="text-navy">{t}</span>
                    </label>
                  ))}
                </div>
              </Field>
              <Field label="Date/time discovered">
                <input type="datetime-local" value={discoveredInput} onChange={(e) => { setDiscoveredInput(e.target.value); setDiscoveredAt(new Date(e.target.value)); }} className="input-cn" />
              </Field>
              <Field label="Brief description">
                <textarea rows={3} className="input-cn resize-none" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What happened, who's affected, how was it detected…" />
              </Field>
              <div className="flex justify-end">
                <button onClick={() => setStep(2)} className="btn-teal text-sm">Next <ChevronRight className="w-4 h-4" /></button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <Field label="Estimated number of affected data subjects">
                <input type="number" value={affected} onChange={(e) => setAffected(e.target.value)} className="input-cn" placeholder="0" />
              </Field>
              <Field label="Categories of data affected">
                <div className="grid sm:grid-cols-2 gap-2">
                  {dataCategories.map((c) => (
                    <button key={c} type="button" onClick={() => toggleCat(c)} className={`flex items-center gap-2 px-3 py-2 rounded-md border text-sm text-left transition-colors ${categories.includes(c) ? "border-teal bg-teal/5" : "border-border hover:border-teal"}`}>
                      <span className={`w-4 h-4 rounded border flex items-center justify-center ${categories.includes(c) ? "bg-teal border-teal" : "border-border"}`}>
                        {categories.includes(c) && <CheckCircle2 className="w-3 h-3 text-white" />}
                      </span>
                      {c}
                    </button>
                  ))}
                </div>
              </Field>
              <YesNo label="Is children's data involved?" value={hasChildren} onChange={setHasChildren} />
              <YesNo label="Is financial or health data involved?" value={hasFinHealth} onChange={setHasFinHealth} />
              <YesNo label="Has the breach been contained?" value={contained} onChange={setContained} />

              {(hasFinHealth || hasChildren || contained) && (
                <div className={`p-4 rounded-md border ${highRisk ? "bg-coral/10 border-coral/30 text-coral" : "bg-amber/10 border-amber/30 text-amber"} font-semibold`}>
                  Risk to data subjects: {riskLabel}
                </div>
              )}

              <div className="flex justify-between">
                <button onClick={() => setStep(1)} className="text-sm text-muted-foreground hover:text-navy">← Back</button>
                <button onClick={() => setStep(3)} className="btn-teal text-sm">Next <ChevronRight className="w-4 h-4" /></button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">Pre-filled NDPC notification</p>
              <div className="card-cn-active p-5 whitespace-pre-wrap text-sm leading-relaxed text-navy bg-teal/5">{draftText}</div>

              <div className="mt-5 grid sm:grid-cols-2 gap-4">
                <Field label="Measures taken to address the breach">
                  <textarea rows={3} className="input-cn resize-none" value={measures1} onChange={(e) => setMeasures1(e.target.value)} placeholder="e.g. Revoked tokens, rotated keys…" />
                </Field>
                <Field label="Measures taken to mitigate effects">
                  <textarea rows={3} className="input-cn resize-none" value={measures2} onChange={(e) => setMeasures2(e.target.value)} placeholder="e.g. Notified affected users…" />
                </Field>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button onClick={copy} className="btn-teal-outline text-sm flex-1">
                  {copied ? <><CheckCircle2 className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy Notification Text</>}
                </button>
                <button onClick={() => setSubmitted(true)} className="btn-teal text-sm flex-1">Mark as Submitted to NDPC</button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Breach history */}
      <section className="card-cn-active p-6">
        <h2 className="text-lg text-navy mb-4">Breach History</h2>
        <div className="overflow-x-auto -mx-6">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="font-semibold py-3 px-6">Reference</th>
                <th className="font-semibold py-3 px-3">Type</th>
                <th className="font-semibold py-3 px-3">Date</th>
                <th className="font-semibold py-3 px-3">Affected Subjects</th>
                <th className="font-semibold py-3 px-6">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border last:border-0 hover:bg-muted/40">
                <td className="py-3.5 px-6 font-mono text-xs text-navy">BR-2026-001</td>
                <td className="py-3.5 px-3 text-navy">Unauthorized access</td>
                <td className="py-3.5 px-3 text-muted-foreground">Jan 15, 2026</td>
                <td className="py-3.5 px-3 text-navy font-medium">340</td>
                <td className="py-3.5 px-6"><span className="pill bg-success/10 text-success border-success/30">Resolved</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <style>{`.input-cn{width:100%;padding:.625rem .875rem;border:1px solid hsl(var(--border));border-radius:.375rem;background:white;font-size:.875rem;color:hsl(var(--navy));outline:none;transition:border-color .15s,box-shadow .15s}.input-cn:focus{border-color:hsl(var(--teal));box-shadow:0 0 0 3px hsl(var(--teal)/.15)}`}</style>
    </div>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div><label className="block text-sm font-semibold text-navy mb-2">{label}</label>{children}</div>
);

const YesNo = ({ label, value, onChange }: { label: string; value: string; onChange: (v: "yes" | "no") => void }) => (
  <Field label={label}>
    <div className="flex gap-3">
      {(["yes", "no"] as const).map((v) => (
        <button key={v} type="button" onClick={() => onChange(v)} className={`px-5 py-2 rounded-md border text-sm font-medium capitalize transition-colors ${value === v ? "bg-teal border-teal text-white" : "bg-white border-border text-navy hover:border-teal"}`}>{v}</button>
      ))}
    </div>
  </Field>
);

export default Breach;
