import { useState, useMemo } from "react";
import { PageHeader, Panel, Pagination } from "@/components/shared/Toolbar";
import { useFormDialog, useActionDialog } from "@/components/shared/FormDialog";
import { useDrawer } from "@/components/shared/DetailDrawer";
import { Plus, Search, Edit, Filter as FilterIcon, Columns3 } from "lucide-react";
import { NEW_CANNED_COMMENT_FIELDS } from "@/lib/forms";

type C = { id: string; code: string; abbr: string; dept: string; comment?: string };

const SEED: C[] = [
  { code: "AFP",     abbr: "ALPHA FETOPROTEIN AUTOMATIC COMMENT",  dept: "ISOT" },
  { code: "PI",      abbr: "PI - AUTOMATIC COMMENT",              dept: "HAEM" },
  { code: "1708457", abbr: "cholesterol",                          dept: "CHEM" },
  { code: "CMV",     abbr: "CMV - AUTOMATIC COMMENT",             dept: "SERO" },
  { code: "RUB",     abbr: "RUBELL - AUTOMATIC COMMENT",          dept: "SERO" },
  { code: "IGE",     abbr: "IGE - AUTOMATIC COMMENT",             dept: "ISOT" },
  { code: "MICIHA",  abbr: "THYROD ANTIBODIES - AUTOMATIC COMMENTS", dept: "ISOT" },
  { code: "PSA",     abbr: "PSA - AUTOMATIC CANNED COMMENT",       dept: "CHEM" },
  { code: "RASI",    abbr: "RAST INHALANTS AUTOMATIC COMMENT",     dept: "ISOT" },
  { code: "E2",      abbr: "E2 - OESTRADIOL CANNED COMMENT",       dept: "ISOT" },
  { code: "FSH",     abbr: "FSH - AUTOMATIC COMMENT",              dept: "ISOT" },
  { code: "LH",      abbr: "LH - AUTOMATIC COMMENT",               dept: "ISOT" },
  { code: "GTT",     abbr: "GTT - AUTOMATIC COMMENT",              dept: "CHEM" },
  { code: "ADNAIF",  abbr: "ANTI DNA ANTIBODIES - AUTOMATIC COMMENT", dept: "SERO" },
  { code: "TOXO",    abbr: "TOXOPLASMA - AUTOMATIC COMMENT",       dept: "SERO" },
  { code: "SEMEN",   abbr: "SEMEN - COMMENT",                      dept: "MICRO" },
  { code: "LI",      abbr: "LITHIUM - AUTOMATIC COMMENT",          dept: "CHEM" },
  { code: "PTT",     abbr: "PTT - AUTOMATIC COMMENT",              dept: "HAEM" },
  { code: "RASF",    abbr: "RASF - AUTOMATIC COMMENT",             dept: "ISOT" },
  { code: "PROGOH",  abbr: "17 OH PROGESTERONE - AUTOMATIC COMMENT", dept: "ISOT" },
  { code: "COX",     abbr: "COXSACKIE SEROLOGY",                   dept: "SERO" },
  { code: "BETAQN",  abbr: "BHCG - SERUM - QUANTITATIVE AUTO COMMENT", dept: "CHEM" },
  { code: "CHLAG",   abbr: "CHLAMYDIA IGG AUTOMATIC COMMENT",       dept: "SERO" },
  { code: "ENA",     abbr: "ENA - AUTOMATIC COMMENT",               dept: "SERO" },
  { code: "CEA",     abbr: "CEA",                                   dept: "ISOT" },
].map((r, i) => ({ id: `CC-${i+1}`, ...r }));

const DEPTS = ["All","HAEM","CHEM","SERO","ISOT","HISTO","MICRO","HIV","DIABE"];

export default function CannedComments() {
  const form = useFormDialog();
  const drawer = useDrawer();
  const action = useActionDialog();
  const [rows, setRows] = useState(SEED);
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("All");
  const [perPage, setPerPage] = useState(25);

  const filtered = useMemo(() => rows.filter(r => {
    if (dept !== "All" && r.dept !== dept) return false;
    if (search && !`${r.code} ${r.abbr}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }), [rows, search, dept]);

  const openCreate = () => form.open({
    title: "Create Canned Comment",
    fields: NEW_CANNED_COMMENT_FIELDS, size: "xl", submitLabel: "Create",
    onSubmit: (v) => setRows(rs => [{ id: `CC-${rs.length+1}`, code: v.code, abbr: v.abbreviation, dept: v.department, comment: v.comment }, ...rs]),
  });
  const openEdit = (r: C) => form.open({
    title: `Edit ${r.code}`, fields: NEW_CANNED_COMMENT_FIELDS.map(f => ({ ...f,
      defaultValue: f.name === "abbreviation" ? r.abbr : f.name === "department" ? r.dept : (r as any)[f.name] ?? "" })),
    size: "xl", submitLabel: "Save",
  });

  return (
    <>
      <PageHeader kicker="Section 5K · Administration" title="Canned Comments" breadcrumb={["Administration","Canned Comments","List"]}
        actions={<button onClick={openCreate} className="bg-target text-white text-xs font-semibold px-3 py-2 rounded-lg inline-flex items-center gap-1.5"><Plus className="h-3.5 w-3.5" />New canned comment</button>}
      />
      <Panel>
        <div className="flex items-center justify-end gap-2 mb-3">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search" className="pl-8 pr-3 py-1.5 text-sm border border-border rounded bg-white w-64" />
          </div>
          <button title="Filter" className="border border-border rounded p-1.5 relative"><FilterIcon className="h-4 w-4 text-muted-foreground" />
            <span className="absolute -top-1 -right-1 text-[9px] bg-target text-white rounded-full px-1">{dept==="All"?0:1}</span>
          </button>
          <select value={dept} onChange={e => setDept(e.target.value)} className="border border-border rounded px-2 py-1.5 text-xs bg-white">
            {DEPTS.map(d => <option key={d}>{d}</option>)}
          </select>
          <button className="border border-border rounded p-1.5"><Columns3 className="h-4 w-4 text-muted-foreground" /></button>
        </div>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="data-table">
            <thead><tr><th className="w-8"><input type="checkbox" /></th><th>Code</th><th>Abbreviation</th><th>Department</th><th></th></tr></thead>
            <tbody>
              {filtered.slice(0, perPage).map(r => (
                <tr key={r.id} className="cursor-pointer" onClick={() => drawer.open({
                  title: r.code, subtitle: r.abbr,
                  meta: { Code: r.code, Abbreviation: r.abbr, Department: r.dept },
                  body: <p className="text-xs text-muted-foreground">Auto-injected on result lines for this analyte. Supports rich-text and dynamic tokens.</p>,
                  actions: [
                    { label: "Edit", tone: "primary", onClick: () => openEdit(r) },
                    { label: "Duplicate" },
                    { label: "Delete", tone: "danger", onClick: () => action.open({ title: `Delete ${r.code}?`, tone: "reject", requireReason: true, onConfirm: () => setRows(rs => rs.filter(x => x.id !== r.id)) }) },
                  ],
                })}>
                  <td onClick={e => e.stopPropagation()}><input type="checkbox" /></td>
                  <td className="font-medium">{r.code}</td>
                  <td>{r.abbr}</td>
                  <td>{r.dept}</td>
                  <td onClick={e => e.stopPropagation()}>
                    <button onClick={() => openEdit(r)} className="inline-flex items-center gap-1 text-blue-600 text-xs font-semibold"><Edit className="h-3.5 w-3.5"/>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between px-3 py-2 border-t border-border text-xs">
            <span className="text-muted-foreground">Showing 1 to {Math.min(perPage, filtered.length)} of 747 results</span>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Per page</span>
              <select value={perPage} onChange={e => setPerPage(parseInt(e.target.value))} className="border border-border rounded px-2 py-0.5">
                {[10,25,50,100].map(n => <option key={n}>{n}</option>)}
              </select>
              <Pagination total={747} />
            </div>
          </div>
        </div>
      </Panel>
    </>
  );
}
