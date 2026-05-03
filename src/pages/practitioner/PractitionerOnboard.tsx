import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Upload } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useAuth } from "@/state/AuthContext";
import { WizardShell, WizardNav, WField, WCheckCard, WPill, WRow } from "@/components/OnboardWizard";

const specialtyOptions = ["Fintech", "Healthtech", "Edtech", "E-commerce", "HR/Payroll", "Government", "NGO/Non-profit", "Telecoms"];
const planOptions = [
  { id: "solo", title: "Solo Practitioner", price: "₦25,000/mo", text: "Up to 10 clients" },
  { id: "firm", title: "Firm", price: "₦75,000/mo", text: "Up to 50 clients" },
  { id: "enterprise", title: "Enterprise", price: "Custom", text: "Unlimited clients + white-label" },
];

const PractitionerOnboard = () => {
  usePageTitle("Practitioner Onboarding");
  const navigate = useNavigate();
  const { completeProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [f, setF] = useState({
    fullName: "", firmName: "", email: "", phone: "",
    licenseNo: "", licenseExpiry: "", yearsExperience: "",
    specialties: [] as string[], currentClients: "",
    plan: "firm", agree: false,
  });
  const u = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) => setF((s) => ({ ...s, [k]: v }));
  const toggleSpec = (v: string) =>
    setF((s) => ({ ...s, specialties: s.specialties.includes(v) ? s.specialties.filter((x) => x !== v) : [...s.specialties, v] }));

  return (
    <WizardShell brandLabel="Practitioners" backHref="/practitioner" backLabel="← Back" step={step} totalSteps={4}>
      {step === 1 && (
        <div>
          <h2 className="text-2xl text-navy">Practitioner Profile</h2>
          <p className="text-muted-foreground mt-1 text-sm">Tell us about you and your firm.</p>
          <div className="mt-6 space-y-5">
            <WField label="Full name"><input className="input-cn" value={f.fullName} onChange={(e) => u("fullName", e.target.value)} placeholder="e.g. Adaeze Chukwu" /></WField>
            <WField label="Firm / practice name"><input className="input-cn" value={f.firmName} onChange={(e) => u("firmName", e.target.value)} placeholder="e.g. Chukwu Privacy Advisory" /></WField>
            <div className="grid sm:grid-cols-2 gap-4">
              <WField label="Email"><input type="email" className="input-cn" value={f.email} onChange={(e) => u("email", e.target.value)} placeholder="you@firm.com" /></WField>
              <WField label="Phone"><input className="input-cn" value={f.phone} onChange={(e) => u("phone", e.target.value)} placeholder="+234…" /></WField>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-2xl text-navy">NDPC License Verification</h2>
          <p className="text-muted-foreground mt-1 text-sm">Required to operate as a Data Protection Compliance Organisation.</p>
          <div className="mt-6 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <WField label="DPCO License number"><input className="input-cn" value={f.licenseNo} onChange={(e) => u("licenseNo", e.target.value)} placeholder="DPCO/2024/XXXX" /></WField>
              <WField label="License expiry"><input type="date" className="input-cn" value={f.licenseExpiry} onChange={(e) => u("licenseExpiry", e.target.value)} /></WField>
            </div>
            <WField label="Upload license certificate">
              <label className="block border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-teal transition-colors cursor-pointer">
                <Upload className="w-7 h-7 mx-auto text-teal" />
                <p className="mt-2 font-medium text-navy text-sm">Drop a PDF or click to upload</p>
                <p className="text-xs text-muted-foreground mt-1">PDF up to 5MB</p>
                <input type="file" accept="application/pdf" className="hidden" />
              </label>
            </WField>
            <WField label="Years of practice">
              <select className="input-cn" value={f.yearsExperience} onChange={(e) => u("yearsExperience", e.target.value)}>
                <option value="">Select…</option>
                {["<1 year", "1–3 years", "4–7 years", "8+ years"].map((y) => <option key={y}>{y}</option>)}
              </select>
            </WField>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-2xl text-navy">Practice Details</h2>
          <p className="text-muted-foreground mt-1 text-sm">Help us match you with the right clients.</p>
          <div className="mt-6 space-y-6">
            <WField label="Industry specialties (select all that apply)">
              <div className="grid sm:grid-cols-2 gap-2">
                {specialtyOptions.map((o) => <WCheckCard key={o} label={o} checked={f.specialties.includes(o)} onClick={() => toggleSpec(o)} />)}
              </div>
            </WField>
            <WField label="How many active clients do you currently manage?">
              <div className="flex flex-wrap gap-3">
                {["0", "1–5", "6–15", "16–50", "50+"].map((v) => <WPill key={v} label={v} active={f.currentClients === v} onClick={() => u("currentClients", v)} />)}
              </div>
            </WField>
            <WField label="Choose a plan">
              <div className="grid md:grid-cols-3 gap-3">
                {planOptions.map((p) => (
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
          <h2 className="text-2xl text-navy">Review & Submit</h2>
          <p className="text-muted-foreground mt-1 text-sm">Confirm your application.</p>
          <div className="mt-6 card-cn p-5 bg-muted/40 space-y-3 text-sm">
            <WRow label="Practitioner" value={f.fullName || "—"} />
            <WRow label="Firm" value={f.firmName || "—"} />
            <WRow label="Email" value={f.email || "—"} />
            <WRow label="DPCO License" value={f.licenseNo || "—"} />
            <WRow label="Expiry" value={f.licenseExpiry || "—"} />
            <WRow label="Experience" value={f.yearsExperience || "—"} />
            <WRow label="Specialties" value={f.specialties.join(", ") || "—"} />
            <WRow label="Current clients" value={f.currentClients || "—"} />
            <WRow label="Plan" value={planOptions.find((p) => p.id === f.plan)?.title || "—"} />
          </div>
          <label className="mt-4 flex items-start gap-2 cursor-pointer">
            <input type="checkbox" checked={f.agree} onChange={(e) => u("agree", e.target.checked)} className="w-4 h-4 accent-teal mt-0.5" />
            <span className="text-sm text-navy">I confirm my DPCO license is valid and agree to the ComplyNG Practitioner Terms.</span>
          </label>
          <div className="mt-8 text-center">
            <button onClick={() => { setSubmitting(true); completeProfile(); setTimeout(() => navigate("/practitioner/dashboard"), 1800); }}
              disabled={submitting || !f.agree} className="btn-teal text-base px-8 py-3 disabled:opacity-50">
              {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Verifying license…</> : "Submit Application"}
            </button>
            <p className="text-xs text-muted-foreground mt-2">Verification typically takes 1–2 business days.</p>
          </div>
        </div>
      )}

      {step < 4 && <WizardNav onBack={() => setStep((s) => s - 1)} onNext={() => setStep((s) => s + 1)} backDisabled={step === 1} />}
    </WizardShell>
  );
};

export default PractitionerOnboard;
