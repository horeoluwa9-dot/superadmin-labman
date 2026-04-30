import { useState } from "react";
import { PageHeader, Panel, Pill, Tabs, fmtZAR, Pagination, DataToolbar } from "@/components/shared/Toolbar";
import { useFormDialog, useActionDialog } from "@/components/shared/FormDialog";
import { useDrawer } from "@/components/shared/DetailDrawer";
import { FileText, Plus, Send, Download, Eye, Mail } from "lucide-react";
import { NEW_INVOICE_FIELDS } from "@/lib/forms";

const INVOICES = [
  { no: "INV-2026-0042", patient: "T. Mokoena",     type: "Cash",        amount: 1280.00, status: "Unpaid", date: "30/04/2026", branch: "Booysens", sentTo: "Carmen Angelica" },
  { no: "INV-2026-0041", patient: "Discovery (S. Khumalo)", type: "Medical Aid", amount: 1667.50, status: "Paid", date: "29/04/2026", branch: "Pretoria", sentTo: "L. van der Merwe" },
  { no: "INV-2026-0040", patient: "Bonitas (N. Dlamini)", type: "Medical Aid", amount: 473.80, status: "Disputed", date: "29/04/2026", branch: "Cape Town", sentTo: "Patrick Magupya" },
  { no: "INV-2026-0039", patient: "P. van der Merwe", type: "Cash", amount: 779.70, status: "Paid", date: "28/04/2026", branch: "Booysens", sentTo: "Ike Igbo" },
  { no: "INV-2026-0038", patient: "Acme Mining Corp", type: "Corporate", amount: 18420.00, status: "Unpaid", date: "27/04/2026", branch: "JHB HQ", sentTo: "L. van der Merwe" },
];

export default function Invoices() {
  const [tab, setTab] = useState("All");
  const form = useFormDialog();
  const action = useActionDialog();
  const drawer = useDrawer();

  const counts = INVOICES.reduce((a, r) => ({ ...a, All: (a.All||0)+1, [r.status]: (a[r.status]||0)+1 }), {} as Record<string,number>);
  const filtered = tab === "All" ? INVOICES : INVOICES.filter(i => i.status === tab);

  const newInvoice = (presetType?: string) => form.open({
    title: presetType ? `Generate ${presetType} Invoice` : "Create Invoice",
    subtitle: "Build invoice line-items, calculate VAT, and send to a sales rep / manager.",
    fields: NEW_INVOICE_FIELDS.map(f => f.name === "type" && presetType ? { ...f, defaultValue: presetType } : f),
    size: "xl",
    submitLabel: "Save & Send",
    successMessage: `${presetType || "Invoice"} created and dispatched`,
  });

  return (
    <>
      <PageHeader
        kicker="Section 4 · Accounting"
        title="Invoices"
        breadcrumb={["Accounting", "Invoices"]}
        actions={
          <div className="flex gap-2">
            <button onClick={() => newInvoice("Medical Aid")} className="inline-flex items-center gap-1.5 bg-navy hover:bg-navy-deep text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-sm">
              <FileText className="h-3.5 w-3.5" /> Generate Medical Aid Invoices
            </button>
            <button onClick={() => newInvoice("Cash")} className="inline-flex items-center gap-1.5 bg-navy hover:bg-navy-deep text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-sm">
              <FileText className="h-3.5 w-3.5" /> Generate Cash Invoices
            </button>
            <button onClick={() => newInvoice()} className="inline-flex items-center gap-1.5 bg-target hover:bg-target-dark text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-sm">
              <Plus className="h-3.5 w-3.5" /> Create Invoice
            </button>
          </div>
        }
      />
      <Panel>
        <Tabs items={["All", "Unpaid", "Paid", "Disputed", "Written Off"]} active={tab} onChange={setTab}
          counts={{ All: INVOICES.length, Unpaid: counts.Unpaid||0, Paid: counts.Paid||0, Disputed: counts.Disputed||0, "Written Off": 0 }} />
        <DataToolbar primaryLabel="Create Invoice" onPrimary={() => newInvoice()} />
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="data-table">
            <thead><tr><th>Invoice #</th><th>Patient / Account</th><th>Type</th><th>Branch</th><th>Sent To</th><th className="text-right">Amount</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map(inv => (
                <tr key={inv.no}>
                  <td className="font-mono text-xs">{inv.no}</td>
                  <td className="font-medium">{inv.patient}</td>
                  <td><span className="pill-info text-[10px]">{inv.type}</span></td>
                  <td className="text-xs">{inv.branch}</td>
                  <td className="text-xs">{inv.sentTo}</td>
                  <td className="text-right font-mono text-xs font-semibold">{fmtZAR(inv.amount)}</td>
                  <td className="text-xs font-mono">{inv.date}</td>
                  <td><Pill tone={inv.status === "Paid" ? "success" : inv.status === "Unpaid" ? "warning" : inv.status === "Disputed" ? "danger" : "muted"}>{inv.status}</Pill></td>
                  <td>
                    <div className="flex gap-1">
                      <button onClick={() => drawer.open({ title: inv.no, subtitle: inv.patient, meta: { Type: inv.type, Branch: inv.branch, Amount: fmtZAR(inv.amount), Status: inv.status, "Sent To": inv.sentTo, Date: inv.date }, actions: [{ label: "Open PDF", tone: "primary" }, { label: "Send Reminder" }, { label: "Edit Lines" }] })} className="p-1 hover:bg-muted rounded" title="View"><Eye className="h-3.5 w-3.5" /></button>
                      <button onClick={() => action.open({ title: `Send invoice ${inv.no}`, tone: "neutral", presetReasons: ["Carmen Angelica","L. van der Merwe","Patrick Magupya","Ike Igbo","Makoane Ngoasheng","All Sales Team"], reasonLabel: "Recipient (Sales Rep / Manager)", confirmLabel: "Send Invoice", requireReason: true })} className="p-1 hover:bg-muted rounded" title="Send"><Send className="h-3.5 w-3.5" /></button>
                      <button onClick={() => action.open({ title: `Email ${inv.no}`, tone: "neutral", reasonLabel: "Patient/Aid email", confirmLabel: "Email PDF" })} className="p-1 hover:bg-muted rounded" title="Email"><Mail className="h-3.5 w-3.5" /></button>
                      <button className="p-1 hover:bg-muted rounded" title="Download"><Download className="h-3.5 w-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination total={filtered.length} />
        </div>
        <p className="text-[10px] mt-3 text-muted-foreground">All amounts in South African Rand (ZAR).</p>
      </Panel>
    </>
  );
}
