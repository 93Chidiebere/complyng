import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ShieldCheck, Check } from "lucide-react";

export const WizardShell = ({
  brandLabel,
  backHref,
  backLabel,
  step,
  totalSteps,
  children,
}: {
  brandLabel: string;
  backHref: string;
  backLabel: string;
  step: number;
  totalSteps: number;
  children: ReactNode;
}) => (
  <div className="min-h-screen bg-background">
    <header className="bg-white border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-bold text-navy">
          <span className="w-8 h-8 rounded-md bg-navy flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-teal" />
          </span>
          ComplyNG <span className="text-teal">{brandLabel}</span>
        </Link>
        <Link to={backHref} className="text-sm text-muted-foreground hover:text-navy">{backLabel}</Link>
      </div>
    </header>

    <div className="container py-12 max-w-3xl">
      <div className="mb-8">
        <p className="text-sm text-teal font-semibold mb-3">Step {step} of {totalSteps}</p>
        <div className="flex gap-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className={`flex-1 h-1.5 rounded-full ${i < step ? "bg-teal" : "bg-border"}`} />
          ))}
        </div>
      </div>
      <div className="card-cn-active p-8">{children}</div>
    </div>

    <style>{`
      .input-cn {
        width: 100%;
        padding: 0.625rem 0.875rem;
        border: 1px solid hsl(var(--border));
        border-radius: 0.375rem;
        background: white;
        font-size: 0.875rem;
        color: hsl(var(--navy));
        outline: none;
        transition: border-color .15s, box-shadow .15s;
      }
      .input-cn:focus {
        border-color: hsl(var(--teal));
        box-shadow: 0 0 0 3px hsl(var(--teal) / 0.15);
      }
    `}</style>
  </div>
);

export const WizardNav = ({
  onBack,
  onNext,
  backDisabled,
  nextLabel = "Continue",
}: {
  onBack: () => void;
  onNext: () => void;
  backDisabled?: boolean;
  nextLabel?: string;
}) => (
  <div className="mt-8 pt-6 border-t border-border flex justify-between">
    <button
      onClick={onBack}
      disabled={backDisabled}
      className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-navy disabled:opacity-30"
    >
      <ChevronLeft className="w-4 h-4" /> Back
    </button>
    <button onClick={onNext} className="btn-teal text-sm">
      {nextLabel} <ChevronRight className="w-4 h-4" />
    </button>
  </div>
);

export const WField = ({ label, children }: { label: string; children: ReactNode }) => (
  <div>
    <label className="block text-sm font-semibold text-navy mb-2">{label}</label>
    {children}
  </div>
);

export const WCheckCard = ({
  label,
  checked,
  onClick,
}: {
  label: string;
  checked: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-2.5 rounded-md border text-sm text-left transition-colors ${
      checked ? "border-teal bg-teal/5 text-navy" : "border-border bg-white text-navy hover:border-teal"
    }`}
  >
    <span className={`w-4 h-4 rounded border flex items-center justify-center ${checked ? "bg-teal border-teal" : "border-border"}`}>
      {checked && <Check className="w-3 h-3 text-white" />}
    </span>
    {label}
  </button>
);

export const WPill = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-5 py-2 rounded-md border text-sm font-medium transition-colors ${
      active ? "bg-teal border-teal text-white" : "bg-white border-border text-navy hover:border-teal"
    }`}
  >
    {label}
  </button>
);

export const WRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between gap-4">
    <span className="text-muted-foreground">{label}</span>
    <span className="text-navy font-medium text-right">{value}</span>
  </div>
);
