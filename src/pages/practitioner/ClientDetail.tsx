import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getClient, scoreBadgeClass } from "@/data/practitionerData";
import { usePageTitle } from "@/hooks/usePageTitle";
import { ChevronRight } from "lucide-react";

const obligations = [
  { name: "Annual NDPC Filing", due: "Jun 30, 2026", status: "On track" },
  { name: "DSR Response (avg)", due: "Ongoing", status: "Attention" },
  { name: "Vendor DPA Review", due: "May 20, 2026", status: "On track" },
  { name: "Staff Training Renewal", due: "Jul 1, 2026", status: "Pending" },
  { name: "DPIA — New product", due: "Apr 30, 2026", status: "In progress" },
  { name: "Breach Drill", due: "Aug 15, 2026", status: "Scheduled" },
];

const modules = [
  ["Regulatory Alerts", "Complete", "Apr 12, 2026"],
  ["DSR Manager", "In Progress", "Apr 18, 2026"],
  ["DPIA Generator", "In Progress", "Apr 10, 2026"],
  ["Vendor Tracker", "Complete", "Apr 5, 2026"],
  ["Breach Response", "Not Started", "—"],
  ["Annual Filing", "In Progress", "Apr 1, 2026"],
  ["Staff Training", "In Progress", "Mar 28, 2026"],
  ["Consent Manager", "Complete", "Apr 8, 2026"],
  ["Breach Insurance", "Not Started", "—"],
  ["Data Transfer Assessor", "Complete", "Mar 30, 2026"],
];

const statusTone = (s: string) =>
  s === "Complete" ? "bg-green-600/15 text-green-700 border-green-600/30" :
  s === "In Progress" ? "bg-amber-500/15 text-amber-700 border-amber-500/30" :
  "bg-muted text-muted-foreground border-border";

const ClientDetail = () => {
  const { id = "techpay" } = useParams();
  const client = getClient(id);
  usePageTitle(`${client.name} — Practitioner`);

  const [notes, setNotes] = useState(
    `Initial audit completed March 2026. Client has appointed a DPO — Chidi Nwosu.\nBreach notification procedure drafted but not formally adopted. Follow up required.\nAnnual filing preparation begins May 2026.`
  );
  const [reportOpen, setReportOpen] = useState(false);
  const [loadingReport, setLoadingReport] = useState(false);

  const generate = () => {
    setLoadingReport(true);
    setTimeout(() => {
      setLoadingReport(false);
      setReportOpen(true);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <nav className="text-sm text-muted-foreground flex items-center gap-1.5">
        <Link to="/practitioner/dashboard" className="hover:text-navy">Portfolio</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-navy font-medium">{client.name}</span>
      </nav>

      <div className="card-cn-active p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl text-navy">{client.name}</h1>
          <p className="text-sm text-muted-foreground mt-1">Industry: {client.industry}</p>
        </div>
        <span className={`px-3 py-1.5 rounded-md text-sm font-bold ${scoreBadgeClass(client.score)}`}>
          Score: {client.score}/100
        </span>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="modules">Modules</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="grid md:grid-cols-2 gap-6 mt-4">
          <div className="card-cn p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Compliance Score</p>
            <div className="flex items-center gap-6 mt-4">
              <div className="relative w-28 h-28">
                <svg viewBox="0 0 36 36" className="w-28 h-28 -rotate-90">
                  <circle cx="18" cy="18" r="16" fill="none" stroke="hsl(var(--border))" strokeWidth="3" />
                  <circle cx="18" cy="18" r="16" fill="none" stroke="hsl(var(--teal))" strokeWidth="3"
                    strokeDasharray={`${(client.score / 100) * 100.5} 100.5`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-extrabold text-navy text-xl">
                  {client.score}
                </div>
              </div>
              <div className="text-sm text-muted-foreground">Out of 100. Updated April 2026.</div>
            </div>
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Obligations</p>
              <table className="w-full text-sm">
                <tbody>
                  {obligations.map((o) => (
                    <tr key={o.name} className="border-b border-border/60 last:border-0">
                      <td className="py-2 text-navy">{o.name}</td>
                      <td className="py-2 text-muted-foreground">{o.due}</td>
                      <td className="py-2 text-right text-xs font-medium">{o.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card-cn p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Practitioner Notes</p>
            <Textarea className="mt-3 min-h-[220px]" value={notes} onChange={(e) => setNotes(e.target.value)} />
            <button onClick={() => toast.success("Notes saved")} className="btn-teal text-sm mt-4">Save Notes</button>
          </div>
        </TabsContent>

        <TabsContent value="modules" className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {modules.map(([name, status, date]) => (
            <div key={name} className="card-cn p-5">
              <p className="font-semibold text-navy">{name}</p>
              <p className="text-xs text-muted-foreground mt-1">Last updated: {date}</p>
              <div className="flex items-center justify-between mt-4">
                <span className={`text-xs font-medium px-2 py-1 rounded-md border ${statusTone(status)}`}>{status}</span>
                <button onClick={() => toast(`Opening ${name} (read-only)`)} className="btn-teal-outline text-xs px-3 py-1">Review</button>
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="reports" className="mt-4">
          <div className="card-cn p-6">
            <h3 className="text-lg text-navy">Annual Audit Report</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Generate a formal NDPC-aligned audit report for {client.name}.
            </p>
            <button onClick={generate} disabled={loadingReport} className="btn-teal text-sm mt-5">
              {loadingReport ? "Generating…" : "Generate Annual Audit Report"}
            </button>
          </div>
        </TabsContent>

        <TabsContent value="notes" className="mt-4">
          <div className="card-cn p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Notes Log</p>
            <Textarea className="mt-3 min-h-[260px]" defaultValue={notes} />
            <p className="text-xs text-muted-foreground mt-3">Last saved: Apr 18, 2026 · 14:22</p>
            <button onClick={() => toast.success("Note saved with timestamp")} className="btn-teal text-sm mt-4">Save Note</button>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={reportOpen} onOpenChange={setReportOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Annual Data Protection Audit Report</DialogTitle>
          </DialogHeader>
          <div className="text-sm space-y-3 text-navy">
            <p><strong>Prepared by:</strong> Adaeze Compliance Services (NDPC/DPCO/2024/0847)</p>
            <p><strong>Client:</strong> {client.name}</p>
            <p><strong>Period:</strong> January 1 – December 31, 2026</p>
            <p><strong>Date:</strong> April 18, 2026</p>
            <hr />
            <p className="font-bold">Executive Summary</p>
            <p className="text-muted-foreground">
              {client.name} demonstrates a compliance posture of {client.score}/100 as at the date of this report.
              Three high-priority gaps remain open. Immediate attention is required on DSR response procedures.
            </p>
            <p className="font-bold mt-3">Sections</p>
            <ol className="list-decimal pl-5 space-y-1 text-muted-foreground">
              <li>Organization & DPO Details — Complete</li>
              <li>Data Processing Activities — 4 activities documented</li>
              <li>Data Subject Requests — 10 received, 9 resolved on time, 1 overdue</li>
              <li>Security Incidents — 0 incidents in period</li>
              <li>Vendor & Processor Register — 6 vendors, 2 missing DPAs</li>
              <li>Staff Training — 7/12 staff trained</li>
              <li>Consent Management — 4,847 consents captured</li>
            </ol>
            <hr />
            <p className="font-bold">Practitioner Certification</p>
            <p className="text-muted-foreground italic">
              I certify that this audit was conducted in accordance with NDPC guidelines and the NDPA 2023.
            </p>
            <p>Adaeze Compliance Services · NDPC/DPCO/2024/0847</p>
          </div>
          <div className="flex gap-3 mt-4">
            <button className="btn-teal text-sm">Download Report as PDF</button>
            <button onClick={() => toast.success(`Report emailed to ${client.name}`)} className="btn-teal-outline text-sm">Email to Client</button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientDetail;
