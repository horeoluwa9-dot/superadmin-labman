import { useState } from "react";
import { PageHeader, Panel, Pill, Tabs, fmtZAR } from "@/components/shared/Toolbar";
import { useFormDialog, useActionDialog } from "@/components/shared/FormDialog";
import { Phone, ShieldX, ShieldOff, Download, Mail, MessageSquare } from "lucide-react";
import { BLACKLIST_FIELDS, RECORD_RECEIPT_FIELDS } from "@/lib/forms";
import { toast } from "sonner";

const debtors = [
  { p: "Acme Mining Ltd",            d030: 12420, d3160: 0,     d6190: 0,     d90: 0,     last: "12 Apr 2026", phone: "+27 11 482 1100", email: "ap@acmemining.co.za" },
  { p: "Discovery Health (Bonitas)", d030: 84300, d3160: 18200, d6190: 4100,  d90: 0,     last: "02 Apr 2026", phone: "+27 11 529 0000", email: "labs@bonitas.co.za" },
  { p: "Patient · S. Khumalo",       d030: 0,     d3160: 0,     d6190: 1450,  d90: 2310,  last: "12 Feb 2026", phone: "+27 82 441 0098", email: "skhumalo@gmail.com" },
  { p: "GEMS Western Cape",          d030: 33800, d3160: 14210, d6190: 9100,  d90: 12400, last: "21 Mar 2026", phone: "+27 21 421 0044", email: "claims@gems.gov.za" },
];

const RECEIPTS = [
  { ref: "RC-2026-1124", date: "30/04/2026", invoice: "INV-2026-0041", payer: "Discovery Health", amount: 1667.50, method: "EFT", by: "Yanick K." },
  { ref: "RC-2026-1123", date: "29/04/2026", invoice: "INV-2026-0039", payer: "P. van der Merwe", amount: 779.70, method: "Card", by: "Carmen A." },
  { ref: "RC-2026-1122", date: "29/04/2026", invoice: "INV-2026-0033", payer: "Acme Mining", amount: 4280.00, method: "EFT", by: "Yanick K." },
  { ref: "RC-2026-1121", date: "28/04/2026", invoice: "INV-2026-0030", payer: "T. Mokoena", amount: 1280.00, method: "Snapscan", by: "ms ntswaki" },
  { ref: "RC-2026-1120", date: "28/04/2026", invoice: "INV-2026-0028", payer: "Bonitas (J. Pillay)", amount: 968.88, method: "EFT", by: "Yanick K." },
];

const TABS = ["Patient Invoicing", "Receipts", "Handover Accounts", "Blacklisted Patients"];

export default function Debtors() {
  const [tab, setTab] = useState(TABS[0]);
  const form = useFormDialog();
  const action = useActionDialog();

  const downloadReceipt = (ref: string) => {
    const lines = [`Receipt: ${ref}`, "Target Pathology Laboratory (Pty) Ltd", "—", ...RECEIPTS.filter(r => r.ref === ref).map(r => JSON.stringify(r, null, 2))].join("\n");
    const blob = new Blob([lines], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `${ref}.txt`; a.click();
    URL.revokeObjectURL(url);
    toast.success(`${ref} downloaded`);
  };
  const downloadAll = () => {
    const blob = new Blob([JSON.stringify(RECEIPTS, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `receipts-export.json`; a.click();
    URL.revokeObjectURL(url);
    toast.success("All receipts exported");
  };

  return (
    <>
      <PageHeader kicker="Section 4B · Accounting" title="Debtors" breadcrumb={["Accounting", "Debtors"]} />
      <Panel>
        <Tabs items={TABS} active={tab} onChange={setTab} />

        {tab === "Patient Invoicing" && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <AgingCard label="0–30 days"  value={fmtZAR(130520)} tone="emerald" />
              <AgingCard label="31–60 days" value={fmtZAR(32410)}  tone="amber" />
              <AgingCard label="61–90 days" value={fmtZAR(14650)}  tone="orange" />
              <AgingCard label="90+ days"   value={fmtZAR(14710)}  tone="red" />
            </div>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="data-table">
                <thead><tr><th>Account</th><th className="text-right">0–30</th><th className="text-right">31–60</th><th className="text-right">61–90</th><th className="text-right">90+</th><th>Last Payment</th><th>Action</th></tr></thead>
                <tbody>
                  {debtors.map((d) => (
                    <tr key={d.p}>
                      <td className="font-medium">{d.p}</td>
                      <td className="text-right font-mono text-xs">{d.d030 ? fmtZAR(d.d030) : "—"}</td>
                      <td className={`text-right font-mono text-xs ${d.d3160 ? "text-amber-700" : ""}`}>{d.d3160 ? fmtZAR(d.d3160) : "—"}</td>
                      <td className={`text-right font-mono text-xs ${d.d6190 ? "text-orange-700" : ""}`}>{d.d6190 ? fmtZAR(d.d6190) : "—"}</td>
                      <td className={`text-right font-mono text-xs ${d.d90   ? "text-red-700 font-semibold" : ""}`}>{d.d90 ? fmtZAR(d.d90) : "—"}</td>
                      <td className="text-xs">{d.last}</td>
                      <td>
                        <div className="flex gap-1">
                          <button onClick={() => action.open({ title: `Contact ${d.p}`, subtitle: `${d.phone} · ${d.email}`, tone: "neutral", reasonLabel: "Call notes / outcome", presetReasons: ["Promise-to-pay","No answer","Voicemail left","Disputed","Updated contact details"], confirmLabel: "Log Call" })} className="text-[11px] font-semibold bg-blue-600 text-white px-2 py-1 rounded inline-flex items-center gap-1"><Phone className="h-3 w-3" />Call</button>
                          <button onClick={() => action.open({ title: `Email ${d.p}`, subtitle: d.email, tone: "neutral", reasonLabel: "Message", confirmLabel: "Send Email" })} className="text-[11px] font-semibold bg-slate-700 text-white px-2 py-1 rounded inline-flex items-center gap-1"><Mail className="h-3 w-3" />Email</button>
                          <button onClick={() => action.open({ title: `SMS ${d.p}`, subtitle: d.phone, tone: "neutral", reasonLabel: "SMS body (160 chars)", confirmLabel: "Send SMS" })} className="text-[11px] font-semibold bg-emerald-700 text-white px-2 py-1 rounded inline-flex items-center gap-1"><MessageSquare className="h-3 w-3" />SMS</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === "Receipts" && (
          <>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-navy">All Receipts</h3>
                <p className="text-xs text-muted-foreground">Showing latest {RECEIPTS.length} receipts. Each receipt is fully audited and downloadable as PDF.</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => form.open({ title: "Record Payment / Receipt", fields: RECORD_RECEIPT_FIELDS, size: "lg", submitLabel: "Record & Allocate" })} className="bg-target text-white text-xs font-semibold px-3 py-2 rounded-md">+ Record Receipt</button>
                <button onClick={downloadAll} className="border border-border bg-white text-xs font-semibold px-3 py-2 rounded-md inline-flex items-center gap-1.5"><Download className="h-3.5 w-3.5" />Download All</button>
              </div>
            </div>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="data-table">
                <thead><tr><th>Receipt #</th><th>Date</th><th>Invoice</th><th>Payer</th><th>Method</th><th className="text-right">Amount</th><th>Received By</th><th>Action</th></tr></thead>
                <tbody>
                  {RECEIPTS.map(r => (
                    <tr key={r.ref}>
                      <td className="font-mono text-xs font-bold">{r.ref}</td>
                      <td className="text-xs font-mono">{r.date}</td>
                      <td className="font-mono text-xs">{r.invoice}</td>
                      <td className="font-medium">{r.payer}</td>
                      <td><span className="pill-info text-[10px]">{r.method}</span></td>
                      <td className="text-right font-mono font-semibold text-xs">{fmtZAR(r.amount)}</td>
                      <td className="text-xs">{r.by}</td>
                      <td><button onClick={() => downloadReceipt(r.ref)} className="text-[10px] font-semibold inline-flex items-center gap-1 text-target hover:text-target-dark"><Download className="h-3 w-3" />Download</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === "Handover Accounts" && (
          <div className="text-sm text-muted-foreground p-6 text-center">No accounts currently handed over to collections.</div>
        )}

        {tab === "Blacklisted Patients" && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-muted-foreground">Blacklisting requires Super Admin justification and is fully audited.</span>
              <button onClick={() => form.open({ title: "Add to Blacklist", subtitle: "Add a patient to the blacklist registry. Super Admin approval required.", fields: BLACKLIST_FIELDS, size: "lg", submitLabel: "Blacklist Patient" })} className="bg-red-600 text-white text-xs font-semibold px-3 py-2 rounded-md inline-flex items-center gap-1.5"><ShieldX className="h-3.5 w-3.5" />Add to Blacklist</button>
            </div>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="data-table">
                <thead><tr><th>Patient</th><th>Reason</th><th>Date</th><th>Actioned By</th><th>Action</th></tr></thead>
                <tbody>
                  <tr>
                    <td className="font-medium">B. Maluleka <span className="ml-2 pill-danger">⚠ Blacklisted</span></td>
                    <td className="text-xs">Repeated NSF cheques (3 instances)</td>
                    <td className="text-xs">14 Feb 2026</td>
                    <td className="text-xs">mr francis ike</td>
                    <td><button onClick={() => action.open({ title: "Remove from Blacklist", subtitle: "B. Maluleka", tone: "neutral", requireReason: true, reasonLabel: "Justification for removal", confirmLabel: "Remove" })} className="text-[11px] font-semibold bg-amber-100 text-amber-800 px-2 py-1 rounded inline-flex items-center gap-1"><ShieldOff className="h-3 w-3" />Remove</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Panel>
    </>
  );
}

function AgingCard({ label, value, tone }: { label: string; value: string; tone: string }) {
  const map: any = { emerald: "border-emerald-200 bg-emerald-50 text-emerald-800", amber: "border-amber-200 bg-amber-50 text-amber-800", orange: "border-orange-200 bg-orange-50 text-orange-800", red: "border-red-200 bg-red-50 text-red-800" };
  return (
    <div className={`rounded-lg border p-3 ${map[tone]}`}>
      <div className="text-[11px] uppercase font-semibold tracking-wider opacity-80">{label}</div>
      <div className="font-mono font-bold text-lg mt-1">{value}</div>
    </div>
  );
}
