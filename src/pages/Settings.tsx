import { PageHeader, Panel } from "@/components/shared/Toolbar";

export default function Settings() {
  return (
    <>
      <PageHeader kicker="Section 17 · Settings" title="System Configuration" breadcrumb={["Settings", "General"]} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Panel title="General">
          {[
            ["System Name", "Target Pathology — Labman 3", true],
            ["Default Currency", "ZAR · South African Rand", true],
            ["Default Timezone", "SAST (UTC+2)", false],
            ["Date Format", "DD/MM/YYYY", false],
            ["Session Timeout", "30 min", false],
            ["2FA Required", "Yes — all users", true],
          ].map(([k, v, locked]) => (
            <div key={k as string} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
              <span className="text-sm text-muted-foreground">{k}</span>
              <span className="text-sm font-mono font-medium">{v} {locked && <span className="text-[10px] pill-muted ml-2">🔒 Locked</span>}</span>
            </div>
          ))}
        </Panel>
        <Panel title="Backup & Recovery">
          <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 mb-3">
            <div className="text-xs text-emerald-800">Last backup</div>
            <div className="font-mono text-sm font-semibold">30/04/2026 02:00 · 4.8 GB · ✓ Success</div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Schedule</span><span>Daily · 02:00 SAST</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">RPO</span><span>&lt; 24 hours</span></div>
          </div>
          <div className="mt-4 flex gap-2">
            <button className="flex-1 bg-target text-white text-xs font-semibold py-2 rounded-md">Run Backup Now</button>
            <button className="flex-1 border border-border text-xs font-semibold py-2 rounded-md">Test Restore</button>
          </div>
        </Panel>
      </div>
    </>
  );
}
