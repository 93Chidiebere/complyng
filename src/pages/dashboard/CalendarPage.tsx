import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Plus, X, ArrowRight, CalendarDays } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useCalendar, categoryColor, statusBadgeClass, daysFromNow, formatDateShort, ObligationCategory, Obligation } from "@/state/CalendarContext";
import { toast } from "sonner";

const TODAY = new Date("2026-04-20");

const categoryOptions: ObligationCategory[] = ["DSR", "Vendor", "Breach", "Regulatory", "Filing", "Training", "Internal"];

const filters = [
  { label: "All Obligations", value: "ALL" },
  { label: "DSR Deadlines", value: "DSR" },
  { label: "Vendor Renewals", value: "Vendor" },
  { label: "NDPC Filings", value: "Filing" },
  { label: "Breach", value: "Breach" },
  { label: "Training", value: "Training" },
] as const;

const CalendarPage = () => {
  usePageTitle("Obligation Calendar");
  const { obligations, add } = useCalendar();

  const [view, setView] = useState<"month" | "list">("month");
  const [filter, setFilter] = useState<string>("ALL");
  const [month, setMonth] = useState(new Date(2026, 3, 1)); // April 2026
  const [showAdd, setShowAdd] = useState(false);
  const [popover, setPopover] = useState<Obligation | null>(null);

  const filtered = useMemo(() => {
    if (filter === "ALL") return obligations;
    return obligations.filter((o) => o.category === filter);
  }, [obligations, filter]);

  const upcoming = useMemo(() => {
    return [...obligations]
      .filter((o) => daysFromNow(o.date) >= -100)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 3);
  }, [obligations]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl text-navy">Obligation Calendar</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Every NDPA compliance deadline — DSR windows, vendor renewals, filing dates, breach clocks — in one view.
        </p>
      </div>

      {/* Upcoming this week strip */}
      <section>
        <h2 className="text-sm uppercase tracking-wider font-bold text-muted-foreground mb-3">Upcoming this week</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {upcoming.map((o) => {
            const c = categoryColor(o.category);
            const days = daysFromNow(o.date);
            const lead = days < 0 ? "OVERDUE" : days === 0 ? "Today" : `In ${days} day${days === 1 ? "" : "s"}`;
            return (
              <Link key={o.id} to={o.modulePath} className={`bg-card border border-border rounded-lg p-5 border-l-4 ${c.border} hover:shadow-md transition-shadow`}>
                <p className={`text-xs font-bold ${c.text}`}>{lead}: {o.title}</p>
                <p className="text-sm text-navy mt-2 leading-snug">{o.description}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-teal">Go to {o.module} <ArrowRight className="w-3 h-3" /></span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Controls */}
      <section className="card-cn p-4 flex flex-wrap items-center gap-3 justify-between">
        <div className="flex items-center gap-2">
          <button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} className="p-1.5 rounded hover:bg-muted text-navy"><ChevronLeft className="w-4 h-4" /></button>
          <span className="text-navy font-semibold w-32 text-center">
            {month.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
          </span>
          <button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} className="p-1.5 rounded hover:bg-muted text-navy"><ChevronRight className="w-4 h-4" /></button>
        </div>

        <div className="flex rounded-md border border-border overflow-hidden">
          {(["month", "list"] as const).map((v) => (
            <button key={v} onClick={() => setView(v)} className={`px-4 py-1.5 text-xs font-semibold capitalize transition-colors ${view === v ? "bg-teal text-white" : "bg-white text-navy hover:bg-muted"}`}>{v}</button>
          ))}
        </div>

        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="input-cn max-w-[200px]">
          {filters.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
        </select>

        <div className="flex gap-2 ml-auto">
          <button className="btn-teal-outline text-xs"><CalendarDays className="w-3.5 h-3.5" /> Sync to Google Calendar</button>
          <button onClick={() => setShowAdd(true)} className="btn-teal text-xs"><Plus className="w-3.5 h-3.5" /> Add Obligation</button>
        </div>
      </section>

      {/* Views */}
      {view === "month" ? (
        <MonthView month={month} obligations={filtered} onSelect={setPopover} />
      ) : (
        <ListView obligations={filtered} />
      )}

      {/* Popover modal */}
      {popover && <EventPopover o={popover} onClose={() => setPopover(null)} />}
      {showAdd && <AddObligationModal onClose={() => setShowAdd(false)} onAdd={(o) => { add(o); toast.success("Obligation added to calendar"); setShowAdd(false); }} />}

      <FormStyles />
    </div>
  );
};

/* ---------- Month view ---------- */
const MonthView = ({ month, obligations, onSelect }: { month: Date; obligations: Obligation[]; onSelect: (o: Obligation) => void }) => {
  const year = month.getFullYear();
  const m = month.getMonth();
  const first = new Date(year, m, 1);
  const startDay = first.getDay(); // 0 = Sun
  const daysInMonth = new Date(year, m + 1, 0).getDate();

  // Build cells (6 weeks max)
  const cells: { date: Date | null }[] = [];
  for (let i = 0; i < startDay; i++) cells.push({ date: null });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ date: new Date(year, m, d) });
  while (cells.length % 7 !== 0) cells.push({ date: null });

  const eventsForDay = (d: Date) => {
    const iso = d.toISOString().slice(0, 10);
    return obligations.filter((o) => o.date === iso);
  };

  const isToday = (d: Date) => d.toDateString() === TODAY.toDateString();

  return (
    <section className="card-cn-active p-4">
      <div className="grid grid-cols-7 gap-px bg-border rounded overflow-hidden">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="bg-muted text-xs font-semibold uppercase tracking-wider text-muted-foreground py-2 text-center">{d}</div>
        ))}
        {cells.map((cell, i) => {
          const events = cell.date ? eventsForDay(cell.date) : [];
          return (
            <div key={i} className={`bg-white min-h-[110px] p-1.5 ${cell.date ? "" : "bg-muted/30"}`}>
              {cell.date && (
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-semibold ${isToday(cell.date) ? "w-6 h-6 rounded-full bg-teal text-white flex items-center justify-center" : "text-navy"}`}>
                    {cell.date.getDate()}
                  </span>
                </div>
              )}
              <div className="space-y-1">
                {events.slice(0, 3).map((e) => {
                  const c = categoryColor(e.category);
                  return (
                    <button key={e.id} onClick={() => onSelect(e)} className={`w-full text-left text-[10px] font-semibold px-1.5 py-0.5 rounded truncate ${c.chip}`} title={e.title}>
                      {e.title}
                    </button>
                  );
                })}
                {events.length > 3 && <span className="text-[10px] text-muted-foreground">+{events.length - 3} more</span>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
        <Legend dot="bg-coral" label="DSR / Breach" />
        <Legend dot="bg-amber" label="Vendor / Training" />
        <Legend dot="bg-teal" label="Filing / Internal" />
        <Legend dot="bg-purple-600" label="Regulatory" />
      </div>
    </section>
  );
};

const Legend = ({ dot, label }: { dot: string; label: string }) => (
  <span className="inline-flex items-center gap-1.5">
    <span className={`w-2 h-2 rounded-full ${dot}`} /> {label}
  </span>
);

/* ---------- List view ---------- */
const ListView = ({ obligations }: { obligations: Obligation[] }) => {
  const sorted = [...obligations].sort((a, b) => a.date.localeCompare(b.date));
  return (
    <section className="card-cn-active p-6">
      <div className="overflow-x-auto -mx-6">
        <table className="w-full text-sm min-w-[820px]">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
              <th className="font-semibold py-3 px-6">Date</th>
              <th className="font-semibold py-3 px-3">Days Left</th>
              <th className="font-semibold py-3 px-3">Obligation</th>
              <th className="font-semibold py-3 px-3">Category</th>
              <th className="font-semibold py-3 px-3">Module</th>
              <th className="font-semibold py-3 px-3">Status</th>
              <th className="font-semibold py-3 px-6 text-right"></th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((o) => {
              const days = daysFromNow(o.date);
              const c = categoryColor(o.category);
              return (
                <tr key={o.id} className="border-b border-border last:border-0 hover:bg-muted/40">
                  <td className="py-3.5 px-6 font-medium text-navy">{formatDateShort(o.date)}</td>
                  <td className={`py-3.5 px-3 font-semibold ${days < 0 ? "text-coral" : days <= 7 ? "text-amber" : "text-navy"}`}>
                    {days < 0 ? "OVERDUE" : days === 0 ? "Today" : `${days} days`}
                  </td>
                  <td className="py-3.5 px-3 text-navy">{o.title}</td>
                  <td className="py-3.5 px-3"><span className={`pill ${c.soft}`}>{o.category}</span></td>
                  <td className="py-3.5 px-3 text-muted-foreground">{o.module}</td>
                  <td className="py-3.5 px-3"><span className={`pill ${statusBadgeClass(o.status)}`}>{o.status}</span></td>
                  <td className="py-3.5 px-6 text-right">
                    <Link to={o.modulePath} className="text-xs font-semibold text-teal hover:underline inline-flex items-center gap-1">
                      Go to module <ArrowRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

/* ---------- Event popover ---------- */
const EventPopover = ({ o, onClose }: { o: Obligation; onClose: () => void }) => {
  const c = categoryColor(o.category);
  const days = daysFromNow(o.date);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-lg w-full max-w-sm p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-2">
          <span className={`pill ${c.soft}`}>{o.category}</span>
          <button onClick={onClose} className="text-muted-foreground hover:text-navy"><X className="w-4 h-4" /></button>
        </div>
        <h3 className="text-base font-bold text-navy">{o.title}</h3>
        <p className="text-sm text-muted-foreground mt-1.5">{o.description}</p>
        <p className="text-xs text-muted-foreground mt-3">
          {formatDateShort(o.date)} ·{" "}
          <span className={days < 0 ? "text-coral font-semibold" : "text-navy font-semibold"}>
            {days < 0 ? `${Math.abs(days)} days overdue` : `${days} days remaining`}
          </span>
        </p>
        <Link to={o.modulePath} onClick={onClose} className="btn-teal w-full mt-4 text-sm">Go to {o.module} <ArrowRight className="w-4 h-4" /></Link>
      </div>
    </div>
  );
};

/* ---------- Add Obligation modal ---------- */
const AddObligationModal = ({ onClose, onAdd }: { onClose: () => void; onAdd: (o: { title: string; description: string; category: ObligationCategory; date: string; recurrence: Obligation["recurrence"]; notes?: string }) => void }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<ObligationCategory>("DSR");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [recurrence, setRecurrence] = useState<Obligation["recurrence"]>("One-time");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date) return;
    onAdd({ title, description: notes || `${category} obligation`, category, date, recurrence, notes });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-lg w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-lg text-navy font-bold">Add Obligation</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-navy"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <Field label="Obligation title"><input className="input-cn" value={title} onChange={(e) => setTitle(e.target.value)} required /></Field>
          <Field label="Category">
            <select className="input-cn" value={category} onChange={(e) => setCategory(e.target.value as ObligationCategory)}>
              {categoryOptions.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Due date"><input type="date" className="input-cn" value={date} onChange={(e) => setDate(e.target.value)} required /></Field>
          <Field label="Notes (optional)"><textarea rows={2} className="input-cn resize-none" value={notes} onChange={(e) => setNotes(e.target.value)} /></Field>
          <Field label="Linked module">
            <select className="input-cn" value={category} onChange={(e) => setCategory(e.target.value as ObligationCategory)}>
              {categoryOptions.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Recurrence">
            <select className="input-cn" value={recurrence} onChange={(e) => setRecurrence(e.target.value as Obligation["recurrence"])}>
              {["One-time", "Annual", "Monthly", "Custom"].map((r) => <option key={r}>{r}</option>)}
            </select>
          </Field>
          <button type="submit" className="btn-teal w-full">Add to Calendar</button>
        </form>
      </div>
    </div>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div><label className="block text-xs font-semibold text-navy mb-1.5">{label}</label>{children}</div>
);

const FormStyles = () => (
  <style>{`.input-cn{width:100%;padding:.5rem .75rem;border:1px solid hsl(var(--border));border-radius:.375rem;background:white;font-size:.8125rem;color:hsl(var(--navy));outline:none;transition:border-color .15s,box-shadow .15s}.input-cn:focus{border-color:hsl(var(--teal));box-shadow:0 0 0 3px hsl(var(--teal)/.15)}`}</style>
);

export default CalendarPage;
