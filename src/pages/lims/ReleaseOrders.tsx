import { PageHeader, Panel, Pill, Tabs, Pagination, fmtZAR } from "@/components/shared/Toolbar";
import { useActionDialog } from "@/components/shared/FormDialog";
import { useState } from "react";
import { Send, FileCheck2 } from "lucide-react";
import { KpiCard } from "@/components/shared/KpiCard";

const RELEASES = [
  { ln: "TPL-2026-04-30-0142", patient: "Thandiwe Mokoena", tests: "FBC, U&E, HBA1C", path: "Dr. Phakathi", reviewed: true, channel: "Doctor Portal", status: "Ready", critical: false },
  { ln: "TPL-2026-04-30-0143", patient: "Sibusiso Khumalo", tests: "HIV PCR",          path: "Dr. R. Yemmy",  reviewed: true, channel: "Email + SMS",   status: "Ready", critical: true },
  { ln: "TPL-2026-04-30-0144", patient: "Naledi Dlamini",   tests: "TSH, Free T4",     path: "Dr. F. Ike",    reviewed: false, channel: "Doctor Portal", status: "Awaiting Review", critical: false },
  { ln: "TPL-2026-04-30-0140", patient: "Pieter v.d. Merwe", tests: "PSA, Lipogram",    path: "Dr. Phakathi", reviewed: true, channel: "Email",          status: "Released", critical: false },
];

export default function ReleaseOrders() {
  const action = useActionDialog();
  const [tab, setTab] = useState("Ready");
  const counts = RELEASES.reduce((a, r) => ({ ...a, All: (a.All||0)+1, [r.status]: (a[r.status]||0)+1 }), {} as any);
  const filtered = tab === "All" ? RELEASES : RELEASES.filter(r => r.status === tab);

  return (
    <>
      <PageHeader kicker="Section 3D · LIMS" title="Release Orders" breadcrumb={["Laboratory","Release"]} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <KpiCard label="Ready to Release" value={counts.Ready||0} accent="success" />
        <KpiCard label="Awaiting Review"  value={counts["Awaiting Review"]||0} accent="warn" />
        <KpiCard label="Released Today"   value={counts.Released||0} accent="navy" />
        <KpiCard label="Critical Pending" value={RELEASES.filter(r=>r.critical&&r.status==="Ready").length} accent="red" />
      </div>
      <Panel>
        <Tabs items={["All","Ready","Awaiting Review","Released"]} active={tab} onChange={setTab} counts={counts} />
        <div className="flex gap-2 mb-4">
          <button onClick={() => action.open({ title: `Release All Ready (${counts.Ready||0})`, tone: "approve", confirmLabel: "Release All", reasonLabel: "Optional note", presetReasons: ["Reviewed by pathologist","QC passed","Routine batch release"] })} className="bg-target text-white text-xs font-semibold px-3.5 py-2 rounded-lg inline-flex items-center gap-1.5"><Send className="h-3.5 w-3.5" />Release All Ready</button>
          <button className="border border-border bg-white text-xs font-semibold px-3 py-2 rounded-lg">Print Release Report</button>
        </div>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="data-table">
            <thead><tr><th>Lab #</th><th>Patient</th><th>Tests</th><th>Pathologist</th><th>Reviewed</th><th>Delivery</th><th>Critical</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>{filtered.map(r => (
              <tr key={r.ln}>
                <td className="font-mono text-xs">{r.ln}</td>
                <td className="font-medium">{r.patient}</td>
                <td className="text-xs">{r.tests}</td>
                <td className="text-xs">{r.path}</td>
                <td>{r.reviewed ? <Pill tone="success">✓</Pill> : <Pill tone="warning">Pending</Pill>}</td>
                <td className="text-xs"><span className="pill-info text-[10px]">{r.channel}</span></td>
                <td>{r.critical ? <Pill tone="danger">Critical</Pill> : "—"}</td>
                <td><Pill tone={r.status==="Released"?"success":r.status==="Ready"?"info":"warning"}>{r.status}</Pill></td>
                <td>
                  {r.status === "Ready" && (
                    <button onClick={() => action.open({ title: `Release ${r.ln}`, subtitle: `${r.patient} · ${r.tests}`, tone: "approve", confirmLabel: "Release Result", presetReasons: ["Pathologist signed off","Auto-validated","Verbal authorisation"] })} className="text-[10px] font-semibold bg-emerald-600 text-white px-2 py-1 rounded inline-flex items-center gap-1"><FileCheck2 className="h-3 w-3" />Release</button>
                  )}
                  {r.status === "Awaiting Review" && (
                    <button onClick={() => action.open({ title: `Mark Reviewed · ${r.ln}`, tone: "approve", confirmLabel: "Mark Reviewed" })} className="text-[10px] font-semibold bg-amber-600 text-white px-2 py-1 rounded">Review</button>
                  )}
                </td>
              </tr>
            ))}</tbody>
          </table>
          <Pagination total={filtered.length} />
        </div>
      </Panel>
    </>
  );
}
