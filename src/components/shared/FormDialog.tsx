import { createContext, useContext, useState, ReactNode, FormEvent } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export type FieldType = "text" | "email" | "tel" | "number" | "date" | "textarea" | "select" | "multiselect" | "checkbox" | "password" | "file";
export type FormField = {
  name: string;
  label: string;
  type?: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  defaultValue?: any;
  span?: 1 | 2;          // grid span out of 2
  hint?: string;
  prefix?: string;       // e.g. "R"
  group?: string;        // visual section header
};

export type FormConfig = {
  title: string;
  subtitle?: string;
  fields: FormField[];
  submitLabel?: string;
  successMessage?: string;
  size?: "md" | "lg" | "xl";
  onSubmit?: (values: Record<string, any>) => void | Promise<void>;
};

const FormCtx = createContext<{ open: (cfg: FormConfig) => void }>({ open: () => {} });

export const useFormDialog = () => useContext(FormCtx);

export function FormDialogProvider({ children }: { children: ReactNode }) {
  const [cfg, setCfg] = useState<FormConfig | null>(null);
  const [openState, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [values, setValues] = useState<Record<string, any>>({});

  const handleOpen = (c: FormConfig) => {
    const init: Record<string, any> = {};
    c.fields.forEach(f => init[f.name] = f.defaultValue ?? (f.type === "checkbox" ? false : f.type === "multiselect" ? [] : ""));
    setValues(init);
    setCfg(c);
    setOpen(true);
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!cfg) return;
    // Basic required validation
    for (const f of cfg.fields) {
      if (f.required && (values[f.name] === "" || values[f.name] === undefined || values[f.name] === null || (Array.isArray(values[f.name]) && values[f.name].length === 0))) {
        toast.error(`${f.label} is required`);
        return;
      }
    }
    setSubmitting(true);
    try {
      await cfg.onSubmit?.(values);
      toast.success(cfg.successMessage || `${cfg.title} saved`, {
        description: "Action recorded in audit log · " + new Date().toLocaleTimeString(),
      });
      setOpen(false);
    } catch (err: any) {
      toast.error(err?.message || "Save failed");
    } finally {
      setSubmitting(false);
    }
  };

  // Group fields
  const grouped: Record<string, FormField[]> = {};
  cfg?.fields.forEach(f => {
    const k = f.group || "_";
    grouped[k] = grouped[k] || [];
    grouped[k].push(f);
  });

  const sizeCls = cfg?.size === "xl" ? "sm:max-w-3xl" : cfg?.size === "lg" ? "sm:max-w-2xl" : "sm:max-w-lg";

  return (
    <FormCtx.Provider value={{ open: handleOpen }}>
      {children}
      <Dialog open={openState} onOpenChange={setOpen}>
        <DialogContent className={`${sizeCls} max-h-[90vh] overflow-y-auto`}>
          {cfg && (
            <form onSubmit={submit}>
              <DialogHeader>
                <DialogTitle className="text-navy">{cfg.title}</DialogTitle>
                {cfg.subtitle && <DialogDescription>{cfg.subtitle}</DialogDescription>}
              </DialogHeader>
              <div className="mt-4 space-y-5">
                {Object.entries(grouped).map(([gname, fields]) => (
                  <div key={gname}>
                    {gname !== "_" && (
                      <div className="text-[11px] font-bold uppercase tracking-wider text-target mb-2 pb-1 border-b border-border">{gname}</div>
                    )}
                    <div className="grid grid-cols-2 gap-3">
                      {fields.map(f => (
                        <div key={f.name} className={f.span === 2 || f.type === "textarea" ? "col-span-2" : "col-span-2 sm:col-span-1"}>
                          <label className="block text-xs font-semibold text-foreground mb-1">
                            {f.label} {f.required && <span className="text-target">*</span>}
                          </label>
                          {f.type === "textarea" ? (
                            <textarea
                              required={f.required}
                              rows={3}
                              placeholder={f.placeholder}
                              value={values[f.name] || ""}
                              onChange={e => setValues(v => ({ ...v, [f.name]: e.target.value }))}
                              className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-target/30"
                            />
                          ) : f.type === "select" ? (
                            <select
                              required={f.required}
                              value={values[f.name] || ""}
                              onChange={e => setValues(v => ({ ...v, [f.name]: e.target.value }))}
                              className="w-full border border-border rounded-md px-3 py-2 text-sm bg-white"
                            >
                              <option value="">— Select —</option>
                              {f.options?.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                          ) : f.type === "multiselect" ? (
                            <div className="flex flex-wrap gap-1.5 p-2 border border-border rounded-md bg-white max-h-32 overflow-y-auto">
                              {f.options?.map(o => {
                                const sel = (values[f.name] || []).includes(o);
                                return (
                                  <button key={o} type="button"
                                    onClick={() => setValues(v => {
                                      const arr = v[f.name] || [];
                                      return { ...v, [f.name]: sel ? arr.filter((x: string) => x !== o) : [...arr, o] };
                                    })}
                                    className={`text-[11px] px-2 py-1 rounded-md font-semibold transition-colors ${sel ? "bg-target text-white" : "bg-muted text-foreground hover:bg-slate-200"}`}
                                  >{o}</button>
                                );
                              })}
                            </div>
                          ) : f.type === "checkbox" ? (
                            <label className="flex items-center gap-2 text-sm">
                              <input type="checkbox" checked={!!values[f.name]} onChange={e => setValues(v => ({ ...v, [f.name]: e.target.checked }))} className="rounded border-border" />
                              <span className="text-muted-foreground">{f.placeholder || "Enable"}</span>
                            </label>
                          ) : (
                            <div className="relative">
                              {f.prefix && <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-mono">{f.prefix}</span>}
                              <input
                                type={f.type || "text"}
                                required={f.required}
                                placeholder={f.placeholder}
                                value={values[f.name] || ""}
                                onChange={e => setValues(v => ({ ...v, [f.name]: e.target.value }))}
                                className={`w-full border border-border rounded-md py-2 text-sm focus:outline-none focus:ring-2 focus:ring-target/30 ${f.prefix ? "pl-7 pr-3" : "px-3"}`}
                              />
                            </div>
                          )}
                          {f.hint && <div className="text-[10px] text-muted-foreground mt-1">{f.hint}</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-end gap-2 border-t border-border pt-4">
                <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 text-xs font-semibold rounded-md border border-border bg-white hover:bg-muted">Cancel</button>
                <button type="submit" disabled={submitting} className="px-4 py-2 text-xs font-semibold rounded-md bg-target text-white hover:bg-target-dark inline-flex items-center gap-2 disabled:opacity-60">
                  {submitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  {cfg.submitLabel || "Save"}
                </button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </FormCtx.Provider>
  );
}

/* ============== Action Dialog (with reason) ============== */
type ActionConfig = {
  title: string;
  subtitle?: string;
  tone?: "approve" | "reject" | "neutral";
  requireReason?: boolean;
  reasonLabel?: string;
  presetReasons?: string[];
  confirmLabel?: string;
  onConfirm?: (reason: string) => void | Promise<void>;
};

const ActionCtx = createContext<{ open: (cfg: ActionConfig) => void }>({ open: () => {} });
export const useActionDialog = () => useContext(ActionCtx);

export function ActionDialogProvider({ children }: { children: ReactNode }) {
  const [cfg, setCfg] = useState<ActionConfig | null>(null);
  const [openState, setOpen] = useState(false);
  const [reason, setReason] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!cfg) return;
    if (cfg.requireReason && !reason.trim()) { toast.error("Please provide a reason"); return; }
    await cfg.onConfirm?.(reason);
    toast.success(`${cfg.title} confirmed`, { description: reason ? `Reason: ${reason}` : "Action audit-logged · " + new Date().toLocaleTimeString() });
    setOpen(false);
    setReason("");
  };

  const tone = cfg?.tone === "approve" ? "bg-emerald-600 hover:bg-emerald-700" : cfg?.tone === "reject" ? "bg-red-600 hover:bg-red-700" : "bg-target hover:bg-target-dark";

  return (
    <ActionCtx.Provider value={{ open: (c) => { setReason(""); setCfg(c); setOpen(true); } }}>
      {children}
      <Dialog open={openState} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          {cfg && (
            <form onSubmit={submit}>
              <DialogHeader>
                <DialogTitle className="text-navy">{cfg.title}</DialogTitle>
                {cfg.subtitle && <DialogDescription>{cfg.subtitle}</DialogDescription>}
              </DialogHeader>
              <div className="mt-4 space-y-3">
                {cfg.presetReasons && (
                  <div>
                    <label className="block text-xs font-semibold mb-1">Quick reason</label>
                    <div className="flex flex-wrap gap-1.5">
                      {cfg.presetReasons.map(r => (
                        <button type="button" key={r} onClick={() => setReason(r)}
                          className={`text-[11px] px-2 py-1 rounded-md font-semibold ${reason === r ? "bg-target text-white" : "bg-muted hover:bg-slate-200"}`}
                        >{r}</button>
                      ))}
                    </div>
                  </div>
                )}
                <label className="block">
                  <span className="text-xs font-semibold">{cfg.reasonLabel || "Reason / Comment"} {cfg.requireReason && <span className="text-target">*</span>}</span>
                  <textarea rows={4} value={reason} onChange={e => setReason(e.target.value)}
                    placeholder="Type a clear, audit-ready reason…"
                    className="mt-1 w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-target/30" />
                </label>
                <div className="text-[10px] text-muted-foreground bg-amber-50 border border-amber-200 px-3 py-2 rounded">
                  ⓘ Logged with your user ID, timestamp, IP and device. Visible in the ISO Evidence Vault and Audit Trail.
                </div>
              </div>
              <div className="mt-5 flex justify-end gap-2 border-t border-border pt-4">
                <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 text-xs font-semibold rounded-md border border-border bg-white hover:bg-muted">Cancel</button>
                <button type="submit" className={`px-4 py-2 text-xs font-semibold rounded-md text-white ${tone}`}>{cfg.confirmLabel || "Confirm"}</button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </ActionCtx.Provider>
  );
}
