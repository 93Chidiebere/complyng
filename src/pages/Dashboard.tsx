import { Layout } from "@/components/Layout";
import { LayoutDashboard } from "lucide-react";

const Dashboard = () => {
  return (
    <Layout>
      <div className="container py-20">
        <div className="card-cn-active p-12 text-center max-w-2xl mx-auto">
          <div className="w-14 h-14 mx-auto rounded-md bg-teal/10 flex items-center justify-center">
            <LayoutDashboard className="w-7 h-7 text-teal" />
          </div>
          <h1 className="text-3xl text-navy mt-5">Dashboard — built in Stage 2</h1>
          <p className="mt-3 text-muted-foreground">
            Your living compliance dashboard with all 6 modules — DSR, DPIA, Vendor, Breach,
            Regulatory, and Annual Filing — is coming next.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
