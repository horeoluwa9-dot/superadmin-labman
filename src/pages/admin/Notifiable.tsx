import { useState } from "react";
import { PageHeader, Panel, Pill, Pagination } from "@/components/shared/Toolbar";
import { useFormDialog, useActionDialog } from "@/components/shared/FormDialog";
import { useDrawer } from "@/components/shared/DetailDrawer";
import { Plus, Edit, Send, Power } from "lucide-react";
import { NEW_NOTIFIABLE_SIMPLE_FIELDS } from "@/lib/forms";
import { toast } from "sonner";

type N = { id: string; icd10: string; email: string; disabled?: boolean };
const SEED: N[] = [
  { id: "ND-1", icd10: "B24",   email: "Hiv_Diseasemanagement@discovery.co.za" },
  { id: "ND-2", icd10: "B24",   email: "hiv@gems.gov.za" },
  { id: "ND-3", icd10: "E10.1", email: "diabeticcare@bonitas.co.za" },
  { id: "ND-4", icd10: "B24",   email: "results@lifesense.co.za", disabled: true },
  { id: "ND-5", icd10: "B24",   email: "pathresults@afadm.co.za" },
];

export default function Notifiable() {
  const form = useFormDialog();
  const drawer = useDrawer();
  const action = useActionDialog();
  const [rows, setRows] = useState<N[]>(SEED);

  const openCreate = () => form.open({
    title: "New notifiable disease",
    fields: NEW_NOTIFIABLE_SIMPLE_FIELDS, size: "md",
    onSubmit: (v) => setRows(rs => [{ id: `ND-${rs.length+1}`, icd10: v.icd10, email: v.email }, ...rs]),
  });
  const openEdit = (r: N) => form.open({
    title: `Edit ${r.icd10}`,
    fields: NEW_NOTIFIABLE_SIMPLE_FIELDS.map(f => ({ ...f, defaultValue: (r as any)[f.name] ?? "" })),
    size: "md",
    onSubmit: (v) => setRows(rs => rs.map(x => x.id === r.id ? { ...x, icd10: v.icd10, email: v.email } : x)),
  });
  const sendTest = (r: N) => action.open({
    title: `Send test email to ${r.email}`, tone: "approve",
    reasonLabel: "Sample patient lab #", presetReasons: ["TPL-2026-04-30-0142","TPL-2026-04-30-0099"],
    confirmLabel: "Send test", onConfirm: () => { toast.success(`Test email queued to ${r.email}`); },
  });
  const toggle = (r: N) => action.open({
    title: r.disabled ? `Enable ${r.icd10} notifications` : `Disable ${r.icd10} notifications`,
    tone: r.disabled ? "approve" : "reject", requireReason: true, reasonLabel: "Reason",
    onConfirm: () => setRows(rs => rs.map(x => x.id === r.id ? { ...x, disabled: !x.disabled } : x)),
  });

  return (
    <>
      <PageHeader kicker="Section 5G · Administration" title="Notifiable Diseases" breadcrumb={["Administration","Notifiable Diseases","List"]}
        actions={<button onClick={openCreate} className="bg-target text-white text-xs font-semibold px-3 py-2 rounded-lg inline-flex items-center gap-1.5"><Plus className="h-3.5 w-3.5"/>New notifiable disease</button>}
      />
      <p className="text-sm text-muted-foreground mb-3">When a lab result matches one of the diagnosis codes below, an automatic notification is sent to the listed email — used for medical-aid disease management programs and statutory NDIC reporting.</p>
      <Panel>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="data-table">
            <thead><tr><th>Diagnosis code</th><th>Email address</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>{rows.map(r => (
              <tr key={r.id} className="cursor-pointer" onClick={() => drawer.open({
                title: r.icd10, subtitle: r.email,
                meta: { "Diagnosis code": r.icd10, "Email": r.email, Status: r.disabled?"Disabled":"Active" },
                actions: [
                  { label: "Edit", tone: "primary", onClick: () => openEdit(r) },
                  { label: "Send Test Email", onClick: () => sendTest(r) },
                  { label: r.disabled ? "Enable" : "Disable", tone: "danger", onClick: () => toggle(r) },
                ],
              })}>
                <td className={r.disabled ? "italic text-muted-foreground" : "font-medium"}>{r.disabled?"Disabled ":""}{r.icd10}</td>
                <td className="text-blue-700">{r.email}</td>
                <td>{r.disabled ? <Pill tone="muted">Disabled</Pill> : <Pill tone="success">Active</Pill>}</td>
                <td onClick={e => e.stopPropagation()}>
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(r)} className="text-blue-600 text-xs font-semibold inline-flex items-center gap-1"><Edit className="h-3.5 w-3.5"/>Edit</button>
                    <button onClick={() => sendTest(r)} className="text-emerald-700 text-xs font-semibold inline-flex items-center gap-1 ml-2"><Send className="h-3.5 w-3.5"/>Test</button>
                    <button onClick={() => toggle(r)} className="text-red-600 text-xs font-semibold inline-flex items-center gap-1 ml-2"><Power className="h-3.5 w-3.5"/>{r.disabled?"Enable":"Disable"}</button>
                  </div>
                </td>
              </tr>
            ))}</tbody>
          </table>
          <Pagination total={rows.length} />
        </div>
      </Panel>
    </>
  );
}
