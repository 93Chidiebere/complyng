import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Loader2 } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";

const InvestorNewAssessment = () => {
  usePageTitle("New Assessment");
  const nav = useNavigate();
  const [tab, setTab] = useState<"upload" | "profile">("upload");
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => nav("/investor/dashboard/report"), 2000);
  };

  if (loading) {
    return (
      <div className="card-cn-active p-12 text-center max-w-xl mx-auto">
        <Loader2 className="w-12 h-12 text-teal animate-spin mx-auto" />
        <h2 className="text-lg text-navy mt-4">Analyzing against NDPA 2023 framework...</h2>
        <p className="text-sm text-muted-foreground mt-2">Reviewing 48 obligations across 12 NDPA sections</p>
        <div className="mt-6 h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-teal animate-[progress_2s_ease-in-out]" style={{ width: "100%" }} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl text-navy">New Compliance Assessment</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Enter the company's data profile or upload their privacy policy.
        </p>
      </div>

      <div className="card-cn p-6">
        <div className="flex gap-1 border-b border-border mb-5">
          {[
            { id: "upload" as const, label: "Upload Privacy Policy" },
            { id: "profile" as const, label: "Enter Data Profile" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${
                tab === t.id ? "border-teal text-teal" : "border-transparent text-muted-foreground hover:text-navy"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "upload" ? (
          <form onSubmit={submit} className="space-y-4">
            <label className="block border-2 border-dashed border-border rounded-lg p-10 text-center cursor-pointer hover:border-teal hover:bg-teal/5 transition-colors">
              <Upload className="w-10 h-10 text-teal mx-auto" />
              <p className="text-sm font-semibold text-navy mt-3">Drop privacy policy PDF here or click to upload</p>
              <p className="text-xs text-muted-foreground mt-1">PDF, DOCX up to 10MB</p>
              <input type="file" className="hidden" accept=".pdf,.docx" />
            </label>
            <Field label="Company name" required />
            <Select label="Industry" options={["Fintech", "Healthtech", "Edtech", "HR Platform", "E-commerce", "AgriTech"]} />
            <button className="btn-teal w-full">Run Assessment</button>
          </form>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <Field label="Company name" required />
            <Select label="Industry" options={["Fintech", "Healthtech", "Edtech", "HR Platform", "E-commerce", "AgriTech"]} />
            <div>
              <label className="text-xs font-semibold text-navy">Data categories processed</label>
              <div className="grid sm:grid-cols-2 gap-2 mt-2">
                {["Names & emails", "Phone numbers", "Financial data", "Health records", "Biometric data", "Location data"].map((c) => (
                  <label key={c} className="flex items-center gap-2 text-sm border border-border rounded-md px-3 py-2">
                    <input type="checkbox" /> {c}
                  </label>
                ))}
              </div>
            </div>
            <YesNo label="Does company transfer data outside Nigeria?" />
            <YesNo label="Does company have a published privacy policy?" />
            <button className="btn-teal w-full">Run Assessment</button>
          </form>
        )}
      </div>
    </div>
  );
};

const Field = ({ label, required }: { label: string; required?: boolean }) => (
  <div>
    <label className="text-xs font-semibold text-navy">{label}</label>
    <input required={required} className="w-full mt-1.5 border border-border rounded-md px-3 py-2 text-sm" />
  </div>
);

const Select = ({ label, options }: { label: string; options: string[] }) => (
  <div>
    <label className="text-xs font-semibold text-navy">{label}</label>
    <select className="w-full mt-1.5 border border-border rounded-md px-3 py-2 text-sm bg-card">
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
  </div>
);

const YesNo = ({ label }: { label: string }) => (
  <div>
    <label className="text-xs font-semibold text-navy">{label}</label>
    <div className="flex gap-3 mt-2 text-sm">
      {["Yes", "No"].map((v) => (
        <label key={v} className="flex items-center gap-1.5"><input type="radio" name={label} /> {v}</label>
      ))}
    </div>
  </div>
);

export default InvestorNewAssessment;
