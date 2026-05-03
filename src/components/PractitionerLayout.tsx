import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ShieldCheck, ArrowLeft, LogOut } from "lucide-react";
import { useAuth } from "@/state/AuthContext";

const links = [
  { to: "/practitioner/dashboard", label: "Portfolio", end: true },
  { to: "/practitioner/reports", label: "Reports" },
  { to: "/practitioner/deadlines", label: "Deadlines" },
  { to: "/practitioner/billing", label: "Billing" },
];

export const PractitionerLayout = () => {
  const loc = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const handleLogout = () => { logout(); navigate("/login"); };
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b border-border sticky top-0 z-40">
        <div className="container flex items-center justify-between h-16">
          <Link to="/practitioner/dashboard" className="flex items-center gap-2 font-bold text-navy">
            <span className="w-8 h-8 rounded-md bg-navy flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-teal" />
            </span>
            ComplyNG <span className="text-teal">Practitioners</span>
          </Link>
          <nav className="flex items-center gap-6">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `text-sm font-medium pb-1 border-b-2 transition-colors ${
                    isActive || (l.to === "/practitioner/dashboard" && loc.pathname.startsWith("/practitioner/client"))
                      ? "text-navy border-teal"
                      : "text-muted-foreground border-transparent hover:text-navy"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-navy">
              <ArrowLeft className="w-4 h-4" /> ComplyNG
            </Link>
            {user && (
              <button onClick={handleLogout} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-navy">
                <LogOut className="w-4 h-4" /> Log out
              </button>
            )}
          </nav>
        </div>
      </header>
      <main className="container py-8">
        <Outlet />
      </main>
    </div>
  );
};
