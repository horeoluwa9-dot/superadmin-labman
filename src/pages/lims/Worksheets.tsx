import { useState, useMemo } from "react";
import { PageHeader, Panel, Pill } from "@/components/shared/Toolbar";
import { useFormDialog, useActionDialog } from "@/components/shared/FormDialog";
import { useDrawer } from "@/components/shared/DetailDrawer";
import { usePrintPreview } from "@/components/shared/PrintPreview";
import { FilterBar } from "@/components/shared/FilterBar";
import { useBranch } from "@/lib/branch";
import { FlaskConical, Microscope, Beaker, TestTube, Droplets, Bug } from "lucide-react";

const dept = [
  { name: "HIV", icon: Droplets, branch: "Booysens", date: "30 Apr 2026", tech: "ms ntswaki maleke", count: 42, status: "In Progress" },
  { name: "Chemistry (CHEM)", icon: Beaker, branch: "Pretoria", date: "30 Apr 2026", tech: "Lab Tech 04", count: 87, status: "In Progress" },
  { name: "Haematology", icon: Droplets, branch: "Booysens", date: "30 Apr 2026", tech: "mrs ida thakam", count: 61, status: "Pending Review" },
  { name: "Microbiology", icon: Bug, branch: "Cape Town", date: "30 Apr 2026", tech: "Lab Tech 12", count: 23, status: "Awaiting Specimen" },
  { name: "Histology", icon: Microscope, branch: "Durban", date: "30 Apr 2026", tech: "mr francis ike", count: 11, status: "In Progress" },
  { name: "Virology", icon: TestTube, branch: "JHB HQ", date: "30 Apr 2026", tech: "Lab Tech 07", count: 18, status: "Pending Review" },
];
type D = typeof dept[number];

export default function Worksheets() {
  const drawer = useDrawer();
  const preview = usePrintPreview();
  const action = useActionDialog();
  const form = useFormDialog();
  const { branch } = useBranch();
  const [fBranch, setFBranch] = useState("");
  const [fDept, setFDept] = useState("");
  const [fStatus, setFStatus] = useState("");
  const [search, setSearch] = useState("");
  const [from, setFrom] = useState("2026-04-30");
  const [to, setTo] = useState("2026-04-30");

  const filtered = useMemo(() => dept.filter(d => {
    if (branch !== "ALL" && d.branch !== branch) return false;
    if (fBranch && d.branch !== fBranch) return false;
    if (fDept && !d.name.includes(fDept)) return false;
    if (fStatus && d.status !== fStatus) return false;
    if (search && !`${d.name} ${d.tech}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }), [fBranch, fDept, fStatus, search, branch]);

  const printPreviewWorksheet = (d: D) => preview.open({
    title: `${d.name} Worksheet — ${d.date}`,
    subtitle: `${d.branch} · Technician: ${d.tech}`,
    filename: `Worksheet_${d.name}_${d.date}`,
    body: (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "2px solid #c8102e", paddingBottom: 12, marginBottom: 16 }}>
          <div>
            <h1>TARGET PATHOLOGY · {d.name.toUpperCase()} WORKSHEET</h1>
            <div className="muted">{d.branch} · {d.date} · Technician: {d.tech}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="muted">Specimens</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#0c1f3f" }}>{d.count}</div>
          </div>
        </div>
        <table>
          <thead><tr><th>Pos</th><th>Lab #</th><th>Patient</th><th>Test</th><th>Result</th><th>Units</th><th>Flag</th></tr></thead>
          <tbody>
            {Array.from({ length: 12 }).map((_, i) => (
              <tr key={i}>
                <td style={{ fontFamily: "monospace" }}>A{(i+1).toString().padStart(2,"0")}</td>
                <td style={{ fontFamily: "monospace" }}>TPL-2026-04-30-{(140 + i).toString().padStart(4,"0")}</td>
                <td>{["T. Mokoena","S. Khumalo","N. Dlamini","P. v.d. Merwe","A. Nkosi","L. Mahlangu","K. Sithole","M. Dube","R. Khoza","B. Naidoo","T. Maseko","V. Pillay"][i]}</td>
                <td>{["FBC","HBA1C","HIV PCR","TSH","CRP","Lipogram","U&E","PSA","Glucose","ALT","Hb","INR"][i]}</td>
                <td style={{ fontFamily: "monospace" }}>{(Math.random() * 10).toFixed(2)}</td>
                <td>g/dL</td>
                <td>{i % 5 === 0 ? "H" : i % 7 === 0 ? "L" : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <div className="muted">QC Run · Levey-Jennings</div>
            <div style={{ marginTop: 4 }}>Within 2σ · Last calibration 06:00</div>
          </div>
          <div>
            <div className="muted">Technician signature</div>
            <div style={{ borderBottom: "1px solid #94a3b8", height: 32, marginTop: 4 }} />
          </div>
        </div>
      </div>
    ),
  });

  const openWorksheet = (d: D) => drawer.open({
    title: `${d.name} — Worksheet`,
    subtitle: `${d.branch} · ${d.date} · ${d.tech}`,
    meta: { Specimens: d.count, Status: d.status, Branch: d.branch, Technician: d.tech, "Last Sync": "Now" },
    body: (
      <div className="space-y-3">
        <div className="font-semibold text-navy">Specimens (sample)</div>
        <table className="w-full text-xs">
          <thead><tr className="border-b text-muted-foreground"><th className="text-left py-1">Lab #</th><th className="text-left">Test</th><th className="text-left">Status</th></tr></thead>
          <tbody>
            {Array.from({ length: 6 }).map((_, i) => (
              <tr key={i} className="border-b border-border">
                <td className="py-1 font-mono">TPL-2026-04-30-{(140 + i).toString().padStart(4, "0")}</td>
                <td>{["FBC","HBA1C","HIV PCR","TSH","CRP","Lipogram"][i]}</td>
                <td><Pill tone={i < 3 ? "success" : i < 5 ? "warning" : "muted"}>{i < 3 ? "Resulted" : i < 5 ? "On analyzer" : "Pending"}</Pill></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-[11px] text-muted-foreground bg-muted/50 p-2 rounded">QC: Levey-Jennings within 2σ · Last cal 06:00</div>
      </div>
    ),
    actions: [
      { label: "Open Full Worksheet View", tone: "primary", onClick: () => form.open({
        title: `${d.name} — Full Worksheet`,
        subtitle: `${d.branch} · ${d.date} · ${d.count} specimens`,
        size: "xl", submitLabel: "Save Worksheet",
        fields: [
          { name: "header", label: "Header notes", type: "textarea", span: 2, group: "Header", placeholder: "Run notes, observations, deviations…" },
          { name: "tech",   label: "Technician", defaultValue: d.tech, group: "Header" },
          { name: "supervisor", label: "Supervisor sign-off", group: "Header" },
          { name: "qcStatus", label: "QC Status", type: "select", options: ["Pass","Warning","Fail"], required: true, group: "QC" },
          { name: "qcLot",  label: "QC Lot #", group: "QC" },
          { name: "qcMean", label: "QC Mean", type: "number", group: "QC" },
          { name: "qcSd",   label: "QC SD", type: "number", group: "QC" },
          { name: "selected", label: "Specimens batch action", type: "select", options: ["Release All Resulted","Hold All","Re-run Selected","No batch action"], group: "Batch" },
          { name: "comments", label: "Reviewer comments", type: "textarea", span: 2, group: "Batch" },
        ],
      }) },
      { label: "Preview & Print Worksheet", onClick: () => printPreviewWorksheet(d) },
      { label: "Add QC Run", onClick: () => form.open({
        title: `Add QC Run · ${d.name}`,
        subtitle: `${d.branch} · ${d.date}`,
        size: "lg", submitLabel: "Record QC Run",
        fields: [
          { name: "level", label: "QC Level", type: "select", options: ["Level 1","Level 2","Level 3"], required: true, group: "QC" },
          { name: "lot",   label: "Lot #",   required: true, group: "QC" },
          { name: "expiry",label: "Lot Expiry", type: "date", group: "QC" },
          { name: "analyser", label: "Analyser", required: true, group: "QC" },
          { name: "value", label: "Measured Value", type: "number", required: true, group: "Result" },
          { name: "mean",  label: "Target Mean", type: "number", required: true, group: "Result" },
          { name: "sd",    label: "Target SD",   type: "number", required: true, group: "Result" },
          { name: "westgard", label: "Westgard Rule Applied", type: "select", options: ["1-2s","1-3s","2-2s","R-4s","4-1s","10x","None"], group: "Result" },
          { name: "action",label: "Action Taken", type: "textarea", span: 2, group: "Result" },
        ],
      }) },
      { label: "Release Selected Results", onClick: () => action.open({
        title: `Release Selected from ${d.name}`,
        subtitle: `${d.branch} · ${d.date}`,
        tone: "approve", confirmLabel: "Release Selected Results",
        reasonLabel: "Release note (optional)",
        presetReasons: ["Pathologist signed off","Auto-validated","Verbal authorisation","Routine batch"],
      }) },
    ],
  });

  return (
    <>
      <PageHeader kicker="Section 3C" title="Worksheets" breadcrumb={["Laboratory", "Worksheets"]}
        actions={<button onClick={() => form.open({
          title: "Generate Worksheet",
          subtitle: "Select department, laboratories, date range and order statuses to include.",
          size: "lg", submitLabel: "Generate PDF",
          fields: [
            { name: "department", label: "Department", type: "select", required: true, options: ["CHEM","HAEM","MICRO","HISTO","VIRO","HIV","ISOT"], group: "Filter Options" },
            { name: "labs",       label: "Laboratories", type: "multiselect", required: true, options: ["All Laboratories","Booysens","Pretoria","Cape Town","Durban","JHB HQ","Polokwane","Witbank","Klerksdorp"], defaultValue: ["All Laboratories"], span: 2, group: "Filter Options" },
            { name: "from", label: "Date From", type: "date", required: true, defaultValue: "2026-03-31", group: "Filter Options" },
            { name: "to",   label: "Date To",   type: "date", required: true, defaultValue: "2026-04-30", group: "Filter Options" },
            { name: "statuses", label: "Order Status", type: "multiselect", required: true, options: ["Registered","To Check","In Progress","Resulted","Released"], defaultValue: ["Registered","To Check"], span: 2, group: "Filter Options" },
          ],
        })} className="bg-target text-white text-xs font-semibold px-3 py-2 rounded-lg inline-flex items-center gap-1.5">Generate Worksheet</button>}
      />
      <FilterBar
        date={{ from, to, setFrom, setTo }}
        filters={[
          { name: "branch", label: "Branches", options: ["Booysens","Pretoria","Cape Town","Durban","JHB HQ"], value: fBranch, onChange: setFBranch },
          { name: "dept", label: "Departments", options: ["HIV","Chemistry","Haematology","Microbiology","Histology","Virology"], value: fDept, onChange: setFDept },
          { name: "status", label: "Statuses", options: ["In Progress","Pending Review","Awaiting Specimen","Completed"], value: fStatus, onChange: setFStatus },
        ]}
        search={search} onSearch={setSearch}
        onClear={() => { setFBranch(""); setFDept(""); setFStatus(""); setSearch(""); }}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((d) => {
          const Icon = d.icon;
          return (
            <Panel key={d.name + d.branch}>
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-target/10 flex items-center justify-center text-target">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-navy">{d.name}</h3>
                    <Pill tone={d.status === "In Progress" ? "warning" : d.status === "Pending Review" ? "info" : "muted"}>{d.status}</Pill>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{d.branch} · {d.date}</div>
                  <div className="text-xs mt-2">Tech: <span className="font-medium">{d.tech}</span></div>
                  <div className="text-2xl font-bold text-navy mt-3">{d.count} <span className="text-xs font-normal text-muted-foreground">specimens</span></div>
                  <button onClick={() => openWorksheet(d)} className="mt-3 w-full bg-navy hover:bg-navy-deep text-white text-xs font-semibold py-2 rounded-md">Open Worksheet</button>
                </div>
              </div>
            </Panel>
          );
        })}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-16 text-sm text-muted-foreground">No worksheets match your filters.</div>
        )}
      </div>
    </>
  );
}
