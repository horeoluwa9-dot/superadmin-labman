import { useState, ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { ModeProvider } from "@/lib/mode";
import { BranchProvider } from "@/lib/branch";
import { DrawerProvider } from "@/components/shared/DetailDrawer";
import { FormDialogProvider, ActionDialogProvider } from "@/components/shared/FormDialog";
import { PrintPreviewProvider } from "@/components/shared/PrintPreview";

export function Shell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <ModeProvider>
      <BranchProvider>
        <DrawerProvider>
          <FormDialogProvider>
            <ActionDialogProvider>
              <PrintPreviewProvider>
                <div className="flex min-h-screen bg-background">
                  <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />
                  <div className="flex-1 min-w-0 flex flex-col">
                    <TopBar />
                    <main className="flex-1 p-6 animate-fade-in">{children}</main>
                  </div>
                </div>
              </PrintPreviewProvider>
            </ActionDialogProvider>
          </FormDialogProvider>
        </DrawerProvider>
      </BranchProvider>
    </ModeProvider>
  );
}
