import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthShell, GoogleButton, Divider } from "@/components/auth/AuthShell";
import { useAuth } from "@/state/AuthContext";
import { usePageTitle } from "@/hooks/usePageTitle";
import { Loader2 } from "lucide-react";

const routeForUser = (userType: string, profileComplete: boolean) => {
  if (!profileComplete) {
    if (userType === "practitioner") return "/practitioner/onboard";
    if (userType === "consultant") return "/consultant/onboard";
    if (userType === "investor") return "/investor/onboard";
    return "/onboard";
  }
  if (userType === "practitioner") return "/practitioner/dashboard";
  if (userType === "investor") return "/investor/dashboard";
  return "/dashboard";
};

const Login = () => {
  usePageTitle("Log in");
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from as string | undefined;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await login(email, password);
    setLoading(false);
    if (error) {
      setError(error);
      return;
    }
    const session = JSON.parse(localStorage.getItem("complyng_users") || "[]").find(
      (u: any) => u.email.toLowerCase() === email.toLowerCase().trim()
    );
    navigate(from || routeForUser(session.userType, session.profileComplete));
  };

  const handleGoogle = async () => {
    await loginWithGoogle("business");
    navigate(from || "/dashboard");
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to access your ComplyNG workspace."
      footer={
        <>
          New to ComplyNG?{" "}
          <Link to="/register" className="text-teal font-semibold hover:underline">
            Register your organization
          </Link>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
            placeholder="you@company.com"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="block text-sm font-semibold text-navy">Password</label>
            <button type="button" className="text-xs text-teal hover:underline">Forgot?</button>
          </div>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
            placeholder="••••••••"
          />
        </div>

        {error && (
          <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">{error}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-teal py-2.5 text-sm justify-center disabled:opacity-70"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Log in"}
        </button>
      </form>

      <Divider label="OR" />
      <GoogleButton onClick={handleGoogle} />
    </AuthShell>
  );
};

export default Login;
