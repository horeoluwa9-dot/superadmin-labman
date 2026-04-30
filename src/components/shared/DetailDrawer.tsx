import { createContext, useContext, useState, ReactNode } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { toast } from "sonner";

type DrawerPayload = { title: string; subtitle?: string; meta?: Record<string, ReactNode>; body?: ReactNode; actions?: { label: string; tone?: "primary" | "danger" | "muted"; onClick?: () => void }[] };
const Ctx = createContext<{ open: (p: DrawerPayload) => void; toastAction: (msg: string) => void }>({ open: () => {}, toastAction: () => {} });

export function DrawerProvider({ children }: { children: ReactNode }) {
  const [payload, setPayload] = useState<DrawerPayload | null>(null);
  const [isOpen, setOpen] = useState(false);
  const toastAction = (msg: string) => toast.success(msg, { description: "Action recorded in audit log · " + new Date().toLocaleTimeString() });
  return (
    <Ctx.Provider value={{ open: (p) => { setPayload(p); setOpen(true); }, toastAction }}>
      {children}
      <Sheet open={isOpen} onOpenChange={setOpen}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {payload && (
            <>
              <SheetHeader>
                <SheetTitle className="text-navy">{payload.title}</SheetTitle>
                {payload.subtitle && <SheetDescription>{payload.subtitle}</SheetDescription>}
              </SheetHeader>
              {payload.meta && (
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {Object.entries(payload.meta).map(([k, v]) => (
                    <div key={k} className="rounded-lg bg-muted/50 p-3">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{k}</div>
                      <div className="mt-1 text-sm font-medium">{v}</div>
                    </div>
                  ))}
                </div>
              )}
              {payload.body && <div className="mt-5 text-sm space-y-3">{payload.body}</div>}
              {payload.actions && (
                <div className="mt-6 flex flex-wrap gap-2 border-t border-border pt-4">
                  {payload.actions.map((a, i) => (
                    <button
                      key={i}
                      onClick={() => { a.onClick?.(); toastAction(a.label); setOpen(false); }}
                      className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors ${
                        a.tone === "primary" ? "bg-target text-white hover:bg-target-dark" :
                        a.tone === "danger"  ? "bg-red-600 text-white hover:bg-red-700" :
                                               "border border-border bg-white hover:bg-muted"
                      }`}
                    >{a.label}</button>
                  ))}
                </div>
              )}
            </>
          )}
        </SheetContent>
      </Sheet>
    </Ctx.Provider>
  );
}

export const useDrawer = () => useContext(Ctx);
