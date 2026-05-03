import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type ObligationCategory = "DSR" | "Vendor" | "Breach" | "Regulatory" | "Filing" | "Training" | "Internal";

export type Obligation = {
  id: string;
  title: string;
  description: string;
  category: ObligationCategory;
  date: string; // ISO yyyy-mm-dd
  status: "Overdue" | "Due Soon" | "Pending" | "In Progress" | "Action Required" | "Scheduled" | "Not Started";
  module: string;
  modulePath: string;
  recurrence?: "One-time" | "Annual" | "Monthly" | "Custom";
  notes?: string;
};

const seed: Obligation[] = [
  { id: "o1", title: "DSR-2026-010 Deletion Request", description: "Deletion request — respond immediately.", category: "DSR", date: "2026-04-18", status: "Overdue", module: "DSR Manager", modulePath: "/dashboard/dsr" },
  { id: "o2", title: "Termii DPA Renewal", description: "Review and renew vendor agreement.", category: "Vendor", date: "2026-04-20", status: "Due Soon", module: "Vendor Tracker", modulePath: "/dashboard/vendor" },
  { id: "o3", title: "Breach Follow-up BR-2026-001", description: "Submit resolution report to NDPC.", category: "Breach", date: "2026-04-30", status: "Pending", module: "Breach Response", modulePath: "/dashboard/breach" },
  { id: "o4", title: "DSR-2026-009 Correction deadline", description: "Statutory 30-day window closes.", category: "DSR", date: "2026-05-01", status: "In Progress", module: "DSR Manager", modulePath: "/dashboard/dsr" },
  { id: "o5", title: "DSR-2026-010 Final response deadline", description: "Final escalation window expires.", category: "DSR", date: "2026-05-08", status: "Overdue", module: "DSR Manager", modulePath: "/dashboard/dsr" },
  { id: "o6", title: "DSR-2026-011 Access deadline", description: "Provide subject access bundle.", category: "DSR", date: "2026-05-12", status: "In Progress", module: "DSR Manager", modulePath: "/dashboard/dsr" },
  { id: "o7", title: "NDPC Consent Directive action", description: "Implement updated consent collection.", category: "Regulatory", date: "2026-05-15", status: "Action Required", module: "Regulatory Alerts", modulePath: "/dashboard/regulatory" },
  { id: "o8", title: "Q2 Internal Compliance Review", description: "Internal posture review milestone.", category: "Internal", date: "2026-05-31", status: "Scheduled", module: "Dashboard", modulePath: "/dashboard" },
  { id: "o9", title: "Annual NDPC Filing", description: "Submit Section 48 annual report.", category: "Filing", date: "2026-06-30", status: "In Progress", module: "Annual Filing", modulePath: "/dashboard/annual" },
  { id: "o10", title: "Annual Staff Training Renewal", description: "All staff to complete refresher training.", category: "Training", date: "2026-07-01", status: "Not Started", module: "Staff Training", modulePath: "/dashboard/training" },
];

type Ctx = {
  obligations: Obligation[];
  add: (o: Omit<Obligation, "id" | "module" | "modulePath" | "status">) => void;
};

const CalendarCtx = createContext<Ctx | null>(null);
const KEY = "complyng:obligations";

const moduleFor = (cat: ObligationCategory) => {
  const map: Record<ObligationCategory, { module: string; modulePath: string }> = {
    DSR: { module: "DSR Manager", modulePath: "/dashboard/dsr" },
    Vendor: { module: "Vendor Tracker", modulePath: "/dashboard/vendor" },
    Breach: { module: "Breach Response", modulePath: "/dashboard/breach" },
    Regulatory: { module: "Regulatory Alerts", modulePath: "/dashboard/regulatory" },
    Filing: { module: "Annual Filing", modulePath: "/dashboard/annual" },
    Training: { module: "Staff Training", modulePath: "/dashboard/training" },
    Internal: { module: "Dashboard", modulePath: "/dashboard" },
  };
  return map[cat];
};

export const CalendarProvider = ({ children }: { children: ReactNode }) => {
  const [obligations, setObligations] = useState<Obligation[]>(seed);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setObligations(parsed);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(obligations)); } catch {}
  }, [obligations]);

  const add: Ctx["add"] = (o) => {
    const m = moduleFor(o.category);
    setObligations((prev) => [
      ...prev,
      { ...o, id: `o${Date.now()}`, ...m, status: "Scheduled" },
    ]);
  };

  return <CalendarCtx.Provider value={{ obligations, add }}>{children}</CalendarCtx.Provider>;
};

export const useCalendar = () => {
  const v = useContext(CalendarCtx);
  if (!v) throw new Error("useCalendar must be inside CalendarProvider");
  return v;
};

export const categoryColor = (cat: ObligationCategory) => {
  switch (cat) {
    case "DSR": return { chip: "bg-coral text-white", border: "border-l-coral", text: "text-coral", soft: "bg-coral/10 border-coral/30" };
    case "Breach": return { chip: "bg-coral text-white", border: "border-l-coral", text: "text-coral", soft: "bg-coral/10 border-coral/30" };
    case "Vendor": return { chip: "bg-amber text-white", border: "border-l-amber", text: "text-amber", soft: "bg-amber/10 border-amber/30" };
    case "Training": return { chip: "bg-amber text-white", border: "border-l-amber", text: "text-amber", soft: "bg-amber/10 border-amber/30" };
    case "Filing": return { chip: "bg-teal text-white", border: "border-l-teal", text: "text-teal", soft: "bg-teal/10 border-teal/30" };
    case "Internal": return { chip: "bg-teal text-white", border: "border-l-teal", text: "text-teal", soft: "bg-teal/10 border-teal/30" };
    case "Regulatory": return { chip: "bg-purple-600 text-white", border: "border-l-purple-600", text: "text-purple-600", soft: "bg-purple-100 border-purple-300 text-purple-700" };
  }
};

export const statusBadgeClass = (s: Obligation["status"]) => {
  switch (s) {
    case "Overdue": return "bg-coral/10 text-coral border-coral/30";
    case "Due Soon": return "bg-amber/10 text-amber border-amber/30";
    case "Action Required": return "bg-purple-100 text-purple-700 border-purple-300";
    case "Pending":
    case "Scheduled": return "bg-teal/10 text-teal border-teal/30";
    case "In Progress": return "bg-amber/10 text-amber border-amber/30";
    case "Not Started": return "bg-muted text-muted-foreground border-border";
  }
};

export const daysFromNow = (iso: string, ref = new Date("2026-04-20")): number => {
  const d = new Date(iso + "T00:00:00");
  const diff = Math.round((d.getTime() - ref.getTime()) / 86400000);
  return diff;
};

export const formatDateShort = (iso: string) => {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-GB", { month: "short", day: "numeric" });
};
