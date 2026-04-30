import { PageHeader, Panel, Pill } from "@/components/shared/Toolbar";

const integrations = [
  { name: "MedPrax",       desc: "Tariff billing", status: "live", lastSync: "14:21", errors: 0 },
  { name: "Elixir",        desc: "Claims switching", status: "live", lastSync: "13:08", errors: 0 },
  { name: "Medical Aid Portal", desc: "Member verification", status: "degraded", lastSync: "11:42", errors: 12 },
  { name: "NDIC",          desc: "Notifiable disease reporting", status: "live", lastSync: "08:30", errors: 0 },
  { name: "Result Feeds",  desc: "Email · SMS · Doctor portal", status: "live", lastSync: "real-time", errors: 2 },
  { name: "Newsletter (SendGrid)", desc: "Doctor outreach", status: "live", lastSync: "—", errors: 0 },
];
const dot = (s: string) => s === "live" ? "bg-emerald-500" : s === "degraded" ? "bg-amber-500" : "bg-red-500";

export default function Integrations() {
  return (
    <>
      <PageHeader kicker="Section 11 · Integrations" title="Integrations" breadcrumb={["Integrations", "Overview"]} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {integrations.map((i) => (
          <Panel key={i.name}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-navy">{i.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{i.desc}</p>
              </div>
              <span className={`h-3 w-3 rounded-full ${dot(i.status)} ring-4 ring-white shadow`} />
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div><dt className="text-muted-foreground">Status</dt><dd className="capitalize font-semibold mt-0.5">{i.status}</dd></div>
              <div><dt className="text-muted-foreground">Last Sync</dt><dd className="font-mono mt-0.5">{i.lastSync}</dd></div>
              <div><dt className="text-muted-foreground">Errors (24h)</dt><dd className={`font-mono mt-0.5 ${i.errors>0?"text-red-600 font-bold":""}`}>{i.errors}</dd></div>
            </dl>
            <div className="mt-3 flex gap-2">
              <button className="flex-1 text-xs font-semibold bg-navy text-white py-2 rounded-md">Manage</button>
              <button className="text-xs font-semibold border border-border px-3 py-2 rounded-md">Test</button>
            </div>
          </Panel>
        ))}
      </div>
    </>
  );
}
