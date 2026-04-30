import { useMemo, useState } from "react";
import { PageHeader, Panel, Pagination, Pill } from "@/components/shared/Toolbar";
import { useDrawer } from "@/components/shared/DetailDrawer";
import { Search, Columns3, Filter } from "lucide-react";

type A = {
  id: string; ts: string; type: string; event: "created"|"updated"|"deleted"|"released";
  user: string; old: string; nu: string;
};

const mk = (n: number): A[] => {
  const types = ["user","doctor","order","result-feed","tariff","invoice","leave","kit"];
  const events: A["event"][] = ["updated","updated","updated","created","released","updated"];
  const users = ["brezze","Yanick","William","richard","Patrick","Sister A. Naidoo"];
  const arr: A[] = [];
  for (let i = 0; i < n; i++) {
    const t = types[i % types.length];
    arr.push({
      id: `AUD-${10000+i}`,
      ts: ["Apr 29, 2026 15:57:29","Apr 29, 2026 15:16:18","Mar 8, 2026 10:20:21","Feb 26, 2026 16:51:54","Jan 17, 2026 06:48:38","Nov 13, 2025 12:39:49","Nov 6, 2025 20:55:15"][i % 7],
      type: t,
      event: events[i % events.length],
      user: users[i % users.length],
      old: t === "doctor" ? "1" : t === "order" ? "RESULTED, ," : t === "result-feed" ? `${i % 2}` : "yQaDJ5EX3YZs1AU6QKcFwJs8eRswEruCPAG7TFgfLUXoQ9XfjV9D9okt3bWR".slice(0, 60),
      nu:  t === "doctor" ? "[], 1, , , 1" : t === "order" ? "RELEASED, 9d602395-a26d-453…  13T10:39:49.436390Z" : t === "result-feed" ? `${(i+1) % 2}` : "Fh8VBy8q2kYibkloHiosStL39E9c…".slice(0, 60),
    });
  }
  return arr;
};
const ROWS = mk(40);

export default function AuditActions() {
  const drawer = useDrawer();
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [event, setEvent] = useState("");
  const [user, setUser] = useState("");
  const [perPage, setPerPage] = useState(25);

  const filtered = useMemo(() =>
    ROWS.filter(r =>
      (!search || `${r.user} ${r.type} ${r.event} ${r.old} ${r.nu}`.toLowerCase().includes(search.toLowerCase())) &&
      (!type || r.type === type) &&
      (!event || r.event === event) &&
      (!user || r.user === user)
    ), [search, type, event, user]);

  return (
    <>
      <PageHeader kicker="Section 15A · Utilities" title="Audited Actions" breadcrumb={["Utilities","Audited Actions","List"]} />
      <Panel>
        <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-target"><Filter className="h-3 w-3" />Filters</span>
          <select value={type} onChange={e=>setType(e.target.value)} className="border border-border rounded px-2 py-1 bg-white"><option value="">All types</option>{["user","doctor","order","result-feed","tariff","invoice","leave","kit"].map(o=><option key={o}>{o}</option>)}</select>
          <select value={event} onChange={e=>setEvent(e.target.value)} className="border border-border rounded px-2 py-1 bg-white"><option value="">All events</option>{["created","updated","deleted","released"].map(o=><option key={o}>{o}</option>)}</select>
          <select value={user} onChange={e=>setUser(e.target.value)} className="border border-border rounded px-2 py-1 bg-white"><option value="">All users</option>{["brezze","Yanick","William","richard","Patrick","Sister A. Naidoo"].map(o=><option key={o}>{o}</option>)}</select>
          <input type="date" className="border border-border rounded px-2 py-1 bg-white" />
          <button className="ml-auto bg-navy text-white px-3 py-1.5 rounded font-semibold">Export CSV</button>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search" className="pl-8 pr-3 py-1.5 border border-border rounded bg-white w-56" />
          </div>
          <button className="border border-border rounded p-1.5"><Columns3 className="h-4 w-4 text-muted-foreground" /></button>
        </div>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="data-table">
            <thead><tr><th>Date &amp; Time ▾</th><th>Auditable type</th><th>Event</th><th>User</th><th>Old values</th><th>New values</th></tr></thead>
            <tbody>
              {filtered.slice(0, perPage).map(r => (
                <tr key={r.id} className="cursor-pointer" onClick={() => drawer.open({
                  title: `${r.type} · ${r.event}`, subtitle: `${r.ts} · ${r.user}`,
                  meta: { ID: r.id, "Auditable type": r.type, Event: r.event, User: r.user, Timestamp: r.ts },
                  body: (
                    <div className="space-y-3 text-xs">
                      <div>
                        <div className="font-bold text-red-600 mb-1">— Old values</div>
                        <pre className="bg-red-50 border border-red-200 rounded p-2 whitespace-pre-wrap font-mono text-[11px]">{r.old || "(empty)"}</pre>
                      </div>
                      <div>
                        <div className="font-bold text-emerald-700 mb-1">+ New values</div>
                        <pre className="bg-emerald-50 border border-emerald-200 rounded p-2 whitespace-pre-wrap font-mono text-[11px]">{r.nu || "(empty)"}</pre>
                      </div>
                      <p className="text-muted-foreground">Hash-chained, ISO 15189 traceable. Cannot be edited or deleted; only superseded.</p>
                    </div>
                  ),
                  actions: [{ label: "Open Source Record", tone: "primary" }, { label: "Copy Diff" }, { label: "Add to Investigation" }],
                })}>
                  <td className="font-mono text-xs whitespace-nowrap">{r.ts}</td>
                  <td>{r.type}</td>
                  <td><Pill tone={r.event==="created"?"success":r.event==="deleted"?"danger":r.event==="released"?"info":"warning"}>{r.event}</Pill></td>
                  <td className="font-medium">{r.user}</td>
                  <td className="font-mono text-[11px] text-red-600 max-w-xs truncate">{r.old || "—"}</td>
                  <td className="font-mono text-[11px] text-emerald-700 max-w-xs truncate">{r.nu || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between px-3 py-2 border-t border-border text-xs">
            <span className="text-muted-foreground">Showing 1 to {Math.min(perPage, filtered.length)} of 453 results</span>
            <div className="flex items-center gap-2">
              <span>Per page</span>
              <select value={perPage} onChange={e=>setPerPage(parseInt(e.target.value))} className="border border-border rounded px-2 py-0.5">{[10,25,50,100].map(n=><option key={n}>{n}</option>)}</select>
              <Pagination total={453} />
            </div>
          </div>
        </div>
      </Panel>
    </>
  );
}
