import { Link } from "react-router-dom";
import {
  Bell,
  User,
  Shield,
  Truck,
  AlertTriangle,
  FileText,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  ClipboardList,
  Zap,
  Info,
  ShieldCheck,
} from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useCalendar, categoryColor, daysFromNow, formatDateShort } from "@/state/CalendarContext";

const obligations = [
  { name: "Appoint Data Protection Officer", section: "S.30", status: "progress", due: "30 days" },
  { name: "Publish Privacy Notice", section: "S.25", status: "not-started", due: "Overdue" },
  { name: "Data Subject Rights Procedure", section: "S.34-38", status: "not-started", due: "Overdue" },
  { name: "Register with NDPC (if applicable)", section: "S.5", status: "compliant", due: "—" },
  { name: "Breach Notification Procedure", section: "S.40", status: "not-started", due: "14 days" },
  { name: "Annual Data Protection Audit", section: "S.48", status: "progress", due: "90 days" },
] as const;

const statusBadge = (status: string) => {
  if (status === "compliant")
    return (
      <span className="inline-flex items-center gap-1 text-success font-medium text-xs">
        <CheckCircle2 className="w-3.5 h-3.5" /> Compliant
      </span>
    );
  if (status === "progress")
    return (
      <span className="inline-flex items-center gap-1 text-amber font-medium text-xs">
        <AlertCircle className="w-3.5 h-3.5" /> In Progress
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-coral font-medium text-xs">
      <XCircle className="w-3.5 h-3.5" /> Not Started
    </span>
  );
};

const activity = [
  { icon: Bell, time: "2 hours ago", text: "New NDPC guidance published — Consumer data rights enforcement", tone: "text-coral" },
  { icon: ClipboardList, time: "1 day ago", text: "DSR received from user — Access request pending response", tone: "text-amber" },
  { icon: FileText, time: "3 days ago", text: "Initial audit completed — Score: 62/100", tone: "text-teal" },
];

const modules = [
  { to: "/dashboard/regulatory", title: "Regulatory Alerts", desc: "2 new NDPC publications", icon: Bell },
  { to: "/dashboard/dsr", title: "DSR Manager", desc: "3 active requests", icon: User },
  { to: "/dashboard/dpia", title: "DPIA Generator", desc: "Assess new processing", icon: Shield },
  { to: "/dashboard/vendor", title: "Vendor Tracker", desc: "Manage processors", icon: Truck },
  { to: "/dashboard/breach", title: "Breach Response", desc: "72-hour playbook", icon: AlertTriangle },
  { to: "/dashboard/annual", title: "Annual Filing", desc: "NDPC submission", icon: FileText },
];

const priorities: { tone: "coral" | "amber" | "teal"; label: string; title: string; to: string; cta: string; icon: typeof Zap }[] = [
  { tone: "coral", label: "URGENT", title: "DSR-2026-010 overdue — respond to deletion request immediately", to: "/dashboard/dsr", cta: "Respond now", icon: Zap },
  { tone: "amber", label: "ACTION", title: "2 vendors missing Data Processing Agreements — Google Workspace, Intercom", to: "/dashboard/vendor", cta: "Add DPAs", icon: AlertCircle },
  { tone: "teal", label: "INFO", title: "New NDPC regulatory alert — review consent requirements for fintech", to: "/dashboard/regulatory", cta: "Review alert", icon: Info },
];

const Dashboard = () => {
  usePageTitle("Dashboard");
  const { obligations: calendarItems } = useCalendar();
  const upcoming = [...calendarItems].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3);
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl text-navy">Compliance Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Live posture across all 6 NDPA modules.
        </p>
      </div>

      {/* What needs attention */}
      <section>
        <h2 className="text-sm uppercase tracking-wider font-bold text-muted-foreground mb-3">
          What needs attention
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {priorities.map((p) => {
            const Icon = p.icon;
            const tone = {
              coral: { border: "border-l-coral", chip: "bg-coral text-white", icon: "text-coral" },
              amber: { border: "border-l-amber", chip: "bg-amber text-white", icon: "text-amber" },
              teal: { border: "border-l-teal", chip: "bg-teal text-white", icon: "text-teal" },
            }[p.tone];
            return (
              <Link
                key={p.title}
                to={p.to}
                className={`bg-card border border-border rounded-lg p-5 border-l-4 ${tone.border} hover:shadow-md transition-shadow flex flex-col gap-3`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${tone.chip}`}>{p.label}</span>
                  <Icon className={`w-4 h-4 ${tone.icon}`} />
                </div>
                <p className="text-sm text-navy font-medium leading-snug flex-1">{p.title}</p>
                <span className="text-xs font-semibold text-teal inline-flex items-center gap-1">
                  {p.cta} <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Upcoming Obligations widget */}
      <section className="card-cn-active p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg text-navy">Upcoming Obligations</h2>
          <Link to="/dashboard/calendar" className="text-xs font-semibold text-teal hover:underline inline-flex items-center gap-1">
            View Calendar <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <ul className="space-y-2">
          {upcoming.map((o) => {
            const c = categoryColor(o.category);
            const days = daysFromNow(o.date);
            return (
              <li key={o.id}>
                <Link to={o.modulePath} className={`flex items-center gap-3 p-3 rounded-md border border-border border-l-4 ${c.border} hover:bg-muted/40`}>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-navy truncate">{o.title}</p>
                    <p className="text-xs text-muted-foreground">{formatDateShort(o.date)} · {o.module}</p>
                  </div>
                  <span className={`text-xs font-bold ${days < 0 ? "text-coral" : "text-navy"}`}>
                    {days < 0 ? "OVERDUE" : days === 0 ? "Today" : `${days}d`}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Stat cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <ScoreStatCard />
        <StatCard label="Open Gaps" value="8" tone="coral" hint="Identified in last audit" />
        <StatCard label="Active DSRs" value="3" tone="amber" hint="Within 30-day window" />
        <StatCard label="Days to Next Deadline" value="47" tone="teal" hint="Annual audit filing" />
        <BadgeStatCard />
      </div>

      {/* Obligation tracker */}
      <section className="card-cn-active p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg text-navy">Your NDPA Obligation Tracker</h2>
          <span className="text-xs text-muted-foreground">6 obligations tracked</span>
        </div>
        <div className="overflow-x-auto -mx-6">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="font-semibold py-3 px-6">Obligation</th>
                <th className="font-semibold py-3 px-3">NDPA Section</th>
                <th className="font-semibold py-3 px-3">Status</th>
                <th className="font-semibold py-3 px-6 text-right">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {obligations.map((o) => (
                <tr key={o.name} className="border-b border-border last:border-0 hover:bg-muted/40">
                  <td className="py-3.5 px-6 font-medium text-navy">{o.name}</td>
                  <td className="py-3.5 px-3 text-muted-foreground">{o.section}</td>
                  <td className="py-3.5 px-3">{statusBadge(o.status)}</td>
                  <td className={`py-3.5 px-6 text-right font-medium ${o.due === "Overdue" ? "text-coral" : "text-navy"}`}>
                    {o.due}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Activity */}
        <section className="card-cn-active p-6">
          <h2 className="text-lg text-navy mb-4">Recent Activity</h2>
          <ul className="space-y-4">
            {activity.map((a, i) => {
              const Icon = a.icon;
              return (
                <li key={i} className="flex gap-3">
                  <div className={`w-9 h-9 rounded-md bg-muted flex items-center justify-center shrink-0 ${a.tone}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-navy">{a.text}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Module Quick Access */}
        <section className="card-cn-active p-6">
          <h2 className="text-lg text-navy mb-4">Module Quick Access</h2>
          <div className="grid grid-cols-2 gap-3">
            {modules.map((m) => {
              const Icon = m.icon;
              return (
                <Link
                  key={m.to}
                  to={m.to}
                  className="group border border-border rounded-md p-3 hover:border-teal hover:bg-teal/5 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-4 h-4 text-teal" />
                    <span className="text-sm font-semibold text-navy">{m.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{m.desc}</p>
                  <ArrowRight className="w-3.5 h-3.5 text-teal mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

const ScoreStatCard = () => {
  const score = 62;
  const r = 26;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  return (
    <div className="card-cn-active p-5 flex items-center gap-4">
      <div className="relative w-16 h-16 shrink-0">
        <svg viewBox="0 0 64 64" className="-rotate-90 w-full h-full">
          <circle cx="32" cy="32" r={r} stroke="hsl(var(--border))" strokeWidth="6" fill="none" />
          <circle
            cx="32"
            cy="32"
            r={r}
            stroke="hsl(var(--teal))"
            strokeWidth="6"
            fill="none"
            strokeDasharray={c}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-navy">
          {score}
        </div>
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Compliance Score</p>
        <p className="text-2xl font-bold text-navy mt-0.5">62<span className="text-sm text-muted-foreground font-medium">/100</span></p>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, tone, hint }: { label: string; value: string; tone: "coral" | "amber" | "teal"; hint: string }) => {
  const toneClass = {
    coral: "bg-coral text-white",
    amber: "bg-amber text-white",
    teal: "bg-teal text-white",
  }[tone];
  return (
    <div className="card-cn-active p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-md flex items-center justify-center font-bold text-lg ${toneClass}`}>
        {value}
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{label}</p>
        <p className="text-xs text-muted-foreground mt-1">{hint}</p>
      </div>
    </div>
  );
};

const BadgeStatCard = () => (
  <Link to="/dashboard/verified-badge" className="card-cn-active p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
    <div className="w-12 h-12 rounded-md bg-muted text-muted-foreground flex items-center justify-center">
      <ShieldCheck className="w-6 h-6" />
    </div>
    <div className="min-w-0">
      <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Verified Badge</p>
      <p className="text-sm font-bold text-navy mt-0.5">3 of 4 gaps remaining</p>
      <p className="text-xs text-teal font-semibold mt-0.5 inline-flex items-center gap-1">
        View Requirements <ArrowRight className="w-3 h-3" />
      </p>
    </div>
  </Link>
);

export default Dashboard;
