import { useState } from "react";
import { Check, Download, Sparkles } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";

const dataTypeOptions = [
  "Names & contact details",
  "Financial data",
  "Health/medical data",
  "Biometric data",
  "Children's data (under 18)",
  "Location data",
  "Employment records",
];

const accessOptions = ["Internal staff", "Third-party processors", "External partners", "Public"];

const risks = [
  { risk: "Unauthorized access", likelihood: "Medium", severity: "High", mitigation: "Encryption at rest and in transit" },
  { risk: "Data minimization failure", likelihood: "Low", severity: "Medium", mitigation: "Collect only stated fields" },
  { risk: "Retention beyond limit", likelihood: "Medium", severity: "Medium", mitigation: "Automated deletion policy" },
];

const checklist = [
  "Lawful basis identified (Section 25)",
  "Data subject rights procedure in place (Section 34–38)",
  "Processor agreement in place if applicable (Section 43)",
  "Retention period defined (Section 26)",
  "Security measures documented (Section 39)",
];

const sevClass = (v: string) => {
  if (v === "High") return "text-coral font-semibold";
  if (v === "Medium") return "text-amber font-semibold";
  return "text-success font-semibold";
};

const DPIA = () => {
  usePageTitle("DPIA Generator");
  const [name, setName] = useState("");
  const [dataTypes, setDataTypes] = useState<string[]>([]);
  const [purpose, setPurpose] = useState("");
  const [access, setAccess] = useState<string[]>([]);
  const [retention, setRetention] = useState("");
  const [generated, setGenerated] = useState(false);

  const toggle = (arr: string[], setArr: (v: string[]) => void, v: string) =>
    setArr(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl text-navy">Data Protection Impact Assessment Generator</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Required by NDPA before deploying high-risk data processing activities.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Intake */}
        <section className="card-cn-active p-6">
          <h2 className="text-lg text-navy mb-4">New DPIA</h2>
          <div className="space-y-5">
            <Field label="Q1. Name of product or feature">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-cn"
                placeholder="e.g. Instant Loan Pre-Approval"
              />
            </Field>

            <Field label="Q2. Personal data processed">
              <div className="grid sm:grid-cols-2 gap-2">
                {dataTypeOptions.map((opt) => (
                  <CheckCard
                    key={opt}
                    label={opt}
                    checked={dataTypes.includes(opt)}
                    onClick={() => toggle(dataTypes, setDataTypes, opt)}
                  />
                ))}
              </div>
            </Field>

            <Field label="Q3. Purpose of processing">
              <textarea
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                rows={4}
                maxLength={1200}
                className="input-cn resize-none"
                placeholder="Describe the purpose (max 150 words)…"
              />
              <p className="text-xs text-muted-foreground mt-1">{purpose.split(/\s+/).filter(Boolean).length} / 150 words</p>
            </Field>

            <Field label="Q4. Who will have access?">
              <div className="grid sm:grid-cols-2 gap-2">
                {accessOptions.map((opt) => (
                  <CheckCard
                    key={opt}
                    label={opt}
                    checked={access.includes(opt)}
                    onClick={() => toggle(access, setAccess, opt)}
                  />
                ))}
              </div>
            </Field>

            <Field label="Q5. Retention period">
              <select value={retention} onChange={(e) => setRetention(e.target.value)} className="input-cn">
                <option value="">Select retention…</option>
                {["Less than 1 year", "1–3 years", "3–7 years", "Indefinitely"].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </Field>

            <button onClick={() => setGenerated(true)} className="btn-teal w-full">
              <Sparkles className="w-4 h-4" /> Generate DPIA
            </button>
          </div>
        </section>

        {/* Output */}
        <section className="card-cn-active p-6">
          {!generated ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 text-muted-foreground">
              <div className="w-14 h-14 rounded-md bg-teal/10 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-teal" />
              </div>
              <p className="text-sm">Complete the form and click <span className="text-navy font-semibold">Generate DPIA</span> to see your assessment.</p>
            </div>
          ) : (
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <h2 className="text-lg text-navy">DPIA Report — {name || "New Feature"}</h2>
              </div>
              <p className="text-xs text-muted-foreground">{today}</p>

              <div className="mt-5 space-y-5 text-sm">
                <Block n={1} title="Processing Activity Description">
                  This DPIA covers <strong className="text-navy">{name || "the new feature"}</strong>, which will process{" "}
                  {dataTypes.length ? dataTypes.join(", ").toLowerCase() : "personal data"} for the stated purpose:{" "}
                  <em>{purpose || "(not provided)"}</em>. Access will be granted to{" "}
                  {access.length ? access.join(", ").toLowerCase() : "designated parties"}, with a retention period of{" "}
                  {retention || "the period defined in policy"}.
                </Block>

                <Block n={2} title="Necessity & Proportionality Assessment">
                  Processing is necessary for the stated purpose and proportionate where collection is limited to fields directly
                  required. Less intrusive alternatives have been considered and ruled out.
                </Block>

                <div>
                  <SectionHeader n={3} title="Risk Identification" />
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border border-border rounded-md overflow-hidden">
                      <thead className="bg-muted/60">
                        <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                          <th className="font-semibold py-2.5 px-3">Risk</th>
                          <th className="font-semibold py-2.5 px-3">Likelihood</th>
                          <th className="font-semibold py-2.5 px-3">Severity</th>
                          <th className="font-semibold py-2.5 px-3">Mitigation</th>
                        </tr>
                      </thead>
                      <tbody>
                        {risks.map((r) => (
                          <tr key={r.risk} className="border-t border-border">
                            <td className="py-2.5 px-3 text-navy font-medium">{r.risk}</td>
                            <td className={`py-2.5 px-3 ${sevClass(r.likelihood)}`}>{r.likelihood}</td>
                            <td className={`py-2.5 px-3 ${sevClass(r.severity)}`}>{r.severity}</td>
                            <td className="py-2.5 px-3 text-muted-foreground">{r.mitigation}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <SectionHeader n={4} title="NDPA Compliance Checklist" />
                  <ul className="space-y-2">
                    {checklist.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-navy">
                        <span className="w-5 h-5 rounded bg-teal flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 text-white" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <SectionHeader n={5} title="Recommendation" />
                  <div className="p-4 rounded-md bg-amber/10 border border-amber/30 text-navy font-semibold">
                    PROCEED WITH CONDITIONS — implement mitigations before launch
                  </div>
                </div>

                <button className="btn-teal-outline w-full">
                  <Download className="w-4 h-4" /> Download DPIA as PDF
                </button>
              </div>
            </div>
          )}
        </section>
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
    </div>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="block text-sm font-semibold text-navy mb-2">{label}</label>
    {children}
  </div>
);

const CheckCard = ({ label, checked, onClick }: { label: string; checked: boolean; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-2 rounded-md border text-sm text-left transition-colors ${
      checked ? "border-teal bg-teal/5 text-navy" : "border-border bg-white text-navy hover:border-teal"
    }`}
  >
    <span className={`w-4 h-4 rounded border flex items-center justify-center ${checked ? "bg-teal border-teal" : "border-border"}`}>
      {checked && <Check className="w-3 h-3 text-white" />}
    </span>
    {label}
  </button>
);

const SectionHeader = ({ n, title }: { n: number; title: string }) => (
  <h3 className="text-sm font-bold text-navy mb-2">
    <span className="text-teal mr-2">{n}.</span>
    {title}
  </h3>
);

const Block = ({ n, title, children }: { n: number; title: string; children: React.ReactNode }) => (
  <div>
    <SectionHeader n={n} title={title} />
    <p className="text-muted-foreground leading-relaxed">{children}</p>
  </div>
);

export default DPIA;
