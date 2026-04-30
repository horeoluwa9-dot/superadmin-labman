import { useState } from "react";
import { PageHeader, Panel, Pill, Tabs, fmtZAR } from "@/components/shared/Toolbar";
import { Phone, ShieldX, ShieldOff } from "lucide-react";

const debtors = [
  { p: "Acme Mining Ltd",  d030: 12420, d3160: 0,     d6190: 0,     d90: 0,     last: "12 Apr 2026" },
  { p: "Discovery Health (Bonitas)", d030: 84300, d3160: 18200, d6190: 4100,  d90: 0, last: "02 Apr 2026" },
  { p: "Patient · S. Khumalo", d030: 0,     d3160: 0,     d6190: 1450,  d90: 2310,  last: "12 Feb 2026" },
  { p: "GEMS Western Cape", d030: 33800, d3160: 14210, d6190: 9100,  d90: 12400, last: "21 Mar 2026" },
];
const TABS = ["Patient Invoicing", "Receipts", "Handover Accounts", "Blacklisted Patients"];

export default function Debtors() {
  const [tab, setTab] = useState(TABS[0]);
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
                      <td><button className="text-[11px] font-semibold bg-blue-600 text-white px-2 py-1 rounded inline-flex items-center gap-1"><Phone className="h-3 w-3" />Contact</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        {tab === "Receipts" && (
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="rounded-lg border border-border p-4">
              <h3 className="font-semibold text-navy mb-3">Record Payment</h3>
              <div className="space-y-3 text-sm">
                <Field label="Amount (ZAR)" placeholder="R 0.00" />
                <Field label="Payment Method" type="select" options={["Cash","EFT","Card"]} />
                <Field label="Allocate to invoice" placeholder="INV-2026-0042" />
                <button className="w-full bg-target text-white py-2 rounded-md font-semibold">Record Receipt</button>
              </div>
            </div>
            <div className="rounded-lg border border-border p-4">
              <h3 className="font-semibold text-navy mb-3">Recent Receipts</h3>
              <p className="text-sm text-muted-foreground">Receipts table with audit trail will appear here.</p>
            </div>
          </div>
        )}
        {tab === "Handover Accounts" && (
          <div className="text-sm text-muted-foreground p-6 text-center">No accounts currently handed over to collections.</div>
        )}
        {tab === "Blacklisted Patients" && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-muted-foreground">Blacklisting requires Super Admin justification.</span>
              <button className="bg-red-600 text-white text-xs font-semibold px-3 py-2 rounded-md inline-flex items-center gap-1.5"><ShieldX className="h-3.5 w-3.5" />Add to Blacklist</button>
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
                    <td><button className="text-[11px] font-semibold bg-amber-100 text-amber-800 px-2 py-1 rounded inline-flex items-center gap-1"><ShieldOff className="h-3 w-3" />Remove</button></td>
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

function Field({ label, type = "text", placeholder, options }: { label: string; type?: string; placeholder?: string; options?: string[] }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-muted-foreground">{label}</span>
      {type === "select"
        ? <select className="mt-1 w-full border border-border rounded-md px-3 py-2 text-sm">{options?.map(o => <option key={o}>{o}</option>)}</select>
        : <input placeholder={placeholder} className="mt-1 w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-target/30" />}
    </label>
  );
}
