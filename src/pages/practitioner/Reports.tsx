import { Link } from "react-router-dom";
import { clients } from "@/data/practitionerData";
import { usePageTitle } from "@/hooks/usePageTitle";

const Reports = () => {
  usePageTitle("Practitioner Reports");
  return (
    <div className="space-y-6">
      <h1 className="text-3xl text-navy">Reports</h1>
      <p className="text-sm text-muted-foreground">Generate annual audit reports for any client in your portfolio.</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.map((c) => (
          <div key={c.id} className="card-cn p-5">
            <p className="font-semibold text-navy">{c.name}</p>
            <p className="text-xs text-muted-foreground mt-1">{c.industry} · Last audit {c.lastAudit}</p>
            <Link to={`/practitioner/client/${c.id}`} className="btn-teal text-xs mt-4 inline-flex">Open Reports</Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Reports;
