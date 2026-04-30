import { useState } from "react";
import { PageHeader, Panel } from "@/components/shared/Toolbar";
import { useFormDialog, useActionDialog } from "@/components/shared/FormDialog";
import { Loader2, CheckCircle2, Database, Shield, Bell, Globe, Palette } from "lucide-react";
import { toast } from "sonner";

export default function Settings() {
  const form = useFormDialog();
  const action = useActionDialog();
  const [backupRunning, setBackupRunning] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);
  const [lastBackup, setLastBackup] = useState({ date: "30/04/2026 02:00", size: "4.8 GB", status: "Success" as const });

  const runBackup = () => {
    setBackupRunning(true);
    setBackupProgress(0);
    toast.info("Backup started", { description: "Snapshotting Postgres + S3 attachments…" });
    const t = setInterval(() => {
      setBackupProgress(p => {
        const np = p + Math.floor(Math.random() * 18) + 4;
        if (np >= 100) {
          clearInterval(t);
          setBackupRunning(false);
          const now = new Date();
          const stamp = `${String(now.getDate()).padStart(2,"0")}/${String(now.getMonth()+1).padStart(2,"0")}/${now.getFullYear()} ${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;
          setLastBackup({ date: stamp, size: (4.6 + Math.random()*0.4).toFixed(1)+" GB", status: "Success" });
          toast.success("Backup complete", { description: "Encrypted to s3://target-pathology-backups · audit-logged" });
          return 100;
        }
        return np;
      });
    }, 380);
  };

  const testRestore = () => action.open({
    title: "Test Restore (sandbox)",
    subtitle: "Restores last snapshot to an isolated sandbox DB. No production impact.",
    tone: "approve",
    confirmLabel: "Run Test Restore",
    presetReasons: ["Quarterly DR drill","Ad-hoc verification","Audit evidence"],
    onConfirm: () => { toast.success("Sandbox restore queued", { description: "ETA ~14 min · You will be emailed when complete" }); },
  });

  return (
    <>
      <PageHeader kicker="Section 17 · Settings" title="System Configuration" breadcrumb={["Settings","General"]} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        <Panel title="General">
          {[
            ["System Name","Target Pathology — Labman 3", true],
            ["Default Currency","ZAR · South African Rand", true],
            ["Default Timezone","SAST (UTC+2)", false],
            ["Date Format","DD/MM/YYYY", false],
            ["Session Timeout","30 min", false],
            ["2FA Required","Yes — all users", true],
          ].map(([k, v, locked]) => (
            <div key={k as string} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
              <span className="text-sm text-muted-foreground">{k}</span>
              <span className="text-sm font-mono font-medium">{v} {locked && <span className="text-[10px] pill-muted ml-2">🔒 Locked</span>}</span>
            </div>
          ))}
          <button onClick={() => form.open({
            title: "Edit General Settings", size: "lg", submitLabel: "Save Settings",
            fields: [
              { name: "system", label: "System Name", required: true, defaultValue: "Target Pathology — Labman 3", span: 2 },
              { name: "tz", label: "Timezone", type: "select", options: ["SAST (UTC+2)","WAT (UTC+1)","CAT (UTC+2)","UTC"], defaultValue: "SAST (UTC+2)" },
              { name: "fmt", label: "Date Format", type: "select", options: ["DD/MM/YYYY","YYYY-MM-DD","MM/DD/YYYY"] },
              { name: "session", label: "Session Timeout (min)", type: "number", defaultValue: "30" },
              { name: "lang", label: "Default Language", type: "select", options: ["English","Afrikaans","Zulu","Xhosa","Portuguese"] },
              { name: "twofa", label: "Force 2FA on all users", type: "checkbox", defaultValue: true, span: 2 },
            ],
          })} className="mt-3 w-full bg-navy text-white text-xs font-semibold py-2 rounded-md">Edit Settings</button>
        </Panel>

        <Panel title="Backup & Recovery">
          <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 mb-3">
            <div className="text-xs text-emerald-800">Last backup</div>
            <div className="font-mono text-sm font-semibold">{lastBackup.date} · {lastBackup.size} · ✓ {lastBackup.status}</div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Schedule</span><span>Daily · 02:00 SAST</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Retention</span><span>30 daily · 12 monthly · 7 yearly</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">RPO / RTO</span><span>&lt; 24h / &lt; 4h</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Storage</span><span>S3 · KMS-encrypted · af-south-1</span></div>
          </div>
          {backupRunning && (
            <div className="mt-4 rounded-lg border border-target/30 bg-target/5 p-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-target"><Loader2 className="h-3.5 w-3.5 animate-spin" />Backup in progress · {backupProgress}%</div>
              <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-target transition-all duration-300" style={{ width: `${backupProgress}%` }} />
              </div>
              <div className="text-[10px] text-muted-foreground mt-1.5 font-mono">
                {backupProgress < 25 ? "Quiescing Postgres WAL…" :
                 backupProgress < 55 ? "Streaming pg_basebackup → S3…" :
                 backupProgress < 85 ? "Snapshotting attachments bucket…" :
                                        "Encrypting & writing manifest…"}
              </div>
            </div>
          )}
          <div className="mt-4 flex gap-2">
            <button onClick={runBackup} disabled={backupRunning} className="flex-1 bg-target hover:bg-target-dark disabled:opacity-60 text-white text-xs font-semibold py-2 rounded-md inline-flex items-center justify-center gap-1.5">
              {backupRunning ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Database className="h-3.5 w-3.5" />}
              {backupRunning ? "Running…" : "Run Backup Now"}
            </button>
            <button onClick={testRestore} className="flex-1 border border-border text-xs font-semibold py-2 rounded-md hover:bg-muted">Test Restore</button>
          </div>
        </Panel>

        <Panel title="Security & Access">
          {[
            ["Password Policy","Min 12 chars · 2 classes · 90-day rotation"],
            ["Session Encryption","TLS 1.3 · HSTS preload"],
            ["MFA Methods","TOTP, WebAuthn (FIDO2), SMS"],
            ["IP Allowlist","Branch CIDR enforced"],
            ["Audit Retention","7 years · WORM bucket"],
          ].map(([k,v]) => (
            <div key={k} className="flex items-center justify-between py-2 border-b border-border last:border-0 text-sm">
              <span className="text-muted-foreground inline-flex items-center gap-1.5"><Shield className="h-3 w-3" />{k}</span><span>{v}</span>
            </div>
          ))}
          <button onClick={() => form.open({ title: "Edit Security Policy", size: "lg", submitLabel: "Apply Policy", fields: [
            { name: "minLen", label: "Min Password Length", type: "number", defaultValue: "12" },
            { name: "rot", label: "Rotation (days)", type: "number", defaultValue: "90" },
            { name: "mfa", label: "MFA Methods", type: "multiselect", options: ["TOTP","WebAuthn","SMS","Email OTP"], span: 2 },
            { name: "ipLock", label: "Enforce IP allowlist", type: "checkbox", defaultValue: true, span: 2 },
            { name: "lockout", label: "Auto-lockout after (failed attempts)", type: "number", defaultValue: "5" },
          ] })} className="mt-3 w-full bg-navy text-white text-xs font-semibold py-2 rounded-md">Edit Security Policy</button>
        </Panel>

        <Panel title="Notifications">
          {[["Critical Result SMS","Enabled · 24/7"],["Daily Digest Email","08:00 SAST"],["Slack Bridge","#labman-alerts"],["WhatsApp Templates","12 active"]].map(([k,v]) => (
            <div key={k} className="flex items-center justify-between py-2 border-b border-border last:border-0 text-sm">
              <span className="text-muted-foreground inline-flex items-center gap-1.5"><Bell className="h-3 w-3" />{k}</span><span>{v}</span>
            </div>
          ))}
          <button onClick={() => form.open({ title: "Configure Notifications", size: "lg", submitLabel: "Save", fields: [
            { name: "channels", label: "Channels", type: "multiselect", options: ["Email","SMS","WhatsApp","Slack","Teams","In-app"], span: 2 },
            { name: "digest", label: "Daily Digest Time", type: "select", options: ["07:00","08:00","09:00","17:00"] },
            { name: "critWindow", label: "Critical Result Escalation (min)", type: "number", defaultValue: "15" },
            { name: "slackHook", label: "Slack Webhook URL", span: 2 },
          ] })} className="mt-3 w-full bg-navy text-white text-xs font-semibold py-2 rounded-md">Edit Notifications</button>
        </Panel>

        <Panel title="Localisation">
          {[["Country","South Africa"],["VAT Rate","15%"],["Phone Format","+27 …"],["Currency","ZAR"]].map(([k,v]) => (
            <div key={k} className="flex items-center justify-between py-2 border-b border-border last:border-0 text-sm">
              <span className="text-muted-foreground inline-flex items-center gap-1.5"><Globe className="h-3 w-3" />{k}</span><span>{v}</span>
            </div>
          ))}
        </Panel>

        <Panel title="Branding">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground inline-flex items-center gap-1.5"><Palette className="h-3 w-3"/>Primary Colour</span><span className="inline-flex items-center gap-2"><span className="h-4 w-4 rounded bg-target" />#C8102E</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Secondary</span><span className="inline-flex items-center gap-2"><span className="h-4 w-4 rounded bg-navy" />#0C1F3F</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Logo</span><span>Target Pathology · uploaded</span></div>
          </div>
          <button onClick={() => form.open({ title: "Edit Branding", size: "lg", submitLabel: "Apply Branding", fields: [
            { name: "primary", label: "Primary Hex", defaultValue: "#C8102E" },
            { name: "secondary", label: "Secondary Hex", defaultValue: "#0C1F3F" },
            { name: "logo", label: "Logo File", type: "file", span: 2 },
            { name: "favicon", label: "Favicon (ico/png)", type: "file", span: 2 },
          ] })} className="mt-3 w-full bg-navy text-white text-xs font-semibold py-2 rounded-md">Edit Branding</button>
        </Panel>
      </div>
    </>
  );
}
