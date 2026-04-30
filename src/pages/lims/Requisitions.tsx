import { useState } from "react";
import { PageHeader, Panel, Pill, Tabs, DataToolbar, Pagination, fmtZAR } from "@/components/shared/Toolbar";
import { useFormDialog } from "@/components/shared/FormDialog";
import { useDrawer } from "@/components/shared/DetailDrawer";
import { NEW_REQUISITION_FIELDS } from "@/lib/forms";
import { Eye, Edit, Printer } from "lucide-react";

const reqs = [
  { ln: "TPL-2026-04-30-0142", patient: "Thandiwe Mokoena", id: "9201155012083", branch: "Booysens", doctor: "Dr. M. Phakathi", tests: "FBC, U&E, HBA1C", aid: "Discovery", excl: 842.50, incl: 968.88, status: "Completed", capturer: "ntswaki", dt: "30/04 07:42" },
  { ln: "TPL-2026-04-30-0143", patient: "Sibusiso Khumalo", id: "8807085048089", branch: "Pretoria", doctor: "Dr. R. Yemmy",   tests: "HIV PCR",      aid: "Cash",      excl: 1450.00, incl: 1667.50, status: "In Progress", capturer: "patrick", dt: "30/04 07:51" },
  { ln: "TPL-2026-04-30-0144", patient: "Naledi Dlamini",   id: "9504220789083", branch: "Cape Town", doctor: "Dr. F. Ike",     tests: "TSH, Free T4",  aid: "Bonitas",   excl: 412.00,  incl: 473.80,  status: "Pending",     capturer: "carmen",  dt: "30/04 08:03" },
  { ln: "TPL-2026-04-30-0145", patient: "Pieter van der Merwe", id: "7711100456082", branch: "Booysens", doctor: "Dr. M. Phakathi", tests: "PSA, Lipogram", aid: "Momentum", excl: 678.00, incl: 779.70, status: "Completed", capturer: "ntswaki", dt: "30/04 08:12" },
  { ln: "TPL-2026-04-30-0146", patient: "Ayanda Nkosi",     id: "9912140234086", branch: "Durban",    doctor: "Dr. I. Igbo",    tests: "hCG",            aid: "Cash",      excl: 198.00,  incl: 227.70,  status: "Cancelled",   capturer: "william", dt: "30/04 08:18" },
];
const TABS = ["All", "Pending", "In Progress", "Completed", "Cancelled"];

export default function LimsRequisitions() {
  const [active, setActive] = useState("All");
  const form = useFormDialog();
  const drawer = useDrawer();
  const openNew = () => form.open({ title: "New Requisition", subtitle: "Create a new lab requisition with patient, tests, specimen and billing details.", fields: NEW_REQUISITION_FIELDS, size: "xl", submitLabel: "Create Requisition & Print Barcodes" });
  const status = (s: string) => ({
    Completed: <Pill tone="success">{s}</Pill>,
    Pending: <Pill tone="muted">{s}</Pill>,
    "In Progress": <Pill tone="warning">{s}</Pill>,
    Cancelled: <Pill tone="danger">{s}</Pill>,
  } as any)[s];
  return (
    <>
      <PageHeader
        kicker="Section 3 · LIMS"
        title="Requisitions"
        breadcrumb={["Laboratory", "Requisitions", "List"]}
      />
      <Panel>
        <Tabs items={TABS} active={active} onChange={setActive} counts={{ All: 1284, Pending: 42, "In Progress": 217, Completed: 1011, Cancelled: 14 }} />
        <DataToolbar primaryLabel="New Requisition" extras={
          <button className="inline-flex items-center gap-1.5 border border-border bg-white hover:bg-muted text-xs font-semibold px-3 py-2 rounded-lg">Print Barcodes</button>
        } />
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
              {reqs.map((r) => (
                <tr key={r.ln} className="cursor-pointer">
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
                      <button className="p-1 hover:bg-muted rounded" aria-label="View"><Eye className="h-3.5 w-3.5" /></button>
                      <button className="p-1 hover:bg-muted rounded" aria-label="Edit"><Edit className="h-3.5 w-3.5" /></button>
                      <button className="p-1 hover:bg-muted rounded" aria-label="Print"><Printer className="h-3.5 w-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination total={1284} />
        </div>
      </Panel>
    </>
  );
}
