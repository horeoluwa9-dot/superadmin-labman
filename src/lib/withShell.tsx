import { ReactNode } from "react";
import { Shell } from "@/components/shell/Shell";

export default function withShell(node: ReactNode) {
  return <Shell>{node}</Shell>;
}
