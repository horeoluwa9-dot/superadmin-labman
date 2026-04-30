import { useState } from "react";
import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronDown, ArrowLeftRight } from "lucide-react";
import { NAV } from "@/lib/nav";
import logo from "@/assets/target-logo.png";

interface Props { collapsed: boolean; onToggle: () => void; }

export function Sidebar({ collapsed, onToggle }: Props) {
  const loc = useLocation();
  const [openId, setOpenId] = useState<string | null>("lims");

  return (
    <aside
      className={`${collapsed ? "w-[64px]" : "w-[260px]"} shrink-0 bg-gradient-navy text-sidebar-foreground flex flex-col h-screen sticky top-0 transition-[width] duration-200 border-r border-sidebar-border z-30`}
    >
      <div className="flex items-center gap-2 px-3 py-4 border-b border-sidebar-border">
        <div className="bg-white rounded-md p-1 shrink-0">
          <img src={logo} alt="Target Pathology" className="h-7 w-auto" />
        </div>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold tracking-widest text-white">LABMAN 3</div>
            <div className="text-[10px] text-sidebar-foreground/60 truncate">Target Pathology</div>
          </div>
        )}
        <button
          onClick={onToggle}
          className="ml-auto p-1.5 rounded-md hover:bg-sidebar-accent text-sidebar-foreground/70"
          aria-label="Toggle sidebar"
        >
          <ChevronLeft className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""}`} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5 scrollbar-thin">
        {NAV.map((item, idx) => {
          const Icon = item.icon;
          const active = loc.pathname === item.to ||
            (item.to !== "/" && loc.pathname.startsWith(item.to));
          const isOpen = openId === item.id;
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
                className={`group flex items-center gap-3 rounded-md px-2.5 py-2 text-sm transition-all relative
                  ${active
                    ? "bg-sidebar-accent text-white font-semibold before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-1 before:bg-target before:rounded-r"
                    : "text-sidebar-foreground/85 hover:bg-sidebar-accent/60 hover:text-white"}`}
                title={collapsed ? item.label : undefined}
              >
                <span className="w-5 flex justify-center shrink-0">
                  <span className="text-[10px] font-mono text-sidebar-foreground/40 absolute left-1 top-1.5">
                    {!collapsed && (idx + 1).toString().padStart(2, "0")}
                  </span>
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
                <div className="ml-9 mt-0.5 mb-1 space-y-0.5 border-l border-sidebar-border pl-2 animate-fade-in">
                  {item.subItems.map((s) => (
                    <RouterNavLink
                      key={s.to}
                      to={s.to}
                      className={({ isActive }) =>
                        `block text-[12px] px-2 py-1 rounded transition-colors ${
                          isActive ? "text-target font-semibold" : "text-sidebar-foreground/70 hover:text-white"
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
        <button className="w-full flex items-center gap-2 px-2.5 py-2 rounded-md text-xs font-semibold text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-white">
          <ArrowLeftRight className="h-4 w-4" />
          {!collapsed && <span>LIMS Mode <span className="opacity-50">↕</span> Staff Mode</span>}
        </button>
        {!collapsed && (
          <div className="px-2 pt-1 text-[10px] text-sidebar-foreground/40">v1.0 · April 2026</div>
        )}
      </div>
    </aside>
  );
}
