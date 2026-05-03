import { useState, useMemo } from "react";
import { portfolioDeadlines, clients, priorityBadgeClass } from "@/data/practitionerData";
import { usePageTitle } from "@/hooks/usePageTitle";
import { toast } from "sonner";

const Deadlines = () => {
  usePageTitle("Portfolio Deadlines");
  const [client, setClient] = useState("All");
  const [priority, setPriority] = useState("All");

  const rows = useMemo(() => portfolioDeadlines.filter((r) =>
    (client === "All" || r.client === client) &&
    (priority === "All" || r.priority === priority)
  ), [client, priority]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl text-navy">Deadlines Across Portfolio</h1>

      <div className="card-cn p-5 flex flex-wrap gap-4 items-end">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">Client</label>
          <select value={client} onChange={(e) => setClient(e.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
            <option>All</option>
            {clients.map((c) => <option key={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">Priority</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
            <option>All</option><option>Critical</option><option>High</option><option>Medium</option>
          </select>
        </div>
      </div>

      <div className="card-cn p-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
              <th className="py-3 pr-4">Date</th>
              <th className="py-3 pr-4">Days Left</th>
              <th className="py-3 pr-4">Client</th>
              <th className="py-3 pr-4">Obligation</th>
              <th className="py-3 pr-4">Priority</th>
              <th className="py-3 pr-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-border/60 hover:bg-muted/40">
                <td className="py-3 pr-4 text-navy font-medium">{r.date}</td>
                <td className={`py-3 pr-4 ${r.daysLeft < 0 ? "text-coral font-bold" : "text-muted-foreground"}`}>
                  {r.daysLeft < 0 ? `${Math.abs(r.daysLeft)} overdue` : r.daysLeft === 0 ? "—" : r.daysLeft}
                </td>
                <td className="py-3 pr-4">{r.client}</td>
                <td className="py-3 pr-4 text-muted-foreground">{r.obligation}</td>
                <td className="py-3 pr-4">
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${priorityBadgeClass(r.priority)}`}>{r.priority}</span>
                </td>
                <td className="py-3 pr-4 text-right">
                  <button onClick={() => toast(`Reminder sent for ${r.client}`)} className="btn-teal-outline text-xs px-3 py-1">Send Reminder</button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={6} className="py-8 text-center text-muted-foreground">No matching deadlines.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Deadlines;
