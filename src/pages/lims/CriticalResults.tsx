import { useState, useMemo } from "react";
import { PageHeader, Panel, Pill } from "@/components/shared/Toolbar";
import { FilterBar } from "@/components/shared/FilterBar";
import { useActionDialog } from "@/components/shared/FormDialog";
import { useBranch } from "@/lib/branch";
import { AlertTriangle, Phone, ShieldAlert } from "lucide-react";

const data = [
  { p: "Thandiwe Mokoena", ln: "TPL-2026-04-30-0142", branch: "Booysens", test: "Potassium (K+)", val: "7.2 mmol/L", range: "3.5–5.1", dr: "Dr. M. Phakathi", phone: "+27 82 555 0142", contact: "Pending", release: "Held" },
  { p: "Sibusiso Khumalo", ln: "TPL-2026-04-30-0143", branch: "Pretoria", test: "Hemoglobin",     val: "4.1 g/dL",   range: "13.5–17.5", dr: "Dr. R. Yemmy",   phone: "+27 82 555 0188", contact: "Doctor Notified · 09:11", release: "Released" },
  { p: "Naledi Dlamini",   ln: "TPL-2026-04-30-0144", branch: "Cape Town", test: "INR",            val: "8.4",        range: "0.8–1.2",   dr: "Dr. F. Ike",     phone: "+27 82 555 0207", contact: "Pending · OVERDUE", release: "Held" },
];

export default function CriticalResults() {
  const action = useActionDialog();
  const { branch } = useBranch();
  const [fBranch, setFBranch] = useState("");
  const [fTest, setFTest] = useState("");
  const [fStatus, setFStatus] = useState("");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => data.filter(r => {
    if (branch !== "ALL" && r.branch !== branch) return false;
    if (fBranch && r.branch !== fBranch) return false;
    if (fTest && r.test !== fTest) return false;
    if (fStatus === "Overdue" && !r.contact.includes("OVERDUE")) return false;
    if (fStatus === "Pending" && r.contact !== "Pending") return false;
    if (fStatus === "Notified" && !r.contact.includes("Notified")) return false;
    if (search && !`${r.p} ${r.ln} ${r.dr}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }), [fBranch, fTest, fStatus, search, branch]);

  return (
    <>
      <PageHeader
        kicker="Section 3F · ISO Mandatory"
        title="Critical Results — Collation"
        breadcrumb={["Laboratory", "Critical Results"]}
        actions={<Pill tone="danger" pulse>{filtered.length} active</Pill>}
      />
      <Panel>
        <FilterBar
          filters={[
            { name: "branch", label: "Branches", options: ["Booysens","Pretoria","Cape Town","Durban","JHB HQ"], value: fBranch, onChange: setFBranch },
            { name: "test", label: "Tests", options: ["Potassium (K+)","Hemoglobin","INR","Glucose","Sodium"], value: fTest, onChange: setFTest },
            { name: "status", label: "Statuses", options: ["Pending","Overdue","Notified"], value: fStatus, onChange: setFStatus },
          ]}
          search={search} onSearch={setSearch}
          onClear={() => { setFBranch(""); setFTest(""); setFStatus(""); setSearch(""); }}
        />
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="data-table">
            <thead>
              <tr>
                <th>Patient</th><th>Lab Number</th><th>Branch</th><th>Test</th><th>Critical Value</th>
                <th>Reference</th><th>Doctor</th><th>Phone</th><th>Contact Status</th><th>Release</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.ln}>
                  <td className="font-medium">{r.p}</td>
                  <td className="font-mono text-xs">{r.ln}</td>
                  <td>{r.branch}</td>
                  <td>{r.test}</td>
                  <td className="font-mono font-bold text-red-600">{r.val}</td>
                  <td className="font-mono text-xs">{r.range}</td>
                  <td className="text-xs">{r.dr}</td>
                  <td className="font-mono text-xs">{r.phone}</td>
                  <td>
                    {r.contact.includes("OVERDUE")
                      ? <span className="pill-danger"><span className="pill-dot bg-red-500" />Overdue</span>
                      : r.contact === "Pending"
                      ? <Pill tone="warning">Pending Contact</Pill>
                      : <Pill tone="success">{r.contact}</Pill>}
                  </td>
                  <td>{r.release === "Held" ? <Pill tone="danger">Held</Pill> : <Pill tone="success">Released</Pill>}</td>
                  <td className="flex gap-1">
                    <button onClick={() => action.open({ title: `Mark Contacted · ${r.ln}`, subtitle: `${r.dr} · ${r.phone}`, tone: "approve", requireReason: true, reasonLabel: "Conversation summary", presetReasons: ["Doctor acknowledged value","Repeat ordered","Patient called in","Voicemail left"] })} className="text-[10px] font-semibold bg-blue-600 text-white px-2 py-1 rounded inline-flex items-center gap-1"><Phone className="h-3 w-3" />Mark Contacted</button>
                    {r.contact.includes("OVERDUE") && <button onClick={() => action.open({ title: `Escalate · ${r.ln}`, tone: "reject", requireReason: true, reasonLabel: "Escalation reason", confirmLabel: "Escalate to Pathologist" })} className="text-[10px] font-semibold bg-red-600 text-white px-2 py-1 rounded inline-flex items-center gap-1"><ShieldAlert className="h-3 w-3" />Escalate</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-muted-foreground flex items-center gap-1.5">
          <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
          ISO 15189 mandates documented communication of all critical results to the requesting clinician within 1 hour.
        </p>
      </Panel>
    </>
  );
}
