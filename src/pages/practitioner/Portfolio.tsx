import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { clients, practitioner, scoreBadgeClass } from "@/data/practitionerData";
import { usePageTitle } from "@/hooks/usePageTitle";
import { AlertTriangle, Users, FileText, CheckCircle2 } from "lucide-react";

const Stat = ({ label, value, icon: Icon, tone = "teal" }: any) => (
  <div className="card-cn-active p-5">
    <div className="flex items-center justify-between">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <Icon className={`w-4 h-4 text-${tone}`} />
    </div>
    <p className="text-3xl font-extrabold text-navy mt-2">{value}</p>
  </div>
);

const Portfolio = () => {
  usePageTitle("Practitioner Portfolio");
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  const submit = () => {
    setOpen(false);
    toast.success(`Onboarding invitation sent to ${email || "client"}`);
    setEmail("");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl text-navy">My Client Portfolio</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {practitioner.name} <span className="text-border mx-2">|</span> License: {practitioner.license}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat label="Total Clients" value="8" icon={Users} />
        <Stat label="Audits Due This Month" value="3" icon={FileText} />
        <Stat label="Critical Issues" value="5" icon={AlertTriangle} tone="coral" />
        <Stat label="Reports This Quarter" value="6" icon={CheckCircle2} />
      </div>

      <div className="card-cn p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg text-navy">Clients</h2>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button className="btn-teal text-sm">+ Add New Client</button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Client</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <div><Label>Organization name</Label><Input placeholder="Acme Ltd" /></div>
                <div><Label>Industry</Label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                    <option>Fintech</option><option>Healthtech</option><option>Edtech</option>
                    <option>E-commerce</option><option>Logistics</option><option>HR Platform</option>
                    <option>AgriTech</option><option>Other</option>
                  </select>
                </div>
                <div><Label>Contact name</Label><Input placeholder="Jane Doe" /></div>
                <div><Label>Contact email</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@acme.ng" /></div>
                <div>
                  <Label>Licensed to conduct audit?</Label>
                  <div className="flex gap-4 mt-2 text-sm">
                    <label className="flex items-center gap-2"><input type="radio" name="lic" defaultChecked /> Yes</label>
                    <label className="flex items-center gap-2"><input type="radio" name="lic" /> No</label>
                  </div>
                </div>
                <div><Label>Notes</Label><Textarea rows={3} /></div>
              </div>
              <DialogFooter>
                <button onClick={submit} className="btn-teal text-sm">Add Client & Send Onboarding Invite</button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="py-3 pr-4">Client</th>
                <th className="py-3 pr-4">Industry</th>
                <th className="py-3 pr-4">Score</th>
                <th className="py-3 pr-4">Open Issues</th>
                <th className="py-3 pr-4">Last Audit</th>
                <th className="py-3 pr-4">Next Deadline</th>
                <th className="py-3 pr-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.id} className="border-b border-border/60 hover:bg-muted/40">
                  <td className="py-3 pr-4 font-semibold text-navy">{c.name}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{c.industry}</td>
                  <td className="py-3 pr-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${scoreBadgeClass(c.score)}`}>
                      {c.score}/100
                    </span>
                  </td>
                  <td className="py-3 pr-4">{c.issues}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{c.lastAudit}</td>
                  <td className={`py-3 pr-4 ${c.overdue ? "text-coral font-semibold" : ""}`}>{c.nextDeadline}</td>
                  <td className="py-3 pr-4 text-right">
                    <Link to={`/practitioner/client/${c.id}`} className="btn-teal text-xs px-3 py-1.5">
                      {c.needsAudit ? "Run Audit" : "Manage"}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
