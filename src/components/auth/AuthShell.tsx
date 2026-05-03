import { Link } from "react-router-dom";
import { ShieldCheck, FileCheck2, LayoutDashboard, Layers, Sparkles, CheckCircle2 } from "lucide-react";

export const AuthShell = ({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) => {
  return (
    <div className="min-h-screen bg-navy flex flex-col">
      <header className="container py-6">
        <Link to="/" className="inline-flex items-center gap-2 font-bold text-white text-lg">
          <span className="w-8 h-8 rounded-md bg-white/10 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-teal" />
          </span>
          ComplyNG
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-10 items-center">
          {/* Marketing / brand panel */}
          <div className="hidden lg:flex flex-col text-white">
            <h2 className="text-4xl xl:text-5xl font-bold leading-tight">
              ComplyNG
            </h2>
            <p className="mt-3 text-lg text-white/90 font-medium">
              Nigeria's AI-Powered NDPA 2023 Compliance Platform
            </p>
            <p className="mt-2 text-sm italic text-white/70">
              From one-time audit to continuous compliance operations.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {["NDPA 2023 Ready", "Claude AI Powered", "10+ Compliance Modules"].map((b) => (
                <span
                  key={b}
                  className="px-3 py-1 rounded-full border border-teal/40 text-teal text-xs font-medium bg-teal/5"
                >
                  {b}
                </span>
              ))}
            </div>

            <div className="mt-10 grid sm:grid-cols-3 gap-4">
              {[
                { icon: FileCheck2, title: "Initial Audit", desc: "Instant gap analysis against NDPA 2023." },
                { icon: LayoutDashboard, title: "Living Dashboard", desc: "Track posture in real time." },
                { icon: Layers, title: "Active Modules", desc: "DSR, DPIA, Vendor, Breach, Filing & more." },
              ].map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <span className="w-9 h-9 rounded-md bg-teal/15 flex items-center justify-center mb-3">
                      <Icon className="w-4 h-4 text-teal" />
                    </span>
                    <div className="text-sm font-semibold text-white">{f.title}</div>
                    <div className="text-xs text-white/70 mt-1 leading-snug">{f.desc}</div>
                  </div>
                );
              })}
            </div>

            <ul className="mt-8 space-y-2 text-sm text-white/80">
              {[
                "Trusted by businesses, DPCO practitioners, consultants & investors",
                "Aligned to NDPA 2023 and NDPC guidance",
                "Built for Nigerian organizations",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal mt-0.5 shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 inline-flex items-center gap-2 text-xs text-white/60">
              <Sparkles className="w-3.5 h-3.5 text-teal" />
              Register once — manage compliance across your entire organization.
            </div>
          </div>

          {/* Auth card */}
          <div>
            <div className="bg-white rounded-xl shadow-2xl p-8">
              <h1 className="text-2xl font-bold text-navy">{title}</h1>
              {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
              <div className="mt-6">{children}</div>
            </div>
            {footer && <div className="mt-6 text-center text-sm text-white/80">{footer}</div>}
          </div>
        </div>
      </main>

      <footer className="container py-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} ComplyNG. Nigeria's NDPA 2023 Compliance Platform.
      </footer>
    </div>
  );
};

export const GoogleButton = ({ onClick, label = "Continue with Google" }: { onClick: () => void; label?: string }) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full inline-flex items-center justify-center gap-2 border border-border rounded-md py-2.5 text-sm font-medium text-navy hover:bg-muted transition-colors"
  >
    <svg className="w-4 h-4" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.5-4.5 2.4-7.2 2.4-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.6l6.2 5.2c-.4.4 6.6-4.8 6.6-14.8 0-1.3-.1-2.3-.4-3.5z"/></svg>
    {label}
  </button>
);

export const Divider = ({ label }: { label: string }) => (
  <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
    <div className="flex-1 h-px bg-border" />
    <span>{label}</span>
    <div className="flex-1 h-px bg-border" />
  </div>
);
