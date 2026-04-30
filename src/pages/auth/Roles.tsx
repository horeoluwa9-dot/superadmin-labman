import { PageHeader, Panel, DataToolbar } from "@/components/shared/Toolbar";
import { ROLES } from "@/data/staff";
import { useDrawer } from "@/components/shared/DetailDrawer";
import { Shield } from "lucide-react";

export default function Roles() {
  const drawer = useDrawer();
  return (
    <>
      <PageHeader kicker="Section 8B · Authentication" title="Roles" breadcrumb={["Authentication", "Roles"]} />
      <Panel>
        <DataToolbar primaryLabel="New Role" onPrimary={() => drawer.open({
          title: "New Role",
          body: <p className="text-muted-foreground">Roles bundle permissions. Each role is mapped to one or more access levels (1–5).</p>,
          actions: [{ label: "Create Role", tone: "primary" }],
        })} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {ROLES.map(r => (
            <button key={r.name}
              onClick={() => drawer.open({
                title: r.name,
                subtitle: `Access Level ${r.level} · ${r.perms} permissions`,
                meta: { Level: r.level, Permissions: r.perms, Users: Math.floor(Math.random()*8)+1, Source: "System" },
                body: <p className="text-muted-foreground">Roles inherit permissions and respect Golden Rule #2 — no self-approval. Role changes are audit-logged.</p>,
                actions: [{ label: "Edit Permissions", tone: "primary" }, { label: "Clone" }, { label: "Archive", tone: "danger" }],
              })}
              className="text-left p-4 border border-border rounded-xl bg-card hover:border-target hover:shadow-card transition-all">
              <div className="flex items-start justify-between mb-2">
                <Shield className="h-5 w-5 text-target" />
                <span className={`pill ${r.color}`}>L{r.level}</span>
              </div>
              <div className="text-sm font-bold text-navy">{r.name}</div>
              <div className="text-xs text-muted-foreground mt-1">{r.perms} permissions</div>
            </button>
          ))}
        </div>
      </Panel>
    </>
  );
}
