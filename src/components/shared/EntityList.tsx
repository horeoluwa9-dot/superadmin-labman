import { PageHeader, Panel, Pill, DataToolbar, Pagination, Tabs } from "@/components/shared/Toolbar";
import { useDrawer } from "@/components/shared/DetailDrawer";
import { ChevronRight } from "lucide-react";
import { useState, ReactNode } from "react";
import { KpiCard } from "@/components/shared/KpiCard";

export type Column<T> = { header: string; cell: (row: T) => ReactNode; mono?: boolean };

export function EntityList<T extends { id?: string }>({
  kicker, title, breadcrumb, primaryLabel = "New", rows, columns, kpis, tabs, getDrawer, intro,
}: {
  kicker: string; title: string; breadcrumb: string[];
  primaryLabel?: string;
  rows: T[];
  columns: Column<T>[];
  kpis?: { label: string; value: ReactNode; accent?: "navy"|"red"|"gold"|"success"|"warn"; sub?: string }[];
  tabs?: { items: string[]; getStatus: (r: T) => string };
  getDrawer: (row: T) => Parameters<ReturnType<typeof useDrawer>["open"]>[0];
  intro?: ReactNode;
}) {
  const drawer = useDrawer();
  const [tab, setTab] = useState(tabs?.items[0] || "All");
  const filtered = tabs ? rows.filter(r => tabs.getStatus(r) === tab) : rows;
  const counts = tabs ? rows.reduce((a,r) => ({ ...a, [tabs.getStatus(r)]: (a[tabs.getStatus(r)] || 0) + 1 }), {} as Record<string,number>) : undefined;

  return (
    <>
      <PageHeader kicker={kicker} title={title} breadcrumb={breadcrumb} />
      {intro && <div className="mb-4 text-sm text-muted-foreground">{intro}</div>}
      {kpis && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          {kpis.map((k,i) => <KpiCard key={i} {...k} />)}
        </div>
      )}
      <Panel>
        {tabs && <Tabs items={tabs.items} active={tab} onChange={setTab} counts={counts} />}
        <DataToolbar primaryLabel={primaryLabel} onPrimary={() => drawer.open({
          title: primaryLabel, body: <p className="text-muted-foreground">Form opens here. All fields validated and audit-logged on save.</p>,
          actions: [{ label: "Save", tone: "primary" }, { label: "Cancel" }],
        })} />
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="data-table">
            <thead><tr>{columns.map((c,i) => <th key={i}>{c.header}</th>)}<th></th></tr></thead>
            <tbody>{filtered.map((row, i) => (
              <tr key={(row as any).id || i} className="cursor-pointer" onClick={() => drawer.open(getDrawer(row))}>
                {columns.map((c, j) => <td key={j} className={c.mono ? "font-mono text-xs" : ""}>{c.cell(row)}</td>)}
                <td><ChevronRight className="h-4 w-4 text-muted-foreground" /></td>
              </tr>
            ))}</tbody>
          </table>
          <Pagination total={filtered.length} />
        </div>
      </Panel>
    </>
  );
}
