import { useState } from "react";
import { PageHeader, Panel, Pill } from "@/components/shared/Toolbar";
import { BRANCHES } from "@/lib/nav";
import { Edit, Plus } from "lucide-react";
import { useFormDialog } from "@/components/shared/FormDialog";
import { NEW_LAB_FIELDS } from "@/lib/forms";
import { toast } from "sonner";

const TARIFFS = ["A","B","C","Select an option"];

export default function Laboratories() {
  const form = useFormDialog();
  const [tariffs, setTariffs] = useState<Record<string,string>>(() => BRANCHES.reduce((a, b, i) => ({ ...a, [b]: i % 4 === 0 ? "A" : i % 4 === 1 ? "B" : i % 4 === 2 ? "C" : "Select an option" }), {}));
  return (
    <>
      <PageHeader
        kicker="Section 5B · Administration"
        title="Laboratories"
        breadcrumb={["Administration", "Laboratories"]}
        actions={<button onClick={() => form.open({ title: "Create Laboratory", fields: NEW_LAB_FIELDS, size: "lg", submitLabel: "Create Laboratory" })} className="bg-target text-white text-xs font-semibold px-3 py-2 rounded-lg inline-flex items-center gap-1.5"><Plus className="h-3.5 w-3.5" />New Laboratory</button>}
      />
      <Panel>
        <div className="text-xs text-muted-foreground mb-3">All {BRANCHES.length} laboratories across South Africa, Lesotho, Zimbabwe and Nigeria. Tariff schedule governs price-list per branch.</div>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="data-table">
            <thead><tr><th>Laboratory</th><th>Tariff Schedule</th><th>Contact</th><th>Cellphone</th><th>Admin Contact</th><th>Admin Phone</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {BRANCHES.map((b, i) => {
                const country = ["Harare"].includes(b) ? "Zimbabwe" : ["Lagos"].includes(b) ? "Nigeria" : ["Lesotho"].includes(b) ? "Lesotho" : "South Africa";
                const seedNames = ["RICHARD","PETE","George","DAVID","PETER","DR O. MOYO","GEORGE","Young Joseph","","ERICKSON","NAIDOO","SAMUEL","KIMBERLY","JACOB","LERATO","JOY","FRANCIS","NTOMBI","STANLEY","WILLIAM","CARMEN","PATRICK","SANDILE","TINA","BETTY","EDDIE","FAITH","MIKE","NELE"];
                const seedAdmins = ["PATRICK","PETE","SAMUEL","DAVID","","","GEORGE","YOUNG","","ERICKSON","","ADMIN","KIM","JACOB","","JOY","FRANCIS","","STANLEY","WILLIAM","","PATRICK","SANDILE","","BETTY","","FAITH","",""];
                const cell = ["084-136-4748","0781210153","0810296089","0768423407","","","0732095191","0623063953","","0603304681","0824567711","0719945120","","","","","","","","","","","","","","","","",""];
                const admPhone = ["011-4931116","","(014)5920670","","","","0145925494","0414040597","","","","","","","","","","","","","","","","","","","","",""];
                const status = i % 11 === 7 ? "Maintenance" : "Active";
                return (
                  <tr key={b}>
                    <td className="font-medium">{b.toUpperCase()} <span className="text-[10px] text-muted-foreground">· {country}</span></td>
                    <td>
                      <select value={tariffs[b]} onChange={(e) => { setTariffs(t => ({ ...t, [b]: e.target.value })); toast.success(`${b}: tariff set to ${e.target.value}`); }}
                        className="border border-border rounded px-2 py-1 text-xs bg-white w-32">
                        {TARIFFS.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </td>
                    <td className="text-xs">{seedNames[i] || "—"}</td>
                    <td className="text-xs font-mono">{cell[i] || "—"}</td>
                    <td className="text-xs">{seedAdmins[i] || "—"}</td>
                    <td className="text-xs font-mono">{admPhone[i] || "—"}</td>
                    <td>{status === "Maintenance" ? <Pill tone="warning">Maintenance</Pill> : <Pill tone="success">Active</Pill>}</td>
                    <td>
                      <button onClick={() => form.open({ title: `Edit ${b}`, size: "lg", submitLabel: "Save Changes", fields: NEW_LAB_FIELDS.map(f => ({ ...f, defaultValue: f.name==="name"?b : f.name==="manager"?seedNames[i] : f.defaultValue })) })} className="inline-flex items-center gap-1 text-blue-600 text-xs font-semibold"><Edit className="h-3.5 w-3.5"/>Edit</button>
                    </td>
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
