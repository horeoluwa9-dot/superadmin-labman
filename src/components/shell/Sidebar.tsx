import { useState } from "react";
import { NavLink as RouterNavLink, useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronDown, ArrowLeftRight } from "lucide-react";
import { NAV } from "@/lib/nav";
import { STAFF_NAV } from "@/lib/staffNav";
import { useMode } from "@/lib/mode";
import logo from "@/assets/target-logo.png";

interface Props { collapsed: boolean; onToggle: () => void; }

export function Sidebar({ collapsed, onToggle }: Props) {
  const loc = useLocation();
  const nav = useNavigate();
  const { mode, setMode } = useMode();
  const items = mode === "staff" ? STAFF_NAV : NAV;
  const [openId, setOpenId] = useState<string | null>("lims");

  return (
    <aside
      className={`${collapsed ? "w-[64px]" : "w-[260px]"} shrink-0 bg-sidebar text-sidebar-foreground flex flex-col h-screen sticky top-0 transition-[width] duration-200 border-r border-sidebar-border z-30`}
    >
      <div className="flex items-center gap-2 px-3 py-3.5 border-b border-sidebar-border">
        <div className="bg-navy rounded-md p-1.5 shrink-0">
          <img src={logo} alt="Target Pathology" className="h-6 w-auto" />
        </div>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-extrabold tracking-widest text-navy">LABMAN 3</div>
            <div className="text-[10px] text-muted-foreground truncate">{mode === "staff" ? "Staff Mode" : "Super Admin"}</div>
          </div>
        )}
        <button
          onClick={onToggle}
          className="ml-auto p-1.5 rounded-md hover:bg-sidebar-accent text-muted-foreground"
          aria-label="Toggle sidebar"
        >
          <ChevronLeft className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""}`} />
        </button>
      </div>

      {!collapsed && (
        <div className="px-3 pt-3">
          <div className="grid grid-cols-2 rounded-lg bg-muted p-0.5 text-[11px] font-bold">
            <button
              onClick={() => { setMode("lims"); nav("/"); }}
              className={`py-1.5 rounded-md transition-all ${mode === "lims" ? "bg-white text-navy shadow-sm" : "text-muted-foreground"}`}
            >LIMS Mode</button>
            <button
              onClick={() => { setMode("staff"); nav("/staff"); }}
              className={`py-1.5 rounded-md transition-all ${mode === "staff" ? "bg-white text-navy shadow-sm" : "text-muted-foreground"}`}
            >Staff Mode</button>
          </div>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5 scrollbar-thin mt-2">
        {items.map((item, idx) => {
          const Icon = item.icon;
          const active = loc.pathname === item.to ||
            (item.to !== "/" && loc.pathname.startsWith(item.to));
          const isOpen = openId === item.id || active;
          return (
            <div key={item.id}>
              <RouterNavLink
                to={item.to}
                onClick={(e) => {
                  if (item.subItems && !collapsed) {
                    e.preventDefault();
                    setOpenId(isOpen ? null : item.id);
                  }
                }}
                className={`group flex items-center gap-3 rounded-md px-2.5 py-2 text-[13px] transition-all relative
                  ${active
                    ? "bg-target/10 text-target font-semibold before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-1 before:bg-target before:rounded-r"
                    : "text-foreground/75 hover:bg-sidebar-accent hover:text-navy"}`}
                title={collapsed ? item.label : undefined}
              >
                <span className="w-5 flex justify-center shrink-0">
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                {!collapsed && (
                  <>
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.subItems && (
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    )}
                  </>
                )}
              </RouterNavLink>
              {!collapsed && item.subItems && isOpen && (
                <div className="ml-9 mt-0.5 mb-1 space-y-0.5 border-l border-border pl-2 animate-fade-in">
                  {item.subItems.map((s) => (
                    <RouterNavLink
                      key={s.to}
                      to={s.to}
                      className={({ isActive }) =>
                        `block text-[12px] px-2 py-1 rounded transition-colors ${
                          isActive ? "text-target font-semibold bg-target/5" : "text-muted-foreground hover:text-navy hover:bg-muted"
                        }`
                      }
                    >
                      {s.label}
                    </RouterNavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-2">
        <button
          onClick={() => { const next = mode === "lims" ? "staff" : "lims"; setMode(next); nav(next === "staff" ? "/staff" : "/"); }}
          className="w-full flex items-center gap-2 px-2.5 py-2 rounded-md text-xs font-semibold text-foreground/80 hover:bg-sidebar-accent hover:text-navy"
        >
          <ArrowLeftRight className="h-4 w-4" />
          {!collapsed && <span>Switch to {mode === "lims" ? "Staff" : "LIMS"} Mode</span>}
        </button>
        {!collapsed && (
          <div className="px-2 pt-1 text-[10px] text-muted-foreground">v1.0 · April 2026</div>
        )}
      </div>
    </aside>
  );
}
