import { useState } from "react";
import { toast } from "sonner";
import { X, Plus, Award, GraduationCap, Check } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";

type Module = {
  id: number;
  title: string;
  duration: string;
  section: string;
  completed: number;
  total: number;
  description: string;
  points: string[];
  quiz: { q: string; options: string[]; correct: number }[];
};

const modules: Module[] = [
  {
    id: 1,
    title: "Introduction to the NDPA 2023",
    duration: "8 mins",
    section: "NDPA Overview",
    completed: 10,
    total: 12,
    description:
      "Core principles of the NDPA 2023 — what personal data is, who the NDPC is, and what organizations are legally required to do.",
    points: [
      "What 'personal data' means under Nigerian law",
      "Role and powers of the Nigeria Data Protection Commission (NDPC)",
      "The seven NDPA principles every staff member must know",
      "Who qualifies as a Data Controller of Major Importance",
      "Penalties for non-compliance — up to ₦10M or 2% of revenue",
    ],
    quiz: [
      { q: "Which body enforces the NDPA 2023?", options: ["NCC", "NDPC", "EFCC", "CBN"], correct: 1 },
      { q: "Personal data includes…", options: ["Only ID numbers", "Any info identifying a person", "Only financial data", "Only medical data"], correct: 1 },
    ],
  },
  {
    id: 2,
    title: "Data Subject Rights — What Staff Must Know",
    duration: "6 mins",
    section: "S.34–38",
    completed: 8,
    total: 12,
    description:
      "How to recognize and correctly handle access requests, correction requests, deletion requests, and objections from data subjects.",
    points: [
      "The seven rights guaranteed under Sections 34–38",
      "How to recognize a Data Subject Request (DSR) when it arrives",
      "The 30-day statutory response window",
      "When you may refuse a request — and how to document it",
      "Escalating requests to the DPO",
    ],
    quiz: [
      { q: "Statutory response window for a DSR?", options: ["7 days", "14 days", "30 days", "90 days"], correct: 2 },
      { q: "If a customer asks for their data, you should…", options: ["Ignore it", "Log it and notify the DPO", "Reply directly with files", "Delete the request"], correct: 1 },
    ],
  },
  {
    id: 3,
    title: "Handling a Data Breach — The 72-Hour Rule",
    duration: "5 mins",
    section: "S.40",
    completed: 6,
    total: 12,
    description: "What constitutes a data breach, when to report internally, and the NDPC's 72-hour notification requirement.",
    points: [
      "What counts as a 'personal data breach'",
      "Internal escalation: who to call and when",
      "The 72-hour clock — when it starts",
      "Notifying affected data subjects",
      "Documenting evidence for the NDPC",
    ],
    quiz: [
      { q: "How long do you have to notify the NDPC?", options: ["24 hrs", "48 hrs", "72 hrs", "7 days"], correct: 2 },
      { q: "First step on suspecting a breach?", options: ["Tweet about it", "Tell the DPO immediately", "Wait and see", "Reset all passwords silently"], correct: 1 },
    ],
  },
  {
    id: 4,
    title: "Consent — Getting It Right Under NDPA",
    duration: "7 mins",
    section: "S.26–27",
    completed: 5,
    total: 12,
    description: "What valid consent looks like under Nigerian law, common consent mistakes, and how to record and withdraw consent correctly.",
    points: [
      "The four elements of valid consent",
      "Pre-ticked boxes and bundled consent — why they fail",
      "Recording consent: timestamps, version, IP",
      "Honouring withdrawal requests promptly",
      "When consent is NOT the right lawful basis",
    ],
    quiz: [
      { q: "Which is NOT valid consent?", options: ["Freely given", "Pre-ticked checkbox", "Specific", "Informed"], correct: 1 },
      { q: "Withdrawal of consent must be…", options: ["Refused", "As easy as giving it", "Charged a fee", "Only by post"], correct: 1 },
    ],
  },
  {
    id: 5,
    title: "Data Security Obligations for Staff",
    duration: "6 mins",
    section: "S.39",
    completed: 4,
    total: 12,
    description: "Password management, device security, safe data sharing practices, and what staff must do if they suspect a breach.",
    points: [
      "Strong passwords and MFA basics",
      "Safe sharing — never email customer data unencrypted",
      "Locking devices and clean desk policy",
      "Spotting phishing attempts targeting Nigerian businesses",
      "Reporting suspected security incidents",
    ],
    quiz: [
      { q: "Best place to store customer files?", options: ["Personal Gmail", "Approved company drive", "WhatsApp", "Local Desktop"], correct: 1 },
      { q: "MFA stands for…", options: ["Multi-Factor Authentication", "Mobile Free Access", "Manual File Audit", "Mass Form Approval"], correct: 0 },
    ],
  },
];

type Staff = {
  name: string;
  role: string;
  complete: number;
  lastActivity: string;
  certified: boolean;
  action: "View" | "Remind" | "Send Invite";
};

const staffSeed: Staff[] = [
  { name: "Amaka Okonkwo", role: "DPO", complete: 5, lastActivity: "Apr 15", certified: true, action: "View" },
  { name: "Chidi Eze", role: "Engineer", complete: 3, lastActivity: "Apr 12", certified: false, action: "Remind" },
  { name: "Fatima Aliyu", role: "Marketing", complete: 4, lastActivity: "Apr 10", certified: false, action: "Remind" },
  { name: "Emeka Nwachukwu", role: "Sales", complete: 2, lastActivity: "Apr 8", certified: false, action: "Remind" },
  { name: "Ngozi Adeyemi", role: "Finance", complete: 5, lastActivity: "Apr 14", certified: true, action: "View" },
  { name: "Bello Abdullahi", role: "Engineer", complete: 1, lastActivity: "Mar 30", certified: false, action: "Remind" },
  { name: "Ifeoma Obi", role: "Customer Support", complete: 3, lastActivity: "Apr 11", certified: false, action: "Remind" },
  { name: "Taiwo Olawale", role: "Product", complete: 5, lastActivity: "Apr 13", certified: true, action: "View" },
  { name: "Seun Adesanya", role: "HR", complete: 0, lastActivity: "Never", certified: false, action: "Send Invite" },
  { name: "Kemi Adewale", role: "Finance", complete: 2, lastActivity: "Apr 2", certified: false, action: "Remind" },
  { name: "Yusuf Ibrahim", role: "Legal", complete: 5, lastActivity: "Apr 16", certified: true, action: "View" },
  { name: "Adaeze Nwosu", role: "Operations", complete: 0, lastActivity: "Never", certified: false, action: "Send Invite" },
];

const Training = () => {
  usePageTitle("Staff Training");
  const [openModule, setOpenModule] = useState<Module | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [quizPicks, setQuizPicks] = useState<Record<number, number>>({});

  const handleAction = (s: Staff) => {
    if (s.action === "View") toast.success(`Certificate downloaded for ${s.name}`);
    else if (s.action === "Remind") toast(`Reminder sent to ${s.name}`);
    else toast(`Training invitation sent to ${s.name}`);
  };

  const totalStaff = 12;
  const complete = 7, inProgress = 3, notStarted = 2;
  const rate = Math.round((complete / totalStaff) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl text-navy">Staff Training & Awareness Tracker</h1>
        <p className="text-muted-foreground text-sm mt-1">
          NDPA requires all staff handling personal data to be trained on their obligations — track completion and generate certificates.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Total Staff" value="12" tone="navy" />
        <Stat label="Training Complete" value={String(complete)} tone="success" />
        <Stat label="In Progress" value={String(inProgress)} tone="amber" />
        <Stat label="Not Started" value={String(notStarted)} tone="coral" />
      </div>

      <section className="card-cn-active p-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-navy">Overall Completion Rate</p>
          <p className="text-sm font-bold text-teal">{rate}%</p>
        </div>
        <div className="h-2 rounded-full bg-border overflow-hidden">
          <div className="h-full bg-teal transition-all" style={{ width: `${rate}%` }} />
        </div>
      </section>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Modules */}
        <section className="lg:col-span-2 space-y-3">
          <h2 className="text-sm uppercase tracking-wider text-muted-foreground font-bold">Available Training Modules</h2>
          {modules.map((m) => {
            const pct = Math.round((m.completed / m.total) * 100);
            return (
              <div key={m.id} className="card-cn p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-navy font-semibold text-sm leading-snug">{m.title}</h3>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      <span className="pill bg-teal/10 text-teal border-teal/30">{m.duration}</span>
                      <span className="pill bg-navy/10 text-navy border-navy/20">{m.section}</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{m.description}</p>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Org completion</span>
                    <span className="text-navy font-semibold">{pct}% ({m.completed}/{m.total})</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-border overflow-hidden">
                    <div className="h-full bg-teal" style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <button
                  onClick={() => { setOpenModule(m); setQuizPicks({}); }}
                  className="btn-teal-outline text-xs mt-4 w-full"
                >
                  View Module
                </button>
              </div>
            );
          })}
        </section>

        {/* Staff table */}
        <section className="lg:col-span-3 card-cn-active p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm uppercase tracking-wider text-muted-foreground font-bold">Team Completion Status</h2>
            <button onClick={() => setShowAdd(true)} className="btn-teal text-xs">
              <Plus className="w-3.5 h-3.5" /> Add Staff
            </button>
          </div>
          <div className="overflow-x-auto -mx-5">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                  <th className="font-semibold py-2 px-5">Staff</th>
                  <th className="font-semibold py-2 px-2">Role</th>
                  <th className="font-semibold py-2 px-2">Modules</th>
                  <th className="font-semibold py-2 px-2">Last Activity</th>
                  <th className="font-semibold py-2 px-2">Cert</th>
                  <th className="font-semibold py-2 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {staffSeed.map((s) => (
                  <tr key={s.name} className="border-b border-border last:border-0 hover:bg-muted/40">
                    <td className="py-3 px-5 font-semibold text-navy">{s.name}</td>
                    <td className="py-3 px-2 text-muted-foreground text-xs">{s.role}</td>
                    <td className="py-3 px-2 text-navy font-medium tabular-nums">{s.complete}/5</td>
                    <td className="py-3 px-2 text-muted-foreground text-xs">{s.lastActivity}</td>
                    <td className="py-3 px-2">
                      {s.certified ? <span className="text-success text-xs font-semibold inline-flex items-center gap-1"><Award className="w-3.5 h-3.5" /> Yes</span> : <span className="text-muted-foreground text-xs">—</span>}
                    </td>
                    <td className="py-3 px-5 text-right">
                      <button onClick={() => handleAction(s)} className="text-xs font-semibold text-teal hover:underline">
                        {s.action === "View" ? "Download" : s.action}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Module slide-over */}
      {openModule && (
        <div className="fixed inset-0 z-50 flex" onClick={() => setOpenModule(null)}>
          <div className="flex-1 bg-black/50" />
          <div className="w-full max-w-xl bg-white h-full overflow-y-auto p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-teal font-semibold">Training Module</p>
                <h2 className="text-lg text-navy">{openModule.title}</h2>
                <p className="text-xs text-muted-foreground mt-1">{openModule.duration} · {openModule.section}</p>
              </div>
              <button onClick={() => setOpenModule(null)} className="text-muted-foreground hover:text-navy"><X className="w-5 h-5" /></button>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">Key Learning Points</p>
              <ul className="space-y-2">
                {openModule.points.map((p, i) => (
                  <li key={i} className="flex gap-3 text-sm text-navy">
                    <span className="w-5 h-5 rounded-full bg-teal/10 text-teal flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">Quick Knowledge Check</p>
              <div className="space-y-4">
                {openModule.quiz.map((q, qi) => {
                  const picked = quizPicks[qi];
                  return (
                    <div key={qi} className="card-cn p-4">
                      <p className="text-sm font-semibold text-navy mb-3">{qi + 1}. {q.q}</p>
                      <div className="space-y-1.5">
                        {q.options.map((opt, oi) => {
                          const isPicked = picked === oi;
                          const isCorrect = oi === q.correct;
                          let cls = "border-border hover:border-teal";
                          if (picked !== undefined && isPicked && isCorrect) cls = "border-success bg-success/10 text-success";
                          else if (picked !== undefined && isPicked && !isCorrect) cls = "border-coral bg-coral/10 text-coral";
                          else if (picked !== undefined && isCorrect) cls = "border-success bg-success/5 text-success";
                          return (
                            <button
                              key={oi}
                              onClick={() => setQuizPicks((s) => ({ ...s, [qi]: oi }))}
                              className={`w-full text-left px-3 py-2 rounded-md border text-sm transition-colors ${cls}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      {picked !== undefined && (
                        <p className={`text-xs mt-2 font-semibold ${picked === q.correct ? "text-success" : "text-coral"}`}>
                          {picked === q.correct ? "✓ Correct" : "✗ Incorrect — review the material above"}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => { toast.success(`"${openModule.title}" marked complete`); setOpenModule(null); }}
                className="btn-teal flex-1"
              >
                Mark as Complete for Me
              </button>
              <button
                onClick={() => toast("Module assigned to team")}
                className="btn-teal-outline flex-1"
              >
                Assign to Team
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Staff Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowAdd(false)}>
          <div className="bg-white rounded-lg w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-lg text-navy">Add Staff Member</h2>
              <button onClick={() => setShowAdd(false)} className="text-muted-foreground hover:text-navy"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); toast.success("Staff member invited"); setShowAdd(false); }} className="space-y-3">
              <Field label="Name"><input className="input-cn" required placeholder="Full name" /></Field>
              <Field label="Email"><input type="email" className="input-cn" required placeholder="name@company.com" /></Field>
              <Field label="Role"><input className="input-cn" required placeholder="e.g. Engineer" /></Field>
              <Field label="Department">
                <select className="input-cn">
                  {["Engineering", "Marketing", "Sales", "Finance", "HR", "Legal", "Operations", "Customer Support", "Product"].map((d) => <option key={d}>{d}</option>)}
                </select>
              </Field>
              <button type="submit" className="btn-teal w-full">Send Invitation</button>
            </form>
          </div>
        </div>
      )}

      <FormStyles />
    </div>
  );
};

const Stat = ({ label, value, tone }: { label: string; value: string; tone: "navy" | "success" | "amber" | "coral" }) => {
  const tc = { navy: "bg-navy text-white", success: "bg-success text-white", amber: "bg-amber text-white", coral: "bg-coral text-white" }[tone];
  return (
    <div className="card-cn-active p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-md flex items-center justify-center font-bold text-lg ${tc}`}>{value}</div>
      <p className="text-sm font-semibold text-navy">{label}</p>
    </div>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div><label className="block text-sm font-semibold text-navy mb-1.5">{label}</label>{children}</div>
);

const FormStyles = () => (
  <style>{`.input-cn{width:100%;padding:.625rem .875rem;border:1px solid hsl(var(--border));border-radius:.375rem;background:white;font-size:.875rem;color:hsl(var(--navy));outline:none;transition:border-color .15s,box-shadow .15s}.input-cn:focus{border-color:hsl(var(--teal));box-shadow:0 0 0 3px hsl(var(--teal)/.15)}`}</style>
);

export default Training;
