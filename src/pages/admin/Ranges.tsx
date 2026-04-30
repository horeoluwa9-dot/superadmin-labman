import { useMemo, useState } from "react";
import { PageHeader, Panel, Pagination } from "@/components/shared/Toolbar";
import { useFormDialog } from "@/components/shared/FormDialog";
import { useDrawer } from "@/components/shared/DetailDrawer";
import { Search, Plus, Edit, Columns3, X, Check } from "lucide-react";
import { NEW_RANGE_FIELDS } from "@/lib/forms";

type R = {
  id: string; code: string; species: string; sex: "M"|"F"|"B";
  age: number; hi: number; lo: number; panHi: number; panLo: number;
  rejectHi: number; rejectLo: number; canNorm: number; flagComm: boolean;
  canHi: number; canLo: number;
};

const seed = (code: string): R[] => {
  const ages = [0.003, 0.019, 0.083, 1, 6, 10, 99, 0];
  const out: R[] = [];
  ages.forEach((a, i) => {
    (["M","F"] as const).forEach(s => {
      out.push({
        id: `${code}-${i}-${s}`,
        code, species: "HUMAN", sex: s, age: a,
        hi: code==="NEUT%" ? [87,48,46,49,55,59,75,70][i] : [37,81,85,77,49,55,75,70][i],
        lo: code==="NEUT%" ? [67,30,20,25,30,40,45,45][i] : [22,40,5,67,25,30,45,45][i],
        panHi: code==="NEUT%" ? [92,62,60,64,72,77,80,80][i] : [50,85,90,85,80,80,80,80][i],
        panLo: code==="NEUT%" ? (s==="F"?[47,21,29,17.5,21,28,32,32][i]:[30,21,29,17.5,21,28,32,32][i]) : (s==="F"?[15,28,30,47,18,18,18,18][i]:[15,28,30,47,18,18,18,18][i]),
        rejectHi: 95, rejectLo: code==="NEUT%" ? (i===0 && s==="F" ? 40 : (i===0 ? 3 : 5)) : 5,
        canNorm: 0, flagComm: false, canHi: 0, canLo: 0,
      });
    });
  });
  return out;
};

const ROWS_INIT: R[] = [...seed("NEUT%"), ...seed("LYMPH%")];

export default function Ranges() {
  const form = useFormDialog();
  const drawer = useDrawer();
  const [rows] = useState<R[]>(ROWS_INIT);
  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState(25);

  const filtered = useMemo(
    () => rows.filter(r => !search || `${r.code} ${r.species} ${r.sex}`.toLowerCase().includes(search.toLowerCase())),
    [rows, search]
  );

  const openCreate = () => form.open({
    title: "Create Range", size: "xl", submitLabel: "Create",
    fields: NEW_RANGE_FIELDS, successMessage: "Range created",
  });
  const openEdit = (r: R) => form.open({
    title: `Edit ${r.code}`, size: "xl", submitLabel: "Save",
    fields: NEW_RANGE_FIELDS.map(f => ({ ...f, defaultValue: (r as any)[f.name] ?? f.defaultValue ?? "" })),
  });

  return (
    <>
      <PageHeader kicker="Section 5H · Administration" title="Ranges" breadcrumb={["Administration","Ranges","List"]}
        actions={
          <button onClick={openCreate} className="bg-target text-white text-xs font-semibold px-3 py-2 rounded-lg inline-flex items-center gap-1.5">
            <Plus className="h-3.5 w-3.5" />New range
          </button>
        }
      />
      <Panel>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-muted-foreground">
            Reference, panic and rejection limits are evaluated server-side on every result line. Out-of-range values trigger flag/comment workflow.
          </span>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search" className="pl-8 pr-3 py-1.5 text-sm border border-border rounded bg-white w-64" />
            </div>
            <button className="border border-border rounded p-1.5" title="Show/hide columns"><Columns3 className="h-4 w-4 text-muted-foreground" /></button>
          </div>
        </div>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="data-table">
            <thead>
              <tr>
                <th className="w-8"><input type="checkbox" /></th>
                <th>Range code</th><th>Species</th><th>Sex</th>
                <th>Age ▾</th><th>Hi ▾</th><th>Lo ▾</th>
                <th>Pan hi ▾</th><th>Pan lo ▾</th>
                <th>Reject hi ▾</th><th>Reject lo ▾</th>
                <th>Can norm</th><th>Flag comm</th>
                <th>Can hi</th><th>Can lo</th><th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, perPage).map(r => (
                <tr key={r.id} className="cursor-pointer" onClick={() => drawer.open({
                  title: `${r.code} · ${r.species} · ${r.sex} · age ${r.age}`,
                  subtitle: `Normal ${r.lo}–${r.hi} · Panic ${r.panLo}/${r.panHi} · Reject ${r.rejectLo}/${r.rejectHi}`,
                  meta: { "Range code": r.code, Species: r.species, Sex: r.sex, Age: r.age, Hi: r.hi, Lo: r.lo, "Pan hi": r.panHi, "Pan lo": r.panLo, "Reject hi": r.rejectHi, "Reject lo": r.rejectLo, "Flag comment": r.flagComm ? "Yes":"No" },
                  actions: [{ label: "Edit", tone: "primary", onClick: () => openEdit(r) }, { label: "Duplicate" }, { label: "Disable", tone: "danger" }],
                })}>
                  <td onClick={e => e.stopPropagation()}><input type="checkbox" /></td>
                  <td className="font-medium">{r.code}</td>
                  <td>{r.species}</td>
                  <td className="font-mono">{r.sex}</td>
                  <td className="font-mono text-xs">{r.age}</td>
                  <td className="font-mono">{r.hi}</td>
                  <td className="font-mono">{r.lo}</td>
                  <td className="font-mono">{r.panHi}</td>
                  <td className="font-mono">{r.panLo}</td>
                  <td className="font-mono">{r.rejectHi}</td>
                  <td className="font-mono">{r.rejectLo}</td>
                  <td className="font-mono">{r.canNorm}</td>
                  <td>{r.flagComm
                    ? <Check className="h-3.5 w-3.5 text-emerald-600" />
                    : <X className="h-3.5 w-3.5 text-red-500" />}</td>
                  <td className="font-mono">{r.canHi}</td>
                  <td className="font-mono">{r.canLo}</td>
                  <td onClick={e => e.stopPropagation()}>
                    <button onClick={() => openEdit(r)} className="inline-flex items-center gap-1 text-blue-600 text-xs font-semibold whitespace-nowrap"><Edit className="h-3.5 w-3.5"/>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between px-3 py-2 border-t border-border text-xs">
            <span className="text-muted-foreground">Showing 1 to {Math.min(perPage, filtered.length)} of 2,584 results</span>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Per page</span>
              <select value={perPage} onChange={e => setPerPage(parseInt(e.target.value))} className="border border-border rounded px-2 py-0.5">
                {[10,25,50,100].map(n => <option key={n}>{n}</option>)}
              </select>
              <Pagination total={2584} />
            </div>
          </div>
        </div>
      </Panel>
    </>
  );
}
