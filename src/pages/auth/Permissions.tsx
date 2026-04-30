import { PageHeader, Panel } from "@/components/shared/Toolbar";
import { PERMISSIONS, ROLES } from "@/data/staff";
import { useDrawer } from "@/components/shared/DetailDrawer";
import { useState } from "react";
import { Search } from "lucide-react";

export default function Permissions() {
  const drawer = useDrawer();
  const [q, setQ] = useState("");
  const filtered = PERMISSIONS.filter(p => p.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <PageHeader kicker="Section 8C · Authentication" title="Permissions Matrix" breadcrumb={["Authentication", "Permissions"]} />
      <Panel title={`${PERMISSIONS.length} system permissions`}>
        <div className="relative mb-3 max-w-sm">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search permissions…" className="pl-8 pr-3 py-1.5 text-xs border border-border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-target/30" />
        </div>
        <div className="overflow-x-auto rounded-lg border border-border max-h-[640px]">
          <table className="data-table">
            <thead className="sticky top-0"><tr><th className="text-left">Permission</th>{ROLES.slice(0,8).map(r => <th key={r.name} className="text-center">{r.name.split(" ")[0]}</th>)}</tr></thead>
            <tbody>{filtered.map(p => (
              <tr key={p} className="cursor-pointer" onClick={() => drawer.open({
                title: p,
                meta: { "Granted To": "8 roles", Category: p.split("-")[0], Sensitive: p.includes("override") || p.includes("delete") ? "Yes" : "No" },
                body: <p className="text-muted-foreground">All grants and revocations for this permission are logged in the audit trail. Sensitive permissions require Level 4+ approval.</p>,
                actions: [{ label: "Edit Mapping", tone: "primary" }],
              })}>
                <td className="font-mono text-xs">{p}</td>
                {ROLES.slice(0,8).map(r => {
                  const granted = (p.charCodeAt(0) + r.name.length) % 3 !== 0;
                  return <td key={r.name} className="text-center">{granted ? <span className="text-emerald-600 font-bold">✓</span> : <span className="text-muted-foreground">—</span>}</td>;
                })}
              </tr>
            ))}</tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}
