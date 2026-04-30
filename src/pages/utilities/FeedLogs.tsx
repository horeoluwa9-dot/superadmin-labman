import { useMemo, useState } from "react";
import { PageHeader, Panel, Pagination, Pill } from "@/components/shared/Toolbar";
import { useDrawer } from "@/components/shared/DetailDrawer";
import { Search, Filter, Columns3, Mail, RefreshCw } from "lucide-react";

type F = {
  id: string; lab: string; collected: string; received: string;
  feed: "Discovery"|"Medscheme"|"Doctor Emails"|"GEMS"|"Bonitas";
  doctor: string; patient: string; sent: string; status: "Delivered"|"Bounced"|"Pending";
};
const SAMPLE: F[] = [
  { id:"1", lab:"2604290179", collected:"Apr 29, 2026 10:30:00", received:"Apr 29, 2026 17:46:38", feed:"Medscheme",     doctor:"DR D DLADLA",         patient:"MR JABULANI MKHIZE",      sent:"Apr 30, 2026 22:4", status:"Delivered" },
  { id:"2", lab:"2604290179", collected:"Apr 29, 2026 10:30:00", received:"Apr 29, 2026 17:46:38", feed:"Doctor Emails",  doctor:"DR D DLADLA",         patient:"MR JABULANI MKHIZE",      sent:"Apr 30, 2026 22:4", status:"Delivered" },
  { id:"3", lab:"2604290164", collected:"Apr 29, 2026 14:18:00", received:"Apr 29, 2026 17:29:34", feed:"Doctor Emails",  doctor:"DR M SITHOLE",        patient:"MISS NOMUSA DLOMO",       sent:"Apr 30, 2026 22:4", status:"Delivered" },
  { id:"4", lab:"2604290163", collected:"Apr 29, 2026 14:06:00", received:"Apr 29, 2026 17:28:05", feed:"Medscheme",     doctor:"DR M SITHOLE",        patient:"MISS AMAHLE SHANGASE",    sent:"Apr 30, 2026 22:4", status:"Delivered" },
  { id:"5", lab:"2604290162", collected:"Apr 29, 2026 13:05:00", received:"Apr 29, 2026 17:26:19", feed:"Doctor Emails", doctor:"DR M SITHOLE",        patient:"MR NKANYISELO MTHETHWA",  sent:"Apr 30, 2026 22:3", status:"Delivered" },
  { id:"6", lab:"2604290238", collected:"Apr 29, 2026 11:09:00", received:"Apr 29, 2026 19:21:19", feed:"Medscheme",     doctor:"dr L monethi",         patient:"MISS NOBELUNGU PHUNGULA",  sent:"Apr 30, 2026 22:2", status:"Bounced" },
  { id:"7", lab:"2604290149", collected:"Apr 29, 2026 16:59:00", received:"Apr 29, 2026 16:59:46", feed:"Doctor Emails", doctor:"DR MABUYA",            patient:"MS SIMBARASHE TINARWO",    sent:"Apr 30, 2026 22:2", status:"Delivered" },
  { id:"8", lab:"2604290063", collected:"Apr 29, 2026 12:11:00", received:"Apr 29, 2026 12:48:40", feed:"Discovery",     doctor:"Dr S LINDILE N",       patient:"MS SISANDA NCUBELA",       sent:"Apr 30, 2026 20:1", status:"Delivered" },
  { id:"9", lab:"2604010068", collected:"Apr 1, 2026 14:30:00",  received:"Apr 1, 2026 12:17:14",  feed:"Discovery",     doctor:"Dr P",                 patient:"MRS LORRAINE KANJIRA",     sent:"Apr 30, 2026 19:3", status:"Delivered" },
  { id:"10",lab:"2604100141", collected:"Apr 10, 2026 18:23:00", received:"Apr 10, 2026 18:24:42", feed:"Discovery",     doctor:"DR R RAMAKHETHA KWINDA",patient:"MR SEGODI SAMMATE",        sent:"Apr 30, 2026 19:3", status:"Pending" },
];

export default function FeedLogs() {
  const drawer = useDrawer();
  const [search, setSearch] = useState("");
  const [feed, setFeed] = useState("");
  const [status, setStatus] = useState("");
  const [perPage, setPerPage] = useState(25);

  const filtered = useMemo(() => SAMPLE.filter(r =>
    (!search || `${r.lab} ${r.doctor} ${r.patient}`.toLowerCase().includes(search.toLowerCase())) &&
    (!feed || r.feed === feed) && (!status || r.status === status)
  ), [search, feed, status]);

  return (
    <>
      <PageHeader kicker="Section 15B · Utilities" title="Result Feed Logs" breadcrumb={["Utilities","Result Feed Logs","List"]} />
      <Panel>
        <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
          <span className="inline-flex items-center gap-1 font-bold uppercase tracking-wider text-target"><Filter className="h-3 w-3"/>Filters</span>
          <select value={feed} onChange={e=>setFeed(e.target.value)} className="border border-border rounded px-2 py-1 bg-white">
            <option value="">All feeds</option>{["Discovery","Medscheme","Doctor Emails","GEMS","Bonitas"].map(o=><option key={o}>{o}</option>)}
          </select>
          <select value={status} onChange={e=>setStatus(e.target.value)} className="border border-border rounded px-2 py-1 bg-white">
            <option value="">All statuses</option>{["Delivered","Bounced","Pending"].map(o=><option key={o}>{o}</option>)}
          </select>
          <input type="date" className="border border-border rounded px-2 py-1" />
          <input type="date" className="border border-border rounded px-2 py-1" />
          <div className="relative ml-auto">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search" className="pl-8 pr-3 py-1.5 border border-border rounded bg-white w-56" />
          </div>
          <button className="border border-border rounded p-1.5"><Columns3 className="h-4 w-4 text-muted-foreground"/></button>
        </div>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="data-table">
            <thead><tr><th>LabNum</th><th>Collected</th><th>Received</th><th>Result feed</th><th>Doctor</th><th>Patient</th><th>Send date time ▾</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {filtered.slice(0, perPage).map(r => (
                <tr key={r.id} className="cursor-pointer" onClick={() => drawer.open({
                  title: `${r.lab} → ${r.feed}`, subtitle: `${r.patient} · ${r.doctor}`,
                  meta: { LabNum: r.lab, Collected: r.collected, Received: r.received, Feed: r.feed, "Sent at": r.sent, Status: r.status },
                  body: <p className="text-xs text-muted-foreground">Outbound delivery record. Includes payload hash, recipient SMTP/HL7 ack and retry history.</p>,
                  actions: [
                    { label: "Open Result", tone: "primary" },
                    { label: "Resend", onClick: () => {} },
                    { label: "Download Payload" },
                  ],
                })}>
                  <td className="font-mono text-xs">{r.lab}</td>
                  <td className="font-mono text-xs">{r.collected}</td>
                  <td className="font-mono text-xs">{r.received}</td>
                  <td><Pill tone={r.feed==="Discovery"?"info":r.feed==="Medscheme"?"warning":"muted"}>{r.feed}</Pill></td>
                  <td>{r.doctor}</td>
                  <td className="font-medium">{r.patient}</td>
                  <td className="font-mono text-xs">{r.sent}</td>
                  <td><Pill tone={r.status==="Delivered"?"success":r.status==="Bounced"?"danger":"warning"}>{r.status}</Pill></td>
                  <td onClick={e=>e.stopPropagation()}>
                    <button className="inline-flex items-center gap-1 text-blue-600 text-xs font-semibold"><RefreshCw className="h-3 w-3"/>Resend</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between px-3 py-2 border-t border-border text-xs">
            <span className="text-muted-foreground">Showing 1 to {Math.min(perPage, filtered.length)} of 197,836 results</span>
            <div className="flex items-center gap-2">
              <span>Per page</span>
              <select value={perPage} onChange={e=>setPerPage(parseInt(e.target.value))} className="border border-border rounded px-2 py-0.5">{[10,25,50,100].map(n=><option key={n}>{n}</option>)}</select>
              <Pagination total={197836} />
            </div>
          </div>
        </div>
      </Panel>
    </>
  );
}
