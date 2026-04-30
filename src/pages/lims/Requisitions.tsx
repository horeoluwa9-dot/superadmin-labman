import { useState, useMemo } from "react";
import { PageHeader, Panel, Pill, Tabs, DataToolbar, Pagination, fmtZAR } from "@/components/shared/Toolbar";
import { useFormDialog } from "@/components/shared/FormDialog";
import { useDrawer } from "@/components/shared/DetailDrawer";
import { usePrintPreview } from "@/components/shared/PrintPreview";
import { useBranch } from "@/lib/branch";
import { FilterBar } from "@/components/shared/FilterBar";
import { NEW_REQUISITION_FIELDS } from "@/lib/forms";
import { BRANCHES } from "@/lib/nav";
import { Eye, Edit, Printer, Download } from "lucide-react";
import { toast } from "sonner";

const reqs = [
  { ln: "TPL-2026-04-30-0142", patient: "Thandiwe Mokoena", id: "9201155012083", branch: "Booysens", doctor: "Dr. M. Phakathi", dept: "Chemistry", priority: "Routine", tests: "FBC, U&E, HBA1C", aid: "Discovery", excl: 842.50, incl: 968.88, status: "Completed", capturer: "ntswaki", dt: "30/04 07:42" },
  { ln: "TPL-2026-04-30-0143", patient: "Sibusiso Khumalo", id: "8807085048089", branch: "Pretoria", doctor: "Dr. R. Yemmy",   dept: "Virology",  priority: "Urgent",  tests: "HIV PCR",      aid: "Cash",      excl: 1450.00, incl: 1667.50, status: "In Progress", capturer: "patrick", dt: "30/04 07:51" },
  { ln: "TPL-2026-04-30-0144", patient: "Naledi Dlamini",   id: "9504220789083", branch: "Cape Town", doctor: "Dr. F. Ike",     dept: "Chemistry", priority: "Routine", tests: "TSH, Free T4",  aid: "Bonitas",   excl: 412.00,  incl: 473.80,  status: "Pending",     capturer: "carmen",  dt: "30/04 08:03" },
  { ln: "TPL-2026-04-30-0145", patient: "Pieter van der Merwe", id: "7711100456082", branch: "Booysens", doctor: "Dr. M. Phakathi", dept: "Chemistry", priority: "Routine", tests: "PSA, Lipogram", aid: "Momentum", excl: 678.00, incl: 779.70, status: "Completed", capturer: "ntswaki", dt: "30/04 08:12" },
  { ln: "TPL-2026-04-30-0146", patient: "Ayanda Nkosi",     id: "9912140234086", branch: "Durban",    doctor: "Dr. I. Igbo",    dept: "Haematology", priority: "STAT",   tests: "hCG",            aid: "Cash",      excl: 198.00,  incl: 227.70,  status: "Cancelled",   capturer: "william", dt: "30/04 08:18" },
];
const TABS = ["All", "Pending", "In Progress", "Completed", "Cancelled"];

type R = typeof reqs[number];

export default function LimsRequisitions() {
  const [active, setActive] = useState("All");
  const form = useFormDialog();
  const drawer = useDrawer();
  const preview = usePrintPreview();
  const { branch } = useBranch();
  const [fBranch, setFBranch] = useState("");
  const [fDept, setFDept] = useState("");
  const [fPriority, setFPriority] = useState("");
  const [fAid, setFAid] = useState("");
  const [search, setSearch] = useState("");
  const [from, setFrom] = useState("2026-04-01");
  const [to, setTo] = useState("2026-04-30");

  const filtered = useMemo(() => reqs.filter(r => {
    if (branch !== "ALL" && r.branch !== branch) return false;
    if (active !== "All" && r.status !== active) return false;
    if (fBranch && r.branch !== fBranch) return false;
    if (fDept && r.dept !== fDept) return false;
    if (fPriority && r.priority !== fPriority) return false;
    if (fAid && r.aid !== fAid) return false;
    if (search && !(`${r.patient} ${r.ln} ${r.id} ${r.doctor}`.toLowerCase().includes(search.toLowerCase()))) return false;
    return true;
  }), [active, fBranch, fDept, fPriority, fAid, search, branch]);

  const status = (s: string) => ({
    Completed: <Pill tone="success">{s}</Pill>,
    Pending: <Pill tone="muted">{s}</Pill>,
    "In Progress": <Pill tone="warning">{s}</Pill>,
    Cancelled: <Pill tone="danger">{s}</Pill>,
  } as any)[s];

  const openNew = () => form.open({ title: "New Requisition", subtitle: "Create a new lab requisition with patient, tests, specimen and billing details.", fields: NEW_REQUISITION_FIELDS, size: "xl", submitLabel: "Create Requisition & Print Barcodes" });

  const openEdit = (r: R, mode: "edit" | "view") => {
    const fields = NEW_REQUISITION_FIELDS.map(f => ({
      ...f,
      defaultValue: f.name === "patientName" ? r.patient : f.name === "idNumber" ? r.id : f.name === "branch" ? r.branch : f.name === "doctor" ? r.doctor : f.name === "department" ? r.dept : f.name === "priority" ? r.priority : f.name === "aid" ? r.aid : f.defaultValue,
    }));
    form.open({
      title: mode === "view" ? `Requisition · ${r.ln}` : `Edit Requisition · ${r.ln}`,
      subtitle: `${r.patient} · ${r.branch} · ${r.dt}`,
      fields, size: "xl",
      submitLabel: mode === "view" ? "Close" : "Save Changes",
      successMessage: mode === "view" ? "Viewed" : "Requisition updated",
    });
  };

  const openPrintPreview = (r: R) => preview.open({
    title: `Requisition Form · ${r.ln}`,
    subtitle: `${r.patient} · ${r.branch}`,
    filename: `Requisition_${r.ln}`,
    body: (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "2px solid #c8102e", paddingBottom: 12, marginBottom: 16 }}>
          <div>
            <h1>TARGET PATHOLOGY</h1>
            <div className="muted">Lab Requisition Form · ISO 15189 Accredited</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 700 }}>{r.ln}</div>
            <div className="muted">{r.dt}</div>
          </div>
        </div>
        <table>
          <tbody>
            <tr><th style={{ width: "30%" }}>Patient Name</th><td>{r.patient}</td></tr>
            <tr><th>ID Number</th><td>{r.id}</td></tr>
            <tr><th>Branch</th><td>{r.branch}</td></tr>
            <tr><th>Referring Doctor</th><td>{r.doctor}</td></tr>
            <tr><th>Department</th><td>{r.dept}</td></tr>
            <tr><th>Priority</th><td>{r.priority}</td></tr>
            <tr><th>Tests Ordered</th><td>{r.tests}</td></tr>
            <tr><th>Billing</th><td>{r.aid}</td></tr>
            <tr><th>Sub-total (Excl. VAT)</th><td>{fmtZAR(r.excl)}</td></tr>
            <tr><th>Total (Incl. VAT)</th><td><strong>{fmtZAR(r.incl)}</strong></td></tr>
            <tr><th>Captured by</th><td>{r.capturer}</td></tr>
          </tbody>
        </table>
        <div style={{ marginTop: 24, display: "flex", justifyContent: "space-between" }}>
          <div>
            <div className="muted">Phlebotomist signature</div>
            <div style={{ borderBottom: "1px solid #94a3b8", width: 220, height: 32, marginTop: 4 }} />
          </div>
          <div>
            <div className="muted">Doctor signature</div>
            <div style={{ borderBottom: "1px solid #94a3b8", width: 220, height: 32, marginTop: 4 }} />
          </div>
        </div>
        <div style={{ marginTop: 24, fontSize: 11, color: "#64748b" }}>
          Specimen barcodes printed separately. Critical results communicated to referring doctor within 1 hour per ISO 15189.
        </div>
      </div>
    ),
  });

  return (
    <>
      <PageHeader kicker="Section 3 · LIMS" title="Requisitions" breadcrumb={["Laboratory", "Requisitions", "List"]} />
      <Panel>
        <Tabs items={TABS} active={active} onChange={setActive} counts={{ All: 1284, Pending: 42, "In Progress": 217, Completed: 1011, Cancelled: 14 }} />
        <FilterBar
          date={{ from, to, setFrom, setTo }}
          filters={[
            { name: "branch", label: "Branches", options: BRANCHES, value: fBranch, onChange: setFBranch },
            { name: "dept", label: "Departments", options: ["HIV","Chemistry","Haematology","Microbiology","Histology","Virology"], value: fDept, onChange: setFDept },
            { name: "priority", label: "Priority", options: ["Routine","Urgent","STAT"], value: fPriority, onChange: setFPriority },
            { name: "aid", label: "Aids", options: ["Cash","Discovery","Bonitas","GEMS","Polmed","Momentum","Fedhealth"], value: fAid, onChange: setFAid },
          ]}
          search={search} onSearch={setSearch}
          onClear={() => { setFBranch(""); setFDept(""); setFPriority(""); setFAid(""); setSearch(""); }}
        />
        <DataToolbar primaryLabel="New Requisition" onPrimary={openNew} extras={
          <button onClick={() => toast.success("Barcode batch printed", { description: `${filtered.length} barcodes sent to default printer` })} className="inline-flex items-center gap-1.5 border border-border bg-white hover:bg-muted text-xs font-semibold px-3 py-2 rounded-lg">Print Barcodes</button>
        } search={false} />
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="data-table">
            <thead>
              <tr>
                <th>Lab Number</th><th>Patient</th><th>Branch</th><th>Doctor</th>
                <th>Tests</th><th>Aid/Cash</th><th className="text-right">Excl. VAT</th>
                <th className="text-right">Incl. VAT</th><th>Status</th><th>Capturer</th><th>Date</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.ln}>
                  <td className="font-mono text-xs">{r.ln}</td>
                  <td>
                    <div className="font-medium">{r.patient}</div>
                    <div className="text-[10px] font-mono text-muted-foreground">{r.id}</div>
                  </td>
                  <td>{r.branch}</td><td className="text-xs">{r.doctor}</td>
                  <td className="text-xs">{r.tests}</td><td className="text-xs">{r.aid}</td>
                  <td className="text-right font-mono text-xs">{fmtZAR(r.excl)}</td>
                  <td className="text-right font-mono text-xs font-semibold">{fmtZAR(r.incl)}</td>
                  <td>{status(r.status)}</td>
                  <td className="text-xs">{r.capturer}</td>
                  <td className="text-xs font-mono">{r.dt}</td>
                  <td>
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(r, "view")} className="p-1 hover:bg-target/10 hover:text-target rounded" aria-label="View"><Eye className="h-3.5 w-3.5" /></button>
                      <button onClick={() => openEdit(r, "edit")} className="p-1 hover:bg-blue-50 hover:text-blue-700 rounded" aria-label="Edit"><Edit className="h-3.5 w-3.5" /></button>
                      <button onClick={() => openPrintPreview(r)} className="p-1 hover:bg-emerald-50 hover:text-emerald-700 rounded" aria-label="Print"><Printer className="h-3.5 w-3.5" /></button>
                      <button onClick={() => { openPrintPreview(r); }} className="p-1 hover:bg-amber-50 hover:text-amber-700 rounded" aria-label="Download"><Download className="h-3.5 w-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={12} className="text-center py-8 text-muted-foreground text-xs">No requisitions match your filters.</td></tr>
              )}
            </tbody>
          </table>
          <Pagination total={filtered.length} />
        </div>
      </Panel>
    </>
  );
}
