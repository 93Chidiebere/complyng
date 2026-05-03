import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Upload } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useAuth } from "@/state/AuthContext";
import { WizardShell, WizardNav, WField, WCheckCard, WPill, WRow } from "@/components/OnboardWizard";

const expertiseOptions = ["NDPA 2023", "GDPR", "ISO 27701", "DPIAs", "Breach Response", "Vendor Due Diligence", "Staff Training", "Sector-Specific (Fintech)", "Sector-Specific (Health)"];
const availabilityOptions = ["Part-time (10–20 hrs/wk)", "Full-time (40+ hrs/wk)", "Project-based"];

const ConsultantOnboard = () => {
  usePageTitle("Consultant Network Onboarding");
  const navigate = useNavigate();
  const { completeProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [f, setF] = useState({
    fullName: "", email: "", phone: "", linkedin: "",
    licenseNo: "", licenseFile: "",
    yearsExperience: "", expertise: [] as string[],
    availability: "", rate: "",
    languages: [] as string[],
    bio: "", agree: false,
  });
  const u = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) => setF((s) => ({ ...s, [k]: v }));
  const toggle = (key: "expertise" | "languages", v: string) =>
    setF((s) => ({ ...s, [key]: s[key].includes(v) ? s[key].filter((x) => x !== v) : [...s[key], v] }));

  return (
    <WizardShell brandLabel="Consultants" backHref="/dashboard/managed-service" backLabel="← Back to Managed Service" step={step} totalSteps={4}>
      {step === 1 && (
        <div>
          <h2 className="text-2xl text-navy">Consultant Profile</h2>
          <p className="text-muted-foreground mt-1 text-sm">Join the ComplyNG managed-service consultant network.</p>
          <div className="mt-6 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <WField label="Full name"><input className="input-cn" value={f.fullName} onChange={(e) => u("fullName", e.target.value)} placeholder="e.g. Adaeze Chukwu" /></WField>
              <WField label="Phone"><input className="input-cn" value={f.phone} onChange={(e) => u("phone", e.target.value)} placeholder="+234…" /></WField>
            </div>
            <WField label="Email"><input type="email" className="input-cn" value={f.email} onChange={(e) => u("email", e.target.value)} placeholder="you@email.com" /></WField>
            <WField label="LinkedIn URL"><input className="input-cn" value={f.linkedin} onChange={(e) => u("linkedin", e.target.value)} placeholder="https://linkedin.com/in/…" /></WField>
            <WField label="Short bio (max 280 chars)">
              <textarea rows={3} maxLength={280} className="input-cn resize-none" value={f.bio}
                onChange={(e) => u("bio", e.target.value)} placeholder="Briefly describe your background and approach…" />
            </WField>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-2xl text-navy">Credentials</h2>
          <p className="text-muted-foreground mt-1 text-sm">All consultants must hold a valid NDPC DPCO license.</p>
          <div className="mt-6 space-y-5">
            <WField label="DPCO License number">
              <input className="input-cn" value={f.licenseNo} onChange={(e) => u("licenseNo", e.target.value)} placeholder="DPCO/2024/XXXX" />
            </WField>
            <WField label="Upload license & certifications">
              <label className="block border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-teal transition-colors cursor-pointer">
                <Upload className="w-7 h-7 mx-auto text-teal" />
                <p className="mt-2 font-medium text-navy text-sm">Drop PDFs or click to upload</p>
                <p className="text-xs text-muted-foreground mt-1">PDFs up to 10MB</p>
                <input type="file" multiple accept="application/pdf" className="hidden" />
              </label>
            </WField>
            <WField label="Years of experience">
              <div className="flex flex-wrap gap-3">
                {["1–3 yrs", "4–7 yrs", "8–12 yrs", "13+ yrs"].map((y) => (
                  <WPill key={y} label={y} active={f.yearsExperience === y} onClick={() => u("yearsExperience", y)} />
                ))}
              </div>
            </WField>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-2xl text-navy">Expertise & Availability</h2>
          <p className="text-muted-foreground mt-1 text-sm">We match consultants to clients based on these.</p>
          <div className="mt-6 space-y-6">
            <WField label="Areas of expertise">
              <div className="grid sm:grid-cols-2 gap-2">
                {expertiseOptions.map((o) => <WCheckCard key={o} label={o} checked={f.expertise.includes(o)} onClick={() => toggle("expertise", o)} />)}
              </div>
            </WField>
            <WField label="Availability">
              <div className="flex flex-wrap gap-3">
                {availabilityOptions.map((a) => <WPill key={a} label={a} active={f.availability === a} onClick={() => u("availability", a)} />)}
              </div>
            </WField>
            <div className="grid sm:grid-cols-2 gap-4">
              <WField label="Hourly rate (₦)">
                <input className="input-cn" value={f.rate} onChange={(e) => u("rate", e.target.value)} placeholder="e.g. 25000" />
              </WField>
              <WField label="Languages">
                <div className="flex flex-wrap gap-2">
                  {["English", "Yoruba", "Igbo", "Hausa", "French"].map((l) => (
                    <button key={l} type="button" onClick={() => toggle("languages", l)}
                      className={`px-3 py-1.5 rounded-md border text-sm transition-colors ${f.languages.includes(l) ? "bg-teal border-teal text-white" : "bg-white border-border text-navy hover:border-teal"}`}>{l}</button>
                  ))}
                </div>
              </WField>
            </div>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="text-2xl text-navy">Review & Apply</h2>
          <p className="text-muted-foreground mt-1 text-sm">Submit your application to the network.</p>
          <div className="mt-6 card-cn p-5 bg-muted/40 space-y-3 text-sm">
            <WRow label="Consultant" value={f.fullName || "—"} />
            <WRow label="Email" value={f.email || "—"} />
            <WRow label="DPCO License" value={f.licenseNo || "—"} />
            <WRow label="Experience" value={f.yearsExperience || "—"} />
            <WRow label="Expertise" value={f.expertise.join(", ") || "—"} />
            <WRow label="Availability" value={f.availability || "—"} />
            <WRow label="Rate" value={f.rate ? `₦${f.rate}/hr` : "—"} />
            <WRow label="Languages" value={f.languages.join(", ") || "—"} />
          </div>
          <label className="mt-4 flex items-start gap-2 cursor-pointer">
            <input type="checkbox" checked={f.agree} onChange={(e) => u("agree", e.target.checked)} className="w-4 h-4 accent-teal mt-0.5" />
            <span className="text-sm text-navy">I agree to the ComplyNG Consultant Network Code of Conduct and confidentiality terms.</span>
          </label>
          <div className="mt-8 text-center">
            <button onClick={() => { setSubmitting(true); completeProfile(); setTimeout(() => navigate("/dashboard/managed-service"), 1800); }}
              disabled={submitting || !f.agree} className="btn-teal text-base px-8 py-3 disabled:opacity-50">
              {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting application…</> : "Apply to Network"}
            </button>
            <p className="text-xs text-muted-foreground mt-2">Applications reviewed within 3–5 business days.</p>
          </div>
        </div>
      )}

      {step < 4 && <WizardNav onBack={() => setStep((s) => s - 1)} onNext={() => setStep((s) => s + 1)} backDisabled={step === 1} />}
    </WizardShell>
  );
};

export default ConsultantOnboard;
