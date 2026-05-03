import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";

export const SplashScreen = ({ children }: { children: React.ReactNode }) => {
  const [show, setShow] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFade(true), 1700);
    const hideTimer = setTimeout(() => setShow(false), 2000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <>
      {children}
      {show && (
        <div
          className={`fixed inset-0 z-[9999] bg-navy flex flex-col items-center justify-center transition-opacity duration-300 ${
            fade ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="flex items-center gap-3 animate-scale-in">
            <span className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-teal" />
            </span>
            <span className="text-4xl font-bold text-white tracking-tight">ComplyNG</span>
          </div>
          <p className="mt-4 text-sm text-white/60 animate-fade-in">
            Nigeria's NDPA 2023 Compliance Platform
          </p>
        </div>
      )}
    </>
  );
};
