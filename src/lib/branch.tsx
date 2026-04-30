import { createContext, useContext, useEffect, useState, ReactNode } from "react";

const Ctx = createContext<{ branch: string; setBranch: (b: string) => void }>({
  branch: "ALL",
  setBranch: () => {},
});

export function BranchProvider({ children }: { children: ReactNode }) {
  const [branch, setBranch] = useState<string>(() => localStorage.getItem("labman.branch") || "ALL");
  useEffect(() => { localStorage.setItem("labman.branch", branch); }, [branch]);
  return <Ctx.Provider value={{ branch, setBranch }}>{children}</Ctx.Provider>;
}

export const useBranch = () => useContext(Ctx);
