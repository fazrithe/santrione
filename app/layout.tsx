import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { AppShell } from "@/components/AppShell";

export const metadata: Metadata = {
  title: "SantriOne — ERP Pesantren Terpadu",
  description: "Demo ERP Pesantren Terpadu: SIAKAD, LMS, Tahfidz, Keuangan, Asrama, dan lainnya dalam satu platform.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body className="font-body antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
