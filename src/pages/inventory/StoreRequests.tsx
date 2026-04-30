import { EntityList, Column } from "@/components/shared/EntityList";
import { Pill, fmtZAR } from "@/components/shared/Toolbar";

type R = { id: string; req: string; item: string; qty: number; urgency: "Routine"|"Urgent"|"Critical"; branch: string; status: "Pending"|"Approved"|"Dispatched"|"Delivered"; cost: number };
const ROWS: R[] = [
  { id: "SR-2210", req: "ms ntswaki maleke", item: "HIV ELISA Kit",  qty: 6, urgency: "Critical", branch: "Booysens", status: "Pending",   cost: 18420 },
  { id: "SR-2211", req: "T. Mokoena",        item: "FBC Reagent",    qty: 4, urgency: "Urgent",   branch: "Witbank",  status: "Approved",  cost:  9200 },
  { id: "SR-2212", req: "S. Govender",       item: "TSH/FT4 Panel",  qty: 2, urgency: "Routine",  branch: "Durban",   status: "Dispatched",cost:  6480 },
  { id: "SR-2213", req: "P. Moyo",           item: "TB GeneXpert",   qty: 3, urgency: "Critical", branch: "Harare",   status: "Pending",   cost: 14250 },
  { id: "SR-2214", req: "H. Erasmus",        item: "Glucose Strips", qty: 10,urgency: "Routine",  branch: "George",   status: "Delivered", cost:  4200 },
];
const cols: Column<R>[] = [
  { header: "Ref",   cell: r => r.id, mono: true },
  { header: "Requested By", cell: r => <span className="font-medium">{r.req}</span> },
  { header: "Item",  cell: r => r.item },
  { header: "Qty",   cell: r => <span className="font-mono">{r.qty}</span> },
  { header: "Urgency", cell: r => <Pill tone={r.urgency==="Critical"?"danger":r.urgency==="Urgent"?"warning":"muted"}>{r.urgency}</Pill> },
  { header: "Branch", cell: r => r.branch },
  { header: "Cost",  cell: r => fmtZAR(r.cost) },
  { header: "Status",cell: r => <Pill tone={r.status==="Delivered"?"success":r.status==="Dispatched"?"info":r.status==="Approved"?"gold":"warning"}>{r.status}</Pill> },
];
export default function StoreRequests() {
  return <EntityList kicker="Section 12B · Inventory" title="Store Requests & Delivery" breadcrumb={["Inventory","Store Requests"]}
    primaryLabel="New Request" rows={ROWS} columns={cols}
    tabs={{ items: ["Pending","Approved","Dispatched","Delivered"], getStatus: r => r.status }}
    getDrawer={r => ({
      title: `${r.item} × ${r.qty}`, subtitle: `${r.id} · ${r.branch}`,
      meta: { "Requested By": r.req, Urgency: r.urgency, Cost: fmtZAR(r.cost), Status: r.status },
      actions: [{ label: "Approve", tone: "primary" }, { label: "Assign Driver" }, { label: "Reject", tone: "danger" }],
    })}
  />;
}
