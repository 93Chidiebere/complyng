import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { ReactNode } from "react";
import { useAuth } from "@/state/AuthContext";

export const InvestorTopNav = ({ variant = "marketing" }: { variant?: "marketing" | "app" }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const handleSignOut = () => { logout(); navigate("/login"); };
  const links = variant === "marketing"
    ? [
        { to: "/investor#how", label: "How It Works", external: true },
        { to: "/investor#pricing", label: "Pricing", external: true },
      ]
    : [
        { to: "/investor/dashboard", label: "Portfolio", end: true },
        { to: "/investor/dashboard/new-assessment", label: "Assessments" },
        { to: "/investor/dashboard/billing", label: "Billing" },
      ];

  return (
    <header className={`${variant === "app" ? "bg-navy text-white" : "bg-white border-b border-border"} sticky top-0 z-40`}>
      <div className="container flex items-center justify-between h-16">
        <Link to={variant === "app" ? "/investor/dashboard" : "/investor"} className="flex items-center gap-2 font-bold">
          <span className={`w-8 h-8 rounded-md flex items-center justify-center ${variant === "app" ? "bg-white/10" : "bg-navy"}`}>
            <ShieldCheck className="w-5 h-5 text-teal" />
          </span>
          <span className={variant === "app" ? "text-white" : "text-navy"}>
            ComplyNG <span className="text-teal">Investors</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) =>
            "external" in l && l.external ? (
              <a key={l.to} href={l.to} className={`text-sm font-medium ${variant === "app" ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-navy"}`}>
                {l.label}
              </a>
            ) : (
              <NavLink
                key={l.to}
                to={l.to}
                end={(l as { end?: boolean }).end}
                className={({ isActive }) =>
                  `text-sm font-medium pb-1 border-b-2 transition-colors ${
                    isActive
                      ? variant === "app" ? "text-white border-teal" : "text-navy border-teal"
                      : variant === "app" ? "text-white/70 border-transparent hover:text-white" : "text-muted-foreground border-transparent hover:text-navy"
                  }`
                }
              >
                {l.label}
              </NavLink>
            )
          )}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/"
            className={`hidden sm:inline-flex items-center gap-1 text-sm font-medium ${
              variant === "app" ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-navy"
            }`}
          >
            ← Back to ComplyNG
          </Link>
          {variant === "marketing" ? (
            <Link to={user ? "/investor/dashboard" : "/login"} className="btn-teal text-sm">
              {user ? "Open Dashboard" : "Sign In"}
            </Link>
          ) : (
            <button onClick={handleSignOut} className="text-sm text-white/70 hover:text-white font-medium">
              Sign Out
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export const InvestorAppLayout = ({ children }: { children?: ReactNode }) => (
  <div className="min-h-screen bg-background">
    <InvestorTopNav variant="app" />
    <main className="container py-8">
      {children}
      <Outlet />
    </main>
  </div>
);
