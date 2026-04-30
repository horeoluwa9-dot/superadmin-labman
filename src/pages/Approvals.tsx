import { useState } from "react";
import { PageHeader, Panel, Pill, Tabs } from "@/components/shared/Toolbar";
import { useSearchParams } from "react-router-dom";
import { useActionDialog, useFormDialog } from "@/components/shared/FormDialog";
import { useDrawer } from "@/components/shared/DetailDrawer";
import { CheckCircle2, XCircle, MessageCircleQuestion, Clock, Mail, ShieldCheck } from "lucide-react";

const EMAIL_TEMPLATES = {
  approved: {
    subject: "Your access request has been approved — Target Pathology",
    body: `Dear {{name}},

Your access to the Target Pathology Labman 3 platform has been approved.

Role: {{role}}
Access Level: {{level}}
Branch: {{branch}}
Username: {{email}}

A temporary password has been sent to your work email. You will be required to change it on first login and enable 2-factor authentication.

If you did not request this access, please contact IT Support immediately.

Regards,
Super Admin · Target Pathology`,
  },
  rejected: {
    subject: "Your access request requires further review",
    body: `Dear {{name}},

Your request for {{role}} ({{level}}) access has been declined at this stage.

Reason: {{reason}}

Please discuss with your line manager and resubmit with the required documentation.

Regards,
Super Admin · Target Pathology`,
  },
};

const items = {
  Financial: [
    { id: "AP-9912", tone: "warning" as const, title: "High-value test billing requires approval", detail: "MRI Pathology panel · R 18,420 · Patient TPL-2026-04-30-0098", who: "K. Mokoena · Data Capturer · Cape Town", risk: "High", sla: "47m", consequence: "Specimen will be discarded if not actioned in 2h" },
    { id: "AP-9913", tone: "warning" as const, title: "Refund request — duplicate billing", detail: "Bonitas claim refund of R 2,318.00 — Patient consented", who: "ms ntswaki maleke · Booysens", risk: "Medium", sla: "1h 14m", consequence: "Patient pending refund" },
  ],
  Clinical: [
    { id: "AP-9914", tone: "info" as const, title: "Manual override on critical Hb result", detail: "Hb 4.1 g/dL flagged auto-critical — manual reissue requested", who: "Pathologist Dr. Phakathi", risk: "Critical", sla: "12m", consequence: "Doctor not notified yet" },
  ],
  Inventory: [
    { id: "AP-9915", tone: "success" as const, title: "Emergency reagent order", detail: "HIV PCR kit — request 30 boxes from supplier · R 87,420", who: "Inventory Manager · Pretoria", risk: "Medium", sla: "3h 02m", consequence: "Stock-out in 4 days" },
  ],
  Access: [
    { id: "AP-9916", tone: "danger" as const, title: "Privilege escalation request", detail: "Request to elevate Lab Tech (L2) → Senior Lab Tech (L3)", who: "HR Officer", risk: "High", sla: "—", consequence: "Audit-logged",
      access: { user: "K. Mokoena", currentRole: "Data Capturer", currentLevel: "L1 — Operational", targetRole: "Pre-Lab Technician", targetLevel: "L2 — Lab Floor", branch: "Cape Town", email: "k.mokoena@targetlab.co.za", justification: "Promotion approved by HR — needs to capture pre-lab specimen QC data." } },
    { id: "AP-9917", tone: "warning" as const, title: "New user access request", detail: "Onboarding new Phlebotomist — Booysens", who: "HR Officer", risk: "Medium", sla: "1d", consequence: "Cannot start shift without access",
      access: { user: "S. Mahlangu", currentRole: "—", currentLevel: "None", targetRole: "Phlebotomist", targetLevel: "L1 — Operational", branch: "Booysens", email: "s.mahlangu@targetlab.co.za", justification: "Confirmed contract signed 28 Apr." } },
  ],
  External: [],
};

const TABS = ["All", "Financial", "Clinical", "Inventory", "Access", "External"];

export default function Approvals() {
  const [params] = useSearchParams();
  const [active, setActive] = useState(params.get("tab")?.replace(/^./, c => c.toUpperCase()) || "All");
  const action = useActionDialog();
  const form = useFormDialog();
  const drawer = useDrawer();

  const counts = Object.fromEntries(TABS.map(t => [t, t === "All"
    ? Object.values(items).flat().length
    : items[t as keyof typeof items]?.length ?? 0])) as Record<string, number>;
  const visible = active === "All"
    ? Object.entries(items).flatMap(([cat, arr]) => arr.map(i => ({ ...i, category: cat })))
    : (items[active as keyof typeof items] || []).map(i => ({ ...i, category: active }));

  const catColor = (c: string) => ({
    Financial: "bg-gradient-gold text-navy",
    Clinical: "bg-blue-100 text-blue-800",
    Inventory: "bg-emerald-100 text-emerald-800",
    Access: "bg-purple-100 text-purple-800",
    External: "bg-teal-100 text-teal-800",
  } as any)[c] || "pill-muted";

  return (
    <>
      <PageHeader
        kicker="Section 10"
        title="Approvals Hub"
        breadcrumb={["Home", "Approvals"]}
        actions={<Pill tone="warning">{Object.values(items).flat().length} pending</Pill>}
      />
      <Panel>
        <Tabs items={TABS} active={active} onChange={setActive} counts={counts} />
        {visible.length === 0 ? (
          <div className="text-center py-16">
            <CheckCircle2 className="h-14 w-14 mx-auto text-emerald-500 mb-3" />
            <h3 className="text-lg font-bold text-navy">All caught up</h3>
            <p className="text-sm text-muted-foreground mt-1">No pending approvals in this category.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {visible.map((it, i) => (
              <article key={i} className="rounded-lg border border-border bg-white p-4 hover:shadow-card transition-shadow">
                <div className="flex flex-wrap items-start gap-3">
                  <span className={`pill ${catColor(it.category)}`}>{it.category}</span>
                  <Pill tone={it.risk === "Critical" ? "danger" : it.risk === "High" ? "warning" : "muted"}>{it.risk} risk</Pill>
                  <span className="pill-muted text-[10px] font-mono">{it.id}</span>
                  <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" /> SLA {it.sla}
                  </div>
                </div>
                <h4 className="mt-2 font-semibold text-navy">{it.title}</h4>
                <p className="text-sm text-muted-foreground mt-0.5">{it.detail}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Requested by <span className="text-foreground font-medium">{it.who}</span>
                </p>
                <div className="mt-2 text-xs bg-amber-50 text-amber-900 px-3 py-1.5 rounded border border-amber-200">
                  ⚠ Consequence: {it.consequence}
                </div>
                {(it as any).access && (
                  <div className="mt-3 rounded-lg border border-purple-200 bg-purple-50/50 p-3">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-purple-800 mb-2">
                      <ShieldCheck className="h-3.5 w-3.5" /> Access being granted to
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                      <div><div className="text-[10px] text-muted-foreground uppercase">User</div><div className="font-semibold">{(it as any).access.user}</div></div>
                      <div><div className="text-[10px] text-muted-foreground uppercase">Email</div><div className="font-mono text-[11px]">{(it as any).access.email}</div></div>
                      <div><div className="text-[10px] text-muted-foreground uppercase">Branch</div><div>{(it as any).access.branch}</div></div>
                      <div><div className="text-[10px] text-muted-foreground uppercase">Current Role</div><div>{(it as any).access.currentRole} <span className="text-muted-foreground">({(it as any).access.currentLevel})</span></div></div>
                      <div className="col-span-2"><div className="text-[10px] text-muted-foreground uppercase">→ Target Role</div><div className="font-semibold text-purple-900">{(it as any).access.targetRole} <span className="font-mono text-[11px]">({(it as any).access.targetLevel})</span></div></div>
                      <div className="col-span-3"><div className="text-[10px] text-muted-foreground uppercase">Justification</div><div className="text-[11px]">{(it as any).access.justification}</div></div>
                    </div>
                  </div>
                )}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => {
                      if ((it as any).access) {
                        const a = (it as any).access;
                        const tpl = EMAIL_TEMPLATES.approved;
                        const body = tpl.body.replace("{{name}}", a.user).replace("{{role}}", a.targetRole).replace(/{{level}}/g, a.targetLevel).replace("{{branch}}", a.branch).replace("{{email}}", a.email);
                        form.open({
                          title: `Approve Access · ${a.user}`,
                          subtitle: `Grant ${a.targetRole} (${a.targetLevel}) at ${a.branch}`,
                          size: "lg", submitLabel: "Approve & Send Email",
                          successMessage: "Access granted · Welcome email sent",
                          fields: [
                            { name: "user", label: "User", defaultValue: a.user, required: true, group: "Access" },
                            { name: "email", label: "Email", type: "email", defaultValue: a.email, required: true, group: "Access" },
                            { name: "role", label: "Role", type: "select", required: true, defaultValue: a.targetRole, options: ["Data Capturer","Pre-Lab Technician","Phlebotomist","Lab Technician","Senior Lab Tech","Pathologist","Lab Manager","Sales Person","Sales Manager","Driver","Driver Supervisor","Quality Assurance","Inventory Manager","Accountant","HR Manager","Financial Manager","Fin Claim Officer","Administrator"], group: "Access" },
                            { name: "level", label: "Access Level", type: "select", required: true, defaultValue: a.targetLevel, options: ["L1 — Operational","L2 — Lab Floor","L3 — Senior","L4 — Manager","L5 — Super Admin"], group: "Access" },
                            { name: "branch", label: "Branch", defaultValue: a.branch, required: true, group: "Access" },
                            { name: "expiry", label: "Access Expiry (optional)", type: "date", group: "Access", hint: "Leave blank for permanent" },
                            { name: "twoFA", label: "Require 2FA on first login", type: "checkbox", defaultValue: true, group: "Security" },
                            { name: "tempPwd", label: "Send temporary password", type: "checkbox", defaultValue: true, group: "Security" },
                            { name: "subject", label: "Email Subject", required: true, defaultValue: tpl.subject, span: 2, group: "Email Template" },
                            { name: "body", label: "Email Body", type: "textarea", required: true, defaultValue: body, span: 2, group: "Email Template", hint: "Tokens already substituted. Edit freely before sending." },
                            { name: "ccHr", label: "CC HR Manager", type: "checkbox", defaultValue: true, group: "Email Template" },
                            { name: "ccManager", label: "CC Line Manager", type: "checkbox", defaultValue: true, group: "Email Template" },
                          ],
                        });
                      } else {
                        action.open({
                          title: `Approve · ${it.title}`, subtitle: `${it.id} · ${it.category}`,
                          tone: "approve", confirmLabel: "Approve",
                          reasonLabel: "Approval reason (optional)",
                          presetReasons: ["Within policy","Risk acceptable","Documentation verified","Verbal confirmation received"],
                        });
                      }
                    }}
                    className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-md">
                    <CheckCircle2 className="h-3.5 w-3.5" /> {(it as any).access ? "Approve & Email" : "Approve"}
                  </button>
                  <button
                    onClick={() => action.open({
                      title: `Reject · ${it.title}`, subtitle: `${it.id} · ${it.category}`,
                      tone: "reject", confirmLabel: "Reject", requireReason: true,
                      reasonLabel: "Reason for rejection (required)",
                      presetReasons: ["Outside policy","Insufficient documentation","Risk too high","Duplicate request","Awaiting executive sign-off"],
                    })}
                    className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-1.5 rounded-md">
                    <XCircle className="h-3.5 w-3.5" /> Reject
                  </button>
                  <button
                    onClick={() => action.open({
                      title: `Request Clarification · ${it.id}`, subtitle: it.title,
                      tone: "neutral", confirmLabel: "Send Clarification Request", requireReason: true,
                      reasonLabel: "What needs clarification?",
                    })}
                    className="inline-flex items-center gap-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-semibold px-3 py-1.5 rounded-md">
                    <MessageCircleQuestion className="h-3.5 w-3.5" /> Clarify
                  </button>
                  <button
                    onClick={() => drawer.open({
                      title: it.title, subtitle: `${it.id} · ${it.category} · ${it.risk} risk`,
                      meta: { Requester: it.who, SLA: it.sla, Consequence: it.consequence, Risk: it.risk },
                      body: <p className="text-muted-foreground">{it.detail}</p>,
                      actions: [{ label: "Open Source Record", tone: "primary" }, { label: "View Audit Trail" }],
                    })}
                    className="ml-auto text-xs text-target font-semibold hover:text-target-dark">View Full Context →</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </Panel>
    </>
  );
}
