import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthShell, GoogleButton, Divider } from "@/components/auth/AuthShell";
import { useAuth, UserType } from "@/state/AuthContext";
import { usePageTitle } from "@/hooks/usePageTitle";
import { Building2, UserCog, Users, Briefcase, Loader2 } from "lucide-react";

const userTypes: { id: UserType; label: string; description: string; icon: any }[] = [
  { id: "business", label: "Business", description: "Register your company for NDPA compliance", icon: Building2 },
  { id: "practitioner", label: "DPCO Practitioner", description: "NDPC-licensed compliance consultants", icon: UserCog },
  { id: "consultant", label: "Compliance Consultant", description: "Independent expert joining the network", icon: Users },
  { id: "investor", label: "Investor", description: "VC/Angel assessing portfolio compliance", icon: Briefcase },
];

const wizardRoute = (t: UserType) =>
  t === "practitioner" ? "/practitioner/onboard"
  : t === "consultant" ? "/consultant/onboard"
  : t === "investor" ? "/investor/onboard"
  : "/onboard";

const Register = () => {
  usePageTitle("Register");
  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [userType, setUserType] = useState<UserType>("business");
  const [fullName, setFullName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    if (password !== confirm) return setError("Passwords do not match.");
    setLoading(true);
    const { error } = await register({ email, password, fullName, userType, organization });
    setLoading(false);
    if (error) return setError(error);
    navigate(wizardRoute(userType));
  };

  const handleGoogle = async () => {
    await loginWithGoogle(userType);
    navigate(wizardRoute(userType));
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Register your organization on ComplyNG in less than a minute."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="text-teal font-semibold hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <div className="mb-5">
        <label className="block text-sm font-semibold text-navy mb-2">I am a…</label>
        <div className="grid grid-cols-2 gap-2">
          {userTypes.map((t) => {
            const Icon = t.icon;
            const active = userType === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setUserType(t.id)}
                className={`text-left p-3 rounded-md border transition-colors ${
                  active ? "border-teal bg-teal/5" : "border-border hover:border-teal/50"
                }`}
              >
                <Icon className={`w-4 h-4 mb-1.5 ${active ? "text-teal" : "text-muted-foreground"}`} />
                <div className="text-sm font-semibold text-navy">{t.label}</div>
                <div className="text-[11px] text-muted-foreground leading-tight mt-0.5">{t.description}</div>
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5">Full name</label>
          <input
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5">
            {userType === "investor" ? "Firm name" : userType === "practitioner" ? "Practice name" : "Organization name"}
          </label>
          <input
            required
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
            placeholder="Acme Ltd"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5">Work email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
            placeholder="you@company.com"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-semibold text-navy mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
              placeholder="6+ characters"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-navy mb-1.5">Confirm</label>
            <input
              type="password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
              placeholder="Repeat password"
            />
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">{error}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-teal py-2.5 text-sm justify-center disabled:opacity-70"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create account"}
        </button>

        <p className="text-[11px] text-muted-foreground text-center">
          By registering you agree to our Terms and Privacy Policy.
        </p>
      </form>

      <Divider label="OR" />
      <GoogleButton onClick={handleGoogle} />
    </AuthShell>
  );
};

export default Register;
