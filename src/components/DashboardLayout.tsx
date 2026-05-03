import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Home,
  Bell,
  Shield,
  Truck,
  AlertTriangle,
  FileText,
  FileSignature,
  Calendar,
  Menu,
  X,
  ShieldCheck,
  GraduationCap,
  ToggleRight,
  Umbrella,
  Globe,
  UserCheck,
  Headphones,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCompliance } from "@/state/ComplianceContext";
import { useAuth } from "@/state/AuthContext";

type NavItem = {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  end?: boolean;
  badge?: string;
  badgeTone?: "coral" | "amber" | "teal";
};

const mainItems: NavItem[] = [
  { to: "/dashboard", label: "Dashboard", icon: Home, end: true },
  { to: "/dashboard/calendar", label: "Calendar", icon: Calendar },
  { to: "/dashboard/policy-generator", label: "Policy Generator", icon: FileSignature },
];

const moduleItems: NavItem[] = [
  { to: "/dashboard/regulatory", label: "Regulatory Alerts", icon: Bell, badge: "2 new", badgeTone: "coral" },
  { to: "/dashboard/dsr", label: "DSR Manager", icon: UserCheck, badge: "3", badgeTone: "amber" },
  { to: "/dashboard/dpia", label: "DPIA Generator", icon: Shield },
  { to: "/dashboard/vendor", label: "Vendor Tracker", icon: Truck },
  { to: "/dashboard/breach", label: "Breach Response", icon: AlertTriangle },
  { to: "/dashboard/training", label: "Staff Training", icon: GraduationCap },
  { to: "/dashboard/consent", label: "Consent Manager", icon: ToggleRight },
  { to: "/dashboard/insurance", label: "Breach Insurance", icon: Umbrella },
  { to: "/dashboard/transfers", label: "Data Transfer", icon: Globe },
];

const reportItems: NavItem[] = [
  { to: "/dashboard/annual", label: "Annual Filing", icon: FileText },
];

const upgradeItems: NavItem[] = [
  { to: "/dashboard/verified-badge", label: "Verified Badge", icon: ShieldCheck, badge: "NEW", badgeTone: "teal" },
  { to: "/dashboard/managed-service", label: "Managed Service", icon: Headphones, badge: "PREMIUM", badgeTone: "coral" },
];

const badgeClass = (tone?: string) => {
  if (tone === "coral") return "bg-coral text-white";
  if (tone === "amber") return "bg-amber text-white";
  return "bg-teal text-white";
};

export const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const { score } = useCompliance();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const handleNav = () => setOpen(false);
  const handleLogout = () => { logout(); navigate("/login"); };

  const renderItem = (item: NavItem) => {
    const Icon = item.icon;
    return (
      <NavLink
        key={item.to}
        to={item.to}
        end={item.end}
        onClick={handleNav}
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
            isActive ? "bg-teal/15 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
          }`
        }
      >
        {({ isActive }) => (
          <>
            {isActive && <span className="absolute left-0 top-2 bottom-2 w-1 bg-teal rounded-r" />}
            <Icon className="w-4 h-4 shrink-0" />
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${badgeClass(item.badgeTone)}`}>
                {item.badge}
              </span>
            )}
          </>
        )}
      </NavLink>
    );
  };

  const sectionLabel = (label: string) => (
    <p className="px-3 pt-4 pb-1.5 text-[10px] font-bold uppercase tracking-widest text-white/40">{label}</p>
  );

  return (
    <div className="min-h-screen flex bg-background">
      <header className="lg:hidden fixed top-0 inset-x-0 h-14 bg-navy text-white z-40 flex items-center justify-between px-4 border-b border-white/10">
        <Link to="/" className="flex items-center gap-2 font-bold">
          <span className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-teal" />
          </span>
          ComplyNG
        </Link>
        <button onClick={() => setOpen(!open)} aria-label="Toggle sidebar">
          {open ? <X /> : <Menu />}
        </button>
      </header>

      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-navy text-white flex flex-col z-50 transition-transform lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link to="/" className="flex items-center gap-2 px-5 h-16 border-b border-white/10 font-bold text-lg shrink-0">
          <span className="w-8 h-8 rounded-md bg-white/10 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-teal" />
          </span>
          ComplyNG
        </Link>

        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
          {sectionLabel("Main")}
          {mainItems.map(renderItem)}
          {sectionLabel("Modules")}
          {moduleItems.map(renderItem)}
          {sectionLabel("Reports")}
          {reportItems.map(renderItem)}
          {sectionLabel("Upgrades")}
          {upgradeItems.map(renderItem)}
        </nav>

        <div className="p-3 border-t border-white/10 shrink-0 space-y-2">
          <div className="bg-white/5 rounded-md p-3 flex items-center gap-3">
            <MiniRing score={score} />
            <div className="min-w-0">
              <p className="text-xs text-white/60 uppercase tracking-wider font-semibold">Score</p>
              <p className="text-lg font-bold text-white leading-tight tabular-nums">{score} / 100</p>
            </div>
          </div>
          {user && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/70 truncate">{user.fullName.split(" ")[0]}</span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1 text-white/70 hover:text-white"
              >
                <LogOut className="w-3.5 h-3.5" /> Log out
              </button>
            </div>
          )}
        </div>
      </aside>

      {open && <div className="lg:hidden fixed inset-0 bg-black/40 z-40" onClick={() => setOpen(false)} />}

      <div className="flex-1 min-w-0 lg:ml-0 pt-14 lg:pt-0">
        <main className="p-6 lg:p-8 max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const MiniRing = ({ score }: { score: number }) => {
  const r = 18;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  return (
    <div className="relative w-12 h-12 shrink-0">
      <svg viewBox="0 0 48 48" className="-rotate-90 w-full h-full">
        <circle cx="24" cy="24" r={r} stroke="rgba(255,255,255,0.15)" strokeWidth="4" fill="none" />
        <circle
          cx="24" cy="24" r={r}
          stroke="hsl(var(--teal))" strokeWidth="4" fill="none"
          strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.4s ease" }}
        />
      </svg>
    </div>
  );
};
