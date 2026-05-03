export type ClientRow = {
  id: string;
  name: string;
  industry: string;
  score: number;
  issues: number;
  lastAudit: string;
  nextDeadline: string;
  overdue?: boolean;
  needsAudit?: boolean;
};

export const practitioner = {
  name: "Adaeze Compliance Services",
  license: "NDPC/DPCO/2024/0847",
};

export const clients: ClientRow[] = [
  { id: "techpay", name: "TechPay Nigeria Ltd", industry: "Fintech", score: 71, issues: 3, lastAudit: "Mar 2026", nextDeadline: "Annual Filing Jun 30" },
  { id: "studyai", name: "StudyAI Platforms", industry: "Edtech", score: 58, issues: 7, lastAudit: "Feb 2026", nextDeadline: "DPIA Due Apr 30" },
  { id: "healthbridge", name: "HealthBridge HMO", industry: "Healthtech", score: 83, issues: 1, lastAudit: "Apr 2026", nextDeadline: "Training Renewal Jul 1" },
  { id: "quickhr", name: "QuickHR Solutions", industry: "HR Platform", score: 45, issues: 11, lastAudit: "Jan 2026", nextDeadline: "OVERDUE — DSR", overdue: true },
  { id: "retailfirst", name: "RetailFirst E-commerce", industry: "E-commerce", score: 62, issues: 5, lastAudit: "Mar 2026", nextDeadline: "Vendor Review May 20" },
  { id: "farmdata", name: "FarmData Analytics", industry: "AgriTech", score: 34, issues: 14, lastAudit: "Never", nextDeadline: "Initial Audit Needed", needsAudit: true },
  { id: "lagoscourier", name: "Lagos Courier Co.", industry: "Logistics", score: 77, issues: 2, lastAudit: "Apr 2026", nextDeadline: "Annual Filing Jun 30" },
  { id: "naijacare", name: "NaijaCare Pharmacy", industry: "Healthtech", score: 51, issues: 8, lastAudit: "Feb 2026", nextDeadline: "Breach Follow-up Apr 30" },
];

export const portfolioDeadlines = [
  { date: "Apr 18, 2026", daysLeft: -2, client: "QuickHR Solutions", obligation: "DSR Response Overdue", priority: "Critical" },
  { date: "Apr 30, 2026", daysLeft: 10, client: "StudyAI Platforms", obligation: "DPIA for new feature", priority: "High" },
  { date: "Apr 30, 2026", daysLeft: 10, client: "NaijaCare Pharmacy", obligation: "Breach Follow-up Report", priority: "High" },
  { date: "May 20, 2026", daysLeft: 30, client: "RetailFirst E-commerce", obligation: "Annual Vendor Review", priority: "Medium" },
  { date: "Jun 30, 2026", daysLeft: 71, client: "TechPay Nigeria Ltd", obligation: "Annual NDPC Filing", priority: "High" },
  { date: "Jun 30, 2026", daysLeft: 71, client: "Lagos Courier Co.", obligation: "Annual NDPC Filing", priority: "High" },
  { date: "Jul 1, 2026", daysLeft: 72, client: "HealthBridge HMO", obligation: "Annual Staff Training Renewal", priority: "Medium" },
  { date: "TBD", daysLeft: 0, client: "FarmData Analytics", obligation: "Initial Compliance Audit", priority: "Critical" },
];

export const getClient = (id: string) => clients.find((c) => c.id === id) || clients[0];

export const scoreBadgeClass = (score: number) => {
  if (score <= 40) return "bg-coral/15 text-coral border border-coral/30";
  if (score <= 70) return "bg-amber-500/15 text-amber-700 border border-amber-500/30";
  return "bg-green-600/15 text-green-700 border border-green-600/30";
};

export const priorityBadgeClass = (p: string) => {
  if (p === "Critical") return "bg-coral/15 text-coral border border-coral/30";
  if (p === "High") return "bg-amber-500/15 text-amber-700 border border-amber-500/30";
  return "bg-teal/15 text-teal border border-teal/30";
};
