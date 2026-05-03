import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X, ShieldCheck, LogOut } from "lucide-react";
import { useAuth } from "@/state/AuthContext";

const navLinks = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/audit", label: "Audit" },
  { to: "/investor", label: "Investor Portal" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white border-b border-border sticky top-0 z-40">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-bold text-navy text-lg">
          <span className="w-8 h-8 rounded-md bg-navy flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-teal" />
          </span>
          ComplyNG
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium pb-1 border-b-2 transition-colors ${
                  isActive
                    ? "text-navy border-teal"
                    : "text-muted-foreground border-transparent hover:text-navy"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-muted-foreground">
                {user.fullName.split(" ")[0]}
              </span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-navy"
              >
                <LogOut className="w-4 h-4" /> Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-navy">
                Log in
              </Link>
              <Link to="/register" className="btn-teal text-sm">Get Started</Link>
            </>
          )}
        </div>

        <button
          className="md:hidden text-navy"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-white">
          <div className="container py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`text-sm font-medium ${
                  location.pathname === link.to ? "text-teal" : "text-navy"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <button onClick={handleLogout} className="btn-teal text-sm w-full">
                Log out
              </button>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="text-sm font-medium text-navy">
                  Log in
                </Link>
                <Link to="/register" onClick={() => setOpen(false)} className="btn-teal text-sm w-full">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
