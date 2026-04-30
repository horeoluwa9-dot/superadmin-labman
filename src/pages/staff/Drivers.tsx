import { PageHeader, Panel, Pill, Tabs, Pagination } from "@/components/shared/Toolbar";
import { useFormDialog } from "@/components/shared/FormDialog";
import { useState } from "react";
import { Truck, UserPlus, Car } from "lucide-react";
import { KpiCard } from "@/components/shared/KpiCard";
import { NEW_VEHICLE_FIELDS, NEW_DRIVER_FIELDS } from "@/lib/forms";

const VEHICLES = [
  { rego: "GP 8841 LM", make: "Toyota", model: "Corolla", branch: "Booysens", driver: "J. Pieters", service: "15/05/2026", status: "Service Due" },
  { rego: "KZN 1102 NM", make: "VW",     model: "Polo",    branch: "Durban",   driver: "Z. Kunene",  service: "20/07/2026", status: "OK" },
  { rego: "NW 9921 BB",  make: "Hyundai",model: "i20",     branch: "Vryburg",  driver: "F. Marobela",service: "12/06/2026", status: "OK" },
  { rego: "WC 4421 CT",  make: "Ford",   model: "Ranger",  branch: "Cape Town",driver: "Unassigned", service: "01/08/2026", status: "OK" },
];

const TRIPS = [
  { id: "TRP-2410", driver: "J. Pieters",  vehicle: "GP 8841 LM", route: "Booysens → JHB HQ", specimens: 7, status: "In Transit",  eta: "08:42" },
  { id: "TRP-2411", driver: "Z. Kunene",   vehicle: "KZN 1102 NM",route: "Ladysmith → Durban", specimens: 12, status: "In Transit", eta: "09:15" },
  { id: "TRP-2412", driver: "F. Marobela", vehicle: "NW 9921 BB", route: "Vryburg → Mafikeng",specimens: 4,  status: "Delivered",  eta: "07:50" },
];

export default function Drivers() {
  const form = useFormDialog();
  const [tab, setTab] = useState("Vehicles");

  return (
    <>
      <PageHeader kicker="Section 7 · Staff" title="Drivers, Vehicles & Trips" breadcrumb={["Staff","Drivers & Trips"]}
        actions={
          <div className="flex gap-2">
            <button onClick={() => form.open({ title: "Register Vehicle", fields: NEW_VEHICLE_FIELDS, size: "lg", submitLabel: "Register Vehicle" })} className="bg-navy hover:bg-navy-deep text-white text-xs font-semibold px-3 py-2 rounded-lg inline-flex items-center gap-1.5"><Car className="h-3.5 w-3.5" />Register Vehicle</button>
            <button onClick={() => form.open({ title: "Create Driver", fields: NEW_DRIVER_FIELDS, size: "lg", submitLabel: "Create Driver Account" })} className="bg-target hover:bg-target-dark text-white text-xs font-semibold px-3 py-2 rounded-lg inline-flex items-center gap-1.5"><UserPlus className="h-3.5 w-3.5" />Create Driver</button>
          </div>
        }
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <KpiCard label="Vehicles Active" value={VEHICLES.length} accent="navy" />
        <KpiCard label="Trips In Progress" value={TRIPS.filter(t=>t.status==="In Transit").length} accent="warn" />
        <KpiCard label="Delivered Today" value={TRIPS.filter(t=>t.status==="Delivered").length} accent="success" />
        <KpiCard label="Service Due" value={VEHICLES.filter(v=>v.status==="Service Due").length} accent="red" />
      </div>
      <Panel>
        <Tabs items={["Vehicles","Active Trips"]} active={tab} onChange={setTab} />
        {tab === "Vehicles" ? (
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="data-table">
              <thead><tr><th>Reg #</th><th>Make / Model</th><th>Branch</th><th>Primary Driver</th><th>Next Service</th><th>Status</th></tr></thead>
              <tbody>{VEHICLES.map(v => (
                <tr key={v.rego}>
                  <td className="font-mono text-xs font-bold">{v.rego}</td>
                  <td>{v.make} {v.model}</td>
                  <td>{v.branch}</td>
                  <td className="text-xs">{v.driver}</td>
                  <td className="text-xs font-mono">{v.service}</td>
                  <td><Pill tone={v.status==="OK"?"success":"warning"}>{v.status}</Pill></td>
                </tr>
              ))}</tbody>
            </table>
            <Pagination total={VEHICLES.length} />
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="data-table">
              <thead><tr><th>Trip</th><th>Driver</th><th>Vehicle</th><th>Route</th><th>Specimens</th><th>ETA</th><th>Status</th></tr></thead>
              <tbody>{TRIPS.map(t => (
                <tr key={t.id}>
                  <td className="font-mono text-xs">{t.id}</td>
                  <td className="font-medium">{t.driver}</td>
                  <td className="font-mono text-xs">{t.vehicle}</td>
                  <td className="text-xs">{t.route}</td>
                  <td className="font-mono">{t.specimens}</td>
                  <td className="text-xs font-mono">{t.eta}</td>
                  <td><Pill tone={t.status==="Delivered"?"success":"warning"}>{t.status}</Pill></td>
                </tr>
              ))}</tbody>
            </table>
            <Pagination total={TRIPS.length} />
          </div>
        )}
      </Panel>
    </>
  );
}
