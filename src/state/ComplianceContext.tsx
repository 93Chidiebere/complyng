import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type ComplianceState = {
  score: number;
  resolvedGaps: string[]; // gap titles
  setScore: (s: number) => void;
  resolveGaps: (titles: string[], scoreBoost: number) => void;
};

const Ctx = createContext<ComplianceState | null>(null);

const STORAGE_KEY = "complyng:compliance";

export const ComplianceProvider = ({ children }: { children: ReactNode }) => {
  const [score, setScoreState] = useState(62);
  const [resolvedGaps, setResolvedGaps] = useState<string[]>([]);

  // Load once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (typeof parsed.score === "number") setScoreState(parsed.score);
        if (Array.isArray(parsed.resolvedGaps)) setResolvedGaps(parsed.resolvedGaps);
      }
    } catch {}
  }, []);

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ score, resolvedGaps }));
    } catch {}
  }, [score, resolvedGaps]);

  // Animate score change
  const setScore = (target: number) => {
    const start = score;
    const diff = target - start;
    if (diff === 0) return;
    const steps = 24;
    const stepMs = 25;
    let i = 0;
    const id = setInterval(() => {
      i++;
      const next = Math.round(start + (diff * i) / steps);
      setScoreState(next);
      if (i >= steps) {
        clearInterval(id);
        setScoreState(target);
      }
    }, stepMs);
  };

  const resolveGaps = (titles: string[], scoreBoost: number) => {
    setResolvedGaps((prev) => Array.from(new Set([...prev, ...titles])));
    setScore(Math.min(100, score + scoreBoost));
  };

  return (
    <Ctx.Provider value={{ score, resolvedGaps, setScore, resolveGaps }}>
      {children}
    </Ctx.Provider>
  );
};

export const useCompliance = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCompliance must be used inside ComplianceProvider");
  return v;
};
