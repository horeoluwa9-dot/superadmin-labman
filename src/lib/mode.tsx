import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type AppMode = "lims" | "staff";

const Ctx = createContext<{ mode: AppMode; setMode: (m: AppMode) => void }>({
  mode: "lims",
  setMode: () => {},
});

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AppMode>(() => (localStorage.getItem("labman.mode") as AppMode) || "lims");
  useEffect(() => { localStorage.setItem("labman.mode", mode); }, [mode]);
  return <Ctx.Provider value={{ mode, setMode }}>{children}</Ctx.Provider>;
}

export const useMode = () => useContext(Ctx);
