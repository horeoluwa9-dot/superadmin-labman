import { PageHeader, Panel, Pill } from "@/components/shared/Toolbar";

const audits = [
  { t: "30/04/2026 09:31", u: "mr Patrick Magupya", act: "Released result", mod: "LIMS", rec: "TPL-2026-04-30-0142", ip: "196.42.x.x" },
  { t: "30/04/2026 09:18", u: "Dr. M. Phakathi",    act: "Verified result", mod: "LIMS", rec: "TPL-2026-04-30-0142", ip: "196.42.x.x" },
  { t: "30/04/2026 09:04", u: "ms ntswaki maleke", act: "Manual entry K+", mod: "LIMS", rec: "TPL-2026-04-30-0142", ip: "196.42.x.x" },
  { t: "30/04/2026 08:14", u: "Super Admin",        act: "Approved high-value test", mod: "Approvals", rec: "REQ-0098", ip: "10.0.0.5" },
  { t: "30/04/2026 07:42", u: "Sister A. Naidoo",   act: "Specimen collected · GPS", mod: "LIMS", rec: "TPL-2026-04-30-0142", ip: "—" },
];

export default function Utilities() {
  return (
    <>
      <PageHeader kicker="Section 15C · Utilities" title="Audited Actions" breadcrumb={["Utilities", "Audit Log"]} />
      <Panel>
        <div className="flex flex-wrap gap-2 mb-3 text-xs">
          <input placeholder="User…" className="border border-border rounded px-2 py-1" />
          <input type="date" className="border border-border rounded px-2 py-1" />
          <select className="border border-border rounded px-2 py-1 bg-white"><option>All modules</option><option>LIMS</option><option>Accounting</option><option>HR</option></select>
          <button className="ml-auto bg-navy text-white px-3 py-1.5 rounded font-semibold">Export CSV</button>
        </div>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="data-table">
            <thead><tr><th>Timestamp</th><th>User</th><th>Action</th><th>Module</th><th>Record</th><th>IP</th></tr></thead>
            <tbody>
              {audits.map((a, i) => (
                <tr key={i}>
                  <td className="font-mono text-xs">{a.t}</td>
                  <td>{a.u}</td>
                  <td>{a.act}</td>
                  <td><span className="pill-muted">{a.mod}</span></td>
                  <td className="font-mono text-xs">{a.rec}</td>
                  <td className="font-mono text-xs">{a.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}
