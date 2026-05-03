import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Check, Upload, ChevronRight, ChevronLeft, Loader2 } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useAuth } from "@/state/AuthContext";

type FormState = {
  orgName: string;
  industry: string;
  employees: string;
  collectsData: "yes" | "no" | "";
  dataTypes: string[];
  purposes: string[];
  usesVendors: "yes" | "no" | "";
  vendors: string[];
  hasPolicy: boolean;
  policyText: string;
};

const dataTypeOptions = [
  "Names & contact details",
  "Financial data",
  "Health/medical data",
  "Biometric data",
  "Children's data (under 18)",
  "Location data",
  "Employment records",
];

const purposeOptions = [
  "Service delivery",
  "Marketing",
  "HR/payroll processing",
  "Analytics",
  "Credit scoring",
  "Other",
];

const Onboard = () => {
  usePageTitle("Onboarding");
  const navigate = useNavigate();
  const { completeProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [analyzing, setAnalyzing] = useState(false);
  const [form, setForm] = useState<FormState>({
    orgName: "",
    industry: "",
    employees: "",
    collectsData: "",
    dataTypes: [],
    purposes: [],
    usesVendors: "",
    vendors: ["", "", ""],
    hasPolicy: false,
    policyText: "",
  });

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleArray = (key: "dataTypes" | "purposes", value: string) => {
    setForm((f) => ({
      ...f,
      [key]: f[key].includes(value) ? f[key].filter((v) => v !== value) : [...f[key], value],
    }));
  };

  const next = () => setStep((s) => Math.min(4, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  return (
    <Layout>
      <div className="container py-12 max-w-3xl">
        {/* Stepper */}
        <div className="mb-8">
          <p className="text-sm text-teal font-semibold mb-3">Step {step} of 4</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`flex-1 h-1.5 rounded-full ${
                  i <= step ? "bg-teal" : "bg-border"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="card-cn-active p-8">
          {step === 1 && (
            <div>
              <h2 className="text-2xl text-navy">Organization Profile</h2>
              <p className="text-muted-foreground mt-1 text-sm">Tell us about your organization.</p>

              <div className="mt-6 space-y-5">
                <Field label="Organization name">
                  <input
                    type="text"
                    value={form.orgName}
                    onChange={(e) => update("orgName", e.target.value)}
                    className="input-cn"
                    placeholder="e.g. Paystack Ltd"
                  />
                </Field>
                <Field label="Industry">
                  <select
                    value={form.industry}
                    onChange={(e) => update("industry", e.target.value)}
                    className="input-cn"
                  >
                    <option value="">Select industry…</option>
                    {["Fintech", "Edtech", "Healthtech", "HR/Payroll Platform", "E-commerce", "Other"].map((i) => (
                      <option key={i}>{i}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Employee count">
                  <select
                    value={form.employees}
                    onChange={(e) => update("employees", e.target.value)}
                    className="input-cn"
                  >
                    <option value="">Select range…</option>
                    {["1–10", "11–50", "51–200", "200+"].map((i) => (
                      <option key={i}>{i}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Does your organization collect personal data from Nigerian residents?">
                  <div className="flex gap-3">
                    {(["yes", "no"] as const).map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => update("collectsData", v)}
                        className={`px-5 py-2 rounded-md border text-sm font-medium capitalize transition-colors ${
                          form.collectsData === v
                            ? "bg-teal border-teal text-white"
                            : "bg-white border-border text-navy hover:border-teal"
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl text-navy">Data Inventory</h2>
              <p className="text-muted-foreground mt-1 text-sm">Map what data you handle.</p>

              <div className="mt-6 space-y-6">
                <Field label="What types of personal data do you collect?">
                  <div className="grid sm:grid-cols-2 gap-2">
                    {dataTypeOptions.map((opt) => (
                      <CheckCard
                        key={opt}
                        label={opt}
                        checked={form.dataTypes.includes(opt)}
                        onClick={() => toggleArray("dataTypes", opt)}
                      />
                    ))}
                  </div>
                </Field>

                <Field label="What is the primary purpose of data collection?">
                  <div className="grid sm:grid-cols-2 gap-2">
                    {purposeOptions.map((opt) => (
                      <CheckCard
                        key={opt}
                        label={opt}
                        checked={form.purposes.includes(opt)}
                        onClick={() => toggleArray("purposes", opt)}
                      />
                    ))}
                  </div>
                </Field>

                <Field label="Do you use third-party vendors who process data on your behalf?">
                  <div className="flex gap-3">
                    {(["yes", "no"] as const).map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => update("usesVendors", v)}
                        className={`px-5 py-2 rounded-md border text-sm font-medium capitalize transition-colors ${
                          form.usesVendors === v
                            ? "bg-teal border-teal text-white"
                            : "bg-white border-border text-navy hover:border-teal"
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </Field>

                {form.usesVendors === "yes" && (
                  <Field label="List up to 3 vendor names">
                    <div className="space-y-2">
                      {form.vendors.map((v, idx) => (
                        <input
                          key={idx}
                          type="text"
                          value={v}
                          placeholder={`Vendor ${idx + 1}`}
                          onChange={(e) => {
                            const next = [...form.vendors];
                            next[idx] = e.target.value;
                            update("vendors", next);
                          }}
                          className="input-cn"
                        />
                      ))}
                    </div>
                  </Field>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl text-navy">Privacy Policy Upload</h2>
              <p className="text-muted-foreground mt-1 text-sm">
                Your policy will be analyzed against NDPA 2023 sections.
              </p>

              <div className="mt-6">
                <label className="block border-2 border-dashed border-border rounded-lg p-10 text-center hover:border-teal transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto text-teal" />
                  <p className="mt-3 font-medium text-navy">Drop a PDF or click to upload</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF up to 10MB</p>
                  <input type="file" accept="application/pdf" className="hidden" />
                </label>

                <div className="my-4 text-center text-xs text-muted-foreground">— or paste text —</div>

                <textarea
                  value={form.policyText}
                  onChange={(e) => update("policyText", e.target.value)}
                  rows={5}
                  placeholder="Paste your privacy policy text here…"
                  className="input-cn resize-none"
                />

                <label className="mt-4 flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.hasPolicy}
                    onChange={(e) => update("hasPolicy", e.target.checked)}
                    className="w-4 h-4 accent-teal"
                  />
                  <span className="text-sm text-navy">We don't have a privacy policy yet</span>
                </label>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-2xl text-navy">Review & Analyze</h2>
              <p className="text-muted-foreground mt-1 text-sm">Confirm details and run the audit.</p>

              <div className="mt-6 card-cn p-5 bg-muted/40 space-y-3 text-sm">
                <Row label="Organization" value={form.orgName || "—"} />
                <Row label="Industry" value={form.industry || "—"} />
                <Row label="Employees" value={form.employees || "—"} />
                <Row label="Collects Nigerian data" value={form.collectsData || "—"} />
                <Row label="Data types" value={form.dataTypes.join(", ") || "—"} />
                <Row label="Purposes" value={form.purposes.join(", ") || "—"} />
                <Row
                  label="Vendors"
                  value={
                    form.usesVendors === "yes"
                      ? form.vendors.filter(Boolean).join(", ") || "—"
                      : "None"
                  }
                />
                <Row
                  label="Policy"
                  value={form.hasPolicy ? "Not yet created" : form.policyText ? "Pasted text provided" : "Pending upload"}
                />
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={() => {
                    setAnalyzing(true);
                    completeProfile();
                    setTimeout(() => navigate("/audit"), 2000);
                  }}
                  disabled={analyzing}
                  className="btn-teal text-base px-8 py-3 disabled:opacity-80"
                >
                  {analyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Analyzing your privacy policy against NDPA 2023…
                    </>
                  ) : (
                    "Run Compliance Audit"
                  )}
                </button>
                <p className="text-xs text-muted-foreground mt-2">Analysis takes 15–30 seconds</p>
              </div>
            </div>
          )}

          {/* Nav buttons */}
          {step < 4 && (
            <div className="mt-8 pt-6 border-t border-border flex justify-between">
              <button
                onClick={back}
                disabled={step === 1}
                className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-navy disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button onClick={next} className="btn-teal text-sm">
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .input-cn {
          width: 100%;
          padding: 0.625rem 0.875rem;
          border: 1px solid hsl(var(--border));
          border-radius: 0.375rem;
          background: white;
          font-size: 0.875rem;
          color: hsl(var(--navy));
          outline: none;
          transition: border-color .15s, box-shadow .15s;
        }
        .input-cn:focus {
          border-color: hsl(var(--teal));
          box-shadow: 0 0 0 3px hsl(var(--teal) / 0.15);
        }
      `}</style>
    </Layout>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="block text-sm font-semibold text-navy mb-2">{label}</label>
    {children}
  </div>
);

const CheckCard = ({
  label,
  checked,
  onClick,
}: {
  label: string;
  checked: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-2.5 rounded-md border text-sm text-left transition-colors ${
      checked ? "border-teal bg-teal/5 text-navy" : "border-border bg-white text-navy hover:border-teal"
    }`}
  >
    <span
      className={`w-4 h-4 rounded border flex items-center justify-center ${
        checked ? "bg-teal border-teal" : "border-border"
      }`}
    >
      {checked && <Check className="w-3 h-3 text-white" />}
    </span>
    {label}
  </button>
);

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between gap-4">
    <span className="text-muted-foreground">{label}</span>
    <span className="text-navy font-medium text-right capitalize">{value}</span>
  </div>
);

export default Onboard;
