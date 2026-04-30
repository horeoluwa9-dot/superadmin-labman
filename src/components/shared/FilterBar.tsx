import { ReactNode } from "react";
import { Filter, Search, X } from "lucide-react";

export type FilterSpec = {
  name: string;
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
};

export function FilterBar({
  filters,
  search,
  onSearch,
  onClear,
  extras,
  date,
}: {
  filters: FilterSpec[];
  search?: string;
  onSearch?: (s: string) => void;
  onClear?: () => void;
  extras?: ReactNode;
  date?: { from: string; to: string; setFrom: (v: string) => void; setTo: (v: string) => void };
}) {
  return (
    <div className="rounded-lg border border-border bg-muted/30 px-3 py-2.5 mb-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-target">
          <Filter className="h-3 w-3" /> Filters
        </span>
        {date && (
          <>
            <label className="flex items-center gap-1 text-[11px] text-muted-foreground">From
              <input type="date" value={date.from} onChange={e => date.setFrom(e.target.value)} className="border border-border rounded px-1.5 py-1 bg-white text-xs font-mono" />
            </label>
            <label className="flex items-center gap-1 text-[11px] text-muted-foreground">To
              <input type="date" value={date.to} onChange={e => date.setTo(e.target.value)} className="border border-border rounded px-1.5 py-1 bg-white text-xs font-mono" />
            </label>
          </>
        )}
        {filters.map(f => (
          <select
            key={f.name}
            value={f.value}
            onChange={e => f.onChange(e.target.value)}
            className="border border-border rounded px-2 py-1 bg-white text-xs"
          >
            <option value="">All {f.label}</option>
            {f.options.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        ))}
        {onSearch && (
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
            <input
              value={search || ""}
              onChange={e => onSearch(e.target.value)}
              placeholder="Search…"
              className="pl-7 pr-3 py-1 text-xs border border-border rounded bg-white w-48"
            />
          </div>
        )}
        {extras}
        {onClear && (
          <button onClick={onClear} className="ml-auto inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground">
            <X className="h-3 w-3" /> Clear
          </button>
        )}
      </div>
    </div>
  );
}
