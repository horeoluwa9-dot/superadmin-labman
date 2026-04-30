import { useState } from "react";
import { PageHeader, Panel, Pill, Tabs, DataToolbar, Pagination, fmtZAR } from "@/components/shared/Toolbar";
import { useFormDialog } from "@/components/shared/FormDialog";
import { useDrawer } from "@/components/shared/DetailDrawer";
import { KpiCard } from "@/components/shared/KpiCard";
import { FilterBar } from "@/components/shared/FilterBar";
import { BRANCHES } from "@/lib/nav";
import { FileSignature, Calendar, User, Building2 } from "lucide-react";

type MOA = {
  id: string; doctor: string; practice: string; rep: string; branch: string;
  start: string; end: string; tier: string; commission: number; status: "Current" | "Past" | "Draft" | "Expired";
  monthlyValue: number; signedBy: string;
};

const MOAS: MOA[] = [
  { id: "MOA-2026-041", doctor: "Dr. M. Pillay",   practice: "Pillay Family Medical",  rep: "Carmen Angelica", branch: "Booysens",  start: "2026-01-01", end: "2026-12-31", tier: "Gold",     commission: 12, status: "Current", monthlyValue: 84000, signedBy: "Mr. Richard" },
  { id: "MOA-2026-038", doctor: "Dr. J. Singh",    practice: "Singh Endocrine Clinic", rep: "Ike Igbo MBA",    branch: "Durban",    start: "2026-02-01", end: "2027-01-31", tier: "Platinum", commission: 15, status: "Current", monthlyValue: 142000, signedBy: "Mr. Richard" },
  { id: "MOA-2026-029", doctor: "Dr. T. Nkosi",    practice: "Nkosi Paediatrics",      rep: "Patrick Magupya", branch: "Polokwane", start: "2026-03-01", end: "2026-08-31", tier: "Silver",   commission: 8,  status: "Current", monthlyValue: 38000, signedBy: "Prof" },
  { id: "MOA-2025-217", doctor: "Dr. A. Botha",    practice: "Botha & Partners",       rep: "Carmen Angelica", branch: "Cape Town", start: "2025-01-01", end: "2025-12-31", tier: "Gold",     commission: 10, status: "Past",    monthlyValue: 67000, signedBy: "Mr. Richard" },
  { id: "MOA-2025-134", doctor: "Dr. V. Kambule",  practice: "Westridge Womens",       rep: "Makoane N.",      branch: "JHB HQ",    start: "2025-03-01", end: "2026-02-28", tier: "Silver",   commission: 8,  status: "Past",    monthlyValue: 24000, signedBy: "Mr. Richard" },
  { id: "MOA-2026-051", doctor: "Dr. O. Okonkwo",  practice: "Okonkwo Medical Centre", rep: "mr francis ike",  branch: "Lagos",     start: "2026-04-01", end: "2027-03-31", tier: "Platinum", commission: 15, status: "Draft",   monthlyValue: 0,     signedBy: "—" },
  { id: "MOA-2024-088", doctor: "Dr. R. Moyo",     practice: "Moyo Family Practice",   rep: "P. Moyo",         branch: "Harare",    start: "2024-05-01", end: "2025-04-30", tier: "Bronze",   commission: 5,  status: "Expired", monthlyValue: 12000, signedBy: "Prof" },
];

const TABS = ["All", "Current", "Past", "Draft", "Expired"];

const NEW_MOA_FIELDS = [
  { name: "doctor",   label: "Doctor", required: true, group: "Parties" },
  { name: "practice", label: "Practice / Hospital", required: true, group: "Parties" },
  { name: "rep",      label: "Assigned Sales Rep", required: true, group: "Parties" },
  { name: "branch",   label: "Servicing Branch", type: "select" as const, options: BRANCHES, required: true, group: "Parties" },
  { name: "tier",     label: "MOA Tier", type: "select" as const, options: ["Bronze","Silver","Gold","Platinum"], required: true, group: "Commercial" },
  { name: "commission", label: "Commission %", type: "number" as const, required: true, group: "Commercial" },
  { name: "monthlyTarget", label: "Monthly Volume Target", type: "number" as const, prefix: "R", required: true, group: "Commercial" },
  { name: "discount", label: "Tariff Discount %", type: "number" as const, group: "Commercial" },
  { name: "start",    label: "Start Date", type: "date" as const, required: true, group: "Term" },
  { name: "end",      label: "End Date",   type: "date" as const, required: true, group: "Term" },
  { name: "renewal",  label: "Auto-Renew?", type: "checkbox" as const, group: "Term" },
  { name: "noticePeriod", label: "Notice Period (days)", type: "number" as const, defaultValue: "30", group: "Term" },
  { name: "delivery", label: "Result Delivery", type: "multiselect" as const, options: ["Doctor Portal","Email PDF","WhatsApp","Print + Courier","Direct LIS"], span: 2 as const, group: "Service" },
  { name: "tat",      label: "TAT Commitment (hours)", type: "number" as const, group: "Service" },
  { name: "exclusivity", label: "Exclusive to Target?", type: "checkbox" as const, group: "Service" },
  { name: "billingTerms", label: "Billing Terms", type: "select" as const, options: ["Net 7","Net 14","Net 30","Net 60"], group: "Service" },
  { name: "signedBy", label: "Signed by (Internal)", type: "select" as const, options: ["Mr. Richard","Prof","CEO Office"], required: true, group: "Signatures" },
  { name: "doctorSignature", label: "Doctor Signed Document", type: "file" as const, span: 2 as const, hint: "Upload signed PDF/scan", group: "Signatures" },
  { name: "notes",    label: "Special Conditions / Notes", type: "textarea" as const, span: 2 as const, group: "Signatures" },
];

export default function MOA() {
  const form = useFormDialog();
  const drawer = useDrawer();
  const [tab, setTab] = useState("All");
  const [fBranch, setFBranch] = useState("");
  const [fTier, setFTier] = useState("");
  const [fRep, setFRep] = useState("");
  const [search, setSearch] = useState("");

  const filtered = MOAS.filter(m => {
    if (tab !== "All" && m.status !== tab) return false;
    if (fBranch && m.branch !== fBranch) return false;
    if (fTier && m.tier !== fTier) return false;
    if (fRep && m.rep !== fRep) return false;
    if (search && !`${m.doctor} ${m.practice} ${m.id}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });
  const counts = MOAS.reduce((a, m) => ({ ...a, All: (a.All || 0) + 1, [m.status]: (a[m.status] || 0) + 1 }), {} as any);

  const tierTone = (t: string) => t === "Platinum" ? "bg-slate-800 text-white" : t === "Gold" ? "bg-gradient-gold text-navy" : t === "Silver" ? "bg-slate-200 text-slate-800" : "bg-amber-100 text-amber-900";

  return (
    <>
      <PageHeader
        kicker="Section 5 · Administration"
        title="Memorandum of Agreement (MOA)"
        breadcrumb={["Administration", "MOA"]}
        actions={<Pill tone="info">{counts.Current || 0} active agreements</Pill>}
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <KpiCard label="Active MOAs"    value={counts.Current || 0} accent="success" />
        <KpiCard label="Past MOAs"      value={counts.Past || 0}    accent="navy" />
        <KpiCard label="Drafts Pending" value={counts.Draft || 0}   accent="warn" />
        <KpiCard label="Monthly Value"  value={fmtZAR(MOAS.filter(m=>m.status==="Current").reduce((s,m)=>s+m.monthlyValue,0))} accent="gold" />
      </div>
      <Panel>
        <Tabs items={TABS} active={tab} onChange={setTab} counts={counts} />
        <FilterBar
          filters={[
            { name: "branch", label: "Branches", options: BRANCHES, value: fBranch, onChange: setFBranch },
            { name: "tier", label: "Tiers", options: ["Bronze","Silver","Gold","Platinum"], value: fTier, onChange: setFTier },
            { name: "rep", label: "Reps", options: ["Carmen Angelica","Ike Igbo MBA","Patrick Magupya","Makoane N.","mr francis ike","P. Moyo"], value: fRep, onChange: setFRep },
          ]}
          search={search} onSearch={setSearch}
          onClear={() => { setFBranch(""); setFTier(""); setFRep(""); setSearch(""); }}
        />
        <DataToolbar primaryLabel="Create MOA" search={false}
          onPrimary={() => form.open({
            title: "Create New MOA",
            subtitle: "Memorandum of Agreement between Target Pathology and a referring doctor / practice.",
            fields: NEW_MOA_FIELDS, size: "xl",
            submitLabel: "Generate MOA & Send for Signature",
            successMessage: "MOA drafted and routed for signature",
          })}
        />
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="data-table">
            <thead>
              <tr>
                <th>MOA #</th><th>Doctor</th><th>Practice</th><th>Branch</th><th>Tier</th>
                <th>Commission</th><th>Term</th><th>Monthly Value</th><th>Signed By</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(m => (
                <tr key={m.id} className="cursor-pointer" onClick={() => drawer.open({
                  title: `${m.id} · ${m.doctor}`,
                  subtitle: `${m.practice} · ${m.tier} tier`,
                  meta: {
                    Doctor: m.doctor, Practice: m.practice, Rep: m.rep, Branch: m.branch,
                    Tier: m.tier, "Commission %": m.commission + "%", "Term Start": m.start, "Term End": m.end,
                    "Monthly Value": fmtZAR(m.monthlyValue), "Signed By": m.signedBy, Status: m.status,
                  },
                  body: (
                    <div className="space-y-2">
                      <p className="text-muted-foreground">Full agreement terms, signatures, and amendment history are attached. All revisions are versioned in the ISO Evidence Vault.</p>
                      <ul className="text-xs space-y-1 mt-2">
                        <li>• Service: Pathology testing, doctor portal access, dedicated rep</li>
                        <li>• TAT: 6 hour commitment for routine, 2 hour for STAT</li>
                        <li>• Billing: Net 30 from statement date</li>
                        <li>• Termination: 30 day written notice</li>
                      </ul>
                    </div>
                  ),
                  actions: [
                    { label: "View Full Document", tone: "primary" },
                    { label: "Amend MOA" },
                    { label: "Renew" },
                    { label: m.status === "Current" ? "Terminate" : "Re-activate", tone: m.status === "Current" ? "danger" : "primary" },
                    { label: "Download Signed PDF" },
                  ],
                })}>
                  <td className="font-mono text-xs">{m.id}</td>
                  <td className="font-medium">{m.doctor}</td>
                  <td className="text-xs">{m.practice}</td>
                  <td>{m.branch}</td>
                  <td><span className={`pill ${tierTone(m.tier)} text-[10px]`}>{m.tier}</span></td>
                  <td className="font-mono">{m.commission}%</td>
                  <td className="text-xs font-mono">{m.start} → {m.end}</td>
                  <td className="text-right font-mono text-xs">{fmtZAR(m.monthlyValue)}</td>
                  <td className="text-xs">{m.signedBy}</td>
                  <td><Pill tone={m.status === "Current" ? "success" : m.status === "Past" ? "muted" : m.status === "Draft" ? "warning" : "danger"}>{m.status}</Pill></td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={10} className="text-center py-8 text-muted-foreground text-xs">No MOAs match your filters.</td></tr>}
            </tbody>
          </table>
          <Pagination total={filtered.length} />
        </div>
      </Panel>
      <Panel className="mt-4" title="MOA Templates" subtitle="Pre-defined commercial structures">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {[
            { tier: "Bronze",   c: "5%",  v: "Up to R 25k/mo",  perks: "Standard delivery" },
            { tier: "Silver",   c: "8%",  v: "R 25k–60k/mo",    perks: "Doctor portal + Email" },
            { tier: "Gold",     c: "12%", v: "R 60k–120k/mo",   perks: "Dedicated rep + WhatsApp" },
            { tier: "Platinum", c: "15%", v: "R 120k+/mo",       perks: "Direct LIS · 2hr STAT TAT" },
          ].map(t => (
            <div key={t.tier} className="rounded-lg border border-border p-3 hover:shadow-card transition-shadow">
              <div className={`pill ${tierTone(t.tier)} text-[10px] mb-2`}>{t.tier}</div>
              <div className="text-xs text-muted-foreground">Commission</div>
              <div className="text-2xl font-bold text-navy">{t.c}</div>
              <div className="text-[11px] text-muted-foreground mt-2">{t.v}</div>
              <div className="text-[11px] mt-1">{t.perks}</div>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}
