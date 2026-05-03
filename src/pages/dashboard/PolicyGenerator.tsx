import { useState } from "react";
import { ChevronDown, ChevronUp, FileText, Loader2, Copy, Download, RotateCcw, Save, CheckCircle2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useCompliance } from "@/state/ComplianceContext";

const dataOptions = [
  "Full name", "Email address", "Phone number", "Home/office address", "Date of birth",
  "National Identification Number (NIN)", "BVN", "Financial account details",
  "Transaction history", "Health/medical records", "Biometric data",
  "Employment records", "Location data", "Device identifiers", "Browsing behaviour",
  "Children's data (under 18)",
];
const collectionOptions = ["Directly from users", "From third parties", "Automatically via cookies/tracking", "From public sources"];
const lawfulOptions = ["Consent", "Contract performance", "Legal obligation", "Legitimate interests", "Vital interests", "Public task"];
const purposeOptions = [
  "Account creation and management", "Service delivery", "Payment processing",
  "Marketing and communications", "Analytics and product improvement", "Fraud prevention",
  "HR and payroll", "Credit scoring", "Customer support", "Legal compliance",
];
const transferRegions = ["EU/EEA", "United Kingdom", "United States", "Other African countries", "Other"];
const retentionOptions = ["Less than 1 year", "1–3 years", "3–7 years", "As required by law", "Until account deletion"];
const rightsOptions = [
  "Right of access (S.34)", "Right to rectification (S.35)", "Right to erasure (S.36)",
  "Right to restriction (S.37)", "Right to data portability (S.38)", "Right to object (S.38)",
];

const closableGapTitles = [
  "Missing data subject rights notice",
  "Retention periods not specified",
];

const PolicyGenerator = () => {
  usePageTitle("Policy Generator");
  const { resolveGaps } = useCompliance();

  // Form
  const [orgName, setOrgName] = useState("Your Organization Ltd");
  const [website, setWebsite] = useState("");
  const [dpoName, setDpoName] = useState("Adaeze Okafor");
  const [dpoEmail, setDpoEmail] = useState("dpo@yourcompany.com");
  const [address, setAddress] = useState("");

  const [dataTypes, setDataTypes] = useState<string[]>(["Full name", "Email address", "Phone number"]);
  const [collection, setCollection] = useState<string[]>(["Directly from users"]);
  const [lawful, setLawful] = useState<string[]>(["Consent", "Contract performance"]);

  const [purposes, setPurposes] = useState<string[]>(["Service delivery", "Customer support"]);
  const [automated, setAutomated] = useState<"yes" | "no">("no");
  const [shares, setShares] = useState<"yes" | "no">("no");
  const [recipients, setRecipients] = useState<{ name: string; purpose: string }[]>([
    { name: "", purpose: "" }, { name: "", purpose: "" }, { name: "", purpose: "" }, { name: "", purpose: "" },
  ]);

  const [retention, setRetention] = useState<Record<string, string>>({});
  const [transfers, setTransfers] = useState<"yes" | "no">("no");
  const [regions, setRegions] = useState<string[]>([]);
  const [rights, setRights] = useState<string[]>([...rightsOptions]);

  const [openSec, setOpenSec] = useState<"A" | "B" | "C" | "D" | null>("A");
  const toggleSec = (s: "A" | "B" | "C" | "D") => setOpenSec(openSec === s ? null : s);

  const toggle = (arr: string[], setArr: (v: string[]) => void, v: string) =>
    setArr(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  // Generation state
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [saved, setSaved] = useState(false);

  const generate = () => {
    setLoading(true);
    setSaved(false);
    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
    }, 1500);
  };

  const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  const policyText = buildPolicyText({
    orgName, website, dpoName, dpoEmail, address,
    dataTypes, collection, lawful, purposes, automated,
    shares, recipients: recipients.filter((r) => r.name.trim()),
    retention, transfers, regions, rights, today,
  });

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(policyText);
      toast.success("Policy copied to clipboard");
    } catch {
      toast.error("Could not copy");
    }
  };

  const save = () => {
    toast.success("Policy saved to your compliance record");
    setSaved(true);
  };

  const saveAndScore = () => {
    resolveGaps(closableGapTitles, 8);
    toast.success("Score updated · 2 gaps resolved");
    setSaved(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl text-navy">Privacy Policy Generator</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Generate a complete NDPA 2023-compliant privacy policy from your data inventory — ready to publish in minutes.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6 items-start">
        {/* LEFT — Form */}
        <div className="lg:col-span-2 space-y-3">
          <Section letter="A" title="About Your Organization" open={openSec === "A"} onToggle={() => toggleSec("A")}>
            <Field label="Organization legal name"><input className="input-cn" value={orgName} onChange={(e) => setOrgName(e.target.value)} /></Field>
            <Field label="Website URL"><input className="input-cn" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://…" /></Field>
            <Field label="DPO name"><input className="input-cn" value={dpoName} onChange={(e) => setDpoName(e.target.value)} /></Field>
            <Field label="DPO email"><input className="input-cn" type="email" value={dpoEmail} onChange={(e) => setDpoEmail(e.target.value)} /></Field>
            <Field label="Physical address"><textarea rows={2} className="input-cn resize-none" value={address} onChange={(e) => setAddress(e.target.value)} /></Field>
          </Section>

          <Section letter="B" title="Data You Collect" open={openSec === "B"} onToggle={() => toggleSec("B")}>
            <Field label="What personal data do you collect?">
              <CheckGrid options={dataOptions} value={dataTypes} onToggle={(v) => toggle(dataTypes, setDataTypes, v)} />
            </Field>
            <Field label="How do you collect this data?">
              <CheckGrid options={collectionOptions} value={collection} onToggle={(v) => toggle(collection, setCollection, v)} />
            </Field>
            <Field label="Lawful basis for processing">
              <CheckGrid options={lawfulOptions} value={lawful} onToggle={(v) => toggle(lawful, setLawful, v)} />
            </Field>
          </Section>

          <Section letter="C" title="How You Use the Data" open={openSec === "C"} onToggle={() => toggleSec("C")}>
            <Field label="Primary purposes">
              <CheckGrid options={purposeOptions} value={purposes} onToggle={(v) => toggle(purposes, setPurposes, v)} />
            </Field>
            <YesNo label="Automated decision-making or profiling?" value={automated} onChange={setAutomated} />
            <YesNo label="Share data with third parties?" value={shares} onChange={setShares} />
            {shares === "yes" && (
              <Field label="Recipients (up to 4)">
                <div className="space-y-2">
                  {recipients.map((r, i) => (
                    <div key={i} className="grid grid-cols-2 gap-2">
                      <input className="input-cn" placeholder={`Recipient ${i + 1} name`} value={r.name} onChange={(e) => {
                        const nx = [...recipients]; nx[i] = { ...nx[i], name: e.target.value }; setRecipients(nx);
                      }} />
                      <input className="input-cn" placeholder="Purpose" value={r.purpose} onChange={(e) => {
                        const nx = [...recipients]; nx[i] = { ...nx[i], purpose: e.target.value }; setRecipients(nx);
                      }} />
                    </div>
                  ))}
                </div>
              </Field>
            )}
          </Section>

          <Section letter="D" title="Retention & Rights" open={openSec === "D"} onToggle={() => toggleSec("D")}>
            <Field label="How long do you retain personal data? (per category)">
              {dataTypes.length === 0 ? (
                <p className="text-xs text-muted-foreground">Select data categories in Section B first.</p>
              ) : (
                <div className="space-y-2">
                  {dataTypes.map((cat) => (
                    <div key={cat} className="grid grid-cols-2 gap-2 items-center">
                      <span className="text-xs text-navy truncate">{cat}</span>
                      <select className="input-cn" value={retention[cat] || ""} onChange={(e) => setRetention({ ...retention, [cat]: e.target.value })}>
                        <option value="">Select…</option>
                        {retentionOptions.map((o) => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                </div>
              )}
            </Field>
            <YesNo label="Transfer data outside Nigeria?" value={transfers} onChange={setTransfers} />
            {transfers === "yes" && (
              <Field label="To which regions?">
                <CheckGrid options={transferRegions} value={regions} onToggle={(v) => toggle(regions, setRegions, v)} />
              </Field>
            )}
            <Field label="Data subject rights supported (pre-ticked)">
              <CheckGrid options={rightsOptions} value={rights} onToggle={(v) => toggle(rights, setRights, v)} />
            </Field>
          </Section>

          <button onClick={generate} disabled={loading} className="btn-teal w-full mt-2 disabled:opacity-80">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating…</> : <><Sparkles className="w-4 h-4" /> Generate Privacy Policy</>}
          </button>
          <p className="text-xs text-muted-foreground text-center">Generates in seconds · Aligned to NDPA 2023</p>
        </div>

        {/* RIGHT — Output */}
        <div className="lg:col-span-3 lg:sticky lg:top-6">
          {!generated && !loading && (
            <div className="border-2 border-dashed border-border rounded-lg p-12 text-center bg-muted/30">
              <div className="w-14 h-14 mx-auto rounded-md bg-teal/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-teal" />
              </div>
              <p className="mt-4 text-navy font-semibold">Your NDPA-compliant privacy policy will appear here</p>
              <p className="text-sm text-muted-foreground mt-1">Complete the form and click Generate.</p>
            </div>
          )}

          {loading && (
            <div className="border border-border rounded-lg p-12 text-center bg-card">
              <Loader2 className="w-8 h-8 mx-auto text-teal animate-spin" />
              <p className="mt-4 text-navy font-semibold">Generating your NDPA 2023-compliant policy…</p>
            </div>
          )}

          {generated && !loading && (
            <div>
              {!saved && (
                <div className="card-cn-active p-4 mb-4 bg-teal/5 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
                  <p className="text-sm text-navy">
                    <CheckCircle2 className="inline w-4 h-4 text-teal mr-1" />
                    Saving this policy will close <strong>2 gaps</strong> from your audit and improve your compliance score by <strong>+8 points</strong>.
                  </p>
                  <button onClick={saveAndScore} className="btn-teal text-sm shrink-0">Save & Update Score</button>
                </div>
              )}
              {saved && (
                <div className="card-cn-active p-4 mb-4 bg-success/5 border-success/30 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <p className="text-sm text-navy">Policy saved — 2 gaps resolved, score updated in your sidebar.</p>
                </div>
              )}

              <div className="card-cn p-8 max-h-[70vh] overflow-y-auto bg-white">
                <PolicyDocument
                  data={{
                    orgName, website, dpoName, dpoEmail, address,
                    dataTypes, collection, lawful, purposes, automated,
                    shares, recipients: recipients.filter((r) => r.name.trim()),
                    retention, transfers, regions, rights, today,
                  }}
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button onClick={copy} className="btn-teal-outline text-sm"><Copy className="w-4 h-4" /> Copy Full Policy</button>
                <button className="btn-teal-outline text-sm"><Download className="w-4 h-4" /> Download as PDF</button>
                <button onClick={generate} className="btn-teal-outline text-sm"><RotateCcw className="w-4 h-4" /> Regenerate</button>
                <button onClick={save} className="btn-teal text-sm ml-auto"><Save className="w-4 h-4" /> Save to Dashboard</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <FormStyles />
    </div>
  );
};

/* ---------- Form helpers ---------- */
const Section = ({ letter, title, open, onToggle, children }: { letter: string; title: string; open: boolean; onToggle: () => void; children: React.ReactNode }) => (
  <div className="card-cn-active overflow-hidden">
    <button onClick={onToggle} className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
      <div className="flex items-center gap-3">
        <span className="w-7 h-7 rounded-md bg-teal/10 text-teal flex items-center justify-center font-bold text-xs">{letter}</span>
        <span className="font-semibold text-navy text-sm">{title}</span>
      </div>
      {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
    </button>
    {open && <div className="px-4 pb-4 pt-1 border-t border-border space-y-4">{children}</div>}
  </div>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div><label className="block text-xs font-semibold text-navy mb-1.5">{label}</label>{children}</div>
);

const CheckGrid = ({ options, value, onToggle }: { options: string[]; value: string[]; onToggle: (v: string) => void }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
    {options.map((o) => {
      const checked = value.includes(o);
      return (
        <button key={o} type="button" onClick={() => onToggle(o)} className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md border text-xs text-left transition-colors ${checked ? "border-teal bg-teal/5 text-navy" : "border-border bg-white text-navy hover:border-teal"}`}>
          <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${checked ? "bg-teal border-teal" : "border-border"}`}>
            {checked && <CheckCircle2 className="w-2.5 h-2.5 text-white" />}
          </span>
          {o}
        </button>
      );
    })}
  </div>
);

const YesNo = ({ label, value, onChange }: { label: string; value: "yes" | "no"; onChange: (v: "yes" | "no") => void }) => (
  <Field label={label}>
    <div className="flex gap-2">
      {(["yes", "no"] as const).map((v) => (
        <button key={v} type="button" onClick={() => onChange(v)} className={`px-4 py-1.5 rounded-md border text-xs font-medium capitalize transition-colors ${value === v ? "bg-teal border-teal text-white" : "bg-white border-border text-navy hover:border-teal"}`}>{v}</button>
      ))}
    </div>
  </Field>
);

const FormStyles = () => (
  <style>{`.input-cn{width:100%;padding:.5rem .75rem;border:1px solid hsl(var(--border));border-radius:.375rem;background:white;font-size:.8125rem;color:hsl(var(--navy));outline:none;transition:border-color .15s,box-shadow .15s}.input-cn:focus{border-color:hsl(var(--teal));box-shadow:0 0 0 3px hsl(var(--teal)/.15)}`}</style>
);

/* ---------- Policy doc ---------- */
type PolicyData = {
  orgName: string; website: string; dpoName: string; dpoEmail: string; address: string;
  dataTypes: string[]; collection: string[]; lawful: string[]; purposes: string[];
  automated: "yes" | "no"; shares: "yes" | "no"; recipients: { name: string; purpose: string }[];
  retention: Record<string, string>; transfers: "yes" | "no"; regions: string[]; rights: string[];
  today: string;
};

const rightExplanation: Record<string, string> = {
  "Right of access (S.34)": "Request a copy of the personal data we hold about you.",
  "Right to rectification (S.35)": "Ask us to correct inaccurate or incomplete personal data.",
  "Right to erasure (S.36)": "Request that we delete your personal data, subject to legal obligations.",
  "Right to restriction (S.37)": "Ask us to limit how we use your data while a concern is being resolved.",
  "Right to data portability (S.38)": "Receive your personal data in a structured, machine-readable format.",
  "Right to object (S.38)": "Object to processing based on legitimate interests or for direct marketing.",
};

const PolicyDocument = ({ data }: { data: PolicyData }) => {
  const collectionPhrase = data.collection.length
    ? data.collection.map((c) => c.toLowerCase()).join(", ")
    : "directly from you";
  return (
    <article className="text-[14px] leading-relaxed text-navy font-sans">
      <header className="text-center pb-5 border-b border-border">
        <h1 className="text-xl font-extrabold tracking-tight">PRIVACY NOTICE</h1>
        <p className="mt-1 font-semibold">{data.orgName || "[Organization Name]"}</p>
        <p className="text-[12px] text-muted-foreground mt-2">Last updated: {data.today}</p>
        <p className="text-[12px] text-muted-foreground">
          Data Protection Officer: {data.dpoName || "[DPO Name]"} — {data.dpoEmail || "[DPO email]"}
        </p>
      </header>

      <Sec n={1} title="Who we are">
        <p>
          {data.orgName || "[Organization Name]"} ("{data.orgName || "we"}", "we", "us", "our") is committed to protecting the personal data of our users in accordance with the Nigeria Data Protection Act 2023 (NDPA) and the regulations of the Nigeria Data Protection Commission (NDPC).
        </p>
      </Sec>

      <Sec n={2} title="Personal data we collect">
        <p>We collect the following categories of personal data:</p>
        <ul className="list-disc pl-6 mt-2 space-y-0.5">
          {(data.dataTypes.length ? data.dataTypes : ["[no categories selected]"]).map((d) => <li key={d}>{d}</li>)}
        </ul>
        <p className="mt-3">We collect this data {collectionPhrase}.</p>
      </Sec>

      <Sec n={3} title="Lawful basis for processing">
        <p>We process your personal data on the following lawful bases under <strong>Section 25 of the NDPA 2023</strong>:</p>
        <ul className="list-disc pl-6 mt-2 space-y-0.5">
          {(data.lawful.length ? data.lawful : ["[no basis selected]"]).map((l) => <li key={l}>{l}</li>)}
        </ul>
      </Sec>

      <Sec n={4} title="How we use your data">
        <p>We use your personal data for the following purposes:</p>
        <ul className="list-disc pl-6 mt-2 space-y-0.5">
          {(data.purposes.length ? data.purposes : ["[no purposes selected]"]).map((p) => <li key={p}>{p}</li>)}
        </ul>
        {data.automated === "yes" && (
          <p className="mt-3">
            We use automated decision-making and profiling in limited circumstances to deliver our services. You have the right to request human review of any automated decision that significantly affects you.
          </p>
        )}
      </Sec>

      <Sec n={5} title="Who we share your data with">
        {data.shares === "no" ? (
          <p>We do not sell or share your personal data with third parties except as required by law.</p>
        ) : data.recipients.length ? (
          <>
            <p>We share your data with the following categories of recipients for the stated purposes:</p>
            <ul className="list-disc pl-6 mt-2 space-y-0.5">
              {data.recipients.map((r, i) => <li key={i}><strong>{r.name}</strong>{r.purpose && <> — {r.purpose}</>}</li>)}
            </ul>
          </>
        ) : (
          <p>We share your data with selected service providers under written Data Processing Agreements.</p>
        )}
      </Sec>

      <Sec n={6} title="How long we keep your data">
        <p>We retain personal data only for as long as necessary for the purposes described above:</p>
        {data.dataTypes.length > 0 && (
          <table className="w-full text-[13px] mt-3 border border-border rounded overflow-hidden">
            <thead className="bg-muted/60 text-left">
              <tr>
                <th className="py-2 px-3 font-semibold">Data Category</th>
                <th className="py-2 px-3 font-semibold">Retention Period</th>
              </tr>
            </thead>
            <tbody>
              {data.dataTypes.map((c) => (
                <tr key={c} className="border-t border-border">
                  <td className="py-2 px-3">{c}</td>
                  <td className="py-2 px-3 text-muted-foreground">{data.retention[c] || "Until no longer required"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Sec>

      <Sec n={7} title="International data transfers">
        {data.transfers === "no" ? (
          <p>We do not transfer your personal data outside Nigeria.</p>
        ) : (
          <p>
            We transfer personal data to: {(data.regions.length ? data.regions : ["selected jurisdictions"]).join(", ")}.
            All transfers are conducted in compliance with <strong>Section 44 of the NDPA 2023</strong>, with appropriate safeguards including standard contractual clauses.
          </p>
        )}
      </Sec>

      <Sec n={8} title="Your rights under the NDPA 2023">
        <p>Under <strong>Sections 34–38 of the NDPA 2023</strong>, you have the following rights:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          {(data.rights.length ? data.rights : ["[no rights selected]"]).map((r) => (
            <li key={r}><strong>{r}</strong> — <span className="text-muted-foreground">{rightExplanation[r] || ""}</span></li>
          ))}
        </ul>
        <p className="mt-3">
          To exercise any of these rights, contact our DPO at <strong>{data.dpoEmail || "[DPO email]"}</strong>. We will respond within 30 days.
        </p>
      </Sec>

      <Sec n={9} title="How to complain">
        <p>If you are unhappy with how we handle your personal data, you may lodge a complaint with the Nigeria Data Protection Commission (NDPC) at <strong>www.ndpc.gov.ng</strong>.</p>
      </Sec>

      <Sec n={10} title="Changes to this notice">
        <p>We may update this privacy notice from time to time. We will notify you of significant changes by email or notice on our website.</p>
      </Sec>

      <Sec n={11} title="Contact us">
        <p><strong>Data Protection Officer:</strong> {data.dpoName || "[DPO Name]"}</p>
        <p><strong>Email:</strong> {data.dpoEmail || "[DPO email]"}</p>
        <p><strong>Address:</strong> {data.address || "[Physical address]"}</p>
      </Sec>

      <p className="text-[12px] text-muted-foreground mt-8 pt-4 border-t border-border italic">
        This notice was generated by ComplyNG and aligned to the Nigeria Data Protection Act 2023.
      </p>
    </article>
  );
};

const Sec = ({ n, title, children }: { n: number; title: string; children: React.ReactNode }) => (
  <section className="mt-6">
    <h2 className="text-[16px] font-bold uppercase tracking-wide mb-2">{n}. {title}</h2>
    <div className="space-y-1">{children}</div>
  </section>
);

/* ---------- Plain-text builder ---------- */
function buildPolicyText(d: PolicyData): string {
  const lines: string[] = [];
  lines.push("PRIVACY NOTICE");
  lines.push(d.orgName);
  lines.push(`Last updated: ${d.today}`);
  lines.push(`Data Protection Officer: ${d.dpoName} — ${d.dpoEmail}`);
  lines.push("");
  lines.push("1. WHO WE ARE");
  lines.push(`${d.orgName} ("${d.orgName}", "we", "us", "our") is committed to protecting the personal data of our users in accordance with the Nigeria Data Protection Act 2023 (NDPA) and the regulations of the NDPC.`);
  lines.push("");
  lines.push("2. PERSONAL DATA WE COLLECT");
  lines.push(d.dataTypes.join(", ") || "—");
  lines.push(`Collected: ${d.collection.join(", ").toLowerCase() || "directly from you"}.`);
  lines.push("");
  lines.push("3. LAWFUL BASIS FOR PROCESSING (Section 25, NDPA 2023)");
  lines.push(d.lawful.join(", ") || "—");
  lines.push("");
  lines.push("4. HOW WE USE YOUR DATA");
  lines.push(d.purposes.join(", ") || "—");
  if (d.automated === "yes") lines.push("We use automated decision-making and profiling. You have the right to request human review.");
  lines.push("");
  lines.push("5. WHO WE SHARE YOUR DATA WITH");
  if (d.shares === "no") lines.push("We do not sell or share your personal data with third parties except as required by law.");
  else lines.push(d.recipients.map((r) => `- ${r.name}: ${r.purpose}`).join("\n") || "Selected processors under written DPAs.");
  lines.push("");
  lines.push("6. HOW LONG WE KEEP YOUR DATA");
  d.dataTypes.forEach((c) => lines.push(`- ${c}: ${d.retention[c] || "until no longer required"}`));
  lines.push("");
  lines.push("7. INTERNATIONAL DATA TRANSFERS");
  if (d.transfers === "no") lines.push("We do not transfer your personal data outside Nigeria.");
  else lines.push(`Transfers to: ${d.regions.join(", ") || "selected jurisdictions"} (Section 44, NDPA 2023, with appropriate safeguards).`);
  lines.push("");
  lines.push("8. YOUR RIGHTS UNDER THE NDPA 2023 (Sections 34–38)");
  d.rights.forEach((r) => lines.push(`- ${r}: ${rightExplanation[r] || ""}`));
  lines.push(`To exercise these rights contact: ${d.dpoEmail}`);
  lines.push("");
  lines.push("9. HOW TO COMPLAIN");
  lines.push("Lodge complaints with the NDPC at www.ndpc.gov.ng.");
  lines.push("");
  lines.push("10. CHANGES TO THIS NOTICE");
  lines.push("We may update this notice and will notify you of significant changes.");
  lines.push("");
  lines.push("11. CONTACT US");
  lines.push(`DPO: ${d.dpoName}  |  Email: ${d.dpoEmail}  |  Address: ${d.address}`);
  return lines.join("\n");
}

export default PolicyGenerator;
