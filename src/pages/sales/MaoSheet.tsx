import { PageHeader, Panel, Pill } from "@/components/shared/Toolbar";
import { MapPin, Plus } from "lucide-react";

const docs = [
  { name: "Dr. P. Smith",      area: "Sandton",  addr: "12 Rivonia Rd",       adrc: 8,  lab: "Ampath",     rep: "Carmen Angelica",   visited: "today" },
  { name: "Dr. N. Mthembu",    area: "Soweto",   addr: "Maponya Mall",        adrc: 14, lab: "Lancet",     rep: "Ike Igbo",          visited: "week" },
  { name: "Dr. T. Naidoo",     area: "Durban",   addr: "Berea Centre",        adrc: 11, lab: "PathCare",   rep: "Makoane Ngoasheng", visited: "no" },
  { name: "Dr. M. van Niekerk",area: "Bellville",addr: "Tygerberg Hospital",  adrc: 22, lab: "Target",     rep: "Carmen Angelica",   visited: "today" },
  { name: "Dr. K. Mokoena",    area: "Polokwane",addr: "Capricorn Drive",     adrc: 6,  lab: "Independent",rep: "Patrick M.",        visited: "no" },
];

export default function MaoSheet() {
  return (
    <>
      <PageHeader
        kicker="Section 6B · Sales & Marketing"
        title="MAO Sheet — Marketing Allocation"
        breadcrumb={["Sales", "MAO Sheet"]}
        actions={<button className="bg-target text-white text-xs font-semibold px-3 py-2 rounded-lg inline-flex items-center gap-1.5"><Plus className="h-3.5 w-3.5" />Add Doctor to MAO</button>}
      />
      <Panel title="MAO Control View" subtitle="Master allocation table — Super Admin / Sales Manager">
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="data-table">
            <thead><tr><th>Doctor</th><th>Area</th><th>Address</th><th>ADRC</th><th>Current Lab</th><th>Assigned Rep</th><th>Visit Status</th><th>Action</th></tr></thead>
            <tbody>
              {docs.map((d) => (
                <tr key={d.name}>
                  <td className="font-medium">{d.name}</td>
                  <td className="text-xs">{d.area}</td>
                  <td className="text-xs flex items-center gap-1"><MapPin className="h-3 w-3 text-muted-foreground" />{d.addr}</td>
                  <td className="text-xs font-mono font-bold">{d.adrc}</td>
                  <td><Pill tone={d.lab === "Target" ? "success" : "warning"}>{d.lab}</Pill></td>
                  <td className="text-xs">{d.rep}</td>
                  <td>{d.visited === "today" ? <Pill tone="success">Visited Today</Pill> : d.visited === "week" ? <Pill tone="info">This Week</Pill> : <Pill tone="muted">Not Yet</Pill>}</td>
                  <td><button className="text-xs text-target font-semibold">Reassign</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}
