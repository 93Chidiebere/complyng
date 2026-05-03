import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useAuth } from "@/state/AuthContext";
import { WizardShell, WizardNav, WField, WCheckCard, WPill, WRow } from "@/components/OnboardWizard";

const sectorOptions = ["Fintech", "Healthtech", "Edtech", "E-commerce", "Logistics", "AgriTech", "SaaS / Enterprise", "Web3"];
const stageOptions = ["Pre-seed", "Seed", "Series A", "Series B+", "Growth / PE"];
const goalsOptions = [
  "One-off due diligence assessment",
  "Ongoing portfolio monitoring",
  "Pre-investment red-flag screening",
  "LP reporting on ESG/data risk",
];

const InvestorOnboard = () => {
  usePageTitle("Investor Onboarding");
  const navigate = useNavigate();
  const { completeProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [f, setF] = useState({
    fullName: "", firmName: "", role: "", email: "",
    investorType: "", aum: "",
    sectors: [] as string[], stages: [] as string[],
    portfolioSize: "",
    goals: [] as string[], plan: "subscription", agree: false,
  });
  const u = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) => setF((s) => ({ ...s, [k]: v }));
  const toggle = (key: "sectors" | "stages" | "goals", v: string) =>
    setF((s) => ({ ...s, [key]: s[key].includes(v) ? s[key].filter((x) => x !== v) : [...s[key], v] }));

  return (
    <WizardShell brandLabel="Investors" backHref="/investor" backLabel="← Back" step={step} totalSteps={4}>
      {step === 1 && (
        <div>
          <h2 className="text-2xl text-navy">Investor Profile</h2>
          <p className="text-muted-foreground mt-1 text-sm">Tell us about you and your firm.</p>
          <div className="mt-6 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <WField label="Full name"><input className="input-cn" value={f.fullName} onChange={(e) => u("fullName", e.target.value)} placeholder="e.g. Tunde Bakare" /></WField>
              <WField label="Role"><input className="input-cn" value={f.role} onChange={(e) => u("role", e.target.value)} placeholder="e.g. Partner, Principal" /></WField>
            </div>
            <WField label="Firm name"><input className="input-cn" value={f.firmName} onChange={(e) => u("firmName", e.target.value)} placeholder="e.g. Lagos Ventures" /></WField>
            <WField label="Work email"><input type="email" className="input-cn" value={f.email} onChange={(e) => u("email", e.target.value)} placeholder="you@firm.com" /></WField>
            <WField label="Investor type">
              <div className="flex flex-wrap gap-3">
                {["Angel", "VC", "PE", "Family Office", "Corporate VC"].map((t) => (
                  <WPill key={t} label={t} active={f.investorType === t} onClick={() => u("investorType", t)} />
                ))}
              </div>
            </WField>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-2xl text-navy">Fund & Portfolio</h2>
          <p className="text-muted-foreground mt-1 text-sm">Helps us tailor your dashboard.</p>
          <div className="mt-6 space-y-6">
            <WField label="Assets under management">
              <select className="input-cn" value={f.aum} onChange={(e) => u("aum", e.target.value)}>
                <option value="">Select…</option>
                {["< $1M", "$1M – $10M", "$10M – $50M", "$50M – $250M", "$250M+"].map((a) => <option key={a}>{a}</option>)}
              </select>
            </WField>
            <WField label="Portfolio size (number of active investments)">
              <div className="flex flex-wrap gap-3">
                {["0–5", "6–15", "16–40", "40+"].map((v) => <WPill key={v} label={v} active={f.portfolioSize === v} onClick={() => u("portfolioSize", v)} />)}
              </div>
            </WField>
            <WField label="Sectors of interest">
              <div className="grid sm:grid-cols-2 gap-2">
                {sectorOptions.map((o) => <WCheckCard key={o} label={o} checked={f.sectors.includes(o)} onClick={() => toggle("sectors", o)} />)}
              </div>
            </WField>
            <WField label="Stages of interest">
              <div className="flex flex-wrap gap-3">
                {stageOptions.map((s) => (
                  <button key={s} type="button" onClick={() => toggle("stages", s)}
                    className={`px-4 py-2 rounded-md border text-sm transition-colors ${f.stages.includes(s) ? "bg-teal border-teal text-white" : "bg-white border-border text-navy hover:border-teal"}`}>{s}</button>
                ))}
              </div>
            </WField>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-2xl text-navy">Goals & Plan</h2>
          <p className="text-muted-foreground mt-1 text-sm">What do you want from ComplyNG Investor Intelligence?</p>
          <div className="mt-6 space-y-6">
            <WField label="Primary goals (select all that apply)">
              <div className="grid sm:grid-cols-2 gap-2">
                {goalsOptions.map((g) => <WCheckCard key={g} label={g} checked={f.goals.includes(g)} onClick={() => toggle("goals", g)} />)}
              </div>
            </WField>
            <WField label="Choose a plan">
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { id: "assessment", title: "Per-Assessment", price: "₦150,000", text: "Single deep-dive risk report" },
                  { id: "subscription", title: "Portfolio Subscription", price: "₦450,000/mo", text: "Continuous monitoring + alerts for up to 25 companies" },
                ].map((p) => (
                  <button key={p.id} type="button" onClick={() => u("plan", p.id)}
                    className={`text-left p-4 rounded-md border-2 transition-colors ${f.plan === p.id ? "border-teal bg-teal/5" : "border-border bg-white hover:border-teal"}`}>
                    <p className="font-semibold text-navy">{p.title}</p>
                    <p className="text-teal font-bold text-sm mt-1">{p.price}</p>
                    <p className="text-xs text-muted-foreground mt-1">{p.text}</p>
                  </button>
                ))}
              </div>
            </WField>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="text-2xl text-navy">Review & Activate</h2>
          <p className="text-muted-foreground mt-1 text-sm">Confirm and access your investor dashboard.</p>
          <div className="mt-6 card-cn p-5 bg-muted/40 space-y-3 text-sm">
            <WRow label="Name" value={f.fullName || "—"} />
            <WRow label="Firm" value={f.firmName || "—"} />
            <WRow label="Type" value={f.investorType || "—"} />
            <WRow label="AUM" value={f.aum || "—"} />
            <WRow label="Portfolio" value={f.portfolioSize || "—"} />
            <WRow label="Sectors" value={f.sectors.join(", ") || "—"} />
            <WRow label="Stages" value={f.stages.join(", ") || "—"} />
            <WRow label="Goals" value={f.goals.join(", ") || "—"} />
            <WRow label="Plan" value={f.plan === "assessment" ? "Per-Assessment" : "Portfolio Subscription"} />
          </div>
          <label className="mt-4 flex items-start gap-2 cursor-pointer">
            <input type="checkbox" checked={f.agree} onChange={(e) => u("agree", e.target.checked)} className="w-4 h-4 accent-teal mt-0.5" />
            <span className="text-sm text-navy">I agree to the ComplyNG Investor Terms and confidentiality covenant.</span>
          </label>
          <div className="mt-8 text-center">
            <button onClick={() => { setSubmitting(true); completeProfile(); setTimeout(() => navigate("/investor/dashboard"), 1500); }}
              disabled={submitting || !f.agree} className="btn-teal text-base px-8 py-3 disabled:opacity-50">
              {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Provisioning your dashboard…</> : "Activate Investor Access"}
            </button>
          </div>
        </div>
      )}

      {step < 4 && <WizardNav onBack={() => setStep((s) => s - 1)} onNext={() => setStep((s) => s + 1)} backDisabled={step === 1} />}
    </WizardShell>
  );
};

export default InvestorOnboard;
