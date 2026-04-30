import { PageHeader, Panel, Pill, fmtZAR } from "@/components/shared/Toolbar";
import { BRANCHES } from "@/lib/nav";
import { Edit, Plus } from "lucide-react";

export default function Laboratories() {
  return (
    <>
      <PageHeader
        kicker="Section 5B · Administration"
        title="Laboratories"
        breadcrumb={["Administration", "Laboratories"]}
        actions={<button className="bg-target text-white text-xs font-semibold px-3 py-2 rounded-lg inline-flex items-center gap-1.5"><Plus className="h-3.5 w-3.5" />Create Laboratory</button>}
      />
      <Panel>
        <div className="text-xs text-muted-foreground mb-3">All 29 branches across South Africa, Lesotho, Zimbabwe and Nigeria.</div>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="data-table">
            <thead><tr><th>#</th><th>Lab Name</th><th>Code</th><th>Region/Country</th><th>Branch Type</th><th>Manager</th><th>Active Departments</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {BRANCHES.map((b, i) => {
                const country = ["Harare"].includes(b) ? "Zimbabwe" : ["Lagos"].includes(b) ? "Nigeria" : ["Lesotho"].includes(b) ? "Lesotho" : "South Africa";
                const code = "TPL-" + b.replace(/[^A-Z]/g, "").slice(0, 3).padEnd(3, b.toUpperCase().slice(0, 3));
                const type = i === 0 ? "Headquarters" : i % 5 === 0 ? "Hub Lab" : "Branch Lab";
                const depts = ["HIV","CHEM","Haem"].slice(0, (i % 3) + 1).join(", ");
                return (
                  <tr key={b}>
                    <td className="text-xs font-mono">{(i + 1).toString().padStart(2, "0")}</td>
                    <td className="font-medium">{b}</td>
                    <td className="font-mono text-xs">{code}</td>
                    <td className="text-xs">{country}</td>
                    <td className="text-xs">{type}</td>
                    <td className="text-xs">Manager {i + 1}</td>
                    <td className="text-xs">{depts}</td>
                    <td>{i % 11 === 7 ? <Pill tone="warning">Maintenance</Pill> : <Pill tone="success">Active</Pill>}</td>
                    <td><button className="p-1 hover:bg-muted rounded"><Edit className="h-3.5 w-3.5" /></button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}
