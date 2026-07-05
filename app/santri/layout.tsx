import type { ReactNode } from "react";
import { SiakadProvider } from "@/lib/siakad/store";
import { ToastProvider } from "@/components/Toast";

export default function SantriLayout({ children }: { children: ReactNode }) {
  return (
    <SiakadProvider>
      <ToastProvider>{children}</ToastProvider>
    </SiakadProvider>
  );
}
