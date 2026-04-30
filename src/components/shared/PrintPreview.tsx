import { createContext, useContext, useState, ReactNode } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Printer, Download, X } from "lucide-react";
import { toast } from "sonner";

type PreviewPayload = {
  title: string;
  subtitle?: string;
  body: ReactNode;
  filename?: string;
};

const Ctx = createContext<{ open: (p: PreviewPayload) => void }>({ open: () => {} });
export const usePrintPreview = () => useContext(Ctx);

export function PrintPreviewProvider({ children }: { children: ReactNode }) {
  const [payload, setPayload] = useState<PreviewPayload | null>(null);
  const [isOpen, setOpen] = useState(false);

  const doPrint = () => {
    const node = document.getElementById("print-preview-area");
    if (!node) return;
    const win = window.open("", "_blank", "width=900,height=1100");
    if (!win) return;
    win.document.write(`<html><head><title>${payload?.title || "Print"}</title>
      <style>body{font-family:Inter,system-ui,sans-serif;padding:24px;color:#0f172a}
      table{width:100%;border-collapse:collapse;font-size:12px}
      th,td{border:1px solid #cbd5e1;padding:6px;text-align:left}
      th{background:#f1f5f9}
      h1{color:#0c1f3f;margin:0 0 4px 0}
      .muted{color:#64748b;font-size:11px}
      </style></head><body>${node.innerHTML}</body></html>`);
    win.document.close();
    setTimeout(() => { win.focus(); win.print(); }, 250);
  };

  const doDownload = () => {
    const node = document.getElementById("print-preview-area");
    if (!node) return;
    const html = `<html><head><meta charset="utf-8"><title>${payload?.title}</title></head><body>${node.innerHTML}</body></html>`;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = (payload?.filename || payload?.title || "document").replace(/\s+/g, "_") + ".html";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded", { description: a.download });
  };

  return (
    <Ctx.Provider value={{ open: (p) => { setPayload(p); setOpen(true); } }}>
      {children}
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[92vh] overflow-y-auto p-0">
          {payload && (
            <>
              <div className="sticky top-0 z-10 bg-white border-b border-border px-5 py-3 flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Print Preview</div>
                  <div className="text-base font-bold text-navy">{payload.title}</div>
                  {payload.subtitle && <div className="text-[11px] text-muted-foreground">{payload.subtitle}</div>}
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={doDownload} className="inline-flex items-center gap-1.5 border border-border bg-white hover:bg-muted text-xs font-semibold px-3 py-1.5 rounded-md">
                    <Download className="h-3.5 w-3.5" /> Download
                  </button>
                  <button onClick={doPrint} className="inline-flex items-center gap-1.5 bg-target hover:bg-target-dark text-white text-xs font-semibold px-3 py-1.5 rounded-md">
                    <Printer className="h-3.5 w-3.5" /> Print
                  </button>
                  <button onClick={() => setOpen(false)} className="p-1.5 hover:bg-muted rounded">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div id="print-preview-area" className="bg-white p-8 mx-auto" style={{ maxWidth: 820 }}>
                {payload.body}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Ctx.Provider>
  );
}
