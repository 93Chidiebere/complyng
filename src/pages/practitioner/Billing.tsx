import { usePageTitle } from "@/hooks/usePageTitle";

const Billing = () => {
  usePageTitle("Practitioner Billing");
  return (
    <div className="space-y-6">
      <h1 className="text-3xl text-navy">Billing</h1>
      <div className="card-cn-active p-6">
        <p className="text-sm text-muted-foreground">Practitioner Plan</p>
        <p className="text-3xl font-extrabold text-navy mt-1">₦150,000<span className="text-sm font-medium text-muted-foreground">/month</span></p>
        <p className="text-sm text-muted-foreground mt-2">Up to 50 clients · Annual report generation included</p>
        <button className="btn-teal text-sm mt-5">Manage Subscription</button>
      </div>
    </div>
  );
};
export default Billing;
