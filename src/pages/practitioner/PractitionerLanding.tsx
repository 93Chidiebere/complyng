import { Link } from "react-router-dom";
import { ShieldCheck, Users, FileText, CalendarDays } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";

const PractitionerLanding = () => {
  usePageTitle("ComplyNG for Practitioners");
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-navy">
            <span className="w-8 h-8 rounded-md bg-navy flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-teal" />
            </span>
            ComplyNG <span className="text-teal">Practitioners</span>
          </Link>
          <Link to="/" className="text-sm text-muted-foreground hover:text-navy">← Back to ComplyNG</Link>
        </div>
      </header>

      <section className="bg-navy text-white">
        <div className="container py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold">ComplyNG for Practitioners</h1>
          <p className="mt-5 text-lg text-white/80 max-w-2xl mx-auto">
            Manage your entire client portfolio from one dashboard. Built for NDPC-licensed DPCOs.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/practitioner/onboard" className="btn-teal">Request Practitioner Access</Link>
            <Link to="/practitioner/dashboard" className="btn-teal-outline border-teal text-teal hover:bg-teal hover:text-white">See Demo</Link>
          </div>
        </div>
      </section>

      <section className="container py-20">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Users, title: "Manage up to 50 clients", text: "from one unified dashboard." },
            { icon: FileText, title: "Auto-generate annual audits", text: "for every client in your portfolio." },
            { icon: CalendarDays, title: "Track deadlines portfolio-wide", text: "across every client simultaneously." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="card-cn-active p-6">
              <div className="w-10 h-10 rounded-md bg-teal/10 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-teal" />
              </div>
              <h3 className="text-lg text-navy">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PractitionerLanding;
