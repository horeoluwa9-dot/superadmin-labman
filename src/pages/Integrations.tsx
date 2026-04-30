import { useState } from "react";
import { PageHeader, Panel, Pill } from "@/components/shared/Toolbar";
import { useFormDialog, useActionDialog } from "@/components/shared/FormDialog";
import { useDrawer } from "@/components/shared/DetailDrawer";
import { KpiCard } from "@/components/shared/KpiCard";
import { Loader2, Plug, RefreshCw, Settings as SettingsIcon, FileText, Mail, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

type Integ = {
  name: string; desc: string; status: "live"|"degraded"|"offline"; lastSync: string; errors: number;
  type: "Tariff"|"Claims"|"Verification"|"Reporting"|"Delivery"|"Marketing";
  endpoint: string; auth: string; throughput: string; throttle: string;
  lastEvents: { at: string; event: string; ok: boolean }[];
};

const INTEGRATIONS: Integ[] = [
  { name: "MedPrax", desc: "Tariff billing & price-book sync", status: "live", lastSync: "14:21", errors: 0, type: "Tariff",
    endpoint: "https://api.medprax.co.za/v3", auth: "OAuth2 + Mutual TLS", throughput: "1,046 codes / sync", throttle: "60 req/min",
    lastEvents: [
      { at: "30/04 14:21", event: "Tariff snapshot synced (1,046 codes, 12 changed)", ok: true },
      { at: "30/04 02:14", event: "Nightly reconciliation OK", ok: true },
      { at: "29/04 22:00", event: "502 from MedPrax (their maintenance) · failover to cache", ok: false },
    ]
  },
  { name: "Elixir (Healthbridge)", desc: "Claims switching to medical aids", status: "live", lastSync: "13:08", errors: 0, type: "Claims",
    endpoint: "https://switch.healthbridge.co.za/edi", auth: "EDI X.509 cert", throughput: "247 claims/day", throttle: "—",
    lastEvents: [{ at: "30/04 13:08", event: "Batch 0430-EVE submitted (47 claims)", ok: true }] },
  { name: "Medical Aid Portal", desc: "Real-time member benefit verification", status: "degraded", lastSync: "11:42", errors: 12, type: "Verification",
    endpoint: "https://verify.medschemes.co.za", auth: "API Key + IP allowlist", throughput: "812 lookups today", throttle: "120 req/min",
    lastEvents: [
      { at: "30/04 11:42", event: "Discovery API timeout (12 retries)", ok: false },
      { at: "30/04 09:10", event: "GEMS lookup OK", ok: true },
    ] },
  { name: "NDIC", desc: "Notifiable Disease Reporting (Nat. Inst. for Communicable Diseases)", status: "live", lastSync: "08:30", errors: 0, type: "Reporting",
    endpoint: "https://ndic.health.gov.za/api/notify", auth: "Government PKI cert + Practice Code", throughput: "3 cases today", throttle: "—",
    lastEvents: [
      { at: "30/04 08:30", event: "TB (Pulm) case submitted · ack TPL-NDIC-2026-0118", ok: true },
      { at: "29/04 16:45", event: "Hep B case submitted · ack TPL-NDIC-2026-0117", ok: true },
    ] },
  { name: "Result Feeds", desc: "Email · SMS · Doctor Portal · WhatsApp · Print", status: "live", lastSync: "real-time", errors: 2, type: "Delivery",
    endpoint: "internal://result-router", auth: "Service-mesh mTLS", throughput: "1,284 deliveries today", throttle: "—",
    lastEvents: [
      { at: "30/04 14:30", event: "WhatsApp delivery to Dr. Phakathi OK", ok: true },
      { at: "30/04 14:18", event: "SendGrid bounce: drsmith@gmial.com (typo)", ok: false },
      { at: "30/04 14:12", event: "Doctor Portal push for 12 results", ok: true },
    ] },
  { name: "Newsletter (SendGrid)", desc: "Doctor outreach campaigns", status: "live", lastSync: "—", errors: 0, type: "Marketing",
    endpoint: "https://api.sendgrid.com/v3", auth: "API Key", throughput: "2,418 sent (this month)", throttle: "10k/day",
    lastEvents: [{ at: "30/04 10:00", event: "Campaign 'May Newsletter' sent to 2,418 doctors · open 38%", ok: true }] },
];

const dot = (s: string) => s === "live" ? "bg-emerald-500" : s === "degraded" ? "bg-amber-500" : "bg-red-500 animate-pulse";

export default function Integrations() {
  const form = useFormDialog();
  const action = useActionDialog();
  const drawer = useDrawer();
  const [testing, setTesting] = useState<string | null>(null);

  const test = (i: Integ) => {
    setTesting(i.name);
    toast.info(`Testing ${i.name}…`, { description: `Pinging ${i.endpoint}` });
    setTimeout(() => {
      setTesting(null);
      if (i.status === "live") toast.success(`${i.name} · 200 OK`, { description: `Round-trip 218ms · auth=${i.auth}` });
      else if (i.status === "degraded") toast.warning(`${i.name} · partial`, { description: `Some endpoints slow (>2s). ${i.errors} recent errors.` });
      else toast.error(`${i.name} · unreachable`, { description: `Last successful sync ${i.lastSync}` });
    }, 1300);
  };

  const manage = (i: Integ) => {
    if (i.name === "MedPrax") {
      drawer.open({
        title: "MedPrax · Configuration", subtitle: i.endpoint,
        meta: { Status: i.status, "Last Sync": i.lastSync, Errors: i.errors, Throughput: i.throughput, Throttle: i.throttle, Auth: i.auth },
        body: (
          <div className="space-y-3">
            <div className="font-semibold text-sm">Recent Events</div>
            <ul className="space-y-1.5">
              {i.lastEvents.map((e,k) => (
                <li key={k} className="text-xs flex items-start gap-2 p-2 rounded bg-muted/40">
                  <span className={`mt-1 h-1.5 w-1.5 rounded-full ${e.ok?"bg-emerald-500":"bg-red-500"}`} />
                  <span className="font-mono text-muted-foreground">{e.at}</span>
                  <span className="flex-1">{e.event}</span>
                </li>
              ))}
            </ul>
          </div>
        ),
        actions: [
          { label: "Force Sync Now", tone: "primary", onClick: () => toast.success("Sync queued", { description: "1,046 codes — ETA 90s" }) },
          { label: "Edit Credentials", onClick: () => form.open({ title: "MedPrax Credentials", submitLabel: "Save & Test", fields: [
            { name: "clientId", label: "Client ID", required: true, span: 2 },
            { name: "secret", label: "Client Secret", type: "password", required: true, span: 2 },
            { name: "scope", label: "OAuth Scope", defaultValue: "tariff.read price.read", span: 2 },
            { name: "schedule", label: "Sync Schedule", type: "select", options: ["Hourly","Every 6h","Daily 02:00","Manual"] },
          ] }) },
          { label: "View Sync Log" },
        ],
      });
    } else if (i.name === "NDIC") {
      drawer.open({
        title: "NDIC · Notifiable Disease Reporting", subtitle: i.endpoint,
        meta: { Status: i.status, "Practice Code": "TPL-001-NDIC", "Cert Expiry": "12/11/2026", "Cases Submitted (30d)": 47 },
        body: (
          <div className="space-y-3">
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs">
              <div className="font-semibold text-emerald-800 inline-flex items-center gap-1"><ShieldCheck className="h-3 w-3"/>Government PKI certificate valid · auto-renewal in 196 days</div>
            </div>
            <div className="font-semibold text-sm">Reportable Diseases (auto-flagged from results)</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {["TB (Pulm)","TB (Extra-pulm)","Hepatitis A","Hepatitis B","Hepatitis C","Measles","Mpox","Cholera","Typhoid","Listeriosis","Yellow Fever","Anthrax"].map(d => (
                <span key={d} className="px-2 py-1 rounded bg-muted font-medium">{d}</span>
              ))}
            </div>
            <div className="font-semibold text-sm">Recent Submissions</div>
            <ul className="space-y-1.5">
              {i.lastEvents.map((e,k) => (<li key={k} className="text-xs p-2 rounded bg-muted/40 flex justify-between"><span>{e.event}</span><span className="font-mono text-muted-foreground">{e.at}</span></li>))}
            </ul>
          </div>
        ),
        actions: [
          { label: "Submit Pending Cases", tone: "primary", onClick: () => toast.success("3 cases submitted to NDIC", { description: "Acknowledgement received in 4.2s" }) },
          { label: "Renew Certificate" },
          { label: "Configure Reportable Diseases", onClick: () => form.open({ title: "Configure NDIC Disease Set", size: "lg", submitLabel: "Save", fields: [
            { name: "diseases", label: "Auto-flag these diseases", type: "multiselect", options: ["TB (Pulm)","TB (Extra-pulm)","Hepatitis A","Hepatitis B","Hepatitis C","Measles","Mpox","Cholera","Typhoid","Listeriosis","Yellow Fever","Anthrax","Rabies","Mumps","Rubella"], span: 2 },
            { name: "auto", label: "Auto-submit on result release", type: "checkbox", defaultValue: true, span: 2 },
            { name: "reviewer", label: "Pathologist Reviewer", required: true },
          ] }) },
          { label: "Download Submission Log" },
        ],
      });
    } else if (i.name === "Result Feeds") {
      drawer.open({
        title: "Result Feeds · Multi-Channel Delivery", subtitle: "Email · SMS · Doctor Portal · WhatsApp · Print",
        meta: { Status: i.status, "Today": i.throughput, Errors: i.errors, "Avg Latency": "1.2s" },
        body: (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { ch: "Doctor Portal", count: 612, ok: 100 },
                { ch: "Email PDF",     count: 418, ok: 99.2 },
                { ch: "SMS",           count: 187, ok: 98.4 },
                { ch: "WhatsApp",      count:  54, ok: 100 },
                { ch: "Print + Courier", count: 13, ok: 100 },
              ].map(r => (
                <div key={r.ch} className="rounded-lg border border-border p-3">
                  <div className="flex items-center justify-between"><span className="font-semibold">{r.ch}</span><Pill tone={r.ok>=99?"success":"warning"}>{r.ok}%</Pill></div>
                  <div className="text-2xl font-bold text-navy mt-1">{r.count}</div>
                  <div className="text-[10px] text-muted-foreground">delivered today</div>
                </div>
              ))}
            </div>
            <div className="font-semibold text-sm">Recent Delivery Log</div>
            <ul className="space-y-1.5">
              {i.lastEvents.map((e,k) => (<li key={k} className="text-xs p-2 rounded bg-muted/40 flex justify-between gap-2"><span className="flex-1">{e.event}</span><span className="font-mono text-muted-foreground">{e.at}</span></li>))}
            </ul>
          </div>
        ),
        actions: [
          { label: "Re-send Failed (1)", tone: "primary", onClick: () => toast.success("Re-sending 1 message…") },
          { label: "Edit Templates", onClick: () => form.open({ title: "Result Delivery Templates", size: "lg", submitLabel: "Save Templates", fields: [
            { name: "emailSubj", label: "Email Subject", defaultValue: "[Target Pathology] Lab results for {{patientName}}", span: 2 },
            { name: "emailBody", label: "Email Body (HTML)", type: "textarea", span: 2, defaultValue: "Dear Dr. {{doctor}},\n\nResults for {{patientName}} ({{labNo}}) are attached. Critical values are flagged.\n\nKind regards,\nTarget Pathology" },
            { name: "smsBody", label: "SMS Template (160 chars)", type: "textarea", span: 2, defaultValue: "Target Pathology: results for {{patientName}} ready. Login {{portalUrl}}" },
            { name: "waBody", label: "WhatsApp Template", type: "textarea", span: 2 },
          ] }) },
          { label: "Channel Health Report" },
        ],
      });
    } else if (i.name === "Newsletter (SendGrid)") {
      drawer.open({
        title: "Newsletter · SendGrid", subtitle: i.endpoint,
        meta: { Status: i.status, Sent: i.throughput, Throttle: i.throttle, "Open Rate": "38%", "Bounce Rate": "0.8%" },
        body: <p className="text-xs text-muted-foreground">Doctor outreach campaigns dispatched via SendGrid. Lists synced from CRM nightly.</p>,
        actions: [
          { label: "New Campaign", tone: "primary", onClick: () => form.open({ title: "New Newsletter Campaign", size: "lg", submitLabel: "Schedule", fields: [
            { name: "subj", label: "Subject", required: true, span: 2 },
            { name: "list", label: "Recipient List", type: "select", required: true, options: ["All Doctors (2,418)","Cape Town Region","KZN Region","High-volume referrers"] },
            { name: "send", label: "Send At", type: "date", required: true },
            { name: "html", label: "Body (HTML)", type: "textarea", span: 2 },
          ] }) },
          { label: "View Last Campaign" },
        ],
      });
    } else {
      drawer.open({
        title: `${i.name} · Configuration`, subtitle: i.endpoint,
        meta: { Status: i.status, "Last Sync": i.lastSync, Errors: i.errors, Auth: i.auth, Throughput: i.throughput },
        body: (
          <div className="space-y-2">
            <div className="font-semibold text-sm">Recent Events</div>
            <ul className="space-y-1.5">
              {i.lastEvents.map((e,k) => (<li key={k} className="text-xs p-2 rounded bg-muted/40 flex justify-between gap-2"><span>{e.event}</span><span className="font-mono text-muted-foreground">{e.at}</span></li>))}
            </ul>
          </div>
        ),
        actions: [
          { label: "Force Sync", tone: "primary", onClick: () => toast.success(`${i.name} sync queued`) },
          { label: "Edit Credentials", onClick: () => form.open({ title: `${i.name} Credentials`, submitLabel: "Save & Test", fields: [
            { name: "endpoint", label: "Endpoint URL", defaultValue: i.endpoint, span: 2, required: true },
            { name: "key", label: "API Key / Cert", type: "password", required: true, span: 2 },
          ] }) },
          { label: "Pause Integration", tone: "danger", onClick: () => action.open({ title: `Pause ${i.name}`, tone: "reject", confirmLabel: "Pause", presetReasons: ["Rate-limit","Investigating bug","Cost overrun","Vendor incident"] }) },
        ],
      });
    }
  };

  const liveCount = INTEGRATIONS.filter(i => i.status === "live").length;
  const degraded = INTEGRATIONS.filter(i => i.status === "degraded").length;
  const errs = INTEGRATIONS.reduce((s,i) => s+i.errors, 0);

  return (
    <>
      <PageHeader kicker="Section 11 · Integrations" title="Integrations" breadcrumb={["Integrations","Overview"]}
        actions={<button onClick={() => form.open({ title: "Connect New Integration", size: "lg", submitLabel: "Connect & Test", fields: [
          { name: "name", label: "Integration Name", required: true, span: 2 },
          { name: "type", label: "Type", type: "select", required: true, options: ["Tariff","Claims","Verification","Reporting","Delivery","Marketing","Identity","Storage"] },
          { name: "vendor", label: "Vendor", required: true },
          { name: "endpoint", label: "Base URL", required: true, span: 2 },
          { name: "authType", label: "Auth Type", type: "select", options: ["API Key","OAuth2","Mutual TLS","Basic","Bearer"] },
          { name: "key", label: "Secret / Key", type: "password", span: 2 },
        ] })} className="bg-target text-white text-xs font-semibold px-3 py-2 rounded-lg inline-flex items-center gap-1.5"><Plug className="h-3.5 w-3.5" />New Integration</button>}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <KpiCard label="Total Integrations" value={INTEGRATIONS.length} accent="navy" />
        <KpiCard label="Live" value={liveCount} accent="success" />
        <KpiCard label="Degraded" value={degraded} accent="warn" />
        <KpiCard label="Errors (24h)" value={errs} accent="red" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {INTEGRATIONS.map((i) => (
          <Panel key={i.name}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-navy">{i.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{i.desc}</p>
                <span className="mt-1.5 inline-block pill-info text-[10px]">{i.type}</span>
              </div>
              <span className={`h-3 w-3 rounded-full ${dot(i.status)} ring-4 ring-white shadow`} />
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div><dt className="text-muted-foreground">Status</dt><dd className="capitalize font-semibold mt-0.5">{i.status}</dd></div>
              <div><dt className="text-muted-foreground">Last Sync</dt><dd className="font-mono mt-0.5">{i.lastSync}</dd></div>
              <div className="col-span-2"><dt className="text-muted-foreground">Endpoint</dt><dd className="font-mono mt-0.5 truncate text-[10px]">{i.endpoint}</dd></div>
              <div className="col-span-2"><dt className="text-muted-foreground">Throughput</dt><dd className="mt-0.5">{i.throughput}</dd></div>
              <div className="col-span-2"><dt className="text-muted-foreground">Errors (24h)</dt><dd className={`font-mono mt-0.5 ${i.errors>0?"text-red-600 font-bold":""}`}>{i.errors}</dd></div>
            </dl>
            <div className="mt-3 flex gap-2">
              <button onClick={() => manage(i)} className="flex-1 text-xs font-semibold bg-navy hover:bg-navy-deep text-white py-2 rounded-md inline-flex items-center justify-center gap-1.5"><SettingsIcon className="h-3 w-3" />Manage</button>
              <button disabled={testing===i.name} onClick={() => test(i)} className="text-xs font-semibold border border-border px-3 py-2 rounded-md hover:bg-muted disabled:opacity-60 inline-flex items-center gap-1.5">
                {testing === i.name ? <Loader2 className="h-3 w-3 animate-spin" /> : <RefreshCw className="h-3 w-3" />}
                Test
              </button>
            </div>
          </Panel>
        ))}
      </div>
    </>
  );
}
