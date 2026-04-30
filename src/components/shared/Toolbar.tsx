import { Pill } from "@/components/shared/Pill";
import { Panel } from "@/components/shared/Panel";
import { PageHeader } from "@/components/shared/PageHeader";
import { fmtZAR } from "@/lib/nav";
import { Plus, Download, Printer, Search, ChevronLeft, ChevronRight } from "lucide-react";

export function DataToolbar({
  primaryLabel = "New",
  onPrimary,
  extras,
  search = true,
  filters,
}: {
  primaryLabel?: string;
  onPrimary?: () => void;
  extras?: React.ReactNode;
  search?: boolean;
  filters?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <button onClick={onPrimary} className="inline-flex items-center gap-1.5 bg-target hover:bg-target-dark text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-sm transition-colors">
        <Plus className="h-3.5 w-3.5" /> {primaryLabel}
      </button>
      <button className="inline-flex items-center gap-1.5 border border-border bg-white hover:bg-muted text-xs font-semibold px-3 py-2 rounded-lg">
        <Download className="h-3.5 w-3.5" /> Export
      </button>
      <button className="inline-flex items-center gap-1.5 border border-border bg-white hover:bg-muted text-xs font-semibold px-3 py-2 rounded-lg">
        <Printer className="h-3.5 w-3.5" /> Print
      </button>
      {extras}
      {filters && <div className="flex items-center gap-2 ml-2">{filters}</div>}
      {search && (
        <div className="ml-auto relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input placeholder="Search…" className="pl-8 pr-3 py-1.5 text-xs border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-target/30 w-56" />
        </div>
      )}
    </div>
  );
}

export function Pagination({ page = 1, total = 35 }: { page?: number; total?: number }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-border text-xs text-muted-foreground">
      <div>Showing 1 to 10 of {total} results</div>
      <div className="flex items-center gap-2">
        <select className="border border-border rounded px-2 py-1 bg-white">
          <option>10</option><option>25</option><option>50</option><option>100</option>
        </select>
        <button className="p-1 hover:bg-muted rounded"><ChevronLeft className="h-3.5 w-3.5" /></button>
        {[1,2,3,4].map(n => (
          <button key={n} className={`min-w-[28px] h-7 px-2 rounded ${n===page?"bg-navy text-white font-semibold":"hover:bg-muted"}`}>{n}</button>
        ))}
        <button className="p-1 hover:bg-muted rounded"><ChevronRight className="h-3.5 w-3.5" /></button>
      </div>
    </div>
  );
}

export function Tabs({ items, active, onChange, counts }: {
  items: string[]; active: string; onChange: (t: string) => void; counts?: Record<string, number>;
}) {
  return (
    <div className="flex items-center gap-1 border-b border-border mb-4">
      {items.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`relative px-4 py-2.5 text-xs font-semibold transition-colors flex items-center gap-2 ${
            active === t ? "text-target" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {t}
          {counts?.[t] !== undefined && (
            <span className={`pill ${active === t ? "bg-target text-white" : "pill-muted"}`}>{counts[t]}</span>
          )}
          {active === t && <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-target" />}
        </button>
      ))}
    </div>
  );
}

export { Panel, PageHeader, Pill, fmtZAR };
