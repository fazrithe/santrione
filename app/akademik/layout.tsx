import type { ReactNode } from "react";
import { AkademikProvider } from "@/lib/akademik/store";

export default function AkademikLayout({ children }: { children: ReactNode }) {
  return <AkademikProvider>{children}</AkademikProvider>;
}
