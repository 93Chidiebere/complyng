import { useState } from "react";
import { X, Plus, Copy, CheckCircle2 } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";

type Status = "review" | "overdue" | "responded";

const initialRequests: {
  ref: string;
  type: string;
  received: string;
  deadline: string;
  status: Status;
}[] = [
  { ref: "DSR-2026-011", type: "Access Request", received: "April 12, 2026", deadline: "May 12, 2026", status: "review" },
  { ref: "DSR-2026-010", type: "Deletion Request", received: "April 8, 2026", deadline: "May 8, 2026", status: "overdue" },
  { ref: "DSR-2026-009", type: "Correction Request", received: "April 1, 2026", deadline: "May 1, 2026", status: "review" },
  { ref: "DSR-2026-008", type: "Access Request", received: "March 10, 2026", deadline: "April 9, 2026", status: "responded" },
  { ref: "DSR-2026-007", type: "Objection to Processing", received: "March 1, 2026", deadline: "March 31, 2026", status: "responded" },
];

const statusBadge = (s: Status) => {
  if (s === "review")
    return <span className="pill bg-amber/10 text-amber border-amber/30">🟡 In Review</span>;
  if (s === "overdue")
    return <span className="pill bg-coral/10 text-coral border-coral/30">🔴 Overdue</span>;
  return <span className="pill bg-success/10 text-success border-success/30">✅ Responded</span>;
};

const DSR = () => {
  usePageTitle("DSR Manager");
  const [showNew, setShowNew] = useState(false);
  const [drawer, setDrawer] = useState<typeof initialRequests[number] | null>(null);
  const [copied, setCopied] = useState(false);

  const draftFor = (r: typeof initialRequests[number]) => `Dear [Requester Name],

Thank you for your data subject access request received on ${r.received}.

In accordance with Section 34 of the Nigeria Data Protection Act 2023, we are pleased to confirm that we hold the following categories of personal data relating to you: account information, transaction history, contact details.

You may request a copy of this data by responding to this email. We will provide the information within the statutory 30-day period.

For any questions, please contact our Data Protection Officer at: dpo@[company].com

Yours sincerely,
[Organization Name] Data Protection Team`;

  const copyDraft = async () => {
    if (!drawer) return;
    try {
      await navigator.clipboard.writeText(draftFor(drawer));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl text-navy">Data Subject Request Manager</h1>
          <p className="text-muted-foreground text-sm mt-1">
            30-day NDPA response window — tracked automatically from receipt.
          </p>
        </div>
        <button onClick={() => setShowNew(true)} className="btn-teal text-sm">
          <Plus className="w-4 h-4" /> New DSR
        </button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <SummaryCard label="Open" value="3" tone="amber" />
        <SummaryCard label="Responded" value="7" tone="success" />
        <SummaryCard label="Overdue" value="1" tone="coral" />
      </div>

      <section className="card-cn-active p-6">
        <div className="overflow-x-auto -mx-6">
          <table className="w-full text-sm min-w-[760px]">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="font-semibold py-3 px-6">Reference</th>
                <th className="font-semibold py-3 px-3">Type</th>
                <th className="font-semibold py-3 px-3">Received</th>
                <th className="font-semibold py-3 px-3">Deadline</th>
                <th className="font-semibold py-3 px-3">Status</th>
                <th className="font-semibold py-3 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {initialRequests.map((r) => (
                <tr key={r.ref} className="border-b border-border last:border-0 hover:bg-muted/40">
                  <td className="py-3.5 px-6 font-mono text-xs text-navy">{r.ref}</td>
                  <td className="py-3.5 px-3 text-navy">{r.type}</td>
                  <td className="py-3.5 px-3 text-muted-foreground">{r.received}</td>
                  <td className="py-3.5 px-3 text-muted-foreground">{r.deadline}</td>
                  <td className="py-3.5 px-3">{statusBadge(r.status)}</td>
                  <td className="py-3.5 px-6 text-right">
                    <button
                      onClick={() => setDrawer(r)}
                      className={`text-xs font-semibold ${
                        r.status === "responded" ? "text-muted-foreground hover:text-navy" : "text-teal hover:underline"
                      }`}
                    >
                      {r.status === "overdue" ? "Respond Now" : r.status === "responded" ? "View" : "Draft Response"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* New DSR modal */}
      {showNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowNew(false)}>
          <div className="bg-white rounded-lg w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-lg text-navy">Log New DSR</h2>
              <button onClick={() => setShowNew(false)} className="text-muted-foreground hover:text-navy">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowNew(false);
              }}
              className="space-y-4"
            >
              <FormField label="Requester name">
                <input className="input-cn" placeholder="Adaeze Okafor" />
              </FormField>
              <FormField label="Email">
                <input type="email" className="input-cn" placeholder="user@example.com" />
              </FormField>
              <FormField label="Request type">
                <select className="input-cn">
                  {["Access", "Correction", "Deletion", "Objection", "Portability"].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </FormField>
              <FormField label="Brief description">
                <textarea rows={3} className="input-cn resize-none" placeholder="Summarise the request…" />
              </FormField>
              <FormField label="Date received">
                <input type="date" className="input-cn" />
              </FormField>
              <button type="submit" className="btn-teal w-full">Log DSR & Start Clock</button>
            </form>
          </div>
        </div>
      )}

      {/* Slide-over drawer */}
      {drawer && (
        <div className="fixed inset-0 z-50 flex" onClick={() => setDrawer(null)}>
          <div className="flex-1 bg-black/50" />
          <div
            className="w-full max-w-xl bg-white h-full overflow-y-auto p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-5">
              <h2 className="text-lg text-navy">{drawer.ref}</h2>
              <button onClick={() => setDrawer(null)} className="text-muted-foreground hover:text-navy">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="card-cn p-4 bg-muted/40 space-y-2 text-sm">
              <Row label="Type" value={drawer.type} />
              <Row label="Received" value={drawer.received} />
              <Row label="Deadline" value={drawer.deadline} />
              <Row label="Status" value={drawer.status === "overdue" ? "Overdue" : drawer.status === "responded" ? "Responded" : "In Review"} />
            </div>

            <div className="mt-6">
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                AI-drafted response
              </p>
              <div className="card-cn-active p-5 whitespace-pre-wrap text-sm leading-relaxed text-navy bg-teal/5">
                {draftFor(drawer)}
              </div>
            </div>

            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <button onClick={copyDraft} className="btn-teal-outline text-sm flex-1">
                {copied ? <><CheckCircle2 className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy Response</>}
              </button>
              <button className="btn-teal text-sm flex-1">Mark as Responded</button>
            </div>
          </div>
        </div>
      )}

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

const SummaryCard = ({ label, value, tone }: { label: string; value: string; tone: "amber" | "success" | "coral" }) => {
  const toneClass = {
    amber: "bg-amber text-white",
    success: "bg-success text-white",
    coral: "bg-coral text-white",
  }[tone];
  return (
    <div className="card-cn-active p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-md flex items-center justify-center font-bold text-lg ${toneClass}`}>
        {value}
      </div>
      <p className="text-sm font-semibold text-navy">{label}</p>
    </div>
  );
};

const FormField = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="block text-sm font-semibold text-navy mb-1.5">{label}</label>
    {children}
  </div>
);

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between">
    <span className="text-muted-foreground">{label}</span>
    <span className="text-navy font-medium">{value}</span>
  </div>
);

export default DSR;
